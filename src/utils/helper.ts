import { Expense } from "../interfaces/Expense";
import { LineGraphData } from "../interfaces/LineGraphData";
import { EMAIL_REGEX, PWD_REGEX } from "./constants";

export const isEmailValid = (email: string) => {
    const regexTest = EMAIL_REGEX.test(email);
    const isEmpty = email === "";
    return regexTest && !isEmpty;
};

export const isPasswordValid = (password: string) => {
    const regexTest = PWD_REGEX.test(password);
    const isEmpty = password === "";
    return regexTest && !isEmpty;
};

export const currentMonth = new Date().getMonth(); // Months are 0-indexed (0 for January, 1 for February, etc.)
export const currentYear = new Date().getFullYear();
export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
export const getMonthString = (monthIndex: number): string => {
    return MONTHS[monthIndex];
};

// Unique ID Generator
export const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Convert monthly expenses data to array of LineGraphData
export const convertMonthDataToLineData = (expenses: Expense[]): LineGraphData[] => {
  const filteredExpenses = expenses.filter(expense => {
      return expense.date.getFullYear() === currentYear && expense.date.getMonth() === currentMonth;
  });

  const lineGraphData = filteredExpenses.map(expense => {
      return {
          date: expense.date.toISOString().split('T')[0],
          amount: parseFloat(expense.amount)
      };
  });

  lineGraphData.sort((a, b) => a.date.localeCompare(b.date));

  return lineGraphData;
};

export const convertYearDataToLineData = (expenses: Expense[]): LineGraphData[] => {
    // Group expenses by year
    const expensesByYear = new Map<number, Expense[]>();

    expenses.forEach(expense => {
        const year = expense.date.getFullYear();
        const expensesInYear = expensesByYear.get(year) || [];
        expensesInYear.push(expense);
        expensesByYear.set(year, expensesInYear);
    });

    const lineGraphData: LineGraphData[] = [];

    expensesByYear.forEach((expenses, year) => {
        const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        const averageAmount = expenses.length > 0 ? totalAmount / expenses.length : 0;

        lineGraphData.push({
            date: year.toString(),
            amount: averageAmount
        });
    });

    return lineGraphData.sort((a, b) => a.date.localeCompare(b.date));
};

export const sortByDate = (expenses: Expense[]): Expense[] => {
    return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
}