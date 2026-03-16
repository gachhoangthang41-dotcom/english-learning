import { Pool } from 'pg';
const url = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null;
const pool = new Pool(url ? {
  user: url.username,
  password: url.password,
  host: url.hostname,
  port: parseInt(url.port, 10) || 5432,
  database: url.pathname.slice(1),
} : {});
const test = async () => {
    console.log("Password type:", typeof url?.password, "Value:", url?.password)
    try {
        const client = await pool.connect();
        console.log("Connected to PG");
        client.release();
    } catch (err) {
        console.error("PG Error:", err);
    }
}
test();
