import React from "react";
import { useState } from "react";
import './index.css'
import HorizontalNav from "../../components/horizontalNav";
import PatientDetails from "../../components/patientDetails";
import DoctorDetails from "../../components/doctorDetails";
function Register(){
    const [patientSelector, setPatientSelector] = useState("patientSelector")
    const [doctorSelector, setDoctorSelector] = useState("doctorSelector")

    const changeStyleDoctorClick = () =>{
        if(patientSelector==='patientSelector' && doctorSelector==='doctorSelector')
        {
            setPatientSelector("doctorSelector");
            setDoctorSelector("patientSelector");
        }
    }

    const changeStylePatientClick = () =>{
        if(patientSelector==='doctorSelector' && doctorSelector==='patientSelector')
        {
            setPatientSelector("patientSelector");
            setDoctorSelector("doctorSelector");
        }
    }

    return(
        <>
        <HorizontalNav/>
            
        <div className="container">
            <div>
            
                <div className="header">
                    <b>Sign Up</b>
                </div>

            <div className="registerForm">
                
                <div className="row">
                    <div className={patientSelector} onClick={changeStylePatientClick}>
                        Patient
                    </div>
                    < div className={doctorSelector} onClick={changeStyleDoctorClick}>
                        Doctor
                    </div>
                </div>

                <div className="inputFields" id="inputFields">
                    {
                        (patientSelector==="patientSelector")?<PatientDetails/>:<DoctorDetails/>
                    }
                    <div className="mandatory">(* fields are mandatory.)</div>
                </div>
            </div>
            </div>
            
        </div>
        </>
        
    )
}

export default Register