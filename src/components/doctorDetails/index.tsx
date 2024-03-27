import React, { useState, ChangeEvent } from "react";
import "./index.css";
import Select from "react-select";

function DoctorDetails() {
  const degreeOptions = [
    { value: "MBBS", label: "MBBS" },
    { value: "MD", label: "MD" },
    { value: "BDS", label: "BDS" },
  ];
  const degreeStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "8px", // Padding
      border: "1px solid #2cda6d", // Border
      borderRadius: "10px", // Border radius
      marginTop: "2px", // Margin top
      maxWidth: "100%", // Max width
      backgroundColor: "white", // Background color
      transition: "box-shadow 0.3s, border-color 0.3s", // Transition
    }),
  };

  return (
    <>
      {/* <div className="row">
        <div className="inputFname">
          <label htmlFor="fname">First Name *</label>
          <br />
          <input type="text" id="fname" name="fname" placeholder="first name" required/>
        </div>
        <div className="inputLname">
          <label htmlFor="lname">Last Name *</label>
          <br />
          <input type="text" id="lname" name="lname" required/>
        </div>
      </div>
      <div className="row">
        <div className="inputEmail">
          <label htmlFor="email">Email *</label>
          <br />
          <input type="email" id="email" name="email" required/>
        </div>
      </div>
      <div className="row">
      <div className="inputMobDoc">
          <label htmlFor="mobile">Mobile No. *</label>
          <br />
          <input type="text" id="mobile" name="mobile" required/>
        </div>
        <div className="inputRegnNo">
          <label htmlFor="regnNo">Registration No. *</label>
          <br />
          <input type="text" id="regnNo" name="regnNo" required/>
        </div>
      </div>
        

      <div className="row">
        <div className="inputDegree">
            <label htmlFor="degree">Degree(s) *</label>
            <br />
            <Select
                styles={degreeStyles}
                name="degree"
                id="degree"
                className="degree"
                options={degreeOptions}
                isMulti={true}
                placeholder=""
                required
            />
        </div>
      </div>
      <div className="row">
        <div className="inputCertificate">
          <label htmlFor="certificate">Upload Certificate(s) *</label>
          <br />
          <input type="file" name="certificate" id="certificate" />
        </div>
      </div>
      <div className="row">
        <div className="inputGender">
          <label htmlFor="gender">Gender *</label>
          <br />
          <select name="gender" id="gender" required>
            
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="inputBloodGroup">
          <label htmlFor="bloodGroup">Blood group *</label>
          <br />
          {/* <Select
            name="bloodGroup"
            id="bloodGroup"
            options={bloodGroupOptions}
            isSearchable // Enables search functionality
            placeholder="Select Blood Group"
            required
          /> 
          <select name="bloodGroup" id="bloodGroup" required>
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
        <div className="inputDOB">
          <label htmlFor="dob">Date of Birth *</label>
          <br />
          <input type="date" name="dob" id="dob" required/>
        </div>
      </div>
      <div className="row">
        <div className="inputAddress">
          <label htmlFor="address">Address *</label>
          <br />
          <input type="text" name="address" id="address" required/>
        </div>
      </div>
      <div className="row">
        <div className="inputImage">
          <label htmlFor="image">Upload Image</label>
          <br />
          <input type="file" name="image" id="image" />
        </div>
      </div>
      <div className="row">
        <div className="inputDoctorPassword">
          <label htmlFor="password">Password *</label>
          <br />
          <input type="text" id="password" name="password" required/>
        </div>
        <div className="inputDoctorConfirmPassword">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <br />
          <input type="text" id="confirmPassword" name="confirmPassword" required/>
        </div>
      </div>
      <div className="inputDoctorConfirmPassword">
        <label htmlFor="otp">OTP *</label>
        <br />
        <input type="text" id="otp" name="otp" required/>
        <br />
        <br />
        <button type="button" className="submitBtn">
          Request OTP
        </button>
      </div>
      <br />
      <button type="button" className="submitBtn">
        Submit
      </button> */}
      <div>
        <div className="flex justify-items-start space-x-48  mt-16 items-start">
          <div>
            <label htmlFor="fname">First Name *</label>
            <br />
            <input
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
              type="text"
              id="lname"
              name="lname"
              className="style_input"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div>
              <label htmlFor="gender">Gender *</label>
              <br />
              <select
                name="gender"
                id="gender"
                className="style_input"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
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
        </div>
        <div className="flex justify-items-start space-x-48 mt-8">
          <div>
            <label htmlFor="email">Email *</label>
            <br />
            <input
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
              type="text"
              name="mobile"
              id="mobile"
              className="style_input"
              required
            />
          </div>
          <div className="grow">
            <label htmlFor="dob">Date of Birth *</label>
            <br />
            <input
              type="date"
              name="dob"
              id="dob"
              className="style_input w-full"
              required
            />
          </div>
        </div>

        <div className="flex justify-items-start space-x-20  mt-8">
          <div>
            <label htmlFor="image">Upload Image</label>
            <br />
            <input
              type="file"
              name="image"
              id="image"
              className="style_input"
              required
            />
          </div>
          <div className="grow">
            <label htmlFor="address">Address *</label>
            <br />
            <input
              type="text"
              name="address"
              id="address"
              className="style_input w-full "
              required
            />
          </div>
        </div>

        <div className="flex justify-items-start space-x-48 mt-8">
          <div>
            <label htmlFor="regnNo">Registration No. *</label>
            <br />
            <input
              type="text"
              id="regnNo"
              name="regnNo"
              className="style_input"
              required
            />
          </div>

          <div>
            <label htmlFor="degree">Degree(s) *</label>
            <br />
            <Select
              styles={degreeStyles}
              name="degree"
              id="degree"
              className="style_input"
              options={degreeOptions}
              isMulti={true}
              placeholder=""
              required
            />
          </div>

          <div>
            <label htmlFor="certificate">Upload Certificate(s) *</label>
            <br />
            <input
              type="file"
              name="certificate"
              id="certificate"
              className="style_input"
            />
          </div>
        </div>

        <div className="flex justify-items-start space-x-48 mt-8">
          <div>
            <label htmlFor="password">Password *</label>
            <br />
            <input
              type="text"
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
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              className="style_input"
              required
            />
          </div>
        </div>
        <div className="flex space-x-8 mt-8">
          <div>
            <label htmlFor="otp">OTP *</label>
            <br />
            <input
              type="text"
              id="otp"
              name="otp"
              className="style_input"
              required
            />
          </div>
          <div className="mt-6 px-4 py-3 bg-[#2cda6d] rounded-xl text-white font-semibold">
            <button type="button" className="">
              Request OTP
            </button>
          </div>
        </div>
        <br />
        <button
          type="button"
          className="mt-6 px-8 py-3 bg-[#2cda6d] rounded-3xl text-white font-semibold"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default DoctorDetails;
