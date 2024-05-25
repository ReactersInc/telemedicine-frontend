import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import VerticalNavDoctor from "../../components/verticalNavDoctor";
import { Link } from 'react-router-dom'
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

function Bookings() {
  const doctor_id = useSelector((state: { user: User }) => state.user.doctor_id);

  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const fetchAppointments = async () => {
    setAppointments([]);
    const doctorId = doctor_id;
    const bookingDate = selectedDate;
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

  const doctorDetail = {
    email: "",
    doctorID: "",
    date: "",
    name: "",
    gender: "",
    patientDOB:"",
  };

  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };

  return (
    <div className="ml-44 mt-10 bg-gray-100">
      <div className="w-full">
        <div className="">
          <VerticalNavDoctor />
          <div className="border-2 border-[#2cda6d] rounded-2xl overflow-hidden bg-white  p-10">
            <div className="flex gap-5 items-center">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="date"
                >
                  Select Date
                </label>
                <input
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="flex h-12 justify-center items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={fetchAppointments}
                >
                  Fetch Appointments
                </button>
              </div>
            </div>
            <div className="mt-4 w-full border-dashed border-2  border-[#2cda6d] rounded-2xl ">
              <div className="w-full rounded-md p-6">
                <h1 className="font-semibold text-xl">Appointments</h1>
                <table className="w-full mt-4">
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
                      <th className="border-b-2 p-2 text-center font-semibold bg-[#f5f9fe] border-[#f5f9fe]"></th>
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
                        <td className="border-b-2 p-2 text-center">

                          <Link
                            to={{ pathname: "/patientsList" }}
                            state={{ data: doctorDetail }}
                          >
                            <button
                              className="w-24"
                              onClick={() => {
                                doctorDetail.email = appointment.patient_email;
                                doctorDetail.doctorID = doctor_id;
                                doctorDetail.date = selectedDate;
                                doctorDetail.name = appointment.About?.patient_name;
                                doctorDetail.gender = appointment.About?.patient_gender;
                                doctorDetail.patientDOB = appointment.About?.patient_dob;
                              }}
                            >
                              View
                            </button>
                          </Link>
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
    </div>
  );
}

export default Bookings;
