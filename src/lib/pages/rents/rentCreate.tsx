import React, { useState, useEffect } from "react";
import RentService from "../../services/rents/rentService";
import ICustomer from "../../entities/ICustomer";
import ICar from "../../entities/ICar";
import CarService from "../../services/cars/carService";
import customerService from "../../services/customers/customerService";

interface CreateRentFormProps {}

const CreateRentForm: React.FC<CreateRentFormProps> = () => {
  const [formData, setFormData] = useState({
    carId: 0,
    customerId: 0,
    unitPrice: 0,
    startDate: "",
    endDate: "",
    totalPrice: 0,
    paymentMethod: "card",
    isPaid: false,
  });

  const [cars, setCars] = useState<ICar[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    const fetchCarsAndCustomers = async () => {
      try {
        const carsData = await CarService.getAllCars();
        const customersData = await customerService.getAllCustomers();
        setCars(carsData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching cars and customers:", error);
      }
    };

    fetchCarsAndCustomers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await RentService.createRent(formData);
      setFormData({
        carId: 0,
        customerId: 0,
        unitPrice: 0,
        startDate: "",
        endDate: "",
        totalPrice: 0,
        paymentMethod: "card",
        isPaid: false,
      });
      window.alert("Rent created successfully!");
    } catch (error) {
      console.error("Error creating rent:", error);
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
      <h1 className="title has-text-centered">Create New Rent</h1>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form id="rentForm" className="box" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="carId">
                  Cars:
                </label>
                <div className="control">
                  <div className="select">
                    <select
                      id="carId"
                      name="carId"
                      value={formData.carId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value={0} disabled>
                        Select a car
                      </option>
                      {cars.map((car) => (
                        <option key={car.id} value={car.id}>
                          {car.id} - {car.brand}, {car.model}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="customerId">
                  Customers:
                </label>
                <div className="control">
                  <div className="select">
                    <select
                      id="customerId"
                      name="customerId"
                      value={formData.customerId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value={0} disabled>
                        Select a customer
                      </option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.id} - {customer.firstName},{" "}
                          {customer.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="unitPrice">
                  Unit Price:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="unitPrice"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="startDate">
                  Start Date:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="endDate">
                  End Date:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="totalPrice">
                  Total Price:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="totalPrice"
                    name="totalPrice"
                    value={formData.totalPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="paymentMethod">
                  Payment Method:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="isPaid">
                  Is Paid:
                </label>
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      id="isPaid"
                      name="isPaid"
                      checked={formData.isPaid}
                      onChange={handleInputChange}
                    />{" "}
                    Paid
                  </label>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Create Rent
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

export default CreateRentForm;
