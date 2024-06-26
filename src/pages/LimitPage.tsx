import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Limit: React.FC = () => {
  const { groupId, groupName, groupLimits } = useParams<{
    groupId: string;
    groupName: string;
    groupLimits: string;
  }>();

  // State per gestire il valore del limite in KB
  const [limitValue, setLimitValue] = useState<number | null>(
    groupLimits && groupLimits !== "no-limits" ? +groupLimits : null
  );
  // State per gestire i messaggi di risposta
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleSetLimit = async () => {
    try {
      const response = await fetch(
        `https://co2backend.onrender.com/api/v1/limit/generic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: groupId,
            limit: limitValue, // Assumiamo che il valore sia già in KB
          }),
        }
      );
      const data = await response.json();
      setResponseMessage(data.success); // Mostra il messaggio di successo

      setLimitValue(limitValue); // Aggiorna il valore del limite
    } catch (error) {
      console.error("Error setting limit:", error);
      setResponseMessage("Error setting limit"); // Gestione dell'errore
    }
  };

  const handleDeleteLimit = async () => {
    try {
      const response = await fetch(
        `https://co2backend.onrender.com/api/v1/limit/generic/${groupId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setResponseMessage(data.success); // Mostra il messaggio di successo
      setLimitValue(null); // Resetta il valore del limite
    } catch (error) {
      console.error("Error deleting limit:", error);
      setResponseMessage("Error deleting limit"); // Gestione dell'errore
    }
  };

  const handleGoBack = () => {
    window.location.reload(); // Ricarica la pagina corrente
  };

  useEffect(() => {
    // Esempio di utilizzo dei parametri
    console.log(`Group ID: ${groupId}, Group Name: ${groupName}`);
  }, [groupId, groupName]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
        Limit Group Name: {groupName}
      </h1>
      <h2 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
        Group ID: {groupId}
      </h2>
      <div className="my-4">
        <div className="flex items-center mb-4">
          <input
            type="number"
            className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Enter limit value in KB"
            value={limitValue ?? ""}
            onChange={(e) => setLimitValue(Number(e.target.value))}
          />
          <button
            onClick={handleSetLimit}
            className="px-4 bg-blue-500 p-2 rounded-r-lg text-white border border-blue-500 border-r-0 hover:bg-blue-400"
          >
            Set Limit
          </button>
        </div>
        <button
          onClick={handleDeleteLimit}
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Indietro
        </button>
        <button
          onClick={handleGoBack}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Annulla
        </button>
      </div>
      {responseMessage && (
        <div
          className={`my-4 text-center font-bold ${
            responseMessage.includes("Error")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {responseMessage}
        </div>
      )}
      <div className="my-4 text-center font-bold text-gray-800">
        Current Limit:{" "}
        {limitValue !== null ? `${limitValue} KB` : "No limit set"}
      </div>
      <p className="text-center text-gray-600 mt-2">
        Please enter the limit value in kilobytes (KB).
      </p>
    </div>
  );
};

export default Limit;
