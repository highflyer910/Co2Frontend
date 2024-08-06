import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { useMain } from "../contexts/MainContext";
import Header from "../components/Header";

const Limit: React.FC = () => {
  const { groupId, groupName, groupLimits } = useParams<{
    groupId: string;
    groupName: string;
    groupLimits: string;
  }>();

  const navigate = useNavigate();
  const { jwt } = useMain();
  const { refetch } = useGetGroups(jwt);

  const [limitValue, setLimitValue] = useState<number | null>(
    groupLimits && groupLimits !== "-1" ? +groupLimits : -1
  );

  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleSetLimit = async () => {
    try {
      const response = await fetch(
        `https://co2backend.onrender.com/api/v1/limit/generic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            chatId: groupId,
            limit: limitValue,
          }),
        }
      );
      const data = await response.json();
      setResponseMessage(data.success);

      if (data.success) {
        console.log("refetch");
        await refetch();
      }

      setLimitValue(limitValue);
    } catch (error) {
      console.error("Error setting limit:", error);
      setResponseMessage("Error setting limit");
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
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      let data;
      if (response.status === 204) {
        data = { status: "success", message: "Limit deleted successfully" };
      } else {
        data = await response.json();
      }

      if (data.status === "success") {
        setResponseMessage(data.message);
        await refetch();
        console.log("refetch");
        setLimitValue(-1);
      } else {
        setResponseMessage("Error deleting limit");
      }
    } catch (error) {
      console.error("Error deleting limit:", error);
      setResponseMessage("Error deleting limit");
    }
  };

  useEffect(() => {
    console.log(`Group ID: ${groupId}, Group Name: ${groupName}`);
  }, [groupId, groupName]);

  return (
    <div className="relative bg-gray-100 flex flex-col min-h-screen overflow-auto">
      <img
        src={`/background.webp`}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      <Header />

      <main className="relative flex flex-col items-center justify-center md:pt-0 pt-0">
        <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          <h1 className="font-poppins text-3xl font-bold text-center">
            GoGreen Caps
          </h1>
        </div>

        <div className="flex flex-col items-center mt-16 mb-12 px-4 w-full">
          <div className="relative flex items-center justify-between w-full max-w-xl">
            <div className="flex items-center">
              <div className="relative mr-4">
                <div className="absolute -top-12 left-16 w-40">
                  <div className="relative flex justify-center w-24 items-center border-4 rounded-md border-green-700 p-2 shadow-lg bg-yellow-200">
                    <p className="font-body text-xs sm:text-sm text-shadow text-bold text-green-900 text-center">
                      Set CO2 cap
                    </p>
                    <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-700"></div>
                  </div>
                </div>
                <img
                  src="/tree.png"
                  alt="Tree"
                  className="w-20 h-20 sm:w-24 sm:h-24"
                />
              </div>
              <input
                type="number"
                className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                placeholder="CO2"
                value={
                  limitValue !== null && limitValue !== -1
                    ? limitValue.toString()
                    : ""
                }
                onChange={(e) => setLimitValue(Number(e.target.value))}
              />
              <button
                onClick={handleSetLimit}
                className={`px-4 p-2 rounded-r-lg text-white border border-r-0 bg-blue-500 hover:bg-blue-400`}
              >
                Set Limit
              </button>
            </div>
          </div>
          <button
            onClick={handleDeleteLimit}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Delete Limit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2 mt-4"
          >
            Go Back
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

        <p className="text-center text-gray-600 mt-2">
          Please enter the limit value in kilobytes (KB).
        </p>
      </main>
    </div>
  );
};

export default Limit;