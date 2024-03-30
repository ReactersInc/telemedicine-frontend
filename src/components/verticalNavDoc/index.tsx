import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";

function VerticalNav() {
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

  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };
  return (
    <div>
      <div className={styles.sidenav}>
        <div className="flex flex-col">
          <div className=" w-28 h-28 flex justify-center">
            <img
              src="./static/avatar.jpg"
              height="100%"
              width="100%"
              className="border rounded-full"
            />
          </div>
          <h2 className="font-semibold text-center">{name}</h2>
        </div>
        <div className="flex space-x-3 justify-items-start">
          <a href="/doctordashboard">
            <img
              src="./static/menu.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/doctordashboard" className="font-semibold text-xl  ">
            Home
          </a>
        </div>
        <div className="flex space-x-3 justify-items-start">
          <a href="/patientsList">
            <img
              src="./static/appointment.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/patientsList" className="font-semibold text-xl  ">
            Patients
          </a>
        </div>
        <div className="flex space-x-3 justify-items-start">
          <a href="/bookings">
            <img
              src="./static/patient.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/bookings" className="font-semibold text-xl">
            Appointments
          </a>
        </div>
        <div className="flex space-x-3 justify-items-start">
          <a href="/vitals">
            <img
              src="./static/robotic-hand.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/vitals" className="font-semibold text-xl ">
            Vitals
          </a>
        </div>
        <div
          onClick={handleLogout}
          className="flex mt-auto pb-4 space-x-4  justify-items-center text-red-500"
        >
          <img src="./static/power.png" height="22px" width="26px" alt="" />
          <h3 className="font-semibold text-xl">Logout</h3>
        </div>
      </div>
    </div>
  );
}

export default VerticalNav;
