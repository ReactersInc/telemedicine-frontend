import React from "react";
import "./App.css";
// import Dashboard from './pages/patientDashboard';
import Register from "./pages/register";
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

export const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/patientdashboard",
    element: <PatientDashboard />,
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
  // {
  //   path: "/test2",
  //   element: <EcgGraph/>
  // }
];

function App() {
  return (
    <>
      <div className="webcontainer">
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Routes>
                {router.map((item, index) => {
                  return <Route path={item.path} element={item.element} />;
                })}
              </Routes>
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
