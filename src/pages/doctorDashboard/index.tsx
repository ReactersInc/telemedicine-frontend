import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";
import VerticalNavDoctor from "../../components/verticalNavDoctor";

interface User {
  id: string;
  email: string;
  dob: string;
  exp: number;
  gender: string;
  name: string;
  photoUrl: string;
  state: string;
  timeStamp: string;
  phone: string;
  mobile_no: string;
  doctor_id: string;
  address: string;
  registration_no: string;
  specilization: string;
  rating: number;
}

interface Appointment {
  Sno: number;
  patient_email: string;
  About: {
    patient_name: string;
    patient_gender: string;
    patient_dob: string;
    patient_city: string;
  };
}

function DoctorDashboard() {
  const doc = useSelector((state: { user: User }) => state.user);
  const doctor_id = useSelector(
    (state: { user: User }) => state.user.doctor_id
  );
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, [doctor_id]);

  const fetchAppointments = async () => {
    const bookingDate = new Date().toISOString().split("T")[0];
    const apiUrl = `https://makemytwin.com/IoMTAppAPI/api/viewSlotBookings.php`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor_id: doctor_id,
          booking_date: bookingDate,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data); // Log API response
        if (data.Status && data.Status.List) {
          setAppointments(data.Status.List);
          console.log("Appointments:", data.Status.List); // Log appointments after setting
        }
      } else {
        console.error("Failed to fetch appointments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };

  return (
    <div>
      <VerticalNavDoctor />
      <div id={styles.dashboard}>
        <div className="page-label">
          <span>Doctor Dashboard</span>
        </div>
        <div className={styles.patientDetailContainer}>
          <div className="flex pl-12 justify-left space-x-12">
            <div className="border rounded-full">
              <div className="w-52 h-52 p-4 border rounded-full bg-[#ffffff] flex justify-center">
                <img
                  id={styles.profilePhoto}
                  src="./static/avatar.jpg"
                  alt=""
                  height="100%"
                  width="100%"
                  className="border rounded-full"
                />
              </div>
            </div>
            <div className={styles.pateintDetails}>
              <div className={styles.label}>
                <h3 className="font-semibold">Name:</h3>
                <div className={styles.value}>{doc.name}</div>
              </div>
              <div className={styles.label}>
                <div className="flex">
                  <h3 className="font-semibold">Gender:</h3>
                  <div className={styles.value}>{doc.gender}</div>
                </div>
                <div className="flex ml-6">
                  <h3 className="font-semibold">DOB:</h3>
                  <div className={styles.value}>{doc.dob}</div>
                </div>
              </div>
              <div className={styles.label}>
                <h3 className="font-semibold">Phone No:</h3>
                <div className={styles.value}> {doc.mobile_no}</div>
              </div>

              <div className={styles.label}>
                <h3 className="font-semibold">Email:</h3>
                <div className={styles.value}>{doc.email}</div>
              </div>

              <div className={styles.label}>
                <h3 className="font-semibold">Address:</h3>
                <div className={styles.value}>{doc.address}</div>
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <div id={styles.tableDiv}>
              <h1 className="font-semibold text-lg">Today's Appointments</h1>
              <table id={styles.table}>
                <thead>
                  <tr>
                    <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                      Patient Email
                    </th>
                    <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                      Patient Name
                    </th>
                    <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                      Patient Gender
                    </th>
                    <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                      Patient DOB
                    </th>
                    <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                      Patient City
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={index}>
                      <td className="border-b-2 p-2 text-center">
                        {appointment.patient_email}
                      </td>
                      <td className="border-b-2 p-2 text-center">
                        {appointment.About?.patient_name}
                      </td>
                      <td className="border-b-2 p-2 text-center">
                        {appointment.About?.patient_gender}
                      </td>
                      <td className="border-b-2 p-2 text-center">
                        {appointment.About?.patient_dob}
                      </td>
                      <td className="border-b-2 p-2 text-center">
                        {appointment.About?.patient_city}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
