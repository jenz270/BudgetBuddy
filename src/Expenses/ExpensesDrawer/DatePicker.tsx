import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "./datePickerStyle.css";

type Props = {
  onDateChange: (date: Date) => void;
};

const DatePicker = ({ onDateChange }: Props) => {
  const [date, setDate] = useState(new Date());

  const onDateSelected = (value: any) => {
    if (value instanceof Date) {
      setDate(value);
      onDateChange(value);
    } else {
      console.error("Provided value is not a valid Date object");
    }
  };

  return (
    <Flex alignContent="center">
      <Calendar onChange={onDateSelected} value={date} className="datePicker" />
    </Flex>
  );
};

export default DatePicker;
