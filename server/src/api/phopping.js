import express from "express";
import makeExpressCallback from "helpers/make-express-callback";
import makeQuery from "helpers/make-query";

const router = express.Router();

async function buyContoller({ body }) {
  const { orderdate, customer_id, product_id, quantity, total_cost } = body;
  const query = `
    insert into orders 
    (orderdate, customer_id, product_id, quantity, total_cost) values ($1, $2, $3, $4, $5)
  `;
  const args = [orderdate, customer_id, product_id, quantity, total_cost];
  console.log(args);
  await makeQuery(query, args);

  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true }
  };
}

router.post("/phopping/buy", makeExpressCallback(buyContoller));

export default router;
