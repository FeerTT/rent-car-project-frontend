import ICar from "../../entities/ICar";
import CarService from "../../services/cars/carService";
import { useState } from "react";

const CreateCarForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    transmission: "Automatic",
    passengers: 0,
    air_conditioning: false,
    color: "",
    kms: 0,
    year: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createdCar: ICar = await CarService.createCar(formData);
      console.log("Car created successfully:", createdCar);
      window.location.reload();
    } catch (error) {
      console.error("Error creating car:", error);
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
      <h1 className="title has-text-centered">Create New Car</h1>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form id="carForm" className="box" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="brand">
                  Brand:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="brand"
                    name="brand"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="model">
                  Model:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="model"
                    name="model"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="transmission">
                  Transmission:
                </label>
                <div className="control">
                  <div className="select">
                    <select
                      id="transmission"
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="passengers">
                  Passengers:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="passengers"
                    name="passengers"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="air_conditioning">
                  Air Conditioning:
                </label>
                <div className="control">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      id="air_conditioning"
                      name="air_conditioning"
                      onChange={handleInputChange}
                    />
                    Air Conditioning
                  </label>
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="color">
                  Color:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="color"
                    name="color"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="kms">
                  Kilometers:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="kms"
                    name="kms"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="year">
                  Year:
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    id="year"
                    name="year"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Create Car
                  </button>
                  <a className="button is-primary" href="/cars">
                    Return
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCarForm;
