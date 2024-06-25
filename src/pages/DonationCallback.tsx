import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DonationCallback: React.FC = () => {
  const { context, status } = useParams<{
    context?: string;
    status?: string;
  }>();
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  // Verifica dei parametri e rendering dei messaggi appropriati
  if (context && status === "success") {
    return <div>Success donation da checkare</div>;
  } else if (!context || !status) {
    return (
      <div>
        <p>Transazione non completata o con errori</p>
        <button onClick={handleReturnHome}>Torna alla Home</button>
      </div>
    );
  } else if (context && status !== "success") {
    return <div>Donazione ricevuta ma ancora non completata</div>;
  }

  return null; // Gestione di altri casi se necessario
};

export default DonationCallback;
