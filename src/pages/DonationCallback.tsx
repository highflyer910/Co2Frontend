import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DonationCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const context = queryParams.get("context");
  const don_status = queryParams.get("don_status");

  console.log({ context });
  console.log({ don_status });

  const handleReturnHome = () => {
    navigate("/");
  };

  // Verifica dei parametri e rendering dei messaggi appropriati
  if (context && don_status === "success") {
    return <div>Success donation da checkare</div>;
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
