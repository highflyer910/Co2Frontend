// LandingPage.tsx
import React, { useState } from "react";
import TelegramLoginButton from "../elements/TelegramLoginButton";
import Header from "../components/Header";

const LandingPage: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <img
        src={`/background.webp`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      <Header />

      {/* Main content */}
      <main
        className="relative flex flex-col items-center justify-center py-16 md:pt-0 pt-0"
        role="main"
      >
        <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          <h1 className="font-poppins text-3xl font-bold text-center">
            Welcome to GoGreen
          </h1>
        </div>

        <div className="flex flex-col items-center mt-8">
          <div className="relative flex items-center">
            <img
              src="/tree.png"
              alt="Tree"
              className="w-32 h-32 md:w-48 md:h-48"
            />
            <div className="-ml-2 md:-ml-4 w-48 md:w-64">
              <div className="relative flex justify-center items-center border-4 rounded-lg border-green-700 p-2 shadow-lg">
                <p className="font-body text-lg md:text-xl text-shadow text-bold text-green-900 text-center">
                  Start making a difference today!
                </p>
                <div className="absolute top-1/4 -left-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-green-700"></div>
              </div>
            </div>
          </div>
          <TelegramLoginButton />
          <img src="/how.png" alt="How" className="w-44 h-32 md:w-60 md:h-40 mt-4" />
          <button
            onClick={toggleVideo}
            className="mt-1 bg-green-700 hover:bg-green-800 text-yellow-200 font-bold py-2 px-4 rounded-lg"
          >
            How GoGreen works
          </button>
        </div>
      </main>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-yellow-200 p-4 rounded-lg shadow-lg w-full max-w-xl h-[80vh] flex flex-col">
            <div className="flex-grow overflow-hidden rounded-lg">
              <video className="w-full h-full object-cover" controls autoPlay>
                <source src="/info.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <button
              onClick={toggleVideo}
              className="mt-4 bg-green-700 hover:bg-green-800 text-yellow-200 font-bold py-2 px-4 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
