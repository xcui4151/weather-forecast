import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const currentUser = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;