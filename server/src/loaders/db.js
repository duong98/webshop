import { db } from "db";

export default async function dbLoader() {
  await db.connect();
}
