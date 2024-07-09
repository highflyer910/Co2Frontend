import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { Group } from "../types/Group";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { useMain } from "../contexts/MainContext";

const Groups: React.FC = () => {
  const { jwt } = useMain();
  const { groups = [], isLoading, error } = useGetGroups(jwt);
  const [onlyFavourite, setOnlyFavourite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Utilize the custom hook useLocalStorageState to manage favorites
  const [favourites, setFavourites] = useLocalStorageState<Record<string, boolean>>(
    {}, // Initial state
    "favourites" // Key for localStorage
  );

  // Log groups for debugging purposes
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

  // Log filtered groups for debugging purposes
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
        <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
          Pick a GoGreen CardGroup
        </h1>

        <div className="my-4 flex flex-col items-center">
          <select
            onChange={handleDropdownChange}
            className="mb-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
          >
            <option value="all">All Groups</option>
            <option value="favourites">Only Favorites</option>
          </select>

          <input
            type="text"
            placeholder="Filter groups by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-4 bg-white border border-green-900 text-green-900 font-bold py-2 px-4 rounded"
          />
        </div>

        <div className="flex flex-col items-center space-y-3 w-full px-4 mb-8">
          {filteredGroups.map((group: Group) => (
            <div
              key={group.groupId}
              className="border-green-700 border-2 rounded-lg shadow p-4 w-full max-w-md"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-poppins text-xl font-bold text-green-800">
                  {group.groupName}
                </h2>
                <button
                  onClick={() => toggleFavourite(group.groupId)}
                  className={`text-2xl ${favourites[group.groupId] ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                </button>
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                  Details
                </button>
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                  Donate
                </button>
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                  Limits
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Groups;