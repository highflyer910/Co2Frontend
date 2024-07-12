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
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-400">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Let's GoGreen!</h1>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative bg-white rounded-lg p-4 shadow-lg">
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
              <img src="/small-tree-icon.png" alt="Small tree" className="w-8 h-8" />
            </div>
            <p className="text-lg font-semibold text-green-800">
              Help {groupName} grow their forest! DONATE!
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="border-4 border-green-500 rounded-lg p-4 bg-white">
            <h2 className="text-xl font-bold text-green-800 mb-4">Choose trees quantity</h2>
            <div className="flex items-center gap-4">
              <img src="/large-tree-icon.png" alt="Tree" className="w-20 h-20" />
              <input
                type="number"
                value={treeCount}
                onChange={handleTreeCountChange}
                className="w-20 h-12 text-2xl text-center border-2 border-green-500 rounded"
                min="1"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleDonateClick}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded"
            >
              Plant!
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;