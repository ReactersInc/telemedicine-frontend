import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/home";
import VitalsDashboard from "./pages/vitalsDashboard";
import Appointment from "./pages/appointment";
import PatientDashboard from "./pages/patientDashboard";
import DoctorDashboard from "./pages/doctorDashboard";
import Bookings from "./pages/bookings";
import PatientsList from "./pages/patientsList";
// import EcgGraph from './pages/test2'
import ReportPage from "./pages/report/Report";



export const router = [

  
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/vitals",
    element: <VitalsDashboard />,
  },
  {
    path: "/appointment",
    element: <Appointment />,
  },
  {
    path: "/patientdashboard",
    element: <PatientDashboard />,
  },
  {
    path: "/doctordashboard",
    element: <DoctorDashboard />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
  },
  {
    path: "/patientsList",
    element: <PatientsList />,
  },
  {
    path: "/report",
    element: <ReportPage SpO2={0} />,
  },

  
];


function App() {



  
  return (
    <div className="webcontainer">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Routes>
              {router.map((item, index) => (
                <Route key={index} path={item.path} element={item.element} />
              ))}
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
