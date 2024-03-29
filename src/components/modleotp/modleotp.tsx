import React, { useState } from "react";
import axios from "axios";
import { userLogin } from "../../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";
import jwt_decode, { JwtPayload } from 'jwt-decode';
interface ModalOTPProps {
    email: string;
}
interface DecodedJwtPayload {
    email: string;
    dob: string;
    exp: number;
    gender: string;
    name: string;
    photourl: string;
    state: string;
    timestamp: string;
  }
const ModalOTP: React.FC<ModalOTPProps> = ({ email }) => {
    const dispatch = useDispatch()
    const [otp, setOtp] = useState("");
    const [credintials, setCredintials] = useState({
        email: email,
        otp: "",
    });
    const [userType, setUserType] = useState(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setOtp(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const apiurl = "http://52.66.241.131/IoMTAppAPI/api/authOTP.php";
        console.log("initiating api...");
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(credintials)
        };
        console.log("done 1");
       
        try {
            const response = await fetch(apiurl, requestOptions);
        console.log("done 2");

            if (response.ok) {
        console.log("done 3");

                const jsonResponse = await response.json();
                if (jsonResponse && jsonResponse.Status) {
        console.log("done 4");

                    const jwtToken = jsonResponse.Status.jwt;
                    console.log("JWT Token:", jwtToken);
                    const decodedJwt: DecodedJwtPayload = jwt_decode(jwtToken)
                    console.log(decodedJwt);

                    dispatch(userLogin({
                        email:decodedJwt.email,
                        dob:decodedJwt.dob,
                        exp:decodedJwt.exp,
                        gender:decodedJwt.gender,
                        name:decodedJwt.name,
                        photoUrl:decodedJwt.photourl,
                        state:decodedJwt.state,
                        timeStamp:decodedJwt.timestamp
                    }))

                    // window.location.href = "/dashboard"
                    window.location.href = (userType)?"doctordashboard":"patientdashboard"

                } else {
                    console.error("Invalid response structure.");
                }
            } else {
                console.error("Error sending JSON data:", response.statusText);
                window.alert("invalid email or password")
            }
        } catch (error) {
            console.error("Error sending JSON data:", error);
        }
       
    };

    return (
      <>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    value={otp}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter OTP"
                  />
                  <button
                    type="submit"
                    className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Verify OTP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default ModalOTP;

