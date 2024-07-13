import React from "react";
import Header from "../components/Header";

const DonationError: React.FC = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold text-red-700">Donation Failed</h1>
        <p className="mt-4 text-xl text-red-700">There was an error processing your donation. Please try again.</p>
      </main>
    </div>
  );
};

export default DonationError;
