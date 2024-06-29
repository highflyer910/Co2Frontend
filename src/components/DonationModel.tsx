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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [donation, setDonation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL_BE}/donation/${donationId}`
        );
        console.log("response", response);
        setDonation(response.data.data.doc);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donation details:", error);
        setError("Error fetching donation details");
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchDonationDetails();
    }
  }, [donationId, isOpen]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!donation) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Donation Details</h2>
        <p>
          Amount: {donation.amount} {donation.currency}
        </p>
        <p>Group ID: {donation.groupId}</p>
        <p>Project Name: {donation.nameProject}</p>
        <p>Project Location: {donation.locationProject}</p>
        <p>
          Units: {donation.units} {donation.unitType}
        </p>
        <p>Date: {new Date(donation.paymentDate).toLocaleString()}</p>
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
