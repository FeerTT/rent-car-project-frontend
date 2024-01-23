import React from "react";
import CarRoutes from "./routes/carRoutes/carRoutes";
import "bulma/css/bulma.min.css";
function App() {
  document.title = "Rent Car Project";

  return (
    <div className="App">
      <CarRoutes />
    </div>
  );
}

export default App;
