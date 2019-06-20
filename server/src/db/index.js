import { Client } from "pg";

const client = new Client();

export const db = client;
