import React from "react";
import CarRoutes from "./routes/carRoutes/carRoutes";
import "bulma/css/bulma.min.css";
import CustomerRoutes from "./routes/customerRoutes/customerRoutes";
import RentRoutes from "./routes/rentRoutes/rentRoutes";

function App() {
  document.title = "Rent Car Project";
  const handleRedirect = (path: string) => {
    window.location.href = `http://localhost:3000${path}`;
  };
  return (
    <div className="App">
      <div className="buttons is-centered mt-6">
        <button
          className="button is-primary is-fullwidth-mobile mb-3"
          onClick={() => handleRedirect("/cars")}
        >
          Car List
        </button>
        <button
          className="button is-primary is-fullwidth-mobile mb-3"
          onClick={() => handleRedirect("/cars/create")}
        >
          Create new Car
        </button>
        <button
          className="button is-primary is-fullwidth-mobile mb-3"
          onClick={() => handleRedirect("/customers")}
        >
          Customer List
        </button>
        <button
          className="button is-primary is-fullwidth-mobile"
          onClick={() => handleRedirect("/customers/create")}
        >
          Create new Customer
        </button>
        <button
          className="button is-primary is-fullwidth-mobile mb-3"
          onClick={() => handleRedirect("/rents")}
        >
          Rent List
        </button>
        <button
          className="button is-primary is-fullwidth-mobile mb-3"
          onClick={() => handleRedirect("/rents/create")}
        >
          Create new Rent
        </button>
      </div>
      <CarRoutes />
      <CustomerRoutes />
      <RentRoutes />
    </div>
  );
}

export default App;
