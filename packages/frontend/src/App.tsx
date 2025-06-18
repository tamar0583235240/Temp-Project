import React from "react";
import { Routes, Route } from "react-router-dom";
import Simulation from "./features/interview/components/Simulation";
import Summary from "./features/interview/components/Summary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Simulation />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  );
}

export default App;
