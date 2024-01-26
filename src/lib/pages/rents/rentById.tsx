import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RentTableRow from "../../components/rentComponents/rentTable";
import ModifyRentModal from "../../components/rentComponents/modifyRent";
import RentService from "../../services/rents/rentService";

interface RentByIdProps {
  rentId: number;
}

export const RentByIdWrapper: React.FC = () => {
  const { rentId } = useParams();

  const parsedRentId = rentId ? parseInt(rentId, 10) : NaN;
  return <RentById rentId={parsedRentId} />;
};

const RentById: React.FC<RentByIdProps> = ({ rentId }) => {
  const [rent, setRent] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModifyModalVisible, setModifyModalVisibility] = useState(false);

  useEffect(() => {
    const fetchRentById = async () => {
      try {
        if (isNaN(rentId)) {
          setError("Invalid rent ID");
          return;
        }
        const fetchedRent = await RentService.getRentById(rentId);
        setRent(fetchedRent);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching rent by ID:", error);
        setError("Error fetching rent details");
        setIsLoading(false);
      }
    };
    fetchRentById();
  }, [rentId]);

  if (isLoading) {
    return (
      <div className="notification has-text-centered is-size-3">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModifyModal = (rent: any) => {
    setModifyModalVisibility(true);
  };

  const closeModifyModal = () => {
    setModifyModalVisibility(false);
  };

  const handleDelete = async (rentId: any) => {
    if (rentId) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this rent?"
      );
      if (isConfirmed) {
        try {
          console.log("Rent To Delete:", rentId);
          await RentService.deleteRentById(rentId);
          console.log("Rent deleted successfully");
          window.location.reload();
        } catch (error) {
          console.error("Error deleting rent:", error);
        }
      } else {
        console.log("Deletion canceled by user");
      }
    } else {
      console.error("Rent or rent ID is undefined");
    }
  };

  return (
    <div className="container" style={{ margin: "2rem auto" }}>
      <h2 className="title">Rent Details</h2>
      {rent && rent.data ? (
        <RentTableRow
          rents={[rent.data]}
          onModify={() => openModifyModal(rent.data)}
          onDelete={() => handleDelete(rent.data.id)}
        />
      ) : (
        <div className="notification has-text-centered is-size-3">
          No rent found
        </div>
      )}
      <br />

      {isModifyModalVisible && (
        <div id="modifyModal" className="modal is-active">
          <div className="modal-background" onClick={closeModifyModal}></div>
          <div className="modal-content">
            <ModifyRentModal rent={rent} />
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeModifyModal}
          ></button>
        </div>
      )}
    </div>
  );
};

export default RentById;
