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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h1 className="font-poppins text-4xl font-bold text-center text-green-800 mb-6">
          Let's GoGreen!
        </h1>
        <div className="relative mb-8">
          <img src="/tree.png" alt="Tree" className="w-32 h-32" />
          <div className="absolute top-0 left-full ml-4 bg-yellow-200 text-green-800 p-3 rounded-lg shadow-md max-w-xs">
            <p className="text-sm">
              Help {groupName} grow their forest! Donate!
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Choose trees quantity
        </h2>
        <img src="/tree1.png" alt="Tree" className="w-24 h-24 mb-4" />
        <div className="mb-6">
          <input
            type="number"
            id="treeCount"
            value={treeCount}
            onChange={handleTreeCountChange}
            className="bg-white text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md"
            min="1"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleDonateClick}
            className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
          >
            Donate
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
};

export default Donate;