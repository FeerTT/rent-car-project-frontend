import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import CarTable from "../../lib/components/carComponents/carIndex";
import CreateCarForm from "../../lib/components/carComponents/createCar";
import { CarByIdWrapper } from "../../lib/components/carComponents/carById";

const CarRoutes: React.FC = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/cars" element={<CarTable />} />
        <Route path="/cars/create" element={<CreateCarForm />} />
        <Route path="/cars/:carId" element={<CarByIdWrapper />} />
      </RouterRoutes>
    </Router>
  );
};

export default CarRoutes;
