import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMain } from "../contexts/MainContext";

interface DonationDetailsOut {
  userId: string;
  groupId: string;
  units: number;
  donationId: string;
  paymentDate: string;
  amount: string;
  currency: string;
  unitType: string;
  locationProject: string;
  nameProject: string;
  idProject: string;
}

const DonationCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [donationData, setDonationData] = useState<DonationDetailsOut | null>(
    null
  );
  const { userId } = useMain(); // Assuming jwtToken is obtained from useMain()
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get("context");
  const don_status = queryParams.get("don_status");
  const [donationResponse, setDonationResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sendDonation = async () => {
      if (
        context &&
        (don_status === "success" || don_status === "pending") &&
        userId
      ) {
        try {
          const response = await fetch(
            `https://app.plant-for-the-planet.org/app/donations/${context}`
          );
          const data = await response.json();

          // Retrieve groupId from localStorage
          const groupId = localStorage.getItem("groupId") || "";

          const donationDetails: DonationDetailsOut = {
            userId: userId || "",
            groupId,
            units: data.units,
            donationId: context,
            paymentDate: data.paymentDate,
            amount: data.amount,
            currency: data.currency,
            unitType: data.unitType,
            locationProject: data.project.country,
            idProject: data.project.id,
            nameProject: data.project.name,
          };

          setDonationData(donationDetails);

          const backendUrl = `${import.meta.env.VITE_APP_BASE_URL_BE}/donation`;

          const donationResponse = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "X-Custom-Origin": "secretorginipasswordtomorrowdevfromfe",
            },
            body: JSON.stringify(donationDetails),
          });

          console.log("donationrespone from be :", donationResponse);

          if (donationResponse.ok) {
            console.log("Donation data sent to backend successfully");
            setDonationResponse(true);
          } else {
            console.error("Failed to send donation data to backend");
          }
        } catch (error) {
          console.error("Error fetching donation data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    sendDonation();
  }, [context, don_status, userId]);

  const handleReturnHome = () => {
    navigate("/Groups");
  };

  if (don_status !== "success" && don_status !== "pending") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="font-poppins text-xl font-bold text-red-800 py-3 px-4 shadow-lg mb-4">
          Pagamento non andato a buon fine, prego riprovare.
        </p>
        <button
          onClick={handleReturnHome}
          className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
        >
          Torna alla Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {isLoading ? (
        <p className="font-poppins text-xl font-bold text-green-800 py-3 px-4 shadow-lg mb-4">
          Caricamento in corso...
        </p>
      ) : context &&
        (don_status === "success" || don_status === "pending") &&
        donationResponse ? (
        <>
          <h2 className="font-poppins text-3xl font-bold text-green-800 py-3 px-4 shadow-lg mb-4">
            Successo nella donazione !!!!
          </h2>
          {donationData && donationResponse && (
            <pre className="bg-white text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md mb-4">
              {JSON.stringify(donationData, null, 2)}
            </pre>
          )}
        </>
      ) : (
        <div>
          <p className="font-poppins text-xl font-bold text-red-800 py-3 px-4 shadow-lg mb-4">
            Transazione non completata o con errori
          </p>
        </div>
      )}
      <button
        onClick={handleReturnHome}
        className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
      >
        Torna alla Home
      </button>
    </div>
  );
};

export default DonationCallback;
