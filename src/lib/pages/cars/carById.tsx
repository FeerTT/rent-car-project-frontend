import React, { useEffect, useState } from "react";
import CarService from "../../services/cars/carService";
import { useParams } from "react-router-dom";
import CarTableRow from "../../components/carComponents/carTable";
import ModifyModalContent from "../../components/carComponents/modifyCar";
import { Link } from "react-router-dom";
interface CarByIdProps {
  carId: number;
}

export const CarByIdWrapper: React.FC = () => {
  const { carId } = useParams();

  const parsedCarId = carId ? parseInt(carId, 10) : NaN;
  console.log("Parsed Car ID:", parsedCarId);
  return <CarById carId={parsedCarId} />;
};

const CarById: React.FC<CarByIdProps> = ({ carId }) => {
  const [car, setCar] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModifyModalVisible, setModifyModalVisibility] = useState(false);

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        if (isNaN(carId)) {
          setError("Invalid car ID");
          return;
        }
        const fetchedCar = await CarService.getCarById(carId);
        setCar(fetchedCar);
      } catch (error) {
        console.error("Error fetching car by ID:", error);
      }
    };
    fetchCarById();
  }, [carId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModifyModal = (car: any) => {
    setModifyModalVisibility(true);
  };

  const closeModifyModal = () => {
    setModifyModalVisibility(false);
  };

  const handleDelete = async (car: any) => {
    if (car) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this car?"
      );
      if (isConfirmed) {
        try {
          await CarService.deleteCarById(car);
          console.log("Car deleted successfully");
          window.location.reload();
        } catch (error) {
          console.error("Error deleting car:", error);
        }
      } else {
        console.log("Deletion canceled by user");
      }
    } else {
      console.error("Car or car ID is undefined");
    }
  };

  return (
    <div className="container" style={{ margin: "2rem auto" }}>
      <h2 className="title">Car Details</h2>

      {car && car.data ? (
        <CarTableRow
          cars={[car.data]}
          onModify={() => openModifyModal(car.data)}
          onDelete={() => handleDelete(car.data.id)}
        />
      ) : (
        <div>No car found</div>
      )}
      <br></br>
      <Link to={`/cars`}>
        <button className="button is-primary">Return</button>
      </Link>
      {isModifyModalVisible && (
        <div id="modifyModal" className="modal is-active">
          <div className="modal-background" onClick={closeModifyModal}></div>
          <div className="modal-content">
            <ModifyModalContent car={car} />
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

export default CarById;
