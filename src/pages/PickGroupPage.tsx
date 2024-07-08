// PickGroupPage.tsx
import { useState } from "react";
import Header from "../components/Header";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { Group } from "../types/Group";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import { useMain } from "../contexts/MainContext";

const PickGroupPage: React.FC = () => {
  const { jwt } = useMain();
  const { groups = [], isLoading, error } = useGetGroups(jwt);
  const [onlyFavourite, setOnlyFavourite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [favourites, setFavourites] = useLocalStorageState(
    {}, // Initial state
    "favourites" // Key for localStorage
  );

  // Filter groups based on favourites and search term
  const filteredGroups = groups.filter((group: Group) => {
    const matchesFavourite = onlyFavourite ? favourites[group.groupId] : true;
    const matchesSearchTerm = group.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFavourite && matchesSearchTerm;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <img
        src={`/background.webp`}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />
      <Header />

      <main className="relative flex flex-col items-center justify-center py-16 md:pt-0 pt-0">
        <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
          Pick a GoGreen CardGroup
        </h1>

        <div className="flex flex-col items-center space-y-3 w-full px-4 mt-6">
          <select
            value={onlyFavourite ? "favourites" : "all"}
            onChange={(e) => setOnlyFavourite(e.target.value === "favourites")}
            className="mb-4 p-2 bg-white border border-gray-300 rounded"
          >
            <option value="all">All Groups</option>
            <option value="favourites">Only Favorites</option>
          </select>

          <input
            type="text"
            placeholder="Search by group name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 bg-white border border-gray-300 rounded w-full"
          />

          {filteredGroups.map((group: Group) => (
            <div
              key={group.groupId}
              className="bg-white shadow-md rounded p-4 mb-4 w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-2">{group.name}</h2>
              <div className="flex justify-between">
                <button className="bg-green-700 text-white py-2 px-4 rounded">
                  Details
                </button>
                <button className="bg-green-700 text-white py-2 px-4 rounded">
                  Donate
                </button>
                <button className="bg-green-700 text-white py-2 px-4 rounded">
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

export default PickGroupPage;
