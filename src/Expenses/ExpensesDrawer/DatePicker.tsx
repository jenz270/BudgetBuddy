import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import './datePickerStyle.css';

type Props = {
  onDateChange: (date: Date) => void;
};

const DatePicker = ({ onDateChange }: Props) => {
  const [date, setDate] = useState(new Date());

  const onDateSelected = (date: Date) => {
    setDate(date);
    onDateChange(date);
  };

  return (
    <Flex alignContent="center">
      <Calendar
        onChange={onDateSelected}
        value={date}
        className="datePicker"
      />
    </Flex>
  );
};

export default DatePicker;
