import express from "express";
import makeExpressCallback from "helpers/make-express-callback";
import makeQuery from "helpers/make-query";

const router = express.Router();

async function getAllOrderController() {
  const orders = await makeQuery(`
    select * from orders, users, products 
    where orders.customer_id = users.user_id and products.product_id = orders.product_id
    order by orderdate desc
    limit 5;
  `);
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true, data: orders }
  };
}

router.get("/orders", makeExpressCallback(getAllOrderController));

export default router;
