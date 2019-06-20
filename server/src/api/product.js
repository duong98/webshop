import express from "express";
import makeExpressCallback from "helpers/make-express-callback";
import makeQuery from "helpers/make-query";

const router = express.Router();

async function getAllProductController() {
  const products = await makeQuery(
    "select * from products natural join categories natural join inventory"
  );
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true, data: products }
  };
}

async function getBestSellerController() {
  const products = await makeQuery(
    `
    with product_3_months as
    (select product_id, sum(quantity) as sum_products
    from orders
    where (current_date - orderdate) <= 90
    group by(product_id))
    select * from products
    where product_id in (select product_id from product_3_months 
               where sum_products = (select max(sum_products) from product_3_months));
    `
  );
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true, data: products[0] }
  };
}

async function getProductByIdController({ params }) {
  const productID = params.id;

  const products = await makeQuery(
    `select * from products natural join categories natural join inventory
      where products.product_id = $1
    `,
    [productID]
  );
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true, data: products[0] }
  };
}

async function addProductContoller({ body }) {
  const { category, title, price, imageurl, quanity } = body;
  const insertproductsQuery = `
    insert into products 
    (category, title, price, imageurl) values ($1, $2, $3, $4)
    RETURNING product_id;
  `;
  const insertproductsArgs = [category, title, price, imageurl];
  const product = await makeQuery(insertproductsQuery, insertproductsArgs);

  const insertInventoryQuery = `
    INSERT INTO inventory
    (product_id, available, sales) VALUES ($1, $2, $3);
  `;
  const insertInventoryArgs = [product[0].product_id, quanity, 0];
  await makeQuery(insertInventoryQuery, insertInventoryArgs);

  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true }
  };
}

async function updateProductContoller({ body }) {
  const { category, title, price, imageurl, product_id } = body;
  const query = `
    UPDATE public.products
	  SET category=$1, title=$2, price=$3, imageurl=$4
	  WHERE product_id=$5;
  `;
  const args = [category, title, price, imageurl, product_id];
  await makeQuery(query, args);
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true }
  };
}

async function deleteProductContoller({ body }) {
  const { deleteIDs } = body;
  const query = `
    delete from inventory
    where product_id in (${deleteIDs.join(",")});

    delete from products
    where product_id in (${deleteIDs.join(",")});
  `;
  await makeQuery(query);
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true }
  };
}

router.get("/products", makeExpressCallback(getAllProductController));
router.get("/product/bestSeller", makeExpressCallback(getBestSellerController));
router.get("/product/:id", makeExpressCallback(getProductByIdController));
router.post("/product/add", makeExpressCallback(addProductContoller));
router.post("/product/update", makeExpressCallback(updateProductContoller));
router.post("/product/delete", makeExpressCallback(deleteProductContoller));

export default router;
