import { Button, Flex, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../config/Context";
import { Expense } from "../interfaces/Expense";
import { LineGraphData } from "../interfaces/LineGraphData";
import { getAllExpenses } from "../services/expenseService";
import {
  ERROR_EXPENSE_FETCH,
  HOME,
  ITEMS_PER_PAGE,
  RECENT_EXPENSES,
  RECENT_EXPENSES_DEFAULT,
  SPENDING_ANNUAL,
  SPENDING_GRAPHS,
  SPENDING_GRAPHS_DEFAULT,
  SPENDING_OVERVIEW,
} from "../utils/constants";
import {
  convertMonthDataToLineData,
  convertYearDataToLineData,
} from "../utils/helper";
import ExpenseCard from "./ExpenseCard";
import ExpensesLineChart from "./graphs/LineChart";

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthGraphData, setMonthGraphData] = useState<LineGraphData[]>([]);
  const [yearGraphData, setYearGraphData] = useState<LineGraphData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayedExpenses = expenses.slice(
    currentIndex,
    currentIndex + ITEMS_PER_PAGE
  );
  const { userId } = useContext(UserContext);

  useEffect(() => {
    getAllExpenses(userId)
      .then((expenses) => {
        setExpenses(expenses);
        setMonthGraphData(convertMonthDataToLineData(expenses));
        setYearGraphData(convertYearDataToLineData(expenses));
      })
      .catch((error) => {
        console.error({ ERROR_EXPENSE_FETCH }, error);
      });
  }, [userId]);

  const scrollRight = () => {
    if (currentIndex < expenses.length - ITEMS_PER_PAGE) {
      setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
    }
  };

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_PAGE);
    }
  };

  return (
    <Flex marginTop="2.5vh" flexDir="column">
      <Text as="b" fontSize="2xl" color="dark">
        {HOME}
      </Text>
      {/* TODO: Monthly Budget Feature */}
      {/* <Flex pt={10}>
        <Flex direction="column">
          <Text as="b" fontSize="l">
            Monthly Budget
          </Text>
          <Text as="i" fontSize="3xl">
            $150 / $2200
          </Text>
        </Flex>
      </Flex> */}
      <Flex pt={10}>
        <Flex direction="column">
          <Text as="b" fontSize="xl">
            {RECENT_EXPENSES}
          </Text>
          {expenses.length == 0 ? (
            <Text pt={6}>{RECENT_EXPENSES_DEFAULT}</Text>
          ) : (
            <Flex>
              <Button
                onClick={scrollLeft}
                mt={20}
                disabled={currentIndex === 0}
              >
                <ChevronLeftIcon />
              </Button>
              <Flex overflowX="auto" p={4} gap="20px" flex="1">
                {displayedExpenses.map((expense) => (
                  <ExpenseCard key={expense.id} expense={expense} />
                ))}
              </Flex>
              <Button
                onClick={scrollRight}
                mt={20}
                disabled={currentIndex >= expenses.length - ITEMS_PER_PAGE}
              >
                <ChevronRightIcon />
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex pt={10} pb={10}>
        <Flex direction="column">
          <Text as="b" fontSize="xl">
            {SPENDING_GRAPHS}
          </Text>
          {expenses.length == 0 ? (
            <Text pt={6}>{SPENDING_GRAPHS_DEFAULT}</Text>
          ) : (
            <Flex direction="column">
              <Flex direction="column">
                <Text as="b" fontSize="l" mt="10">
                  {SPENDING_OVERVIEW}
                </Text>
                <ExpensesLineChart graphData={monthGraphData} />
              </Flex>
              <Flex direction="column" ml="10">
                <Text as="b" fontSize="l" mt="10">
                  {SPENDING_ANNUAL}
                </Text>
                <ExpensesLineChart graphData={yearGraphData} />
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
