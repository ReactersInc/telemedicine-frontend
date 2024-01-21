import React, { useState, ChangeEvent } from "react";
import "./index.css";
import Select from "react-select";

function DoctorDetails() {

    const degreeOptions = [
        {value: "MBBS", label:"MBBS"},
        {value: "MD", label:"MD"},
        {value: "BDS", label:"BDS"},
    ]
    const degreeStyles = {
        control: (provided: any) => ({
          ...provided,
          padding: "0px",
          width: "90vw",
          borderTop: " transparent ",
          borderLeft: " transparent ",
          borderRight: " transparent ",
          borderBottom: "1px solid rgb(163, 163, 163)",
          borderRadius: "0px",
          zIndex: "0"
        }),
      };
      
  return (
    <>
      <div className="row">
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
          /> */}
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
      </button>
    </>
  );
}

export default DoctorDetails;
