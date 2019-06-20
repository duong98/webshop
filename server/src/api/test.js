import express from "express";
import { testQuery } from "db/data-access/test";
import adaptRequest from "helpers/adapt-request";

const router = express.Router();

router.get("/postgres", async (_, res) => {
  const response = await testQuery();
  res.send(response);
});

router.get("/foo", (req, res) => {
  res.send({ msg: "okok", adaptRequest: adaptRequest(req) });
});

export default router;
