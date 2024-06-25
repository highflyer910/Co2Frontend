import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Definizione dell'interfaccia per i dati della donazione
interface DonationDetails {
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

  // Parse dei parametri di query
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get("context");
  const don_status = queryParams.get("don_status");

  console.log({ context });
  console.log({ don_status });

  useEffect(() => {
    const fetchDonationData = async () => {
      if (context && don_status === "success") {
        try {
          const response = await fetch(
            `https://app.plant-for-the-planet.org/app/donations/${context}`
          );
          const data = await response.json();

          const donationDetails: DonationDetails = {
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
