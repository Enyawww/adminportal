'use client';

import React, { useState } from 'react';

export interface Feedback {
  id: number;
  user: string;
  comment: string;
  rating: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  timestamp: string;
}

export const feedbackData: Feedback[] = [
  { id: 1, user: 'Alice', comment: 'Fantastic app, very user-friendly!', rating: 5, sentiment: 'Positive', timestamp: '2024-11-18' },
  { id: 2, user: 'Bob', comment: 'It works well, but some features are confusing.', rating: 4, sentiment: 'Neutral', timestamp: '2024-11-17' },
  { id: 3, user: 'Carol', comment: 'Keeps crashing when I try to upload a file.', rating: 1, sentiment: 'Negative', timestamp: '2024-11-16' },
  { id: 4, user: 'Dave', comment: 'Love the clean UI and fast performance!', rating: 5, sentiment: 'Positive', timestamp: '2024-11-15' },
  { id: 5, user: 'Eve', comment: 'Needs better offline support.', rating: 3, sentiment: 'Neutral', timestamp: '2024-11-14' },
  { id: 6, user: 'Frank', comment: 'Terrible experience, nothing works as expected.', rating: 1, sentiment: 'Negative', timestamp: '2024-11-13' },
  { id: 7, user: 'Grace', comment: 'Amazing app, helped me organize my tasks.', rating: 5, sentiment: 'Positive', timestamp: '2024-11-12' },
  { id: 8, user: 'Hank', comment: 'Good features, but drains battery quickly.', rating: 3, sentiment: 'Neutral', timestamp: '2024-11-11' },
  { id: 9, user: 'Ivy', comment: 'The latest update fixed many bugs, thanks!', rating: 4, sentiment: 'Positive', timestamp: '2024-11-10' },
  { id: 10, user: 'Jack', comment: 'Unable to log in despite multiple attempts.', rating: 2, sentiment: 'Negative', timestamp: '2024-11-09' },
  { id: 11, user: 'Kathy', comment: 'Super intuitive and reliable!', rating: 5, sentiment: 'Positive', timestamp: '2024-11-08' },
  { id: 12, user: 'Leo', comment: 'Could use more tutorials for beginners.', rating: 3, sentiment: 'Neutral', timestamp: '2024-11-07' },
  { id: 13, user: 'Mona', comment: 'Poor design choices, not appealing.', rating: 2, sentiment: 'Negative', timestamp: '2024-11-06' },
  { id: 14, user: 'Nick', comment: 'Great app! Highly recommend.', rating: 5, sentiment: 'Positive', timestamp: '2024-11-05' },
  { id: 15, user: 'Olive', comment: 'Some features are great, others not so much.', rating: 3, sentiment: 'Neutral', timestamp: '2024-11-04' },
  { id: 16, user: 'Paul', comment: 'Worst app ever. So many bugs.', rating: 1, sentiment: 'Negative', timestamp: '2024-11-03' },
  { id: 17, user: 'Quinn', comment: 'App runs smoothly and looks amazing.', rating: 5, sentiment: 'Positive', timestamp: '2024-11-02' },
  { id: 18, user: 'Rita', comment: 'The notifications are annoying.', rating: 2, sentiment: 'Negative', timestamp: '2024-11-01' },
  { id: 19, user: 'Steve', comment: 'Decent app, but could use more features.', rating: 4, sentiment: 'Neutral', timestamp: '2024-10-31' },
  { id: 20, user: 'Tina', comment: 'Fantastic! Best app I’ve used this year.', rating: 5, sentiment: 'Positive', timestamp: '2024-10-30' },
  { id: 21, user: 'Uma', comment: 'Fast and responsive, but lacks dark mode.', rating: 4, sentiment: 'Neutral', timestamp: '2024-10-29' },
  { id: 22, user: 'Victor', comment: 'The support team was very helpful!', rating: 5, sentiment: 'Positive', timestamp: '2024-10-28' },
  { id: 23, user: 'Wendy', comment: 'Too many ads, it’s distracting.', rating: 2, sentiment: 'Negative', timestamp: '2024-10-27' },
  { id: 24, user: 'Xander', comment: 'Crashes randomly, very frustrating.', rating: 1, sentiment: 'Negative', timestamp: '2024-10-26' },
  { id: 25, user: 'Yara', comment: 'Love the simplicity and ease of use.', rating: 5, sentiment: 'Positive', timestamp: '2024-10-25' },
  { id: 26, user: 'Zane', comment: 'Feature-rich but sometimes slow.', rating: 3, sentiment: 'Neutral', timestamp: '2024-10-24' },
  { id: 27, user: 'Anna', comment: 'Great app for beginners.', rating: 4, sentiment: 'Positive', timestamp: '2024-10-23' },
  { id: 28, user: 'Brian', comment: 'Needs more customization options.', rating: 3, sentiment: 'Neutral', timestamp: '2024-10-22' },
  { id: 29, user: 'Clara', comment: 'Terrible UX design, very cluttered.', rating: 1, sentiment: 'Negative', timestamp: '2024-10-21' },
  { id: 30, user: 'David', comment: 'The latest update made it worse.', rating: 2, sentiment: 'Negative', timestamp: '2024-10-20' },
  { id: 31, user: 'Eva', comment: 'Highly recommend, best app ever!', rating: 5, sentiment: 'Positive', timestamp: '2024-10-19' },
  { id: 32, user: 'Frankie', comment: 'Functional, but nothing special.', rating: 3, sentiment: 'Neutral', timestamp: '2024-10-18' },
  { id: 33, user: 'Georgia', comment: 'The color scheme is too bright.', rating: 2, sentiment: 'Negative', timestamp: '2024-10-17' },
  { id: 34, user: 'Henry', comment: 'Good app, but pricey subscription.', rating: 4, sentiment: 'Neutral', timestamp: '2024-10-16' },
  { id: 35, user: 'Isla', comment: 'Exceeded my expectations, fantastic app!', rating: 5, sentiment: 'Positive', timestamp: '2024-10-15' },
  { id: 36, user: 'Jacob', comment: 'Performance issues on older devices.', rating: 3, sentiment: 'Neutral', timestamp: '2024-10-14' },
  { id: 37, user: 'Kylie', comment: 'Terrible update, it broke everything!', rating: 1, sentiment: 'Negative', timestamp: '2024-10-13' },
  { id: 38, user: 'Liam', comment: 'Reliable and consistent experience.', rating: 5, sentiment: 'Positive', timestamp: '2024-10-12' },
  { id: 39, user: 'Maya', comment: 'Could use more language options.', rating: 3, sentiment: 'Neutral', timestamp: '2024-10-11' },
  { id: 40, user: 'Nathan', comment: 'Extremely helpful for my daily routine.', rating: 5, sentiment: 'Positive', timestamp: '2024-10-10' },
  { id: 41, user: 'Olivia', comment: 'Pop-ups make it unusable.', rating: 1, sentiment: 'Negative', timestamp: '2024-10-09' },
  { id: 42, user: 'Peter', comment: 'Decent app, but room for improvement.', rating: 4, sentiment: 'Neutral', timestamp: '2024-10-08' },
  { id: 43, user: 'Quincy', comment: 'The app keeps logging me out.', rating: 2, sentiment: 'Negative', timestamp: '2024-10-07' },
  { id: 44, user: 'Rachel', comment: 'Amazing features and great support.', rating: 5, sentiment: 'Positive', timestamp: '2024-10-06' },
  { id: 45, user: 'Sam', comment: 'Not intuitive, took me forever to set up.', rating: 2, sentiment: 'Negative', timestamp: '2024-10-05' },
  { id: 46, user: 'Tessa', comment: 'Simple yet effective, I love it.', rating: 5, sentiment: 'Positive', timestamp: '2024-10-04' },
  { id: 47, user: 'Umar', comment: 'The tutorial videos are very helpful.', rating: 4, sentiment: 'Positive', timestamp: '2024-10-03' },
  { id: 48, user: 'Victoria', comment: 'Boring interface, not engaging.', rating: 2, sentiment: 'Negative', timestamp: '2024-10-02' },
  { id: 49, user: 'Walter', comment: 'Highly functional, meets all my needs.', rating: 5, sentiment: 'Positive', timestamp: '2024-10-01' },
  { id: 50, user: 'Xia', comment: 'The app freezes on my device.', rating: 1, sentiment: 'Negative', timestamp: '2024-09-30' },
];


