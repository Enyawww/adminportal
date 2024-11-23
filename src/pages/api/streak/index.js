import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch data from Merchant table
      const result = await pool.query('SELECT * FROM "Streak_DB"');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching Merchant:', error);
      res.status(500).json({ error: 'Failed to fetch streak' });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
