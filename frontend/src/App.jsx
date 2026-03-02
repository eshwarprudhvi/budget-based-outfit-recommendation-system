import { useState } from "react";

import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <main className="mt-5">
        <Outlet />
      </main>
    </>
  );
}

export default App;
