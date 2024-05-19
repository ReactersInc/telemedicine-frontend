import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from './index.module.css';

function PatientDashboard(){

    const name = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.name)
    const email = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.email)
    const dispatch = useDispatch()

<<<<<<< Updated upstream
    const handleLogout = () =>{
        dispatch(userLogout())
        window.location.href = "/"
    }
    return(
        <div>
            <div className={styles.sidenav}>
                <img src="./static/profile-icon.png" height="100px" alt="" />
                <h2>{name}</h2>
                <div id={styles.dashboardIcon}>
                    <a href="/patientdashboard"><img src="./static/dashboard-icon.png" height="30px" width="30px" alt="" /></a>
=======
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
    // console.log("preview clicked");
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
          // console.log("Fetched data:", responseData);
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
>>>>>>> Stashed changes
                </div>
                <div>
                    <a href="/appointment"><img src="./static/appointment-icon.png" height="30px" width="30px"  alt="" /></a>
                </div>
                <div>
                    <a href="/history"><img src="./static/history-icon.png" height="30px" width="30px"  alt="" /></a>
                </div>
                <div >
                    <a href="/vitals"><img src="./static/vitals-icon.png" height="30px" width="30px" alt="" /></a>
                </div>
                <div onClick={handleLogout} >
                    <img src="./static/logout-icon.png" height="30px" width="30px" alt="" />
                </div>
            </div>
            <div id={styles.dashboard}>
                <div className='page-label'>
                    <span>Patient Dashboard</span>
                </div>
                <div className={styles.patientDetailContainer}>
                    <div className={styles.profileBanner}>
                        <div>
                            <img id={styles.profilePhoto} src="./static/profile-icon.png" alt="" height="100%" />
                        </div>
                        <div className={styles.pateintDetails}>
                            <div className={styles.label}>Name: </div>
                            <div className={styles.value}>{name}</div>
                            <div className={styles.label}>Emai: </div>
                            <div className={styles.value}>{email}</div>
                            <div className={styles.label}>Phone No:</div>
                            <div className={styles.value}> {"9876543210"}</div>
                        </div>
                    </div>
                    <div className={styles.tableContainer}>
                        <div id={styles.tableDiv}>
                        <h2>Patient History:</h2>
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
                                    <td><button>Preview</button></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default PatientDashboard