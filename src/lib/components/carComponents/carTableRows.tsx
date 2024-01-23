import CarService from "../../services/cars/carService";
interface CarTableRowProps {
  car: any;
  onModify: (id: number) => void;
}

const CarTableRow: React.FC<CarTableRowProps> = ({ car, onModify }) => {
  const handleModify = () => {
    onModify(car);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (isConfirmed) {
      try {
        console.log("Car To Delete:", car.id);
        await CarService.deleteCarById(car.id);
        console.log("Car deleted successfully");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  return (
    <tr key={car.id}>
      <td className="data-cell">{car.id}</td>
      <td className="data-cell">{car.brand}</td>
      <td className="data-cell">{car.model}</td>
      <td className="data-cell">{car.transmission}</td>
      <td className="data-cell">{car.passengers}</td>
      <td className="data-cell">{car.air_conditioning ? "Yes" : "No"}</td>
      <td className="data-cell">{car.color}</td>
      <td className="data-cell">{car.kms}</td>
      <td className="data-cell">{car.year}</td>
      <td>
        <button className="button is-danger is-small" onClick={handleDelete}>
          Delete
        </button>
        <button className="button is-warning is-small" onClick={handleModify}>
          Modify
        </button>
      </td>
    </tr>
  );
};

export default CarTableRow;
