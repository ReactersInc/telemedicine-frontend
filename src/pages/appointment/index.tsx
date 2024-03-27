import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";
interface Doctor {
  About: {
    d_id: string;
    name: string;
    email: string;
    gender: string;
    mobile_no: string;
    profileimg: string;
    rating: number;
  };
  Sno: number;
}

interface DoctorListProps {
  doctors: Doctor[];
  patientEmail: string;
}

function DoctorList({ doctors, patientEmail }: DoctorListProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleBookAppointment = async (doctor: Doctor) => {
    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/bookAppointment.php";

    const data = {
      patient_email: patientEmail,
      doctor_id: doctor.About.d_id,
      booking_date: "25-12-2023",
      booking_time: "10:00",
    };
    console.log(data);

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
          console.log(jsonResponse);
        }
      } else {
        console.error("Error sending JSON data:", response.statusText);
        // Handle the error appropriately
      }
    } catch (error) {
      console.error("Error sending JSON data:", error);
      // Handle the error appropriately
    }
    alert("Booking appointment with doctor:" + doctor);
    console.log("Booking appointment with doctor:", doctor);
  };

  return (
    <div>
      <h3>List of Available Doctors:</h3>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.About.d_id}>
            <div>
              <img src="./static/profile-icon.png" alt={doctor.About.name} />
            </div>
            <div>
              <p>Name: {doctor.About.name}</p>
              <p>Email: {doctor.About.email}</p>
              <p>Gender: {doctor.About.gender}</p>
              <p>Mobile Number: {doctor.About.mobile_no}</p>
              <p>Rating: {doctor.About.rating}</p>
            </div>
            <div>
              <button
                onClick={() => handleBookAppointment(doctor)}
                className={styles.submitBtn}
              >
                Book Appointment
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Appointment() {
  const name = useSelector(
    (state: {
      user: {
        id: string;
        email: string;
        dob: string;
        exp: number;
        gender: string;
        name: string;
        photoUrl: string;
        state: string;
        timeStamp: string;
      };
    }) => state.user.name
  );
  const email = useSelector(
    (state: {
      user: {
        id: string;
        email: string;
        dob: string;
        exp: number;
        gender: string;
        name: string;
        photoUrl: string;
        state: string;
        timeStamp: string;
      };
    }) => state.user.email
  );
  const dispatch = useDispatch();
  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };

  const handleSpecialityChange = (e: any) => {
    setSpeciality(e.target.value);
  };

  const handleLocationChange = (e: any) => {
    setLocation(e.target.value);
  };

  const searchDoctor = async () => {
    console.log(speciality);
    console.log(location);

    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/searchDoctor.php";
    const data = {
      patient_email: email,
      specilization: speciality, // Use the selected speciality
      location: location, // Use the selected location
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
          console.log(jsonResponse.Status.List[0].About);
          setDoctorList(jsonResponse.Status.List);
        }
      } else {
        console.error("Error sending JSON data:", response.statusText);
        // Handle the error appropriately
      }
    } catch (error) {
      console.error("Error sending JSON data:", error);
      // Handle the error appropriately
    }
  };

  // function printDoctor(){

  // }
  return (
    <div>
      <div className={styles.sidenav}>
        <img
          src="./static/profile-icon.png"
          height="100px"
          alt=""
          className="mt-4 ml-12"
        />
        <h2>{name}</h2>
        <div className="flex mt-6 space-x-1 justify-items-center">
          <a href="/patientdashboard">
            <img src="./static/menu.png" height="30px" width="30px" alt="" />
          </a>
          <a href="/patientdashboard" className="font-semibold text-2xl pt-1">
            Home
          </a>
        </div>
        <div className="flex space-x-1 justify-items-center">
          <a href="/appointment">
            <img
              src="./static/appointment.png"
              height="30px"
              width="30px"
              alt=""
            />
          </a>
          <a href="/appointment" className="font-semibold text-2xl pt-1">
            Appointments
          </a>
        </div>
        <div className="flex space-x-1 justify-items-center">
          <a href="/history">
            <img src="./static/patient.png" height="30px" width="30px" alt="" />
          </a>
          <a href="/history" className="font-semibold text-2xl pt-1">
            History
          </a>
        </div>
        <div className="flex space-x-2 justify-items-center">
          <a href="/vitals">
            <img
              src="./static/robotic-hand.png"
              height="30px"
              width="30px"
              alt=""
            />
          </a>
          <a href="/vitals" className="font-semibold text-2xl pt-1 ">
            Vitals
          </a>
        </div>
        <div
          onClick={handleLogout}
          className="flex mt-auto pb-4 ml-2 space-x-4 justify-items-center text-red-500"
        >
          <img src="./static/power.png" height="35px" width="35px" alt="" />
          <h3 className="font-semibold text-2xl">Logout</h3>
        </div>
      </div>
      <div id={styles.appointment}>
        <div className="page-label">
          <span>Book an Appointment</span>
        </div>
        <div className={styles.appointmentContainer}>
          <div>
            <b>Speciality:</b>
          </div>
          <div className={styles.inputDiv}>
            <select
              name="speciality"
              id="speciality"
              className={styles.inputSelect}
              onChange={handleSpecialityChange}
            >
              <option value={"Pediatrician"}>Pediatrician</option>
              <option value={"Gastro"}>Gastro</option>
              <option value={"Dental"}>Dental</option>
              <option value={"General"}>General</option>
              <option value={"Ortho"}>Ortho</option>
            </select>
          </div>
          <div>
            <b>Location:</b>
          </div>
          <div className={styles.inputDiv}>
            <select
              name="location"
              id="location"
              className={styles.inputSelect}
              onChange={handleLocationChange}
            >
              <option value={"Guwahati"}>Guwahati</option>
              <option value={"Biswanath Chariali"}>Biswanath Chariali</option>
              <option value={"Nagaon"}>Nagaon</option>
              <option value={"Kolkata"}>Kolkata</option>
              <option value={"Tezpur"}>Tezpur</option>
            </select>
          </div>
          <div className={styles.inputDiv}>
            <div className={styles.btnDoctorSearch} onClick={searchDoctor}>
              Search Doctor
            </div>
          </div>
        </div>
        <div>
          <DoctorList doctors={doctorList} patientEmail={email} />
        </div>
      </div>
    </div>
  );
}

export default Appointment;
