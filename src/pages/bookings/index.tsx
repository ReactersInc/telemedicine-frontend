import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";
import VerticalNav from "../../components/verticalNavDoc";

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
}

interface Appointment {
  booking_date: string;
  booking_time: string;
  About: {
    patient_name: string;
    patient_gender: string;
  };
}

function Bookings() {
  const dispatch = useDispatch();
  const name = useSelector((state: { user: User }) => state.user.name);
  const email = useSelector((state: { user: User }) => state.user.email);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const doctorId = "D-17029181649"; // Assuming this is a static value for now
      const bookingDate = "25-12-2023"; // Assuming this is a static value for now
      const apiUrl = `http://52.66.241.131/IoMTAppAPI/api/viewSlotBookings.php`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctor_id: doctorId,
            booking_date: bookingDate,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.Status && data.Status.List) {
            setAppointments(data.Status.List);
          }
        } else {
          console.error("Failed to fetch appointments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };

  return (
    <div>
      <VerticalNav />

      <div>
        <div className="flex ml-56 mt-16">
          <div className="w-11/12 rounded-md p-6 shade bg-white">
            <h1 className="font-semibold text-xl">Appointments</h1>
            <table className="w-full border-collapse mt-4">
              <thead>
                <tr>
                  <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Date
                  </th>
                  <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Time
                  </th>
                  <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Patient Name
                  </th>
                  <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Patient Gender
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="border-b-2 p-2 text-center">
                      {appointment.booking_date}
                    </td>
                    <td className="border-b-2 p-2 text-center">
                      {appointment.booking_time}
                    </td>
                    <td className="border-b-2 p-2 text-center">
                      {appointment.About?.patient_name}
                    </td>
                    <td className="border-b-2 p-2 text-center">
                      {appointment.About?.patient_gender}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
