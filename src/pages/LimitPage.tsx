import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Limit: React.FC = () => {
  const { groupId, groupName } = useParams<{
    groupId: string;
    groupName: string;
  }>();
  const navigate = useNavigate();

  // State per gestire il valore del limite
  const [limitValue, setLimitValue] = useState<number | null>(null);

  // Funzione per impostare il limite generico
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
            limit: limitValue,
          }),
        }
      );
      const data = await response.json();
      console.log(data); // Puoi gestire la risposta come preferisci
      // Aggiornare l'UI o mostrare un messaggio di successo
    } catch (error) {
      console.error("Error setting limit:", error);
      // Gestire eventuali errori
    }
  };

  // Funzione per cancellare il limite generico
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
      console.log(data); // Puoi gestire la risposta come preferisci
      // Aggiornare l'UI o mostrare un messaggio di successo
    } catch (error) {
      console.error("Error deleting limit:", error);
      // Gestire eventuali errori
    }
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
        Limit Group Name {groupName}
      </h1>
      <h2 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
        Limit ID {groupId}
      </h2>
      <div className="my-4">
        <div className="flex items-center mb-4">
          <input
            type="number"
            className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Enter limit value"
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
          Delete Limit
        </button>
        <button
          onClick={handleCancelClick}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Limit;
