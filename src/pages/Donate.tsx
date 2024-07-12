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
          <h1 className="font-poppins text-3xl font-bold text-center">
            Let's GoGreen!
          </h1>
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex items-center">
            <img
              src="/tree.png"
              alt="Tree"
              className="w-24 h-24 sm:w-32 sm:h-32"
            />
            <div className="-ml-2 w-48 sm:w-56">
              <div className="relative flex justify-center items-center border-4 rounded-lg border-green-700 p-2 shadow-lg bg-yellow-200">
                <p className="font-body text-sm sm:text-base text-shadow text-bold text-green-900 text-center">
                  Help {groupName} grow their forest! Donate!
                </p>
                <div className="absolute top-1/4 -left-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-green-700"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center w-full max-w-3xl">
          <div className="relative w-60 flex flex-col items-center border-4 rounded-3xl border-green-700 p-4 bg-yellow-200 mb-4 md:mb-0 md:mr-4">
            <h2 className="absolute -top-9 text-green-700 font-body text-xl font-bold">Choose trees quantity</h2>
            <img src="/tree1.png" alt="Tree" className="w-24 h-18 mb-4" />
            <div className="mb-4">
              <input
                type="number"
                id="treeCount"
                value={treeCount}
                onChange={handleTreeCountChange}
                className="bg-white text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md"
                min="1"
              />
            </div>
          </div>
          <div className="w-full md:w-auto flex flex-col items-center">
            <div className="flex flex-col w-full md:w-auto items-center md:flex-row md:space-x-4">
              <button
                onClick={handleDonateClick}
                className="bg-green-700 hover:bg-green-800 text-yellow-200 font-bold py-2 px-4 rounded mb-4 md:mb-0 md:w-32 w-full"
              >
                Plant!
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-red-400 hover:bg-red-500 text-yellow-200 font-bold py-2 px-4 rounded w-full md:w-32"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
