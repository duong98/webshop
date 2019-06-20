import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Paper } from "@material-ui/core";

const data = [
  {
    name: "1",
    amountSales: 10,
    income: 240
  },
  {
    name: "5",
    amountSales: 32,
    income: 400
  },
  {
    name: "10",
    amountSales: 54,
    income: 650
  },
  {
    name: "15",
    amountSales: 72,
    income: 850
  },
  {
    name: "20",
    amountSales: 130,
    income: 920
  },
  {
    name: "25",
    amountSales: 230,
    income: 1100
  },
  {
    name: "30",
    amountSales: 349,
    income: 1300
  }
];

export default function Chart() {
  function getChartProps() {
    return {
      width: 850,
      height: 300,
      data,
      margin: {
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }
    };
  }

  return (
    <Paper className="pt-4" style={{ maxWidth: 900 }}>
      <div className="font-medium mx-2 mb-4 text-xl">Monthly Statistic</div>

      <LineChart {...getChartProps()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="amountSales" stroke="#82ca9d" />
      </LineChart>
    </Paper>
  );
}
