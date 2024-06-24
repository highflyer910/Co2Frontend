import Header from "../components/Header";
import Cookies from "js-cookie";
import { useGetGroups } from "../hooks/useGetAllGroups"; // Corrected import
import { Group } from "../types/Group"; // Ensure correct path to Group type

const jwtToken = Cookies.get("jwt-co2") || "";

const Groups = () => {
  const { groups = [], isLoading, error } = useGetGroups(jwtToken);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("Groups data:", groups); // Verify the structure of groups

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
        <h1 className="font-poppins text-3xl font-bold text-center bg-yellow-400 text-green-800 py-3 px-4 shadow-lg">
          Groups
        </h1>

        <p className="font-body text-xl text-shadow text-bold text-green-900 mb-6 mt-4 text-center">
          Choose a Group
        </p>

        <div className="flex flex-col items-center space-y-3 w-full px-4 mb-8">
          {groups &&
            groups.map((group: Group) => (
              <div
                key={group.groupId}
                className="relative w-full max-w-xs bg-white text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md hover:bg-gray-100 flex flex-col items-start"
              >
                <h2 className="font-bold text-xl">{group.groupName}</h2>
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
            ))}
        </div>
      </main>
    </div>
  );
};

export default Groups;
