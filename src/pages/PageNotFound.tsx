import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const PageNotFound: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src="/background.webp"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />
      
      <Header />

      <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg text-center z-10">
        <h1 className="font-poppins text-3xl font-bold">
          Welcome To GoGreen
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center mt-8">
        <div className="text-center mb-4">
          <img src="/fail.png" alt="Fail" className="w-36 h-36 mx-auto mb-4" />
          <div className="relative inline-block">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-200 border border-green-700 rounded-lg p-4 shadow-lg">
              <p className="text-xl font-bold text-green-900">Ops! Page not found!</p>
            </div>
          </div>
        </div>
        <Link 
          to="/" 
          className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        >
          Go back to Home!
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
