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

      <main className="relative flex flex-col items-center justify-center md:pt-0 pt-0">
        <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-200 text-green-800 py-3 px-4 shadow-lg">
          {group.groupName} Details
        </h1>

        <div className="mt-8 bg-white text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md">
          <p>Total Messages: {group.totalMessages}</p>
          <p>Total Size (KB): {group.totalSizeKB}</p>
          <p>Emissions OneByte (g): {group.totalEmissionsOneByte}</p>
          <p>Emissions SWD (g): {group.totalEmissionsSWD}</p>
          {/* Add more details as needed */}
        </div>
      </main>
    </div>
  );
};

export default GroupDetails;