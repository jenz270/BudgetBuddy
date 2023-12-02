import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../config/Context";
import { Expense } from "../../interfaces/Expense";
import {
  ADD_NEW_EXPENSES,
  AMOUNT,
  AMOUNT_FORMAT,
  AMOUNT_REQUIRED,
  CANCEL,
  CATEGORIES,
  CATEGORY,
  CATEGORY_REQUIRED,
  DATE,
  IS_RECURRING,
  MERCHANT,
  MERCHANT_NAME,
  MERCHANT_REQUIRED,
  NOTES,
  NUMERIC_CHECK,
  SELECT_CATEGORY,
  SUBMIT,
} from "../../utils/constants";
import { generateUniqueId } from "../../utils/helper";
import DatePicker from "./DatePicker";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialFocus: React.MutableRefObject<null>;
  onSubmittedExpense: (expense: Expense) => void;
};

const AddExpensesDrawer = ({
  isOpen,
  onClose,
  initialFocus,
  onSubmittedExpense,
}: Props) => {
  const { userId } = useContext(UserContext);

  const defaultExpenseValues: Expense = {
    id: generateUniqueId(),
    uid: userId,
    amount: "",
    category: "",
    notes: "",
    date: new Date(),
    merchant: "",
    isRecurring: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Expense>({
    defaultValues: defaultExpenseValues,
  });

  const handleDateChange = (date: Date) => {
    setValue("date", date);
  };

  const onSubmit = (expense: Expense) => {
    onSubmittedExpense(expense);
    reset();
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={initialFocus}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{ADD_NEW_EXPENSES}</DrawerHeader>

        <DrawerBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDir="column" gap={5}>
              <FormControl isInvalid={!!errors.merchant}>
                <FormLabel htmlFor="text">{MERCHANT_NAME}</FormLabel>
                <Input
                  id="merchname"
                  placeholder="ex) Walmart"
                  {...register(MERCHANT, {
                    required: MERCHANT_REQUIRED,
                  })}
                />
                <FormErrorMessage color="primary">
                  {errors.merchant && <p>{errors.merchant.message}</p>}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.amount}>
                <FormLabel htmlFor="amount">{AMOUNT}</FormLabel>
                <Input
                  id="amount"
                  placeholder="ex) $20.10"
                  type="number"
                  step="0.01"
                  {...register("amount", {
                    required: AMOUNT_REQUIRED,
                    valueAsNumber: true,
                    validate: {
                      isNumeric: (value) =>
                        NUMERIC_CHECK.test(value) ||
                        AMOUNT_FORMAT,
                    },
                  })}
                />
                <FormErrorMessage color="primary">
                  {errors.amount && <p>{errors.amount.message}</p>}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.category}>
                <FormLabel htmlFor="category">{SELECT_CATEGORY}</FormLabel>
                <Select
                  id="category"
                  {...register(CATEGORY, {
                    required: CATEGORY_REQUIRED,
                  })}
                >
                  {CATEGORIES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage color="primary">
                  {errors.category && <p>{errors.category.message}</p>}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.date}>
                <FormLabel htmlFor="date">{DATE}</FormLabel>
                <DatePicker onDateChange={handleDateChange} />
                <FormErrorMessage color="primary">
                  {errors.date && <p>{errors.date?.message}</p>}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <Checkbox id="isRecurring" {...register("isRecurring")}>
                  {IS_RECURRING}
                </Checkbox>
              </FormControl>

              <FormControl isInvalid={!!errors.notes}>
                <FormLabel htmlFor="notes">{NOTES}</FormLabel>
                <Textarea id="notes" {...register("notes")} />
                {errors.notes && <p>{errors.notes.message}</p>}
              </FormControl>
            </Flex>
          </form>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            {CANCEL}
          </Button>
          <Button
            colorScheme="orange"
            variant="solid"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {SUBMIT}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddExpensesDrawer;
