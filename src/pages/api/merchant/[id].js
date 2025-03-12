import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'DELETE') {
    try {
      console.log(`Attempting to delete merchant with ID: ${id}`);
      const deleteQuery = 'DELETE FROM "Merchant" WHERE "Merchant_ID" = $1';
      const result = await pool.query(deleteQuery, [id]);

      if (result.rowCount === 0) {
        console.log(`Merchant with ID ${id} not found`);
        res.status(404).json({ error: 'Merchant not found' });
      } else {
        console.log(`Merchant with ID ${id} deleted successfully`);
        res.status(200).json({ message: 'Merchant deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting merchant:', error);
      res.status(500).json({ error: 'Failed to delete merchant', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
