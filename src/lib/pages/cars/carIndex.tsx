import ModifyModalContent from "../../components/carComponents/modifyCar";
import { useState, useEffect } from "react";
import CarTableRow from "../../components/carComponents/carTable";
import ICar from "../../entities/ICar";
import CarService from "../../services/cars/carService";

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [isModifyModalVisible, setModifyModalVisibility] = useState(false);

  const openModifyModal = (car: any) => {
    setSelectedCar(car);
    setModifyModalVisibility(true);
  };

  const closeModifyModal = () => {
    setModifyModalVisibility(false);
  };

  const handleDelete = async (carId: any) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (isConfirmed) {
      try {
        console.log("Car To Delete:", carId);
        await CarService.deleteCarById(carId);
        console.log("Car deleted successfully");
        const updatedCars = cars.filter((car) => car.id !== carId);
        setCars(updatedCars);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsData = await CarService.getAllCars();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container" style={{ margin: "2rem auto" }}>
      <h2 className="title">Cars List</h2>
      <CarTableRow
        cars={cars}
        onModify={openModifyModal}
        onDelete={handleDelete}
      />
      {/* <button className="button is-primary">Return</button> */}
      {isModifyModalVisible && selectedCar && (
        <div id="modifyModal" className="modal is-active">
          <div className="modal-background" onClick={closeModifyModal}></div>
          <div className="modal-content">
            <ModifyModalContent car={selectedCar} />
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

export default CarsPage;
