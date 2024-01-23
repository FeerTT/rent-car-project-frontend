import React, { useEffect, useState } from "react";
import CarService from "../../services/cars/carService";
import { useParams } from "react-router-dom";

interface CarByIdProps {
  carId: number;
}

export const CarByIdWrapper: React.FC = () => {
  const { carId } = useParams();

  const parsedCarId = carId ? parseInt(carId, 10) : NaN;

  return <CarById carId={parsedCarId} />;
};

// Componente CarById.tsx
const CarById: React.FC<CarByIdProps> = ({ carId }) => {
  const [car, setCar] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        if (isNaN(carId)) {
          setError("Invalid car ID");
          return;
        }

        const fetchedCar = await CarService.getCarById(carId);
        setCar(fetchedCar);
        console.log(fetchedCar, "ASDIASDASKJDJKASDKJASJKDASKJDAS");
      } catch (error) {
        console.error("Error fetching car by ID:", error);
        setError("Error fetching car details");
      }
    };

    fetchCarById();
  }, [carId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ margin: "2rem auto" }}>
      <h2 className="title">Car Details</h2>
      <table className="table is-bordered is-fullwidth is-hoverable is-striped is-narrow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Air Conditioning</th>
            <th>Color</th>
            <th>Kilometers</th>
            <th>Passengers</th>
            <th>Transmission</th>
            <th>Year</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{car.data.id}</td>
            <td>{car.data.brand}</td>
            <td>{car.data.model}</td>
            <td>{car.data.air_conditioning ? "Yes" : "No"}</td>
            <td>{car.data.color}</td>
            <td>{car.data.kms}</td>
            <td>{car.data.passengers}</td>
            <td>{car.data.transmission}</td>
            <td>{car.data.year}</td>
            <td>{car.data.createdAt}</td>
            <td>{car.data.updatedAt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CarById;
