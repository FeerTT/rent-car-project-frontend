import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import CustomersPage from "../../lib/pages/customers/customerIndex";
import CreateCustomerForm from "../../lib/pages/customers/customerCreate";
import { CustomerByIdWrapper } from "../../lib/pages/customers/customerById";

const CustomerRoutes: React.FC = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/create" element={<CreateCustomerForm />} />
        <Route
          path="/customers/:customerId"
          element={<CustomerByIdWrapper />}
        />
      </RouterRoutes>
    </Router>
  );
};

export default CustomerRoutes;
