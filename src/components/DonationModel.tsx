import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

interface DonationModalProps {
  donationId: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  donationId,
  isOpen,
  onRequestClose,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [donation, _] = useState<any>(null);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        // `${import.meta.env.VITE_APP_BASE_URL_BE}/verify-jwt`,
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL_BE}/donation/${donationId}`
        );
        console.log("response", response);
        // setDonation(response.data.data.doc);
      } catch (error) {
        console.error("Error fetching donation details:", error);
      }
    };

    if (isOpen) {
      fetchDonationDetails();
    }
  }, [donationId, isOpen]);

  if (!donation) {
    return <div>Loading...</div>;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Donation Details</h2>
        {/* <p>Amount: {donation.amount}</p>
        <p>Group: {donation.group}</p>
        <p>Date: {new Date(donation.createdAt).toLocaleString()}</p>
        Aggiungi ulteriori dettagli della donazione qui */}
        <button
          onClick={onRequestClose}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default DonationModal;
