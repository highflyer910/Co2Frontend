import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Group } from "../types/Group";
import { useNavigate } from "react-router-dom";

interface GroupCardProps {
  group: Group;
  isFavourite: boolean;
  toggleFavourite: (groupId: string) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({
  group,
  isFavourite,
  toggleFavourite,
}) => {
  const navigate = useNavigate();

  const navigateToDonatePage = (groupId: string, groupName: string) => {
    navigate(`/donate/${groupId}/${encodeURIComponent(groupName)}`);
  };

  const navigateToLimitPage = (
    groupId: string,
    groupName: string,
    groupLimits: string
  ) => {
    navigate(
      `/limit/${groupId}/${encodeURIComponent(groupName)}/${groupLimits}`
    );
  };

  // Determina il testo da visualizzare per il limite
  const limitText =
    group.groupLimits != "-1" ? `${group.groupLimits}` : "Nessun limite";

  return (
    <div className="my-5 relative w-full max-w-xs bg-white text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md hover:bg-gray-100 flex flex-col items-start">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-bold text-xl">{group.groupName}</h2>
        <button
          onClick={() => toggleFavourite(group.groupId)}
          className="text-2xl focus:outline-none"
        >
          {isFavourite ? (
            <AiFillStar className="text-green-500" />
          ) : (
            <AiOutlineStar className="text-gray-500" />
          )}
        </button>
      </div>
      <div className="m-2">
        <p>Participants : {group.participantsCount}</p>
        <p>Total Messages : {group.totalMessages}</p>
        <p>Total Size (KB) : {group.totalSizeKB}</p>
        <p>Emissions OneByte (g): {group.totalEmissionsOneByte}</p>
        <p>Emissions SWD (g): {group.totalEmissionsSWD}</p>
        <p>Limits (KB) : {limitText}</p>
        <p>
          Last Report : {new Date(group.lastReportTimestamp).toLocaleString()}
        </p>
        <p>Admins : {group.adminNames.join(", ")}</p>
        <p>Donations : {group.donations.join(", ")}</p>
      </div>
      <div className="flex flex-row justify-around w-full">
        <button className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded">
          Stats
        </button>
        <button
          onClick={() => navigateToDonatePage(group.groupId, group.groupName)}
          className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
        >
          Donate
        </button>
        <button
          onClick={() =>
            navigateToLimitPage(
              group.groupId,
              group.groupName,
              group.groupLimits
            )
          }
          className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
        >
          Limit
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
