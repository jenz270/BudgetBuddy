import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import ExpenseRow from "./ExpenseRow";
import { Expense } from "../interfaces/Expense";

type Props = {
    expenses: Expense[];
    onClickDelete: (id: string) => void;
};

const ExpenseTable = ({ onClickDelete, expenses }: Props) => {
  return (
    <TableContainer>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Merchant</Th>
            <Th>Category</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses.map((expense) => (
            <ExpenseRow key={expense.id} expense={expense} onClickDelete={onClickDelete} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
