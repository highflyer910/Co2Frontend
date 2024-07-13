import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { Group } from "../types/Group";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { useMain } from "../contexts/MainContext";

const Groups: React.FC = () => {
  const navigate = useNavigate();
  const { jwt } = useMain();
  const { groups = [], isLoading, error } = useGetGroups(jwt);
  const [onlyFavourite, setOnlyFavourite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const [favourites, setFavourites] = useLocalStorageState(
    {}, // Initial state
    "favourites" // Key for localStorage
  );

  useEffect(() => {
    console.log("Fetched groups:", groups);
  }, [groups]);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOnlyFavourite(event.target.value === "favourites");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleFavourite = (groupId: string) => {
    setFavourites(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const filteredGroups = groups.filter((group) => {
    if (onlyFavourite && !favourites[group.groupId]) {
      return false;
    }
    if (searchTerm && !group.groupName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleDetailsClick = (groupId: string) => {
    console.log("Navigating to group:", groupId);
    navigate(`/group/${groupId}`);
  };

  const handleDonateClick = (groupId: string, groupName: string) => {
    navigate(`/donate/${groupId}/${encodeURIComponent(groupName)}`);
  };

  useEffect(() => {
    console.log("Filtered groups:", filteredGroups);
  }, [filteredGroups]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
            Pick a GoGreen CardGroup
          </h1>
        </div>
        <div className="my-4 flex flex-col items-center w-full max-w-md px-2">
          <div className="flex items-center justify-center w-full mb-4 flex-wrap">
            <div className="flex flex-col flex-grow space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row items-center">
            <img src="/tree.png" alt="Tree" className="w-36 h-36 mx-auto" />
              <select
                onChange={handleDropdownChange}
                className="bg-transparent border-2 border-green-700 text-green-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
              >
                <option value="all" className="bg-green-700 text-yellow-200">All Groups</option>
                <option value="favourites" className="bg-green-700 text-yellow-200">Only Favorites</option>
              </select>
              <input
                type="text"
                placeholder="Search groups by name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent border-2 border-green-700 text-green-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
              />
              <button
                onClick={() => setShowVideo(true)}
                className="text-green-700 text-3xl font-bold focus:outline-none"
                aria-label="More options"
              >
                •••
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3 w-full px-2 mb-8">
          {filteredGroups.map((group: Group) => (
            <div
              key={group.groupId}
              className="border-green-700 border-2 rounded-lg shadow p-2 w-full max-w-md"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-poppins text-xl font-bold text-green-700 text-center w-full">
                  {group.groupName}
                </h2>
                <button
                  onClick={() => toggleFavourite(group.groupId)}
                  className={`text-2xl ${favourites[group.groupId] ? 'text-green-700' : 'text-gray-400'}`}
                >
                  ★
                </button>
              </div>
              <div className="flex flex-wrap justify-center text-center mt-4 -mx-2">
                <button 
                  onClick={() => handleDetailsClick(group.groupId)}
                  className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 mx-2 my-2 rounded w-full sm:w-auto"
                >
                  Details
                </button>
                <button 
                  onClick={() => handleDonateClick(group.groupId, group.groupName)}
                  className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 mx-2 my-2 rounded w-full sm:w-auto"
                >
                  Donate
                </button>
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 mx-2 my-2 rounded w-full sm:w-auto">
                  Limits
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowVideo(true)}
            className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            CLICK HERE TO KNOW MORE
          </button>

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
                  onClick={() => setShowVideo(false)}
                  className="mt-4 bg-green-700 hover:bg-green-800 text-yellow-200 font-bold py-2 px-4 rounded w-full"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Groups;
