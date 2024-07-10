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
        <div className="w-full bg-green-700 text-yellow-200 py-3 px-4 shadow-lg">
          <h1 className="font-poppins text-3xl font-bold text-center">
            GoGreen CardGroups
          </h1>
        </div>

        <div className="flex items-center mt-4">
          <img src="/tree.png" alt="Tree" className="w-36 h-36 mr-4" />
          <h2 className="font-poppins text-xl font-bold text-green-800">
            {group.groupName}
          </h2>
        </div>

        <div className="mt-8 bg-yellow-300 text-green-700 font-body py-4 px-6 rounded-lg border-2 border-green-800 shadow-md w-full max-w-xl">
          <p>Limit (KB): {group.groupLimits === "-1" ? "No limit" : group.groupLimits}</p>
          <p>Donations: {group.donations.join(', ')}</p>
          <p>Last Report TimeStamp: {group.lastReportTimestamp}</p>
          <p>Admin: {group.adminNames.join(', ')}</p>
          <p>Total Messages: {group.totalMessages}</p>
          <p>Total Size (KB): {group.totalSizeKB}</p>
          <p>Emissions OneByte (g): {group.totalEmissionsOneByte}</p>
          <p>Emissions SWD (g): {group.totalEmissionsSWD}</p>
          <p>Text Messages: {group.textTotalMessages}</p>
          <p>Text Size (KB): {group.textTotalSize}</p>
          <p>Text Emissions OneByte (g): {group.textEmissionsOneByteMethod}</p>
          <p>Text Emissions SWD (g): {group.textEmissionsSWDMethod}</p>
          <p>Photo Messages: {group.photoTotalMessages}</p>
          <p>Photo Size (KB): {group.photoTotalSize}</p>
          <p>Photo Emissions OneByte (g): {group.photoEmissionsOneByteMethod}</p>
          <p>Photo Emissions SWD (g): {group.photoEmissionsSWDMethod}</p>
          <p>Voice Messages: {group.voiceTotalMessages}</p>
          <p>Voice Size (KB): {group.voiceTotalSize}</p>
          <p>Voice Emissions OneByte (g): {group.voiceEmissionsOneByteMethod}</p>
          <p>Voice Emissions SWD (g): {group.voiceEmissionsSWDMethod}</p>
          <p>Video Messages: {group.videoTotalMessages}</p>
          <p>Video Size (KB): {group.videoTotalSize}</p>
          <p>Video Emissions OneByte (g): {group.videoEmissionsOneByteMethod}</p>
          <p>Video Emissions SWD (g): {group.videoEmissionsSWDMethod}</p>
          <p>Document Messages: {group.documentTotalMessages}</p>
          <p>Document Size (KB): {group.documentTotalSize}</p>
          <p>Document Emissions OneByte (g): {group.documentEmissionsOneByteMethod}</p>
          <p>Document Emissions SWD (g): {group.documentEmissionsSWDMethod}</p>
          <p>Poll Messages: {group.pollTotalMessages}</p>
          <p>Poll Size (KB): {group.pollTotalSize}</p>
          <p>Poll Emissions OneByte (g): {group.pollEmissionsOneByteMethod}</p>
          <p>Poll Emissions SWD (g): {group.pollEmissionsSWDMethod}</p>
          <p>Sticker Messages: {group.stickerTotalMessages}</p>
          <p>Sticker Size (KB): {group.stickerTotalSize}</p>
          <p>Sticker Emissions OneByte (g): {group.stickerEmissionsOneByteMethod}</p>
          <p>Sticker Emissions SWD (g): {group.stickerEmissionsSWDMethod}</p>
        </div>
      </main>
    </div>
  );
};

export default GroupDetails;