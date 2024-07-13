import React from "react";
import Header from "../components/Header";

const DonationSuccess: React.FC = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold text-green-700">Donation Successful!</h1>
        <p className="mt-4 text-xl text-green-700">Thank you for your donation.</p>
      </main>
    </div>
  );
};

export default DonationSuccess;
