import { Box, Card, CardBody, Text, Flex } from "@chakra-ui/react";
import { Expense } from "../interfaces/Expense";

type Props = {
  expense: Expense;
};

const ExpenseCard = ({ expense }: Props) => {
  //const navigate = useNavigate();

  /*TODO: Add a path to the expenses page and then expand this specific transaction */
  // const handleExpenseClick = (id: string) => {
  //   navigate('/expenses')
  // };

  return (
    <Flex>
      <Box>
        <Card>
          <CardBody>
            <Flex direction="column" p={3}>
              <Text>{expense.date.toLocaleDateString()}</Text>
              <Text>{expense.merchant}</Text>
              <Flex direction="column">
                <Text>${expense.amount}</Text>
                <Text>{expense.notes}</Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
};

export default ExpenseCard;