export const Grid: React.FC = () => {
  const [sortBy, setSortBy] = useState<'all' | 'rating' | 'date' | 'positive' | 'neutral' | 'negative'>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Sorting function
  const sortFeedback = (): Feedback[] => {
    let sortedData = [...feedbackData];

    if (sortBy === 'rating') {
      sortedData.sort((a, b) => b.rating - a.rating); // Highest rating first
    } else if (sortBy === 'date') {
      if (startDate && endDate) {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        sortedData = sortedData.filter((feedback) => {
          const feedbackDate = new Date(feedback.timestamp).getTime();
          return feedbackDate >= start && feedbackDate <= end;
        });
      } else {
        sortedData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Latest first
      }
    } else if (sortBy === 'positive') {
      sortedData = sortedData.filter((feedback) => feedback.sentiment === 'Positive');
    } else if (sortBy === 'neutral') {
      sortedData = sortedData.filter((feedback) => feedback.sentiment === 'Neutral');
    } else if (sortBy === 'negative') {
      sortedData = sortedData.filter((feedback) => feedback.sentiment === 'Negative');
    }

    return sortedData;
  };

  const sortedFeedback = sortFeedback();

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Feedbacks</h1>

      {/* Sort Controls */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Show All</option>
          <option value="rating">Sort by Rating</option>
          <option value="date">Sort by Date</option>
          <option value="positive">Filter Positive</option>
          <option value="neutral">Filter Neutral</option>
          <option value="negative">Filter Negative</option>
        </select>

        {/* Date Range Picker */}
        {sortBy === 'date' && (
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Feedback List */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedFeedback.map((feedback) => (
          <div
            key={feedback.id}
            className={`p-4 rounded-lg shadow-md transition ${
              feedback.sentiment === 'Positive'
                ? 'bg-green-100'
                : feedback.sentiment === 'Neutral'
                ? 'bg-yellow-100'
                : 'bg-red-100'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{feedback.user}</span>
              <span
                className={`px-2 py-1 text-xs font-bold rounded ${
                  feedback.sentiment === 'Positive'
                    ? 'text-green-800 bg-green-200'
                    : feedback.sentiment === 'Neutral'
                    ? 'text-yellow-800 bg-yellow-200'
                    : 'text-red-800 bg-red-200'
                }`}
              >
                {feedback.sentiment}
              </span>
            </div>
            <p className="text-sm text-gray-800 mb-2">"{feedback.comment}"</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Rating: {feedback.rating}⭐</span>
              <span>{feedback.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
