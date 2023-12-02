import { Card, CardBody, IconButton, Td, Text, Tr } from "@chakra-ui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Expense } from "../interfaces/Expense";

type Props = {
  expense: Expense;
  onClickDelete: (id: string) => void;
};

const ExpenseRow = ({ expense, onClickDelete }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteClick = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    onClickDelete(id);
  };

  return (
    <>
      <Tr onClick={toggleExpand} style={{ cursor: "pointer" }}>
        <Td>{expense.date.toDateString()}</Td>
        <Td>{expense.merchant}</Td>
        <Td>{expense.category}</Td>
        <Td>${expense.amount}</Td>
        <Td>
          <IconButton
            background="none"
            _hover={{ background: "none" }}
            icon={<TrashIcon />}
            onClick={(event) => handleDeleteClick(event, expense.id)}
            size="xs"
            aria-label="Delete Expense"
          />
        </Td>
      </Tr>
      {isExpanded && (
        <Tr>
          <Td colSpan={7}>
            <Card>
              <CardBody>
                <Text>Date: {expense.date.toDateString()}</Text>
                <Text>Merchant: {expense.merchant}</Text>
                <Text>Category: {expense.category}</Text>
                <Text>Amount: {expense.amount}</Text>
                <Text>Is Recurring: {expense.isRecurring.toString()}</Text>
                <Text>Notes: {expense.notes}</Text>
              </CardBody>
            </Card>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default ExpenseRow;
