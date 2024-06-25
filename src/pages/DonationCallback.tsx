import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMain } from "../contexts/MainContext";

interface DonationDetails {
  userId: string;
  groupId: string;
  units: number;
  code: string;
  paymentDate: string;
  amount: string;
  currency: string;
  unitType: string;
}

const DonationCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [donationData, setDonationData] = useState<DonationDetails | null>(
    null
  );
  const { userId } = useMain(); // Assuming jwtToken is obtained from useMain()
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get("context");
  const don_status = queryParams.get("don_status");

  useEffect(() => {
    const sendDonation = async () => {
      if (context && don_status === "success") {
        try {
          const response = await fetch(
            `https://app.plant-for-the-planet.org/app/donations/${context}`
          );
          const data = await response.json();

          // Retrieve groupId from localStorage
          const groupId = localStorage.getItem("groupId") || "";

          const donationDetails: DonationDetails = {
            userId: userId || "",
            groupId,
            units: data.units,
            code: data.code,
            paymentDate: data.paymentDate,
            amount: data.amount,
            currency: data.currency,
            unitType: data.unitType,
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

          if (donationResponse.ok) {
            console.log("Donation data sent to backend successfully");
          } else {
            console.error("Failed to send donation data to backend");
          }
        } catch (error) {
          console.error("Error fetching donation data:", error);
        }
      }
    };

    sendDonation();
  }, [context, don_status, userId]);

  const handleReturnHome = () => {
    navigate("/");
  };

  if (context && don_status === "success") {
    return (
      <div>
        <h2>Success donation da checkare</h2>
        {donationData && <pre>{JSON.stringify(donationData, null, 2)}</pre>}
      </div>
    );
  } else if (!context || !don_status) {
    return (
      <div>
        <p>Transazione non completata o con errori</p>
        <button onClick={handleReturnHome}>Torna alla Home</button>
      </div>
    );
  } else if (context && don_status !== "success") {
    return <div>Donazione ricevuta ma ancora non completata</div>;
  }

  return null;
};

export default DonationCallback;
