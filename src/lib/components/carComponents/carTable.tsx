import ICar from "../../entities/ICar";
import { Link } from "react-router-dom";
interface CarTableRowProps {
  cars: ICar[];
  onModify: (id: number) => void;
  onDelete: (id: any) => void;
}

const CarTableRow: React.FC<CarTableRowProps> = ({
  cars,
  onModify,
  onDelete,
}) => {
  const handleModify = (car: any) => {
    onModify(car);
  };

  return (
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
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {cars &&
            cars.map((car) => (
              <tr key={car.id}>
                <td className="data-cell">
                  <Link to={`/cars/${car.id}`}>{car.id}</Link>
                </td>
                <td className="data-cell">{car.brand}</td>
                <td className="data-cell">{car.model}</td>
                <td className="data-cell">{car.transmission}</td>
                <td className="data-cell">{car.passengers}</td>
                <td className="data-cell">
                  {car.air_conditioning ? "Yes" : "No"}
                </td>
                <td className="data-cell">{car.color}</td>
                <td className="data-cell">{car.kms}</td>
                <td className="data-cell">{car.year}</td>
                <td className="data-cell">
                  {car.createdAt ? car.createdAt.slice(0, 16) : ""}
                </td>
                <td>
                  <button
                    className="button is-danger is-small"
                    onClick={() => onDelete(car.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="button is-warning is-small"
                    onClick={() => handleModify(car)}
                  >
                    Modify
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTableRow;
