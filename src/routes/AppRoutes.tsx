import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Users from "../pages/Users";
// import UserDetails from "../pages/";
import NotFound from "../pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/users" /> : <Login />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/" />} />
        {/* <Route path="/users/:id" element={isAuthenticated ? <UserDetails /> : <Navigate to="/" />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
