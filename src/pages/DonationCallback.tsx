import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMain } from "../contexts/MainContext";

// Definizione dell'interfaccia per i dati della donazione
interface DonationDetails {
  userId: string; // Aggiunto userId per identificare l'utente che fa la donazione
  groupId: string; // Aggiunto groupId per identificare il gruppo relativo alla donazione
  units: number;
  code: string;
  project: {
    id: string;
    name: string;
    country: string;
    purpose: string;
  };
  donor: {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    companyname: string | null;
    tin: string | null;
  };
  destination: {
    id: string;
    type: string;
    country: string;
    currency: string;
    purpose: string;
    name: string;
  };
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
  // Parse dei parametri di query
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get("context");
  const don_status = queryParams.get("don_status");
  console.log({ context });
  console.log({ don_status });
  console.log({ userId });
  useEffect(() => {
    const fetchDonationData = async () => {
      if (context && don_status === "success") {
        try {
          const response = await fetch(
            `https://app.plant-for-the-planet.org/app/donations/${context}`
          );
          const data = await response.json();

          // Recupero del groupId da localStorage
          const groupId = localStorage.getItem("groupId");

          const donationDetails: DonationDetails = {
            userId: userId, // Assumendo che userId sia salvato in localStorage
            groupId: groupId ?? "", // Utilizzo del groupId da localStorage with a default value of an empty string
            units: data.units,
            code: data.code,
            project: {
              id: data.project.id,
              name: data.project.name,
              country: data.project.country,
              purpose: data.project.purpose,
            },
            donor: {
              firstname: data.donor.firstname,
              lastname: data.donor.lastname,
              email: data.donor.email,
              address: data.donor.address,
              city: data.donor.city,
              zipCode: data.donor.zipCode,
              country: data.donor.country,
              companyname: data.donor.companyname,
              tin: data.donor.tin,
            },
            destination: {
              id: data.destination.id,
              type: data.destination.type,
              country: data.destination.country,
              currency: data.destination.currency,
              purpose: data.destination.purpose,
              name: data.destination.name,
            },
            paymentDate: data.paymentDate,
            amount: data.amount,
            currency: data.currency,
            unitType: data.unitType,
          };

          setDonationData(donationDetails);
          console.log(donationDetails); // Stampa l'oggetto in console

          // Invio dell'oggetto della donazione al backend
          const backendUrl = `${import.meta.env.VITE_APP_BASE_URL_BE}/donation`;

          const donationResponse = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Token JWT come Authorization header da localStorage
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

    fetchDonationData();
  }, [context, don_status]);

  const handleReturnHome = () => {
    navigate("/");
  };

  // Verifica dei parametri e rendering dei messaggi appropriati
  if (context && don_status === "success") {
    return (
      <div>
        <h2>Success donation da checkare</h2>
        {donationData && (
          <pre>{JSON.stringify(donationData, null, 2)}</pre> // Mostra i dati della donazione in formato JSON
        )}
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

  return null; // Gestione di altri casi se necessario
};

export default DonationCallback;
