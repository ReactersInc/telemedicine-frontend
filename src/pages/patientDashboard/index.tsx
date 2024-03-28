import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";

function PatientDashboard() {
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
          <a href="/patientdashboard" className="font-regular text-2xl pt-1">
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
          <a href="/appointment" className="font-regular text-2xl pt-1">
            Appointments
          </a>
        </div>
        <div className="flex space-x-1 justify-items-center">
          <a href="/history">
            <img src="./static/patient.png" height="30px" width="30px" alt="" />
          </a>
          <a href="/history" className="font-regular text-2xl pt-1">
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
          <a href="/vitals" className="font-regular text-2xl pt-1 ">
            Vitals
          </a>
        </div>
        <div
          onClick={handleLogout}
          className="flex mt-auto pb-4 ml-2 space-x-4 justify-items-center text-red-500"
        >
          <img src="./static/power.png" height="35px" width="35px" alt="" />
          <h3 className="font-regular text-2xl">Logout</h3>
        </div>
      </div>
      <div id={styles.dashboard}>
        <div className="page-label">
          <span>Patient Dashboard</span>
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
                <div className={styles.value}>{name}</div>
              </div>
              <div className={styles.label}>
                <div className="flex">
                  <h3 className="font-semibold">Gender:</h3>
                  <div className={styles.value}>Female</div>
                </div>
                <div className="flex ml-6">
                  <h3 className="font-semibold">DOB:</h3>
                  <div className={styles.value}>20/09/2002</div>
                </div>
              </div>
              <div className={styles.label}>
                <h3 className="font-semibold">Phone No:</h3>
                <div className={styles.value}> {"9876543210"}</div>
              </div>

              <div className={styles.label}>
                <h3 className="font-semibold">Email:</h3>
                <div className={styles.value}>{email}</div>
              </div>

              <div className={styles.label}>
                <h3 className="font-semibold">Address:</h3>
                <div className={styles.value}>Tezpur,Assam</div>
              </div>
            </div>

            <div className={styles.pateintDetails}>
              <div className="flex">
                <p className="font-bold text-lg ml-auto mr-auto pt-2">
                  Recent Health Checkup
                </p>
              </div>
              <div className={styles.label}>
                <h3 className="font-semibold">Date:</h3>
                <div className={styles.value}>29/03/2024</div>
              </div>
              <div className={styles.label}>
                <h3 className="font-semibold">Consultant Doctor:</h3>
                <div className={styles.value}>Dr. Abc Xyz</div>
              </div>

              <div className="ml-4 mt-4">
                <div className="flex space-x-2 items-center">
                  <h3 className="font-semibold">Diagnosis</h3>
                  <button className="py-2 px-3 bg-[#2cda6d] border rounded-2xl font-semibold text-slate-50">
                    Preview Prescription
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <div id={styles.tableDiv}>
              <h1 className="font-semibold text-lg">Patient History</h1>
              <table id={styles.table}>
                <thead>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Diagnosis</th>
                  <th>Prescription</th>
                </thead>
                <tbody>
                  <tr>
                    <td>12.01.2023</td>
                    <td>Dr. John Smith</td>
                    <td>Trauma</td>
                    <td>
                      <button className="px-4 py-2 rounded-md">Preview</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
