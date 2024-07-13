import React from "react";
import Header from "../components/Header";

const DonationSuccess: React.FC = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen">
        <img
        src={`/background.webp`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
        />
      <Header />
      <main className="relative flex flex-col items-center justify-center py-16 md:pt-0 pt-0">
      <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          <h1 className="font-poppins text-3xl font-bold text-center w-full">
            GoGreen Donations
          </h1>
        </div>
        <div className="relative flex items-center justify-between w-full max-w-xl">
        <div className="relative flex items-center">
            <img
              src="/tree.png"
              alt="Tree"
              className="w-32 h-32 md:w-48 md:h-48"
            />
            <div className="-ml-2 md:-ml-4 w-48 md:w-64">
              <div className="relative flex justify-center items-center border-4 rounded-lg border-green-700 p-2 shadow-lg">
                <p className="font-body text-lg md:text-xl text-shadow text-bold text-green-900 text-center">
                  Donation successfully made!
                </p>
                <div className="absolute top-1/4 -left-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-green-700"></div>
              </div>
            </div>
          </div>
          <button
              onClick={toggleVideo}
              className="text-3xl font-bold text-green-700 focus:outline-none absolute top-0 right-4 md:right-24"
            >
              •••
            </button>
            </div>
        
      </main>
    </div>
  );
};

export default DonationSuccess;
