import React from "react";
import Chart from "views/Dashboard/Chart";
import BestSeller from "views/Dashboard/BestSeller";
import RecentOrders from "views/Dashboard/RecentOrders";

export default function Dashboard() {
  return (
    <div className="container p-8">
      <div className="flex justify-between flex-no-wrap">
        <Chart />
        <BestSeller />
      </div>
      <RecentOrders />
    </div>
  );
}
