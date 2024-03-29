const API_BASE_URL = "https://rentcarproject-jt0m.onrender.com";

const customerService = {
  getAllCustomers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching customers");
    }
  },

  getCustomerById: async (customerId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching customer by ID");
    }
  },

  createCustomer: async (newCustomerData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomerData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error creating customer");
    }
  },

  updateCustomer: async (customerId: number, updatedCustomerData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCustomerData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error updating customer");
    }
  },

  deleteCustomerById: async (customerId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error deleting customer");
    }
  },
};

export default customerService;
