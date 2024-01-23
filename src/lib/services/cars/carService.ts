import ICar from "../../entities/ICar";
const API_BASE_URL = "https://rentcarproject-jt0m.onrender.com";

const CarService = {
  getAllCars: async (): Promise<ICar[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const cars = await response.json();
      return cars;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw error;
    }
  },

  getCarById: async (carId: number): Promise<ICar | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars/${carId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const car = await response.json();
      return car;
    } catch (error) {
      console.error(`Error fetching car ${carId}:`, error);
      throw error;
    }
  },
  updateCarById: async (carId: number, updatedCarData: ICar): Promise<ICar> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCarData),
      });
      if (!response.ok) {
        throw new Error(
          `Error al actualizar el automóvil: ${response.statusText}`
        );
      }
      const updatedCar: ICar = await response.json();
      return updatedCar;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteCarById: async (carId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars/${carId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting car with ID ${carId}`);
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      throw error;
    }
  },
  createCar: async (carData: ICar): Promise<ICar> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create car. Status: ${response.status}`);
      }
      const createdCar: ICar = await response.json();
      return createdCar;
    } catch (error) {
      console.error("Error creating car:", error);
      throw error;
    }
  },
};

export default CarService;
