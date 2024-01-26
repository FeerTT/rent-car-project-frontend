import React, { useState, useEffect } from "react";
import ICar from "../../entities/ICar";
import ICustomer from "../../entities/ICustomer";
import RentService from "../../services/rents/rentService";
import CarService from "../../services/cars/carService";
import customerService from "../../services/customers/customerService";

interface ModifyRentModalContentProps {
  rent: any;
}

const ModifyRentModal: React.FC<ModifyRentModalContentProps> = ({ rent }) => {
  const [formData, setFormData] = useState({
    carId: rent.carId || (rent.data && rent.data.carId),
    customerId: rent.customerId || (rent.data && rent.data.customerId),
    unitPrice: rent.unitPrice || (rent.data && rent.data.unitPrice),
    startDate: rent.startDate
      ? new Date(rent.startDate).toISOString().split("T")[0]
      : rent.data && rent.data.startDate
      ? new Date(rent.data.startDate).toISOString().split("T")[0]
      : "",
    endDate:
      rent.data && rent.data.endDate
        ? new Date(rent.data.endDate).toISOString().split("T")[0]
        : rent.endDate
        ? new Date(rent.endDate).toISOString().split("T")[0]
        : "",
    totalPrice: rent.totalPrice || (rent.data && rent.data.totalPrice),
    paymentMethod:
      rent.paymentMethod || (rent.data && rent.data.paymentMethod) || "cash",
    isPaid: rent.isPaid || (rent.data && rent.data.isPaid) || false,
  });

  const [cars, setCars] = useState<ICar[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCarsAndCustomers = async () => {
      try {
        const carsData = await CarService.getAllCars();
        const customersData = await customerService.getAllCustomers();
        setCars(carsData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching cars and customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarsAndCustomers();
  }, []);
  if (loading) {
    return (
      <div className="notification has-text-centered">
        <p>Loading...</p>
      </div>
    );
  }
  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleModify = async () => {
    try {
      await RentService.updateRent(
        (rent.id as number) || (rent.data.id as number),
        formData
      );
      console.log("Rent updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating rent:", error);
    }
  };

  return (
    <>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modify Rent</p>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label" htmlFor="carIdModify">
              Car ID, Brand, Model:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="carIdModify"
                  name="carIdModify"
                  value={formData.carId}
                  onChange={(e) => handleFieldChange("carId", e.target.value)}
                >
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
            <label className="label" htmlFor="customerIdModify">
              Customer ID, First Name, Last Name:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="customerIdModify"
                  name="customerIdModify"
                  value={formData.customerId}
                  onChange={(e) =>
                    handleFieldChange("customerId", e.target.value)
                  }
                >
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.id} - {customer.firstName}, {customer.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="unitPriceModify">
              Unit Price:
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                id="unitPriceModify"
                name="unitPriceModify"
                value={formData.unitPrice}
                onChange={(e) => handleFieldChange("unitPrice", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="startDateModify">
              Start Date:
            </label>
            <div className="control">
              <input
                className="input"
                type="date"
                id="startDateModify"
                name="startDateModify"
                value={formData.startDate}
                onChange={(e) => handleFieldChange("startDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="endDateModify">
              End Date:
            </label>
            <div className="control">
              <input
                className="input"
                type="date"
                id="endDateModify"
                name="endDateModify"
                value={formData.endDate}
                onChange={(e) => handleFieldChange("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="totalPriceModify">
              Total Price:
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                id="totalPriceModify"
                name="totalPriceModify"
                value={formData.totalPrice}
                onChange={(e) =>
                  handleFieldChange("totalPrice", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="paymentMethodModify">
              Payment Method (cash,card):
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="paymentMethodModify"
                name="paymentMethodModify"
                value={formData.paymentMethod}
                onChange={(e) =>
                  handleFieldChange("paymentMethod", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="isPaidModify">
              Is Paid:
            </label>
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  id="isPaidModify"
                  name="isPaidModify"
                  checked={formData.isPaid}
                  onChange={(e) =>
                    handleFieldChange("isPaid", e.target.checked)
                  }
                />{" "}
                Paid
              </label>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-warning" onClick={handleModify}>
            Modify
          </button>
        </footer>
      </div>
    </>
  );
};

export default ModifyRentModal;
