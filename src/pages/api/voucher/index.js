import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      // Fetch data from Voucher table
      const result = await pool.query('SELECT * FROM "Voucher" ORDER BY "Voucher_ID" ASC');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      res.status(500).json({ error: 'Failed to fetch vouchers' });
    }
  } else if (method === 'POST') {
    try {
      // Generate next available Voucher ID
      const idResult = await pool.query('SELECT MAX("Voucher_ID") FROM "Voucher"');
      const newVoucherId = (idResult.rows[0].max || 0) + 1;

      const {
        Voucher_Name,
        Merchant_Promo_Code,
        Voucher_QR_Code_Dir,
        Voucher_Start_Timestamp,
        Voucher_End_Timestamp,
        Voucher_Description,
        Voucher_Quantity,
        Voucher_Remaining,
        Voucher_Type,
        Voucher_Value,
        Voucher_Status,
        Voucher_Logo_Directory,
        Voucher_TNC
      } = req.body;

      const insertQuery = `
        INSERT INTO "Voucher" (
          "Voucher_ID", "Voucher_Name", "Merchant_Promo_Code", 
          "Voucher_QR_Code_Dir", "Voucher_Start_Timestamp", "Voucher_End_Timestamp", 
          "Voucher_Description", "Voucher_Quantity", "Voucher_Remaining", 
          "Voucher_Type", "Voucher_Value", "Voucher_Status", "Voucher_Logo_Directory", "Voucher_TNC"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
        RETURNING *
      `;

      const values = [
        newVoucherId,
        Voucher_Name,
        Merchant_Promo_Code,
        Voucher_QR_Code_Dir,
        Voucher_Start_Timestamp,
        Voucher_End_Timestamp,
        Voucher_Description,
        Voucher_Quantity,
        Voucher_Remaining,
        Voucher_Type,
        Voucher_Value,
        Voucher_Status,
        Voucher_Logo_Directory,
        Voucher_TNC
      ];

      const result = await pool.query(insertQuery, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding voucher:', error);
      res.status(500).json({ error: 'Failed to add voucher' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
