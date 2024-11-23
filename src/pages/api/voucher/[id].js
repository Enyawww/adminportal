// pages/api/voucher/[id].js
import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'DELETE') {
    try {
      console.log(`Attempting to delete voucher with ID: ${id}`);
      const deleteQuery = 'DELETE FROM "Voucher" WHERE "Voucher_ID" = $1';
      const result = await pool.query(deleteQuery, [id]);

      if (result.rowCount === 0) {
        console.log(`Voucher with ID ${id} not found`);
        res.status(404).json({ error: 'Voucher not found' });
      } else {
        console.log(`Voucher with ID ${id} deleted successfully`);
        res.status(200).json({ message: 'Voucher deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting voucher:', error);
      res.status(500).json({ error: 'Failed to delete voucher' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
