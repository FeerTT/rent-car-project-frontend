import customerService from "../../services/customers/customerService";
import React, { useEffect, useState } from "react";
import CustomerTable from "../../components/customerComponents/customerTable";
import ICustomer from "../../entities/ICustomer";
import { ModifyCustomerModalContent } from "../../components/customerComponents/modifyCustomer";
const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
  const [isModifyModalVisible, setModifyModalVisibility] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await customerService.getAllCustomers();
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);
  const handleModify = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setModifyModalVisibility(true);
  };

  const closeModifyModal = () => {
    setModifyModalVisibility(false);
  };

  const handleDelete = async (customerId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (isConfirmed) {
      try {
        await customerService.deleteCustomerById(customerId);
        const updatedCustomers = customers.filter(
          (customer) => customer.id !== customerId
        );
        setCustomers(updatedCustomers);
        console.log(`Customer with ID ${customerId} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting customer with ID ${customerId}:`, error);
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  return (
    <div className="container" style={{ margin: "2rem auto" }}>
      <h2 className="title">Customer List</h2>
      <CustomerTable
        customers={customers}
        onDelete={handleDelete}
        onModify={handleModify}
      />
      {/* <button className="button is-primary">Return</button> */}
      {isModifyModalVisible && selectedCustomer && (
        <ModifyCustomerModalContent
          customer={selectedCustomer}
          onClose={closeModifyModal}
        />
      )}
    </div>
  );
};

export default CustomersPage;
