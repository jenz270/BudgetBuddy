import { PureComponent } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LineGraphData } from "../../interfaces/LineGraphData";

type Props = {
  graphData: LineGraphData[];
};

class ExpensesLineChart extends PureComponent<Props> {
  render() {
    const { graphData } = this.props;
    return (
      <LineChart
        width={600}
        height={400}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}

export default ExpensesLineChart;
