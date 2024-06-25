import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Donate: React.FC = () => {
  const { groupId, groupName } = useParams<{
    groupId: string;
    groupName: string;
  }>();
  const [treeCount, setTreeCount] = useState(1);
  const navigate = useNavigate();

  const frequency = "once"; // Frequenza costante
  const callbackUrl = `${import.meta.env.VITE_APP_BASE_URL_FE}/donate/callback`; // URL di callback (usando una variabile d'ambiente)
  const callbackMethod = "api"; // Metodo di callback costante

  const handleTreeCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTreeCount(Number(event.target.value));
  };

  const handleDonateClick = () => {
    // Costruzione dell'URL per la donazione
    const donationUrl = `https://donate.plant-for-the-planet.org/?units=${treeCount}&frequency=${frequency}&callback_url=${encodeURIComponent(
      callbackUrl
    )}&callback_method=${callbackMethod}`;

    // Apertura del widget esterno per la donazione
    window.open(donationUrl, "_blank");

    // Navigazione indietro dopo aver completato la donazione (opzionale)
    navigate(-1);
  };

  const handleCancelClick = () => {
    navigate(-1); // Torna indietro di una pagina
  };

  useEffect(() => {
    // Esempio di utilizzo dei parametri
    console.log(`Group ID: ${groupId}, Group Name: ${groupName}`);
  }, [groupId, groupName]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
        Donate to Group {groupName}
      </h1>
      <div className="my-4">
        <label
          htmlFor="treeCount"
          className="block text-green-900 font-bold mb-2"
        >
          Number of Trees
        </label>
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
    </div>
  );
};

export default Donate;
