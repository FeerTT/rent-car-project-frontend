import React, { useState, useEffect } from "react";
import RentService from "../../services/rents/rentService";
import RentTableRow from "../../components/rentComponents/rentTable";
import ModifyRentModal from "../../components/rentComponents/modifyRent";
interface IRent {
  id?: number;
  carId?: number;
  customerId?: number;
  startDate?: string;
  totalPrice?: number;
  unitPrice?: number;
  isPaid?: boolean;
  paymentMethod?: string;
  createdAt?: string;
  updatedAt?: string;
}

const RentsPage: React.FC = () => {
  const [rents, setRents] = useState<any[]>([]);
  const [selectedRent, setSelectedRent] = useState<IRent | null>(null);
  const [isModifyModalVisible, setModifyModalVisibility] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentsData = await RentService.getAllRents();
        setRents(rentsData.data);
      } catch (error) {
        console.error("Error fetching rents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="notification has-text-centered">
        <p>Loading...</p>
      </div>
    );
  }
  const openModifyModal = (rent: IRent) => {
    setSelectedRent(rent);
    setModifyModalVisibility(true);
  };

  const closeModifyModal = () => {
    setModifyModalVisibility(false);
  };

  const handleDelete = async (rentId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this rent?"
    );
    if (isConfirmed) {
      try {
        await RentService.deleteRentById(rentId);
        const updatedRents = rents.filter((rent) => rent.id !== rentId);
        setRents(updatedRents);
      } catch (error) {
        console.error("Error deleting rent:", error);
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  return (
    <div className="container" style={{ margin: "2rem auto" }}>
      <h2 className="title">Rents List</h2>
      <RentTableRow
        rents={rents}
        onModify={openModifyModal}
        onDelete={handleDelete}
      />
      {isModifyModalVisible && selectedRent && (
        <div id="modifyModal" className="modal is-active">
          <div className="modal-background" onClick={closeModifyModal}></div>
          <div className="modal-content">
            <ModifyRentModal rent={selectedRent} />
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

export default RentsPage;
