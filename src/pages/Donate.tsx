import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Donate: React.FC = () => {
  const { groupId, groupName } = useParams<{
    groupId: string;
    groupName: string;
  }>();
  localStorage.setItem("groupId", groupId ?? "");

  const [treeCount, setTreeCount] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  const frequency = "once";
  const callbackUrl = `${import.meta.env.VITE_APP_BASE_URL_FE}/donate/callback`;
  const callbackMethod = "api";

  const handleTreeCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTreeCount(Number(event.target.value));
  };

  const handleDonateClick = () => {
    const donationUrl = `https://donate.plant-for-the-planet.org/?units=${treeCount}&frequency=${frequency}&callback_url=${encodeURIComponent(
      callbackUrl
    )}&callback_method=${callbackMethod}`;
    window.open(donationUrl, "_self");
    navigate(-1);
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  useEffect(() => {
    console.log(`Group ID: ${groupId}, Group Name: ${groupName}`);
  }, [groupId, groupName]);

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <img
        src={`/background.webp`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />
      <Header />
      <main
        className="relative flex flex-col items-center justify-center py-16 md:pt-0 pt-0"
        role="main"
      >
        <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          <h1 className="font-poppins text-3xl font-bold text-center w-full">
            Let's GoGreen!
          </h1>
        </div>
        <div className="flex flex-col items-center mt-8 mb-12 px-4 w-full">
          <div className="relative flex items-center justify-between w-full max-w-xs">
            <div className="flex items-center mr-4">
              <img
                src="/tree.png"
                alt="Tree"
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
              <div className="-ml-2 w-40 sm:w-48">
                <div className="relative flex justify-center items-center border-4 rounded-lg border-green-700 p-2 shadow-lg bg-yellow-200">
                  <p className="font-body text-xs sm:text-sm text-shadow text-bold text-green-900 text-center">
                    Help {groupName} grow their forest! Donate!
                  </p>
                  <div className="absolute top-1/4 -left-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-green-700"></div>
                </div>
              </div>
            </div>
            <button
              onClick={toggleVideo}
              className="text-3xl font-bold text-green-700 focus:outline-none"
              style={{ marginTop: '-4rem' }}
            >
              •••
            </button>
          </div>
        </div>
        <div className="flex flex-row items-start justify-center w-full max-w-sm sm:max-w-md md:max-w-lg space-x-2">
          <div className="relative w-1/2 flex flex-col items-center">
            <h2 className="absolute -top-8 text-green-700 font-body text-sm sm:text-base md:text-lg font-bold">Choose trees quantity</h2>
            <div className="w-full border-4 rounded-3xl border-green-700 p-3 bg-yellow-200">
              <img src="/tree1.png" alt="Tree" className="w-16 h-12 sm:w-20 sm:h-16 mx-auto mb-2" />
              <div className="flex justify-center">
                <input
                  type="number"
                  id="treeCount"
                  value={treeCount}
                  onChange={handleTreeCountChange}
                  className="bg-white text-green-800 font-body py-1 px-2 rounded border-2 border-green-800 shadow-md w-16 sm:w-20 text-center"
                  min="1"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/2">
            <button
              onClick={handleDonateClick}
              className="bg-green-700 hover:bg-green-800 text-yellow-200 font-bold py-2 px-4 rounded w-full sm:w-32 md:w-36 text-xs sm:text-sm mb-2"
            >
              Plant!
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-400 hover:bg-red-500 text-yellow-200 font-bold py-2 px-4 rounded w-full sm:w-32 md:w-36 text-xs sm:text-sm"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-yellow-200 p-4 rounded-lg shadow-lg w-full max-w-xl h-[80vh] flex flex-col">
            <div className="flex-grow overflow-hidden rounded-lg">
              <video className="w-full h-full object-cover" controls autoPlay>
                <source src="/emissions.mp4" type="video/mp4" />
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

export default Donate;
