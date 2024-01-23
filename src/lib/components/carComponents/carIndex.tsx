import ICarTable from "../../entities/ICarTable";
import ModifyModalContent from "./modifyCar";
import { useState } from "react";
import CarLists from "../../hooks/carHooks/getCars";
import CarTableRow from "./carTableRows";
import ICar from "../../entities/ICar";

const CarTable: React.FC<ICarTable> = () => {
  const [isModifyModalVisible, setModifyModalVisibility] = useState(false);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const cars = CarLists();

  const openModifyModal = (car: any) => {
    setSelectedCar(car);
    console.log("Opening Modify Modal");
    setModifyModalVisibility(true);
  };

  const closeModifyModal = () => {
    setModifyModalVisibility(false);
  };

  return (
    <div className="container" style={{ margin: "2rem auto" }}>
      <h2 className="title">Cars List</h2>
      <div className="table-container" style={{ overflowX: "auto" }}>
        <table className="table is-bordered is-fullwidth is-hoverable is-striped is-narrow">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Transmission</th>
              <th>Passengers</th>
              <th>Air conditioning</th>
              <th>Color</th>
              <th>Kms</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <CarTableRow key={car.id} car={car} onModify={openModifyModal} />
            ))}
          </tbody>
        </table>
      </div>

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

export default CarTable;
