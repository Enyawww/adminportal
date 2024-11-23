// pages/api/connectivity.js
import pool from "../../../lib/db";

export default async function handler(req, res) {
  try {
    // Test the database connection by querying the current timestamp
    const result = await pool.query("SELECT NOW() AS current_time");

    // If successful, send the result back to the client
    res.status(200).json({
      message: "Database connected successfully",
      data: result.rows[0],
    });
  } catch (error) {
    // Handle any connection errors
    console.error("Error connecting to the database:", error.message);
    res.status(500).json({
      message: "Failed to connect to the database",
      error: error.message,
    });
  }
}
