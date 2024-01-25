import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerTableRow from "../../components/customerComponents/customerTable";
import { ModifyCustomerModalContent } from "../../components/customerComponents/modifyCustomer";
import customerService from "../../services/customers/customerService";
import ICustomer from "../../entities/ICustomer";

interface CustomerByIdProps {
  customerId: number;
}

export const CustomerByIdWrapper: React.FC = () => {
  const { customerId } = useParams();

  const parsedCustomerId = customerId ? parseInt(customerId, 10) : NaN;
  return <CustomerById customerId={parsedCustomerId} />;
};

const CustomerById: React.FC<CustomerByIdProps> = ({ customerId }) => {
  const [customer, setCustomer] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModifyModalVisible, setModifyModalVisibility] = useState(false);

  useEffect(() => {
    const fetchCustomerById = async () => {
      try {
        if (isNaN(customerId)) {
          setError("Invalid customer ID");
          return;
        }
        const fetchedCustomer = await customerService.getCustomerById(
          customerId
        );
        setCustomer(fetchedCustomer);
      } catch (error) {
        console.error("Error fetching customer by ID:", error);
        setError("Error fetching customer details");
      }
    };
    fetchCustomerById();
  }, [customerId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModifyModal = (customer: ICustomer) => {
    setModifyModalVisibility(true);
  };

  const closeModifyModal = () => {
    setModifyModalVisibility(false);
  };

  const handleDelete = async (customerId: any) => {
    if (customerId) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this customer?"
      );
      if (isConfirmed) {
        try {
          console.log("Customer To Delete:", customerId);
          await customerService.deleteCustomerById(customerId);
          console.log("Customer deleted successfully");
          window.location.reload();
        } catch (error) {
          console.error("Error deleting customer:", error);
        }
      } else {
        console.log("Deletion canceled by user");
      }
    } else {
      console.error("Customer or customer ID is undefined");
    }
  };

  return (
    <div className="container" style={{ margin: "2rem auto" }}>
      <h2 className="title">Customer Details</h2>
      {customer && customer.data ? (
        <CustomerTableRow
          customers={[customer.data]}
          onModify={() => openModifyModal(customer.id)}
          onDelete={() => handleDelete(customer.data.id)}
        />
      ) : (
        <div>No customer found</div>
      )}
      <br></br>
      <button className="button is-primary">Return</button>
      {isModifyModalVisible && (
        <div id="modifyModal" className="modal is-active">
          <div className="modal-background" onClick={closeModifyModal}></div>
          <div className="modal-content">
            <ModifyCustomerModalContent
              customer={customer}
              onClose={closeModifyModal}
            />
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

export default CustomerById;
