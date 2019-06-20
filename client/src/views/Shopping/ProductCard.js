import React from "react";
import swal from "sweetalert";
import { Paper, Button } from "@material-ui/core";

import * as phoppingServices from "services/phopping.services";

function getOrderDate() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
}

export default function ProductCard({ ...product }) {
  async function onBuy() {
    const userID = localStorage.getItem("user_id");

    const quantity = await swal({
      title: "How many do you want to BUY ? ",
      content: {
        element: "input",
        attributes: {
          type: "number"
        }
      },
      buttons: true
    });
    const { product_id, price } = product;
    const submit = {
      quantity,
      customer_id: userID,
      product_id,
      orderdate: getOrderDate(),
      total_cost: quantity * price * 1.05
    };

    const success = await phoppingServices.buy(submit);

    if (success) {
      swal({ title: "BUY SUCCESS", icon: "success" });
      return;
    }
    swal({ title: "BUY FAIL", icon: "error" });
  }

  return (
    <Paper className="flex flex-col px-8 pb-4 mb-8" style={{ width: 350 }}>
      <div className="flex my-6 items-center">
        <img
          alt="Product"
          src={product.imageurl}
          style={{ height: 150, width: 150 }}
          className="mr-8"
        />
        <div className="block">
          <div className="text-xl font-medium max-w-100">{product.title}</div>
          <div className="text-small">price: ${product.price}</div>
        </div>
      </div>
      <Button variant="outlined" color="primary" fullWidth onClick={onBuy}>
        Buy
      </Button>
    </Paper>
  );
}
