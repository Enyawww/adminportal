import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,        // Use environment variable for username
  host: process.env.DB_HOST,        // Use environment variable for host
  database: process.env.DB_NAME,    // Use environment variable for database name
  password: process.env.DB_PASSWORD, // Use environment variable for password
  port: process.env.DB_PORT,        // Use environment variable for port
});

export default pool;
