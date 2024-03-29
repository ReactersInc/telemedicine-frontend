import "./index.css";
import Select from "react-select";
import React, { useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/users/userSlice";

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

function PatientDetails() {
  const [otp, setOtp] = useState("");
  const [emailset, setemail] = useState("");
  const [state, setstate] = useState(true);
  const dispatch = useDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };
  const data = {
    email: "",
    name: "",
    dob: "",
    gender: "",
    password: "",
    photoURL: "",
    city: "",
    state: "",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const apiurl = "http://52.66.241.131/IoMTAppAPI/api/authOTP.php";
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: emailset, otp: otp}),
    };


    try {
      const response = await fetch(apiurl, requestOptions);

      if (response.ok) {

        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {

          const jwtToken = jsonResponse.Status.jwt;
          const decodedJwt: DecodedJwtPayload = jwt_decode(jwtToken);

          dispatch(
            userLogin({
              email: decodedJwt.email,
              dob: decodedJwt.dob,
              exp: decodedJwt.exp,
              gender: decodedJwt.gender,
              name: decodedJwt.name,
              photoUrl: decodedJwt.photourl,
              state: decodedJwt.state,
              timeStamp: decodedJwt.timestamp,
            })
          );
          window.location.href = "patientdashboard";
          data.email = "";
          data.name = "";
          data.dob = "";
          data.gender = "";
          data.password = "";
          data.photoURL = "";
          data.city = "";
          data.state = "";
          setOtp("");
        } else {
        }
      } else {
        window.alert("invalid email or password");
      }
    } catch (error) {
    }
  };
  const signup = async () => {
    const fname = (document.getElementById("fname") as HTMLInputElement).value;
    const lname = (document.getElementById("lname") as HTMLInputElement).value;
    const gender = (document.getElementById("gender") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const mobile = (document.getElementById("mobile") as HTMLInputElement)
      .value;
    const dob = (document.getElementById("dob") as HTMLInputElement).value;
    const height = (document.getElementById("height") as HTMLInputElement)
      .value;
    const weight = (document.getElementById("weight") as HTMLInputElement)
      .value;
    const bloodGroup = (
      document.getElementById("bloodGroup") as HTMLInputElement
    ).value;
    const photoURL = "null";
    const city = (document.getElementById("city") as HTMLInputElement).value;
    const state1 = (document.getElementById("state") as HTMLInputElement).value;
    const country = (document.getElementById("country") as HTMLInputElement)
      .value;
    const state = state1 + country;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;

    const name = fname + lname;
    if (
      fname === "" ||
      lname === "" ||
      email === "" ||
      mobile === "" ||
      height === "" ||
      weight === "" ||
      dob === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return false;
    }

    // Check if password contains at least one number
    if (!/\d/.test(password)) {
      alert("Password must contain at least one number.");
      return false;
    }

    // Check if password contains at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      alert("Password must contain at least one special character.");
      return false;
    }

    data.email = email;
    data.name = name;
    data.dob = dob;
    data.gender = gender;
    data.password = password;
    data.photoURL = photoURL;
    data.city = city;
    data.state = state;
    setemail(email);

    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/addUser.php";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {
          // window.location.href = "patientdashboard";
          setstate(false);
        } else {
        }
      } else {
        window.alert("invalid email or password");
      }
    } catch (error) {
    }
  };
  return (
    <>
      {state ? (
        <div>
          <div className="flex justify-items-start space-x-48  mt-16 items-start">
            <div>
              <label htmlFor="fname">First Name *</label>
              <br />
              <input
                autoComplete="off"
                type="text"
                id="fname"
                name="fname"
                required
                className="style_input"
              />
            </div>
            <div>
              <label htmlFor="lname">Last Name *</label>
              <br />
              <input
                autoComplete="off"
                type="text"
                id="lname"
                name="lname"
                className="style_input"
                required
              />
            </div>

            <div>
              <label htmlFor="gender">Gender *</label>
              <br />
              <select
                name="gender"
                id="gender"
                className="style_input"
                required
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex justify-items-start space-x-48 mt-8">
            <div>
              <label htmlFor="email">Email *</label>
              <br />
              <input
                autoComplete="off"
                type="email"
                id="email"
                name="email"
                className="style_input"
                required
              />
            </div>
            <div>
              <label htmlFor="mobile">Mobile Number *</label>
              <br />
              <input
                autoComplete="off"
                type="text"
                name="mobile"
                id="mobile"
                className="style_input"
                required
              />
            </div>
            <div>
              <label htmlFor="bloodGroup">Blood group *</label>
              <br />

              <select
                name="bloodGroup"
                id="bloodGroup"
                className="style_input w-full"
                required
              >
                <option value=""></option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="flex justify-items-start space-x-48 mt-8">
            <div>
              <label htmlFor="height">Height(cm) *</label>
              <br />
              <input
              autoComplete="off"
                type="number"
                name="height"
                id="height"
                className="style_input"
                required
              />
            </div>
            <div>
              <label htmlFor="weight">Weight(kg) *</label>
              <br />
              <input
                autoComplete="off"
                type="number"
                name="weight"
                id="weight"
                className="style_input"
                required
              />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth *</label>
              <br />
              <input
              autoComplete="off"
                type="date"
                name="dob"
                id="dob"
                className="style_input"
                required
              />
            </div>
          </div>

          <div className="flex justify-items-start space-x-48   mt-8 ">
            {/* <div>
            <label htmlFor="image">Upload Image</label>
            <br />
            <input
            autoComplete="off"
              type="file"
              name="image"
              id="image"
              className="style_input"
              required
            />
          </div> */}
            <div>
              <label htmlFor="city">City *</label>
              <br />
              <input
                autoComplete="off"
                type="text"
                name="city"
                id="city"
                className="style_input w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="state">State *</label>
              <br />
              <input
                autoComplete="off"
                type="text"
                name="state"
                id="state"
                className="style_input w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="country">Country *</label>
              <br />
              <input
                autoComplete="off"
                type="text"
                name="country"
                id="country"
                className="style_input w-full"
                required
              />
            </div>
          </div>
          <div className="flex justify-items-start space-x-48 mt-8">
            <div>
              <label htmlFor="password">Password *</label>
              <br />
              <input
                autoComplete="off"
                type="password"
                id="password"
                name="password"
                className="style_input"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <br />
              <input
              autoComplete="off"
              type="password" 
                id="confirmPassword"
                name="confirmPassword"
                className="style_input"
                required
              />
            </div>
          </div>
          <br />
          <button
            type="button"
            className="mt-6 px-8 py-3 bg-[#2cda6d] rounded-3xl text-white font-semibold"
            onClick={signup}
          >
            Submit
          </button>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default PatientDetails;
