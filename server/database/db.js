import dotenv from "dotenv";
import pg from "pg-promise";
import { Pool } from "pg";
import { dropDB, createTables, addAdmin, createIncidentRecord } from "./models";

dotenv.config();

const connectionString = process.env.DATABASE_URL;


const runQuery = () => {

  const pool = new Pool({ connectionString });
  pool.connect();


  let query = `${createTables} ${addAdmin} ${createIncidentRecord}`;

  if (process.env.NODE_ENV === "dev") {
    query = `${dropDB} ${createTables} ${addAdmin} ${createIncidentRecord}`;
  }

  pool.query(query)
    .then(() => pool.end())
    .catch(() => pool.end());
};


runQuery();

const pgp = pg();
export const db = pgp(connectionString);



