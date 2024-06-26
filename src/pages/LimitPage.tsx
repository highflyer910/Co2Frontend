import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Limit: React.FC = () => {
  const { groupId, groupName } = useParams<{
    groupId: string;
    groupName: string;
  }>();
  localStorage.setItem("groupId", groupId ?? "");

  console.log({ groupId });
  console.log({ groupName });

  const navigate = useNavigate();

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

export default Limit;
