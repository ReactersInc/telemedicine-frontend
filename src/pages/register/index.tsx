import React from "react";
import { useState } from "react";
import "./index.css";
import HorizontalNav from "../../components/horizontalNav";
import PatientDetails from "../../components/patientDetails";
import DoctorDetails from "../../components/doctorDetails";
function Register() {
  const [patientSelector, setPatientSelector] = useState("patientSelector");
  const [doctorSelector, setDoctorSelector] = useState("doctorSelector");

  const changeStyleDoctorClick = () => {
    if (
      patientSelector === "patientSelector" &&
      doctorSelector === "doctorSelector"
    ) {
      setPatientSelector("doctorSelector");
      setDoctorSelector("patientSelector");
    }
  };

  const changeStylePatientClick = () => {
    if (
      patientSelector === "doctorSelector" &&
      doctorSelector === "patientSelector"
    ) {
      setPatientSelector("patientSelector");
      setDoctorSelector("doctorSelector");
    }
  };

  return (
    <>
      <HorizontalNav />

      <div>
        <div>
          <div className="header">
            <b>Create Your Account</b>
          </div>

          <div className="registerForm">
            <div className="row">
              <div
                className={patientSelector}
                onClick={changeStylePatientClick}
              >
                Patient
              </div>
              <div className={doctorSelector} onClick={changeStyleDoctorClick}>
                Doctor
              </div>
            </div>

            <div className="inputFields" id="inputFields">
              {patientSelector === "patientSelector" ? (
                <PatientDetails />
              ) : (
                <DoctorDetails />
              )}
              <div className="mandatory">(* fields are mandatory.)</div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="mt-8 bg-green-100">
        <h1 className="text-center text-2xl font-semibold py-10">
          Create Your Account
        </h1>
        <div className="bg-slate-200 flex space-between">
          <div onClick={changeStylePatientClick}>Patient</div>
          <div onClick={changeStyleDoctorClick}>Doctor</div>
        </div>
      </div> */}
    </>
  );
}

export default Register;
