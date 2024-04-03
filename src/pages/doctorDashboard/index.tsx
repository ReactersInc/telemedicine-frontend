import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";
import VerticalNavDoctor from "../../components/verticalNavDoctor";

function DoctorDashboard() {
  const doc = useSelector(
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
        phone: string;
      
      
        mobile_no: string;
        doctor_id: string;
        registration_no: string;
        specilization: string;
        rating: number;
        city: string;
        address: string;
      };
    }) => state.user
  );
 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };
  return (
    <div>
      <VerticalNavDoctor/>
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
                <div className={styles.value}>{ doc.address}</div>
              </div>
            </div>

        
          </div>
          <div className={styles.tableContainer}>
            <div id={styles.tableDiv}>
              <h1 className="font-semibold text-lg">Appointments</h1>
              <table id={styles.table}>
                <thead>
                  <th>Date</th>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Slot</th>
                </thead>
                <tbody>
                  <tr>
                    <td>12.01.2023</td>
                    <td>Dr. John Smith</td>
                    <td>Trauma</td>
                    <td>12:30 PM</td>
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

export default DoctorDashboard;
