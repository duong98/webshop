import { Pool } from "pg";
import makeUsersBD from "db/data-access/user";

const pool = new Pool();

export const usersBD = makeUsersBD({ db: pool });
