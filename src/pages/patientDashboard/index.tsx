import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";
import VerticalNavPatient from "../../components/verticalNavPatient";
import { Interface } from "readline";

interface Diagnosis {
  Sno: number;
  Doc_ID: string;
  P_Email: string;
  Book_Date: string;
  Diagnosis: string;
  Prescription: string;
  Pres_Time: string;
}

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
        phone: string;

        mobile_no: string;
        doctor_id: string;
        registration_no: string;
        specilization: string;
        rating: number;
        city: string;
      };
    }) => state.user
  );
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };

  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [previewData, setPreviewData] = useState<Diagnosis | null>(null); // State for managing preview data
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleGetAllDiagnosis = async () => {
      const pEmail = name.email;
      const apiUrl = `http://52.66.241.131/IoMTAppAPI/api/getAllDiagnosis.php`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            p_email: pEmail,
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log("Fetched data:", responseData);
          if (Array.isArray(responseData.data)) {
            setDiagnosis(responseData.data);
          } else {
            console.error("Data array not found in response:", responseData);
          }
        } else {
          console.error("Failed to fetch diagnosis:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching diagnosis:", error);
      }
    };

    handleGetAllDiagnosis();
  }, [name.email]);

  const handlePreview = (item: Diagnosis) => {
    setPreviewData(item); // Set the preview data when preview button is clicked
    setIsModalOpen(true); // Open the modal
  };

  const handleClosePreview = () => {
    setPreviewData(null); // Close the preview by resetting preview data
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <VerticalNavPatient />
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
                <div className={styles.value}>{name.name}</div>
              </div>
              <div className={styles.label}>
                <div className="flex">
                  <h3 className="font-semibold">Gender:</h3>
                  <div className={styles.value}>{name.gender}</div>
                </div>
                <div className="flex ml-6">
                  <h3 className="font-semibold">DOB:</h3>
                  <div className={styles.value}>{name.dob}</div>
                </div>
              </div>
              <div className={styles.label}>
                <h3 className="font-semibold">Email:</h3>
                <div className={styles.value}>{name.email}</div>
              </div>

              <div className={styles.label}>
                <h3 className="font-semibold">Address:</h3>
                <div className={styles.value}>
                  {name.city + "," + name.state}
                </div>
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
                  {diagnosis.map((diagnosisItem, index) => (
                    <tr key={index}>
                      <td className="border-b-2 p-2 text-center">
                        {diagnosisItem.Book_Date}
                      </td>
                      <td className="border-b-2 p-2 text-center">
                        {diagnosisItem.Doc_ID}
                      </td>
                      <td className="border-b-2 p-2 text-center">
                        {diagnosisItem.Diagnosis}
                      </td>
                      <td className="border-b-2 p-2 text-center">
                        {diagnosisItem.Prescription}
                      </td>
                      <td>
                        <a href="/patientHistory">
                          <button
                            className="px-4 py-2 rounded-md"
                            onClick={() => handlePreview(diagnosisItem)}
                          >
                            Preview
                          </button>
                        </a>
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

export default PatientDashboard;
