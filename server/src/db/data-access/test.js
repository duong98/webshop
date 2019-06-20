import { Pool } from "pg";

const pool = new Pool();

export async function testQuery() {
  try {
    const response = await pool.query("SELECT $1::text as message", [
      "Hello world!"
    ]);
    return response;
  } catch (error) {
    console.error(error);
  }
}
