// pages/api/login.js
import pool from "../../../lib/db"; // PostgreSQL connection

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { username, password } = req.body;

  // Ensure both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Both username and password are required" });
  }

  try {
    // Query to find user by email (Admin_Email)
    const result = await pool.query(
      'SELECT * FROM "Admin_Portal_Account" WHERE "Admin_Email" = $1',
      [username]
    );

    // Log the result to debug
    console.log("Query result:", result);

    const user = result.rows[0];

    // If user is not found
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid username or password" });
    }

    // Simple password comparison (not secure, use hashing in production)
    if (user.Admin_Password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid username or password" });
    }

    // Check if the account is active
    if (user.Status !== "Active") {
      return res
        .status(403)
        .json({ message: "Account is inactive. Please contact support." });
    }

    // Login successful
    console.log("Login successful for user:", user.Admin_Email);
    return res
      .status(200)
      .json({ message: "Login successful", userId: user.Admin_Email });

  } catch (err) {
    // Log the error for better debugging
    console.error("Database error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
}

