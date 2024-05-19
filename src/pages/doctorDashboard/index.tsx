import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from './index.module.css';

function DoctorDashboard(){

    const name = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.name)
    const email = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.email)
    const state = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.state)
    const dispatch = useDispatch()

<<<<<<< Updated upstream
    const handleLogout = () =>{
        dispatch(userLogout())
        window.location.href = "/"
=======
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
    const apiUrl = `http://52.66.241.131/IoMTAppAPI/api/viewSlotBookings.php`;

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
        // console.log("API Response:", data); // Log API response
        if (data.Status && data.Status.List) {
          setAppointments(data.Status.List);
          // console.log("Appointments:", data.Status.List); // Log appointments after setting
        }
      } else {
        console.error("Failed to fetch appointments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
>>>>>>> Stashed changes
    }
    return(
        <div>
            <div className={styles.sidenav}>
                <img src="./static/profile-icon.png" height="100px" alt="" />
                <h2>{name}</h2>
                <div id={styles.dashboardIcon}>
                    <a href="/patientdashboard"><img src="./static/dashboard-icon.png" height="30px" width="30px" alt="" /></a>
                </div>
                <div>
                    <a href="/appointment"><img src="./static/appointment-icon.png" height="30px" width="30px"  alt="" /></a>
                </div>
                <div>
                    <a href="/history"><img src="./static/history-icon.png" height="30px" width="30px"  alt="" /></a>
                </div>
                {/* <div >
                    <a href="/vitals"><img src="./static/vitals-icon.png" height="30px" width="30px" alt="" /></a>
                </div> */}
                <div onClick={handleLogout} >
                    <img src="./static/logout-icon.png" height="30px" width="30px" alt="" />
                </div>
            </div>
            <div id={styles.dashboard}>
                <div className='page-label'>
                    <span>Doctor Dashboard</span>
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
                        <h2>Appointments:</h2>
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
                                    <td>9876543210</td>
                                    <td>10:00 AM</td>
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

export default DoctorDashboard