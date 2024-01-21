import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from './index.module.css';

function PatientDashboard(){

    const name = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.name)
    const email = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.email)
    const dispatch = useDispatch()

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