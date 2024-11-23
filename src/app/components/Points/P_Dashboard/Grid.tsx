"use client"
import React, { useState, useEffect } from 'react';

export const Grid = () => {
  // Example invoices data
  const [invoices, setInvoices] = useState([
    { id: 'INV001', amount: 100 },
    { id: 'INV002', amount: 200, promotionMultiplier: 2 }, // Example with promotion
    { id: 'INV003', amount: 300 },
  ]);

  // State to track points for each invoice
  const [invoicePoints, setInvoicePoints] = useState<{ [key: string]: number }>({});

  // Helper to calculate points per invoice
  const calculatePoints = (amount: number, multiplier: number) => {
    return amount * multiplier; // Formula for calculating points
  };

  // Update points whenever invoices change
  useEffect(() => {
    const newPoints = invoices.reduce((acc, invoice) => {
      const multiplier = invoice.promotionMultiplier || 1; // Default multiplier
      acc[invoice.id] = calculatePoints(invoice.amount, multiplier);
      return acc;
    }, {} as { [key: string]: number });

    setInvoicePoints(newPoints);
  }, [invoices]);

  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      {invoices.map((invoice) => {
        const multiplier = invoice.promotionMultiplier || 1;
        const points = invoicePoints[invoice.id] || 0;

        return (
          <div
            key={invoice.id}
            className="col-span-12 md:col-span-4 border rounded-lg p-4 shadow-sm bg-white"
          >
            <h3 className="font-bold text-lg">Invoice ID: {invoice.id}</h3>
            <p>Amount: ${invoice.amount.toFixed(2)}</p>
            <p>Promotion Multiplier: x{multiplier}</p>
            <p className="font-semibold">Points Gained: {points}</p>
          </div>
        );
      })}
    </div>
  );
};
