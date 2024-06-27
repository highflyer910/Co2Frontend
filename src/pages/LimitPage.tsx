import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetGroups } from "../hooks/useGetAllGroups"; // Assumi che il percorso sia corretto
import { useMain } from "../contexts/MainContext";
import { FaCrown } from "react-icons/fa";

const Limit: React.FC = () => {
  const { groupId, groupName, groupLimits } = useParams<{
    groupId: string;
    groupName: string;
    groupLimits: string;
  }>();

  const isAdmin = useParams<{ isAdmin: string }>().isAdmin === "true";

  console.log("isAdmin:", isAdmin);

  const navigate = useNavigate();
  const { jwt } = useMain(); // Ottieni il token JWT
  const { refetch } = useGetGroups(jwt); // Ottieni refetch dal custom hook

  // State per gestire il valore del limite in KB
  const [limitValue, setLimitValue] = useState<number | null>(
    groupLimits && groupLimits !== "-1" ? +groupLimits : -1
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialLimit, _] = useState<number>(
    groupLimits && groupLimits !== "-1" ? +groupLimits : -1
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
            Authorization: `Bearer ${jwt}`, // Aggiungi il JWT nell'header
          },
          body: JSON.stringify({
            chatId: groupId,
            limit: limitValue, // Assumiamo che il valore sia già in KB
          }),
        }
      );
      const data = await response.json();
      setResponseMessage(data.success); // Mostra il messaggio di successo

      if (data.success) {
        await refetch(); // Effettua il refetch dei gruppi
      }

      setLimitValue(limitValue); // Aggiorna il valore del limite
    } catch (error) {
      console.error("Error setting limit:", error);
      setResponseMessage("Error setting limit"); // Gestione dell'errore
    }
  };

  const handleDeleteLimit = async () => {
    try {
      const response = await fetch(
        `https://co2backend.onrender.com/api/v1/limit/generic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`, // Aggiungi il JWT nell'header
          },
          body: JSON.stringify({
            chatId: groupId,
            limit: limitValue, // Assumiamo che il valore sia già in KB
          }),
        }
      );
      const data = await response.json();
      setResponseMessage(data.success); // Mostra il messaggio di successo

      setLimitValue(-1); // Resetta il valore del limite a -1 (valore di default)
    } catch (error) {
      console.error("Error deleting limit:", error);
      setResponseMessage("Error deleting limit"); // Gestione dell'errore
    }
  };

  useEffect(() => {
    // Esempio di utilizzo dei parametri
    console.log(`Group ID: ${groupId}, Group Name: ${groupName}`);
  }, [groupId, groupName]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
        Limit Group Name: {groupName}
        {isAdmin && (
          <span className="ml-2 text-yellow-500">
            <FaCrown />
          </span>
        )}
      </h1>
      <div className="my-4">
        {isAdmin ? (
          <div className="flex items-center mb-4">
            <input
              type="number"
              className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="Enter limit value in KB"
              value={
                limitValue !== null && limitValue !== -1
                  ? limitValue.toString()
                  : ""
              }
              onChange={(e) => setLimitValue(Number(e.target.value))}
            />
            <button
              onClick={handleSetLimit}
              className={`px-4 p-2 rounded-r-lg text-white border border-r-0 ${
                limitValue === initialLimit
                  ? "bg-blue-200 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
              disabled={limitValue === initialLimit} // Disabilita il pulsante se i limiti sono uguali
            >
              Set Limit
            </button>
          </div>
        ) : (
          <p className="font-bold text-red-600">
            Only admins can set limits for this group.
          </p>
        )}
        {isAdmin && (
          <button
            onClick={handleDeleteLimit}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Delete Limit
          </button>
        )}
        <button
          onClick={() => navigate(-1)} // Torna alla home senza refresh
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Torna Alla Home
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
        {groupLimits !== "-1" ? `${groupLimits} KB` : "No limit set"}
      </div>
      <p className="text-center text-gray-600 mt-2">
        Please enter the limit value in kilobytes (KB).
      </p>
    </div>
  );
};

export default Limit;
