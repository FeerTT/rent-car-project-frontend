const apiUrl = process.env.REACT_APP_API_BASE_URL;

const RentService = {
  getAllRents: async () => {
    try {
      const response = await fetch(`${apiUrl}/rents`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching rents");
    }
  },

  getRentById: async (rentId: number) => {
    try {
      const response = await fetch(`${apiUrl}/rents/${rentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching rent by ID");
    }
  },

  createRent: async (newRentData: any) => {
    try {
      const response = await fetch(`${apiUrl}/rents`, {
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
      const response = await fetch(`${apiUrl}/rents/${rentId}`, {
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
      const response = await fetch(`${apiUrl}/rents/${rentId}`, {
        method: "DELETE",
      });
      await response.json();
    } catch (error) {
      throw new Error("Error deleting rent");
    }
  },
};

export default RentService;
