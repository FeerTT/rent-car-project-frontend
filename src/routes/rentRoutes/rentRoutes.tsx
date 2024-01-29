import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import RentsPage from "../../lib/pages/rents/rentIndex";
import CreateRentForm from "../../lib/pages/rents/rentCreate";
import { RentByIdWrapper } from "../../lib/pages/rents/rentById";

const RentRoutes: React.FC = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/rents" element={<RentsPage />} />
        <Route path="/rents/create" element={<CreateRentForm />} />
        <Route path="/rents/:rentId" element={<RentByIdWrapper />} />
      </RouterRoutes>
    </Router>
  );
};

export default RentRoutes;
