import dotenv from "dotenv";
import pg from "pg-promise";
import { Pool } from "pg";
import { polulateDB } from "./populateDB";

dotenv.config();


const connectionString = process.env.DATABASE_URL;

const createTables = () => {
	const pool = new Pool({ connectionString });
	pool.connect();

	const query =
        `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS incidents CASCADE;


        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            othername TEXT,
            email TEXT UNIQUE NOT NULL,
            profileImage TEXT,
            password TEXT NOT NULL,
            phoneNumber TEXT UNIQUE NOT NULL,
            isAdmin BOOLEAN,
            registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

        CREATE TABLE IF NOT EXISTS incidents(
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            comment TEXT NOT NULL,
            type TEXT NOT NULL,
            location TEXT NOT NULL,
            status TEXT NOT NULL,
            images TEXT,
            videos TEXT,
            createdBy INT REFERENCES users(id),
            createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;

	pool.query(query)
		.then(() => pool.end())
		.catch(() => pool.end());
};


createTables();

const pgp = pg();
export const db = pgp(connectionString);

console.log("Database Connected");

polulateDB();



