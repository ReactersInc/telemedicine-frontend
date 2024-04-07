import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";
import Select from "react-select";
import AppointModal from "../../components/appointModal";
import { setModal } from "../../features/modal/modalSlice";
import VerticalNavPatient from "../../components/verticalNavPatient";

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
  const [doctorID, setDoctorID] = useState("");
  const [PatientEmailID, setPatientEmailID] = useState("");

  const isModalOpen = useSelector(
    (state: { modal: { modalOpen: boolean; scroll: boolean } }) =>
      state.modal.modalOpen
  );
  const scrollable = useSelector(
    (state: { modal: { modalOpen: boolean; scroll: boolean } }) =>
      state.modal.scroll
  );
  const dispatch = useDispatch();

  const toggleModal = (doctorId: string) => {
    setDoctorID(doctorId);
    setPatientEmailID(patientEmail);
    console.log(doctorId);
    console.log(patientEmail);
    dispatch(setModal());
  };
  const toggleModal1 = () => {
    dispatch(setModal());
  };

  if (!scrollable) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  return (
    <div>
      <h3 className=" mt-6 text-xl font-semibold pt-2">
        List of Available Doctors:
      </h3>
      <ul className="flex space-x-4 p-6">
        {doctors.map((doctor) => (
          <li key={doctor.About.d_id}>
            <div>
              <img src="./static/profile-icon.png" alt={doctor.About.name} />
            </div>
            <div className="flex flex-col space-y-1">
              <p>
                <span className="font-medium">Name: </span>
                {doctor.About.name}
              </p>
              <p>
                <span className="font-medium">Email: </span>
                {doctor.About.email}
              </p>
              <p>
                <span className="font-medium">Gender: </span>
                {doctor.About.gender}
              </p>
              <p>
                <span className="font-medium">Mobile No.: </span>
                {doctor.About.mobile_no}
              </p>
              <p>
                <span className="font-medium">Rating: </span>
                {doctor.About.rating}
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  toggleModal(doctor.About.d_id);
                  console.log(doctor.About.d_id);
                }}
                className=" mt-6 py-2 px-4 font-semibold text-white text-md bg-[#2cda6d] rounded-md"
              >
                Book Appointment
              </button>
              <div>
                {isModalOpen && (
                  <div className={styles.overlayAppoint} onClick={toggleModal1}>
                    <AppointModal
                      doctor_id={doctorID}
                      patientEmail={PatientEmailID}
                    />
                  </div>
                )}
              </div>
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

  const specialityOptions = [
    { value: "Pediatrician", label: "Pediatrician" },
    { value: "Gastro", label: "Gastro" },
    { value: "Dental", label: "Dental" },
    { value: "General", label: "General" },
    { value: "Ortho", label: "Ortho" },
  ];

  const timeSlots = [
    { value: "10:30 AM", label: "10:30 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "12:00 AM", label: "12:00 AM" },
    { value: "12:30 PM", label: "12:30 PM" },
  ];

  const LocationOptions = [
    { value: "Guwahati", label: "Guwahati" },
    { value: "Biswanath Chariali", label: "Biswanath Chariali" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Tezpur", label: "Tezpur" },
    // { value: "12:00 AM", label: "12:00 AM" },
    // { value: "12:30 PM", label: "12:30 PM" },
  ];

  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };

  const handleSpecialityChange = (selectedOption: any) => {
    if (selectedOption) {
      setSpeciality(selectedOption.value);
    } else {
      setSpeciality("none"); // or whatever default value you want to set
    }
    console.log(selectedOption.value);
  };

  const handleTimeChange = (selectedOption: any) => {
    if (selectedOption) {
      setTime(selectedOption.value);
      setSelectedTime(selectedOption.value);
    } else {
      setTime("none");
      setSelectedTime("");
    }
    console.log(selectedOption.value);
  };

  const handleLocationChange = (selectedOption: any) => {
    if (selectedOption) {
      setLocation(selectedOption.value);
    } else {
      setLocation("none"); // or whatever default value you want to set
    }
    console.log(selectedOption.value);
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
          console.log(jsonResponse.Status.List[0]);
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

  const specialityStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "4px", // Padding
      border: "1px solid #2cda6d", // Border
      borderRadius: "10px", // Border radius
      marginTop: "6px", // Margin top
      maxWidth: "30%", // Max width
      backgroundColor: "white", // Background color
      transition: "box-shadow 0.3s, border-color 0.3s", // Transition
    }),
  };

  const isModalOpen = useSelector(
    (state: { modal: { modalOpen: boolean; scroll: boolean } }) =>
      state.modal.modalOpen
  );
  const scrollable = useSelector(
    (state: { modal: { modalOpen: boolean; scroll: boolean } }) =>
      state.modal.scroll
  );

  const toggleModal = () => {
    dispatch(setModal());
  };

  if (!scrollable) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  return (
    <div>
      <VerticalNavPatient />

      <div id={styles.appointment}>
        <div className="page-label">
          <span>Book an Appointment</span>
        </div>
        <div className={styles.appointmentContainer}>
          <div>
            <div>
              <label htmlFor="degree" className="text-lg font-semibold pt-2">
                Speciality
              </label>
              <br />
              <Select
                styles={specialityStyles}
                name="speciality"
                id="speciality"
                options={specialityOptions}
                isMulti={false}
                placeholder=""
                onChange={handleSpecialityChange}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="degree" className="text-lg font-semibold pt-2">
                Location
              </label>
              <br />
              <Select
                styles={specialityStyles}
                name="location"
                id="location"
                options={LocationOptions}
                isMulti={false}
                placeholder=""
                onChange={handleLocationChange}
                required
              />
            </div>
            {/* <div className="mt-4">
              <div>
                <label htmlFor="dob" className="text-lg font-semibold pt-2">
                  Date
                </label>
                <br />
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className={styles.style_input}
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="degree" className="text-lg font-semibold pt-2">
                Time
              </label>
              <br />
              <div className="flex space-x-6">
                {timeSlots.map((timeOption) => (
                  <button
                    key={timeOption.value}
                    onClick={() => handleTimeChange(timeOption)}
                    className={`border py-2 px-4 border-[#2cda6d] rounded-md ${
                      selectedTime === timeOption.value ? "bg-green-50" : ""
                    }`}
                  >
                    <h3>{timeOption.label}</h3>
                  </button>
                ))}
              </div>
            </div> */}
          </div>
          <button
            className=" mt-6 py-2 px-4 font-semibold text-white text-lg bg-[#2cda6d] rounded-md"
            onClick={searchDoctor}
          >
            Search Doctor
          </button>
        </div>
        <div>
          <DoctorList doctors={doctorList} patientEmail={email} />
        </div>
      </div>
    </div>
  );
}

export default Appointment;
