import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { useMain } from "../contexts/MainContext";

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

      <main className="relative flex flex-col items-center justify-center md:pt-0 pt-0 px-4">
        <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          <h1 className="font-poppins text-3xl font-bold text-center">
            GoGreen CardGroups
          </h1>
        </div>

        <div className="flex items-center mt-4">
          <img src="/tree.png" alt="Tree" className="w-24 h-24 mr-4" />
          <h2 className="font-poppins text-xl font-bold text-green-800">
            {group.groupName}
          </h2>
        </div>

        <div className="mt-8 bg-yellow-200 text-green-700 font-body py-4 px-4 rounded-lg border-2 border-green-800 shadow-md w-full max-w-md lg:max-w-lg">
          <div className="flex flex-wrap -mx-2">
            {Object.entries(group).map(([key, value]) => (
              <div key={key} className="w-full sm:w-1/2 px-2 mb-2">
                <p><strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}</p>
              </div>
            ))}
          </div>
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