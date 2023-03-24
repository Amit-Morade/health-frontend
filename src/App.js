import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import About from "./About";
import Profile from "./Profile";
import Settings from "./Settings";
import Home from "./Home";
import DoctorDashboard from "./DoctorDashboard";
import Signup from "./components/Signup";
import PatientDetail from "./components/PatientDetail";

function App() {

  return (
    <Routes>
        <Route path="" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} >
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="home" element={<Home />} />
        <Route path="doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="users/:id" element={<PatientDetail />} />
    </Routes>
  )
}
  

export default App;
