import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import CarsPage from "../../lib/pages/cars/carIndex";
import CreateCarForm from "../../lib/pages/cars/createCar";
import { CarByIdWrapper } from "../../lib/pages/cars/carById";

const CarRoutes: React.FC = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/create" element={<CreateCarForm />} />
        <Route path="/cars/:carId" element={<CarByIdWrapper />} />
      </RouterRoutes>
    </Router>
  );
};

export default CarRoutes;
