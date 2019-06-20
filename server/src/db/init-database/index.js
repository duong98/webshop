import { db } from "db";

import CreateTableQuery from "db/init-database/CreateTableQuery";
import InsertDataQuery from "db/init-database/InsertDataQuery";

export default async function initDB() {
  try {
    await db.query(CreateTableQuery);
    await db.query(InsertDataQuery);
    console.log("✌️ create init DataBase SUCCESS!");
  } catch (error) {
    throw new Error(error);
  }
}
