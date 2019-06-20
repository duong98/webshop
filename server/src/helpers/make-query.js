import { db } from "db";

export default async function makeQuery(query, args) {
  const response = await db.query(query, args);
  return response.rows;
}
