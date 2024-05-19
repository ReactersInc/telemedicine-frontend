import React, { useState } from "react";
import "./index.css"
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { userLogin } from "../../features/users/userSlice";


interface DecodedJwtPayload {
    email: string;
    dob: string;
    exp: number;
    gender: string;
    name: string;
    photourl: string;
    state: string;
    timestamp: string;
}

interface DecodedJwtPayload {
    email: string;
    dob: string;
    exp: number;
    gender: string;
    name: string;
    photourl: string;
    state: string;
    timestamp: string;
}

function ModalSignin() {
    const dispatch = useDispatch()

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })
    const toggleModal = () => {
        dispatch(setModal())
    }

    const [userType, setUserType] = useState(0)
    const [patientSelector, setPatientSelector] = useState("modalPatientSelector")
    const [doctorSelector, setDoctorSelector] = useState("modalDoctorSelector")

<<<<<<< Updated upstream
    const changeStyleDoctorClick = () => {
        if (patientSelector === 'modalPatientSelector' && doctorSelector === 'modalDoctorSelector') {
            setPatientSelector("modalDoctorSelector");
            setDoctorSelector("modalPatientSelector");
            setUserType(1);
=======
  const signinHandle = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    // // console.log(temp_email+"+"+temp_password);

    // console.log("initiating api...");

    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/authUser.php";
    const data = {
      email,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {
          const jwtToken = jsonResponse.Status.jwt;
          // console.log("JWT Token:", jwtToken);
          const decodedJwt: DecodedJwtPayload = jwt_decode(jwtToken);
          // console.log(decodedJwt);

          dispatch(
            userLogin({
              email: decodedJwt.email,
              dob: decodedJwt.dob,
              exp: decodedJwt.exp,
              gender: decodedJwt.gender,
              name: decodedJwt.name,
              photoUrl: decodedJwt.photoUrl,
              state: decodedJwt.state,
              timeStamp: decodedJwt.timeStamp,
              city: decodedJwt.city,
            })
          );

          // window.location.href = "/dashboard"
          window.location.href = "patientdashboard";
        } else {
          console.error("Invalid response structure.");
>>>>>>> Stashed changes
        }
    }
<<<<<<< Updated upstream

    const changeStylePatientClick = () => {
        if (patientSelector === 'modalDoctorSelector' && doctorSelector === 'modalPatientSelector') {
            setPatientSelector("modalPatientSelector");
            setDoctorSelector("modalDoctorSelector");
            setUserType(0);
=======
  };
  const signinHandledoc = async () => {
    const doctor_id = (document.getElementById("Doctorid") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("docpassword") as HTMLInputElement
    ).value;
    // console.log("initiating api...");

    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/authDoctor.php";
    const data = {
      doctor_id,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {
          const jwtToken = jsonResponse.Status.jwt;
          // console.log("JWT Token:", jwtToken);
          const decodedJwt: DecodedJwtPayload = jwt_decode(jwtToken);
          // console.log(decodedJwt);

          dispatch(
            userLogin({
              email: decodedJwt.email,
              dob: decodedJwt.dob,
              exp: decodedJwt.exp,
              doctor_id: decodedJwt.doctor_id,
              name: decodedJwt.name,
              photoUrl: decodedJwt.photoUrl,
              registration_no: decodedJwt.registration_no,
              mobile_no: decodedJwt.mobile_no,
              specilization: decodedJwt.specilization,
              rating: decodedJwt.rating,
              gender: decodedJwt.gender,
              address:decodedJwt.address,
            })
          );

          window.location.href = "doctordashboard";
            
        } else {
          console.error("Invalid response structure.");
>>>>>>> Stashed changes
        }
    }

    const signinHandle = async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        // console.log(temp_email+"+"+temp_password);

        console.log("initiating api...");

        const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/authUser.php";
        const data = {
            email,
            password
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse && jsonResponse.Status) {
                    const jwtToken = jsonResponse.Status.jwt;
                    console.log("JWT Token:", jwtToken);
                    const decodedJwt: DecodedJwtPayload = jwt_decode(jwtToken)
                    console.log(decodedJwt);

                    dispatch(userLogin({
                        email: decodedJwt.email,
                        dob: decodedJwt.dob,
                        exp: decodedJwt.exp,
                        gender: decodedJwt.gender,
                        name: decodedJwt.name,
                        photoUrl: decodedJwt.photourl,
                        state: decodedJwt.state,
                        timeStamp: decodedJwt.timestamp
                    }))

                    // window.location.href = "/dashboard"
                    window.location.href = (userType) ? "doctordashboard" : "patientdashboard"

                } else {
                    console.error("Invalid response structure.");
                }
            } else {
                console.error("Error sending JSON data:", response.statusText);
                window.alert("invalid email or password")
            }
        } catch (error) {
            console.error("Error sending JSON data:", error);
        }



    }
    return (
        <>
            <div className="overlay" onClick={toggleModal}>
                <div className="modal" onClick={toggleModal}>
                    <div className="modal-background">
                        <div className="modalContainer">
                            <div className="modalRow">
                                <div className="signinText">
                                    <b>Sign In</b>
                                </div>
                            </div>
                            <div className="modalRow">
                                <div className={patientSelector} onClick={changeStylePatientClick}>
                                    Patient
                                </div>
                                <div className={doctorSelector} onClick={changeStyleDoctorClick}>
                                    Doctor
                                </div>
                            </div>
                            <div className="closeModal">
                                <button onClick={toggleModal}>x</button>
                            </div>
                            <div className="modalRow">
                                <div >
                                    <div className="input-field-name">
                                        <label htmlFor="email">Email </label>
                                    </div>
                                    <div>
                                        <input type="email" id="email" name="email" />
                                    </div>

                                </div>
                            </div>
                            <div className="modalRow">
                                <div >
                                    <div className="input-field-name">
                                        <label htmlFor="password">Password </label>
                                    </div>

                                    <div>
                                        <input type="password" id="password" name="password" />
                                    </div>

                                </div>
                            </div>
                            <div className="modalRow">
                                <div className="loginBtn" onClick={signinHandle}>
                                    Login
                                </div>
                            </div>

                            <div className="modalRow">
                                <div className="forgotPassword">Forgot Password?   </div>
                            </div>

                            <div className="modalRow">
                                <button className="googleSignupBtn" >
                                    <img src="assets/googleImage.svg" alt="Google Icon" />
                                    Continue with Google
                                </button>
                            </div>

                            <div className="modalRow">
                                <div className="signupText"> Don't have an account? <span className="signupLink">Sign up</span> </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ModalSignin;