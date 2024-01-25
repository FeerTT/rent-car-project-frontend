import React, { useState } from "react";
import ICar from "../../entities/ICar";
import CarService from "../../services/cars/carService";

interface ModifyModalContentProps {
  car: ICar;
}

const ModifyModalContent: React.FC<ModifyModalContentProps> = (car: any) => {
  const [formData, setFormData] = useState({
    id: car.car.id || (car.car.data && car.car.data.id),
    brand: car.car.brand || (car.car.data && car.car.data.brand) || "",
    model: car.car.model || (car.car.data && car.car.data.model) || "",
    transmission:
      car.car.transmission ||
      (car.car.data && car.car.data.transmission) ||
      "Automatic",
    passengers:
      car.car.passengers || (car.car.data && car.car.data.passengers) || 0,
    air_conditioning:
      car.car.air_conditioning ||
      (car.car.data && car.car.data.air_conditioning) ||
      false,
    color: car.car.color || (car.car.data && car.car.data.color) || "",
    kms: car.car.kms || (car.car.data && car.car.data.kms) || 0,
    year: car.car.year || (car.car.data && car.car.data.year) || 0,
  });

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleModify = async () => {
    try {
      await CarService.updateCarById(car.car.id || car.car.data.id, formData);
      console.log("Car updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modify Car</p>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label" htmlFor="brandModify">
              Brand:
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="brandModify"
                name="brandModify"
                value={formData.brand}
                onChange={(e) => handleFieldChange("brand", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="modelModify">
              Model:
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="modelModify"
                name="modelModify"
                value={formData.model}
                onChange={(e) => handleFieldChange("model", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="transmissionModify">
              Transmission:
            </label>
            <div className="control">
              <div className="select">
                <select
                  id="transmissionModify"
                  name="transmissionModify"
                  value={formData.transmission}
                  onChange={(e) =>
                    handleFieldChange("transmission", e.target.value)
                  }
                  required
                >
                  <option value="Automatic">Automática</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="passengersModify">
              Passengers:
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                id="passengersModify"
                name="passengersModify"
                value={formData.passengers}
                onChange={(e) =>
                  handleFieldChange("passengers", parseInt(e.target.value, 10))
                }
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="air_conditioning">
              Air conditioning:
            </label>
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  id="air_conditioning"
                  name="air_conditioning"
                  checked={formData.air_conditioning}
                  onChange={(e) =>
                    handleFieldChange("air_conditioning", e.target.checked)
                  }
                />
                Air conditioning
              </label>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="colorModify">
              Color:
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="colorModify"
                name="colorModify"
                value={formData.color}
                onChange={(e) => handleFieldChange("color", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="kmsModify">
              Kms:
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                id="kmsModify"
                name="kmsModify"
                value={formData.kms}
                onChange={(e) =>
                  handleFieldChange("kms", parseInt(e.target.value, 10))
                }
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="yearModify">
              Year:
            </label>
            <div className="control">
              <input
                className="input"
                type="number"
                id="yearModify"
                name="yearModify"
                value={formData.year}
                onChange={(e) =>
                  handleFieldChange("year", parseInt(e.target.value, 10))
                }
                required
              />
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

export default ModifyModalContent;
