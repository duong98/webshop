import express from "express";
import initDB from "db/init-database";

const router = express.Router();

router.get("/init-db", async (_, response) => {
  try {
    initDB();
    response.send({ success: true });
  } catch (error) {
    console.log(error.stack);
    response.send({ success: false });
  }
});

export default router;
