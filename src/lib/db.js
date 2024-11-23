// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // replace with your username
  host: '103.18.244.31', // replace with your host
  database: 'SAC_DB', // replace with your database name
  password: 'SACAPU@2024', // replace with your password
  port: 5454, // PostgreSQL port
});

export default pool;




