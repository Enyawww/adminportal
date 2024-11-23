"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the shape of the promotion state
interface Promotion {
  name: string;
  description: string;
  tnc: string;
  startDate: string;
  endDate: string;
  image: File | null;
  video: File | null;
}

export const Grid: React.FC = () => {
  const [promotion, setPromotion] = useState<Promotion>({
    name: "",
    description: "",
    tnc: "",
    startDate: "",
    endDate: "",
    image: null,
    video: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files ? e.target.files[0] : null;
    setPromotion((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Promotion Data:", promotion);
    // Add logic for handling form submission (e.g., API calls)
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Manage Advertisement
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Promotion Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Promotion Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={promotion.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter promotion name"
              required
            />
          </div>

          {/* Promotion Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Promotion Description
            </label>
            <textarea
              id="description"
              name="description"
              value={promotion.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter promotion description"
              rows={4}
              required
            />
          </div>

          {/* Promotion Terms & Conditions */}
          <div>
            <label htmlFor="tnc" className="block text-sm font-medium text-gray-700">
              Terms & Conditions
            </label>
            <textarea
              id="tnc"
              name="tnc"
              value={promotion.tnc}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter terms and conditions"
              rows={4}
              required
            />
          </div>

          {/* Promotion Start Date & End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={promotion.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={promotion.endDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Upload Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>

          {/* Upload Video */}
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700">
              Upload Video
            </label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Promotion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
