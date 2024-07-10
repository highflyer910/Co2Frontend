import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import { useGetGroups } from "../hooks/useGetAllGroups";
import { useMain } from "../contexts/MainContext";

const GroupDetails: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { jwt } = useMain();
  const { groups = [], isLoading, error } = useGetGroups(jwt);
  const [showAllDetails, setShowAllDetails] = useState(false);

  const group = groups.find(g => g.groupId === groupId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!group) return <div>Group not found</div>;

  const initialDetails = [
    { label: "Limit (KB)", value: group.groupLimits === "-1" ? "No limit" : group.groupLimits },
    { label: "Donations", value: group.donations.join(', ') },
    { label: "Last Report TimeStamp", value: group.lastReportTimestamp },
    { label: "Admin", value: group.adminNames.join(', ') },
    { label: "Total Messages", value: group.totalMessages },
    { label: "Total Size (KB)", value: group.totalSizeKB },
    { label: "Emissions OneByte (g)", value: group.totalEmissionsOneByte },
    { label: "Emissions SWD (g)", value: group.totalEmissionsSWD },
  ];

  const allDetails = [
    ...initialDetails,
    { label: "Text Messages", value: group.textTotalMessages },
    { label: "Text Size (KB)", value: group.textTotalSize },
    { label: "Text Emissions OneByte (g)", value: group.textEmissionsOneByteMethod },
    { label: "Text Emissions SWD (g)", value: group.textEmissionsSWDMethod },
    { label: "Photo Messages", value: group.photoTotalMessages },
    { label: "Photo Size (KB)", value: group.photoTotalSize },
    { label: "Photo Emissions OneByte (g)", value: group.photoEmissionsOneByteMethod },
    { label: "Photo Emissions SWD (g)", value: group.photoEmissionsSWDMethod },
    { label: "Voice Messages", value: group.voiceTotalMessages },
    { label: "Voice Size (KB)", value: group.voiceTotalSize },
    { label: "Voice Emissions OneByte (g)", value: group.voiceEmissionsOneByteMethod },
    { label: "Voice Emissions SWD (g)", value: group.voiceEmissionsSWDMethod },
    { label: "Video Messages", value: group.videoTotalMessages },
    { label: "Video Size (KB)", value: group.videoTotalSize },
    { label: "Video Emissions OneByte (g)", value: group.videoEmissionsOneByteMethod },
    { label: "Video Emissions SWD (g)", value: group.videoEmissionsSWDMethod },
    { label: "Document Messages", value: group.documentTotalMessages },
    { label: "Document Size (KB)", value: group.documentTotalSize },
    { label: "Document Emissions OneByte (g)", value: group.documentEmissionsOneByteMethod },
    { label: "Document Emissions SWD (g)", value: group.documentEmissionsSWDMethod },
    { label: "Poll Messages", value: group.pollTotalMessages },
    { label: "Poll Size (KB)", value: group.pollTotalSize },
    { label: "Poll Emissions OneByte (g)", value: group.pollEmissionsOneByteMethod },
    { label: "Poll Emissions SWD (g)", value: group.pollEmissionsSWDMethod },
    { label: "Sticker Messages", value: group.stickerTotalMessages },
    { label: "Sticker Size (KB)", value: group.stickerTotalSize },
    { label: "Sticker Emissions OneByte (g)", value: group.stickerEmissionsOneByteMethod },
    { label: "Sticker Emissions SWD (g)", value: group.stickerEmissionsSWDMethod },
  ];

  return (
    <div className="relative bg-gray-100 flex flex-col min-h-screen overflow-auto">
      <img
        src={`/background.webp`}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      />

      <Header />

      <main className="relative flex flex-col items-center justify-center md:pt-0 pt-0 px-4 pb-16">
        <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          <h1 className="font-poppins text-3xl font-bold text-center w-full">
            GoGreen CardGroups
          </h1>
        </div>

        <div className="flex items-center mt-4">
          <img src="/tree.png" alt="Tree" className="w-24 h-24 mr-4" />
          <h2 className="font-poppins text-xl font-bold text-green-800">
            {group.groupName}
          </h2>
        </div>

        <div className="mt-8 bg-yellow-200 text-green-700 font-body py-4 px-4 rounded-lg border-2 border-green-800 shadow-md w-full max-w-md relative">
          {(showAllDetails ? allDetails : initialDetails).map((detail, index) => (
            <p key={index} className="mb-2"><strong>{detail.label}:</strong> {detail.value}</p>
          ))}
          <button 
            className="absolute bottom-4 left-4 bg-green-700 hover:bg-green-800 text-yellow-200 font-bold py-2 px-4 rounded"
            onClick={() => setShowAllDetails(!showAllDetails)}
          >
            {showAllDetails ? "See Less" : "See More"}
          </button>
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
