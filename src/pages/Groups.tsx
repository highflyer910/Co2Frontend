import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { Group } from "../types/Group";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useLocalStorageState } from "../hooks/useLocalStorage";

const jwtToken = Cookies.get("jwt-co2") || "";

const Groups = () => {
  const { groups = [], isLoading, error } = useGetGroups(jwtToken);
  const [onlyFavourite, setOnlyFavourite] = useState(false);

  // Utilizza il tuo hook useLocalStorageState per gestire i preferiti
  const [favourites, setFavourites] = useLocalStorageState(
    {}, // Stato iniziale
    "favourites" // Chiave per localStorage
  );

  // Funzione per gestire il caricamento dei preferiti da localStorage
  const loadFavourites = () => {
    const savedFavourites = localStorage.getItem("favourites");
    console.log("Loaded from localStorage:", savedFavourites);
    if (savedFavourites) {
      try {
        const parsedFavourites = JSON.parse(savedFavourites);
        console.log("Parsed favourites:", parsedFavourites);
        setFavourites(parsedFavourites);
      } catch (e) {
        console.error("Error parsing favourites from localStorage:", e);
      }
    }
  };

  // Effetto per caricare i preferiti al montaggio del componente
  useEffect(() => {
    loadFavourites();
  }, []);

  // Effetto per salvare i preferiti in localStorage quando cambiano
  useEffect(() => {
    console.log("Saving to localStorage:", favourites);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Funzione per gestire il click sul pulsante "Show All" / "Show Favourites"
  const handleOnlyFavouriteClick = () => {
    setOnlyFavourite(!onlyFavourite);
  };

  // Funzione per aggiungere o rimuovere un gruppo dai preferiti
  const toggleFavourite = (groupId: string) => {
    setFavourites((prevFavourites) => ({
      ...prevFavourites,
      [groupId]: !prevFavourites[groupId],
    }));
  };

  // Filtraggio dei gruppi in base alla visualizzazione solo dei preferiti
  const filteredGroups = onlyFavourite
    ? groups.filter((group) => favourites[group.groupId])
    : groups;

  // Renderizzazione del componente principale dei gruppi
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
          Groups
        </h1>

        <button
          onClick={handleOnlyFavouriteClick}
          className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
        >
          {onlyFavourite ? "Show All" : "Show Favourites"}
        </button>

        <div className="flex flex-col items-center space-y-3 w-full px-4 mb-8">
          {filteredGroups.map((group: Group) => (
            <div
              key={group.groupId}
              className="my-5 relative w-full max-w-xs bg-white text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md hover:bg-gray-100 flex flex-col items-start"
            >
              <div className="flex justify-between items-center w-full">
                <h2 className="font-bold text-xl">{group.groupName}</h2>
                <button
                  onClick={() => toggleFavourite(group.groupId)}
                  className="text-2xl focus:outline-none"
                >
                  {favourites[group.groupId] ? (
                    <AiFillStar className="text-green-500" />
                  ) : (
                    <AiOutlineStar className="text-gray-500" />
                  )}
                </button>
              </div>
              <div className="m-2">
                <p>Participants: {group.participantsCount}</p>
                <p>Total Messages: {group.totalMessages}</p>
                <p>Total Size (KB): {group.totalSizeKB}</p>
                <p>Emissions (One Byte): {group.totalEmissionsOneByte}</p>
                <p>Emissions (SWD): {group.totalEmissionsSWD}</p>
                <p>
                  Last Report:{" "}
                  {new Date(group.lastReportTimestamp).toLocaleString()}
                </p>
                <p>Admins: {group.adminNames.join(", ")}</p>
              </div>
              <div className="flex flex-row justify-around w-full">
                <button className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded">
                  Stats
                </button>
                <button className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded">
                  Donate
                </button>
                <button className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded">
                  Filter
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
