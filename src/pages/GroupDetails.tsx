import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { useMain } from "../contexts/MainContext";
import GroupCard from "../components/GroupCard";

const GroupDetails: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { jwt } = useMain();
  const { groups = [], isLoading, error } = useGetGroups(jwt);

  const group = groups.find(g => g.groupId === groupId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!group) return <div>Group not found</div>;

  return (
    <div className="relative bg-gray-100 flex flex-col min-h-screen overflow-auto">
      <img
        src={`/background.webp`}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      <Header />

      <main className="relative flex flex-col items-center justify-center md:pt-0 pt-0 pb-16">
        <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          <h1 className="font-poppins text-2xl md:text-3xl font-bold text-center w-full">
            GoGreen CardGroups
          </h1>
        </div>

        <div className="flex items-center mt-4">
          <img src="/tree.png" alt="Tree" className="w-12 h-12 mr-2 md:w-24 md:h-24 md:mr-2" />
          <h2 className="font-poppins text-2xl md:text-3xl font-bold text-green-800">
            {group.groupName}
          </h2>
        </div>

        <div className="mt-8 bg-yellow-200 text-green-700 font-body py-4 px-4 md:px-6 rounded-2xl border-2 border-green-800 shadow-md w-full max-w-md relative mx-4 md:mx-0">
          <GroupCard 
            group={group} 
            isFavourite={false} 
            toggleFavourite={() => {}} 
            showButtons={false} 
          />
        </div>

        <button 
          className="mt-4 bg-green-700 hover:bg-green-800 text-yellow-200 font-bold py-2 px-4 rounded"
          onClick={() => console.log('Graph button clicked')}
        >
          Graph
        </button>
      </main>
    </div>
  );
};

export default GroupDetails;
