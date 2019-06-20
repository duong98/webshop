import express from "express";

import userRoutes from "api/user";
import authRoutes from "api/auth";
import productRoutes from "api/product";
import shoppingRoutes from "api/phopping";
import orderRoutes from "api/orders";

const router = express.Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(productRoutes);
router.use(shoppingRoutes);
router.use(orderRoutes);

export default router;
