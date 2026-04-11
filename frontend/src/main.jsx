import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/AuthPages/Register.jsx";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Login from "./pages/AuthPages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Recommendations from './pages/Recommendations.jsx'
import Choose from './pages/recommendation/Choose.jsx'
import Men from './pages/recommendation/Men.jsx'
import Women from './pages/recommendation/Women.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="/recommendations" element={<ProtectedRoute><Choose /></ProtectedRoute>} />
          <Route path="/recommendations/girls" element={<ProtectedRoute><Women /></ProtectedRoute>} />
          <Route path="/recommendations/boys" element={<ProtectedRoute><Men /></ProtectedRoute>} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>

      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
