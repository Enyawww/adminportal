'use client';

import React from 'react';
import { feedbackData, Feedback } from './Grid'; // Adjust the path based on your folder structure

export const Analysis: React.FC = () => {
  if (!feedbackData) {
    return <p>No feedback data available.</p>; // Fallback if data is undefined
  }

  // Analyze Feedback Data
  const totalFeedback = feedbackData.length;

  const sentimentCounts = feedbackData.reduce(
    (acc, feedback) => {
      acc[feedback.sentiment] += 1;
      return acc;
    },
    { Positive: 0, Neutral: 0, Negative: 0 }
  );

  const averageRating =
    feedbackData.reduce((acc, feedback) => acc + feedback.rating, 0) / totalFeedback;

  const topPositiveFeedback = feedbackData
    .filter((feedback) => feedback.sentiment === 'Positive')
    .sort((a, b) => b.rating - a.rating)[0];

  const topNegativeFeedback = feedbackData
    .filter((feedback) => feedback.sentiment === 'Negative')
    .sort((a, b) => a.rating - b.rating)[0];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Feedback Analysis</h1>

      {/* Overall Statistics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h2 className="text-xl pb-4 text-blue-700">Total Feedback</h2>
          <p className="text-5xl font-bold text-blue-800">{totalFeedback}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-xl pb-4 text-green-700">Positive Feedback</h2>
          <p className="text-5xl font-bold text-green-800">{sentimentCounts.Positive}</p>
        </div>
        <div className="bg-orange-100 p-6 rounded-lg shadow">
          <h2 className="text-xl pb-4 text-orange-700">Neutral Feedback</h2>
          <p className="text-5xl font-bold text-orange-800">{sentimentCounts.Neutral}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow">
          <h2 className="text-xl pb-4 text-red-700">Negative Feedback</h2>
          <p className="text-5xl font-bold text-red-800">{sentimentCounts.Negative}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow">
          <h2 className="text-xl pb-4 text-purple-700">Average Rating</h2>
          <p className="text-5xl font-bold text-purple-800">{averageRating.toFixed(2)} / 5</p>
        </div>
      </div>

      {/* Detailed Feedback Highlights */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Top Positive Feedback */}
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-green-700 mb-3">Top Positive Feedback</h2>
          {topPositiveFeedback ? (
            <div>
              <p><strong>User:</strong> {topPositiveFeedback.user}</p>
              <p><strong>Comment:</strong> "{topPositiveFeedback.comment}"</p>
              <p><strong>Rating:</strong> {topPositiveFeedback.rating}⭐</p>
              <p><strong>Date:</strong> {topPositiveFeedback.timestamp}</p>
            </div>
          ) : (
            <p className="text-gray-600">No positive feedback available.</p>
          )}
        </div>

        {/* Top Negative Feedback */}
        <div className="bg-red-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-red-700 mb-3">Top Negative Feedback</h2>
          {topNegativeFeedback ? (
            <div>
              <p><strong>User:</strong> {topNegativeFeedback.user}</p>
              <p><strong>Comment:</strong> "{topNegativeFeedback.comment}"</p>
              <p><strong>Rating:</strong> {topNegativeFeedback.rating}⭐</p>
              <p><strong>Date:</strong> {topNegativeFeedback.timestamp}</p>
            </div>
          ) : (
            <p className="text-gray-600">No negative feedback available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
