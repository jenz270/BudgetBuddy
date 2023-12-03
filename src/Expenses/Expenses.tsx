import {
  Button,
  Flex,
  Icon,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import { Expense } from "../interfaces/Expense";
import {
  addExpense,
  deleteExpense,
  getAllExpenses,
} from "../services/expenseService";
import {
  ADD_NEW_EXPENSES,
  ERROR_EXPENSE_FETCH,
  EXPENSES,
  ALL,
  MONTHLY,
  EXPENSES_DEFAULT,
} from "../utils/constants";
import { currentMonth, currentYear, sortByDate } from "../utils/helper";
import ExpenseTable from "./ExpenseTable";
import AddExpensesDrawer from "./ExpensesDrawer/AddExpensesDrawer";
import { UserContext } from "../config/Context";

const Expenses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [monthExpenses, setMonthExpenses] = useState<Expense[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const firstField = React.useRef(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    const isInCurrentMonth = (expense: Expense) => {
      const expenseDate = new Date(expense.date);
      const now = new Date();
      return (
        expenseDate.getMonth() == now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    };

    getAllExpenses(userId)
      .then((expenses) => {
        const sortedExpenses = sortByDate(expenses)
        setExpenses(sortedExpenses);

        // Filter current month expenses after fetching
        const currentMonthExpenses = sortedExpenses.filter(isInCurrentMonth);
        setMonthExpenses(currentMonthExpenses); // Update the month expenses state

        setIsLoading(false);
      })
      .catch((error) => {
        console.error({ ERROR_EXPENSE_FETCH }, error);
        setIsLoading(false);
      });
  }, [userId]);

  const handleNewExpense = async (expense: Expense) => {
    // add expense into firestore
    addExpense(expense);

    // Get the month and year of the expense
    const expenseMonth = new Date(expense.date).getMonth();
    const expenseYear = new Date(expense.date).getFullYear();

    // add the new expense into the list of expenses
    setExpenses((prevExpenses) => [...prevExpenses, expense]);

    // Check if the expense is in the current month and year
    if (expenseMonth === currentMonth && expenseYear === currentYear) {
      setMonthExpenses((prevMonthExpenses) => [...prevMonthExpenses, expense]);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    await deleteExpense(id);

    // Find the index of the item
    const index = expenses.findIndex((item) => item.id === id);
    const monthsIndex = monthExpenses.findIndex((item) => item.id === id);
    const newExpenses = [...expenses];
    const newMonthExpenses = [...monthExpenses];

    // Remove the item if it exists
    if (index !== -1 || monthsIndex !== -1) {
      newExpenses.splice(index, 1);
      newMonthExpenses.splice(monthsIndex, 1);
    }

    setExpenses(newExpenses);
    setMonthExpenses(newMonthExpenses);
  };

  return (
    <Flex marginTop="2.5vh" flexDir="column" alignItems="flex-start" w="full">
      <Text as="b" fontSize="2xl" color="dark">
        {EXPENSES}
      </Text>
      {/* Add New Expenses */}
      <Flex pt={10}>
        <Button
          leftIcon={<Icon as={PlusIcon} boxSize={4} />}
          colorScheme="orange"
          variant="solid"
          onClick={onOpen}
        >
          {ADD_NEW_EXPENSES}
        </Button>
        <AddExpensesDrawer
          isOpen={isOpen}
          onClose={onClose}
          initialFocus={firstField}
          onSubmittedExpense={handleNewExpense}
        />
      </Flex>
      {/* Expenses Table */}
      <Flex width="100%" pt={10} pr={10}>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Tabs size="md" variant="enclosed">
            <TabList>
              <Tab _selected={{ color: "black", bg: "secondary" }}>{ALL}</Tab>
              <Tab _selected={{ color: "black", bg: "secondary" }}>
                {MONTHLY}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {expenses.length > 0 ? (
                  <ExpenseTable
                    expenses={expenses}
                    onClickDelete={handleDeleteExpense}
                  />
                ) : (
                  <Text>{EXPENSES_DEFAULT}</Text>
                )}
              </TabPanel>
              <TabPanel>
                {monthExpenses.length > 0 ? (
                  <ExpenseTable
                    expenses={monthExpenses}
                    onClickDelete={handleDeleteExpense}
                  />
                ) : (
                  <Text>
                    {EXPENSES_DEFAULT}
                  </Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Flex>
    </Flex>
  );
};

export default Expenses;
