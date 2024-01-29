const API_BASE_URL = "https://rentcarproject-jt0m.onrender.com";

const RentService = {
  getAllRents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rents`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching rents");
    }
  },

  getRentById: async (rentId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rents/${rentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching rent by ID");
    }
  },

  createRent: async (newRentData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRentData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error creating rent");
    }
  },

  updateRent: async (rentId: number, updatedRentData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rents/${rentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRentData),
      });
      await response.json();
    } catch (error) {
      throw new Error("Error updating rent");
    }
  },

  deleteRentById: async (rentId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rents/${rentId}`, {
        method: "DELETE",
      });
      await response.json();
    } catch (error) {
      throw new Error("Error deleting rent");
    }
  },
};

export default RentService;
