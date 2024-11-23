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
      res.status(500).json({ error: 'Failed to delete voucher', details: error.message });
    }
  } else if (method === 'PUT') {
    try {
      console.log(`Attempting to update voucher with ID: ${id}`);
      const {
        Voucher_Name,
        Promo_Code,
        QR_Code,
        Description,
        Total_Available,
        Terms_Conditions,
        Start_Date,
        End_Date
      } = req.body;

      const updateQuery = `
        UPDATE "Voucher"
        SET "Voucher_Name" = $1, "Promo_Code" = $2, "QR_Code" = $3, "Description" = $4, 
            "Total_Available" = $5, "Terms_Conditions" = $6, "Start_Date" = $7, "End_Date" = $8
        WHERE "Voucher_ID" = $9
        RETURNING *
      `;

      const values = [
        Voucher_Name,
        Promo_Code,
        QR_Code,
        Description,
        Total_Available,
        Terms_Conditions,
        Start_Date,
        End_Date,
        id
      ];

      const result = await pool.query(updateQuery, values);

      if (result.rowCount === 0) {
        console.log(`Voucher with ID ${id} not found`);
        res.status(404).json({ error: 'Voucher not found' });
      } else {
        console.log(`Voucher with ID ${id} updated successfully`);
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error updating voucher:', error);
      res.status(500).json({ error: 'Failed to update voucher', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
