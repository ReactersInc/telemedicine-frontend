import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";
import VerticalNavPatient from "../../components/verticalNavPatient";
import PrevModal from "../../components/PrevModal";
import { setModal } from "../../features/modal/modalSlice";

interface PrevProps {
  Doc_ID: string;
  P_Email: string;
  Book_Date: string;
}

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
        email: string;
        name: string;
        gender: string;
        dob: string;
        city: string;
        state: string;
      };
    }) => state.user
  );
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state: { modal: { modalOpen: boolean } }) => state.modal.modalOpen
  );

  const [doctorID, setDoctorID] = useState("");
  const [pEmail, setpEmail] = useState("");
  const [bDate, setbDate] = useState("");

  const toggleModal = ({ Doc_ID, P_Email, Book_Date }: PrevProps) => {
    console.log("preview clicked");
    setDoctorID(Doc_ID);
    setpEmail(P_Email);
    setbDate(Book_Date);
    dispatch(setModal());
  };

  const toggleModal1 = () => {
    dispatch(setModal());
  };

  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };

  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const handleGetAllDiagnosis = async () => {
      const pEmail = name.email;
      const apiUrl = `https://makemytwin.com/IoMTAppAPI/api/getAllDiagnosis.php`;

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

  return (
    <div>
      <VerticalNavPatient />
      <div id={styles.dashboard}>
        <div className="page-label">
          <span className="page-label-1">Patient Dashboard</span>
        </div>
        <div className={styles.patientDetailContainer}>
          <div className="lg:flex lg:pl-12 lg:justify-left lg:space-x-12">
            <div className="lg:border lg:rounded-full profile-img ">
              <div className="lg:w-52 lg:h-52 lg:p-4 lg:border lg:rounded-full lg:bg-[#ffffff] lg:flex lg:justify-center profile-img ">
                <img
                  id={styles.profilePhoto}
                  src="./static/avatar.svg"
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
                  {name.city + ", " + name.state}
                </div>
              </div>
            </div>

            <div className={styles.pateintDetails}>
              <div className="flex">
                <p className="font-bold text-lg ml-auto mr-auto pt-2">
                  Recent Health Checkup
                </p>
              </div>
              {diagnosis.length > 0 && (
                <div>
                  <div className={styles.label}>
                    <h3 className="font-semibold">Date:</h3>
                    <div className={styles.value}>{diagnosis[0].Book_Date}</div>
                  </div>
                  <div className={styles.label}>
                    <h3 className="font-semibold">Consultant Doctor:</h3>
                    <div className={styles.value}>{diagnosis[0].Doc_ID}</div>
                  </div>
                  <div className="ml-4 mt-4">
                    <div className="flex space-x-2 items-center">
                      <h3 className="font-semibold">Diagnosis</h3>
                      <button
                        className="py-2 px-3 bg-[#2cda6d] border rounded-2xl font-semibold text-slate-50"
                        onClick={() => {
                          toggleModal({
                            Doc_ID: diagnosis[0].Doc_ID,
                            P_Email: diagnosis[0].P_Email,
                            Book_Date: diagnosis[0].Book_Date,
                          });
                        }}
                      >
                        Preview Prescription
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.tableContainer}>
            <div id={styles.tableDiv}>
              <h1 className="font-semibold text-lg">Patient History</h1>
              <table id={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Diagnosis</th>
                    <th>Prescription</th>
                  </tr>
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
                        <button
                          className="px-4 py-2 rounded-md"
                          onClick={() => {
                            toggleModal({
                              Doc_ID: diagnosisItem.Doc_ID,
                              P_Email: diagnosisItem.P_Email,
                              Book_Date: diagnosisItem.Book_Date,
                            });
                          }}
                        >
                          Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.overlayAppoint} onClick={toggleModal1}>
          <PrevModal
            doctor_id={doctorID}
            patientEmail={pEmail}
            bookDate={bDate}
          />
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
