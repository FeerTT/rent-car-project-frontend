import { useState, useEffect } from "react";
import CarService from "../../services/cars/carService";
import ICar from "../../entities/ICar";

const CarLists = () => {
  const [cars, setCars] = useState<ICar[]>([]);

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
  return cars;
};

export default CarLists;
