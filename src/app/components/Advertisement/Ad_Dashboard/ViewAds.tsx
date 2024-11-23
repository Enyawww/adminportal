"use client";

import React, { useEffect, useState } from "react";

// Define types for advertisements
interface Ad {
  id: number;
  name: string;
  description: string;
  tnc: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  videoUrl?: string;
}

export const ViewAds: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchAds = async () => {
      // Mock data (replace with actual API call)
      const adsMockData: Ad[] = [
        {
          id: 1,
          name: "Winter Sale",
          description: "Get up to 50% off on winter clothing!",
          tnc: "Terms and conditions apply.",
          startDate: "2024-11-01",
          endDate: "2024-12-31",
          imageUrl: "https://via.placeholder.com/150",
          videoUrl: null,
        },
        {
          id: 2,
          name: "Black Friday Special",
          description: "Exclusive deals for Black Friday!",
          tnc: "Limited time offer.",
          startDate: "2024-11-20",
          endDate: "2024-11-30",
          imageUrl: "https://via.placeholder.com/150",
          videoUrl: null,
        },
      ];
      setAds(adsMockData);
    };
    fetchAds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Current Advertisements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.length > 0 ? (
            ads.map((ad) => (
              <div
                key={ad.id}
                className="border rounded-lg p-4 shadow-md bg-gray-50"
              >
                {/* Image */}
                {ad.imageUrl && (
                  <img
                    src={ad.imageUrl}
                    alt={ad.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}

                {/* Video */}
                {ad.videoUrl && (
                  <video
                    controls
                    className="w-full h-40 rounded-md mb-4"
                    src={ad.videoUrl}
                  ></video>
                )}

                {/* Ad Details */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {ad.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{ad.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Terms:</strong> {ad.tnc}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Start Date:</strong> {ad.startDate}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>End Date:</strong> {ad.endDate}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No advertisements available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
