import { useState } from "react";

import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navbar />
      <main className="mt-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
