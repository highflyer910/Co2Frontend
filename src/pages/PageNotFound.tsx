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
      <div className="relative flex items-center justify-center w-full max-w-xl mt-8">
          <div className="relative flex items-center">
            <img
              src="/fail.png"
              alt="Tree"
              className="w-32 h-32 md:w-48 md:h-48"
            />
            <div className="-ml-2 md:-ml-4 w-48 md:w-64">
              <div className="relative flex justify-center items-center border-4 rounded-lg border-green-700 p-2 shadow-lg bg-yellow-200">
                <p className="font-body text-lg md:text-xl text-shadow text-bold text-green-900 text-center">
                  Ops! Page not found!
                </p>
                <div className="absolute top-1/4 -left-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-green-700"></div>
              </div>
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
