import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

export default pool;
