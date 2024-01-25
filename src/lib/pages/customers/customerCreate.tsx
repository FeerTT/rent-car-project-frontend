import React, { useState } from "react";
import customerService from "../../services/customers/customerService";
import ICustomer from "../../entities/ICustomer";

const CreateCustomerForm: React.FC = () => {
  const [formData, setFormData] = useState<ICustomer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    documentType: "",
    documentNumber: 0,
    nationality: "",
    birthDate: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createdCustomer = await customerService.createCustomer(formData);
      console.log("Customer created successfully:", createdCustomer);
      window.location.reload();
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <section className="section">
      <h1 className="title has-text-centered">Create New Customer</h1>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form id="customerForm" className="box" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="firstName">
                  First Name:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="lastName">
                  Last Name:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="email">
                  Email:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="phone">
                  Phone:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="documentType">
                  Document Type:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="documentType"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="documentNumber">
                  Document Number:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="documentNumber"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="nationality">
                  Nationality:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="birthDate">
                  Birth Date:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="address">
                  Address:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Create Customer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCustomerForm;
