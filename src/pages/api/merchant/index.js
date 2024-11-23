import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      // Fetch data from Merchant table
      const result = await pool.query('SELECT * FROM "Merchant"');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching merchants:', error);
      res.status(500).json({ error: 'Failed to fetch merchants' });
    }
  } else if (method === 'POST') {
    try {
      // Generate next available Merchant ID
      const idResult = await pool.query('SELECT MAX("Merchant_ID") FROM "Merchant"');
      const newMerchantId = (idResult.rows[0].max || 100) + 1;

      const {
        Branch,
        Branch_Address,
        Collaboration_Start_Timestamp,
        Collaboration_End_Timestamp,
        Collaboration_Status,
        Collaboration_Type,
        Person_In_Charge,
        PIC_Contact_Number,
        PIC_Email,
        Password
      } = req.body;

      const insertQuery = `
        INSERT INTO "Merchant" (
          "Merchant_ID", "Branch", "Branch_Address", 
          "Collaboration_Start_Timestamp", "Collaboration_End_Timestamp", 
          "Collaboration_Status", "Collaboration_Type", "Person_In_Charge", 
          "PIC_Contact_Number", "PIC_Email", "Password"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *
      `;

      const values = [
        newMerchantId,
        Branch,
        Branch_Address,
        Collaboration_Start_Timestamp,
        Collaboration_End_Timestamp,
        Collaboration_Status,
        Collaboration_Type,
        Person_In_Charge,
        PIC_Contact_Number,
        PIC_Email,
        Password
      ];

      const result = await pool.query(insertQuery, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding merchant:', error);
      res.status(500).json({ error: 'Failed to add merchant' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
