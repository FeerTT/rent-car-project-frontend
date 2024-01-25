import React, { useState } from "react";
import customerService from "../../services/customers/customerService";

interface ModifyCustomerModalContentProps {
  customer: any;
  onClose: () => void;
}

export const ModifyCustomerModalContent: React.FC<
  ModifyCustomerModalContentProps
> = ({ customer, onClose }) => {
  const [formData, setFormData] = useState({
    id: customer.id,
    firstName: customer.firstName || customer.data?.firstName || "",
    lastName: customer.lastName || customer.data?.lastName || "",
    email: customer.email || customer.data?.email || "",
    phone: customer.phone || customer.data?.phone || "",
    documentType: customer.documentType || customer.data?.documentType || "DNI",
    documentNumber:
      customer.documentNumber || customer.data?.documentNumber || "",
    address: customer.address || customer.data?.address || "",
    nationality: customer.nationality || customer.data?.nationality || "",
    birthDate: customer.birthDate || customer.data?.birthDate || "",
  });

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleModify = async () => {
    try {
      await customerService.updateCustomer(
        customer.id || customer.data.id,
        formData
      );
      console.log("Customer updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content has-text-left">
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modify Customer</p>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label" htmlFor="firstNameModify">
                First Name:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="firstNameModify"
                  name="firstNameModify"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="lastNameModify">
                Last Name:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="lastNameModify"
                  name="lastNameModify"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="emailModify">
                Email:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  id="emailModify"
                  name="emailModify"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="phoneModify">
                Phone:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="tel"
                  id="phoneModify"
                  name="phoneModify"
                  value={formData.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="documentTypeModify">
                Document Type:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="documentTypeModify"
                  name="documentTypeModify"
                  value={formData.documentType}
                  onChange={(e) =>
                    handleFieldChange("documentType", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="documentNumberModify">
                Document Number:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  id="documentNumberModify"
                  name="documentNumberModify"
                  value={formData.documentNumber}
                  onChange={(e) =>
                    handleFieldChange(
                      "documentNumber",
                      parseInt(e.target.value, 10)
                    )
                  }
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="nationalityModify">
                Nationality:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="nationalityModify"
                  name="nationalityModify"
                  value={formData.nationality}
                  onChange={(e) =>
                    handleFieldChange("nationality", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="birthDateModify">
                Birth Date:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  id="birthDateModify"
                  name="birthDateModify"
                  value={formData.birthDate}
                  onChange={(e) =>
                    handleFieldChange("birthDate", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="addressModify">
                Address:
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="addressModify"
                  name="addressModify"
                  value={formData.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  required
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-warning" onClick={handleModify}>
              Modify
            </button>
            <button className="button is-danger" onClick={onClose}>
              Cancelar
            </button>
          </footer>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
};
