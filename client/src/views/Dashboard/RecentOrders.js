import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { CircularProgress } from "@material-ui/core";
import * as orderServices from "services/order.services";

export default function RecentOrders() {
  const [orders, loading] = useData();

  function getColumns() {
    return [
      { label: "DATE", name: "orderdate" },
      { label: "NAME", name: "fullname" },
      { label: "PRODUCTS", name: "title" },
      { label: "QUANTITY", name: "quantity" },
      { label: "TOTAL COST", name: "total_cost" }
    ];
  }

  function getOptions() {
    return {
      download: false,
      print: false,
      pagination: false,
      search: false,
      sort: false,
      filter: false,
      selectableRows: "none"
    };
  }

  return (
    <div className="mt-8">
      {loading && (
        <div className="w-full text-center p-6">
          <CircularProgress />
        </div>
      )}
      <MUIDataTable
        title="RECENT ORDERS"
        columns={getColumns()}
        data={orders}
        options={getOptions()}
      />
    </div>
  );
}

function useData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchUsers() {
      setLoading(true);
      const response = await orderServices.getAll();
      if (mounted) {
        const orders = response.map(order => ({
          ...order,
          orderdate: getOrderDate(order.orderdate)
        }));
        setData(orders);
        setLoading(false);
        console.log(orders, "orders");
      }
    }
    fetchUsers();

    return () => (mounted = false);
  }, []);

  return [data, loading];
}

function getOrderDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}
