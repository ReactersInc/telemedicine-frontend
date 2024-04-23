import { useEffect, useState } from "react";
import VerticalNavDoctor from "../../components/verticalNavDoctor";
import "./index.css";
import { Circle } from "rc-progress";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useLocation } from "react-router-dom";

function PatientsList() {
  const location = useLocation();
  const [pulse, setPulse] = useState(0);
  const [SpO2, setSpO2] = useState(0);
  const [roomTemp, setRoomTemp] = useState(0);
  const [bodyTemp, setBodyTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [gsr, setGsr] = useState(0);
  const [sys, setSys] = useState(0);
  const [dia, setDia] = useState(0);
  const [ecgData, setEcgData] = useState([]);
  const [date, setDate] = useState([0, 0, 0, 0, 0]);
  const [datetwin, setdatetwin] = useState([0, 0, 0, 0, 0]);
  const [dateId, setDateId] = useState(0);
  const [dateId2, setDateId2] = useState(0);

  const [doctorDetails, setDoctorDetails] = useState({
    date: "",
    doctorID: "",
    email: "",
    name: "",
    gender: "",
    patientDOB: "",
  });
  const digitaltwin = async () => {
    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/getProjectedData.php";
    const data = {
      email: doctorDetails.email,
      // email: "rajveerjdh2021@gmail.com",
    };
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
        const valueObjects: any = Object.values(jsonResponse.Data);
        const keysObjects: any = Object.keys(jsonResponse.Data);
        const length: any = Object.keys(jsonResponse.Data).length;

        for (let index = 0; index < length; index++) {
          datetwin[index] = keysObjects[index];
        }

        if (jsonResponse && jsonResponse.Status) {
          setPulse(valueObjects[dateId2].pulse);
          setSpO2(valueObjects[dateId2].SpO2);
          setBodyTemp(valueObjects[dateId2].body_temp);
          setDia(valueObjects[dateId2].dia);
          setGsr(valueObjects[dateId2].gsr);
          setHumidity(valueObjects[dateId2].humidity);
          setRoomTemp(valueObjects[dateId2].room_temp);
          setSys(valueObjects[dateId2].sys);
          setEcgData(valueObjects[dateId2].ecg);
          date[0] = datetwin[0];
          date[1] = datetwin[1];
          date[2] = datetwin[2];
          date[3] = datetwin[3];
          date[4] = datetwin[4];
        }
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error sending JSON data:", error);
    }
  };

  const espInfo = async () => {
    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/getWebData.php";
    const data = {
      email: doctorDetails.email,
      // email: "rajveerjdh2021@gmail.com",
    };
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
          setPulse(jsonResponse.Status.record[dateId].pulse);
          setSpO2(jsonResponse.Status.record[dateId].SpO2);
          setBodyTemp(jsonResponse.Status.record[dateId].body_temp);
          setDia(jsonResponse.Status.record[dateId].dia);
          setGsr(jsonResponse.Status.record[dateId].gsr);
          setHumidity(jsonResponse.Status.record[dateId].humidity);
          setRoomTemp(jsonResponse.Status.record[dateId].room_temp);
          setSys(jsonResponse.Status.record[dateId].sys);
          setEcgData(jsonResponse.Status.record[dateId].ecg);
          date[0] = jsonResponse.Status.record[0].timestamp;
          date[1] = jsonResponse.Status.record[1].timestamp;
          date[2] = jsonResponse.Status.record[2].timestamp;
          date[3] = jsonResponse.Status.record[3].timestamp;
          date[4] = jsonResponse.Status.record[4].timestamp;
        }
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error sending JSON data:", error);
    }
  };
  useEffect(() => {
    if (location.state?.data) {
      setDoctorDetails(location.state?.data);
    }
  }, []);
  useEffect(() => {
    espInfo();
  }, [dateId]);
  useEffect(() => {
    let interval = setInterval(() => {
      digitaltwin();
      console.log("hello 1");
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const options: ApexOptions = {
    chart: {
      id: "ecg-chart",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      width: "100%", // Set the width of the chart to '100%' to fill its container
    },
    xaxis: {
      type: "category",
      categories: Array.from({ length: ecgData.length }, (_, i) =>
        (i + 1).toString()
      ),
      labels: {
        show: false, // Set this to false to hide x-axis labels
      },
    },
    yaxis: {
      min: Math.min(...ecgData) - 50,
      max: Math.max(...ecgData) + 50,
    },
    stroke: {
      curve: "straight",
      width: 1,
    },
    grid: {
      borderColor: "#A9FFC6", // Set the color of the grid lines to green
    },
    colors: ["#009900"],
  };

  const series = [
    {
      name: "ECG",
      data: ecgData,
    },
  ];

  const [submitdata, setSubmitData] = useState({
    diagnosis: "",
    prescription: "",
  });
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setSubmitData({ ...submitdata, [name]: value });
  };
  const submitDiagnosis = async () => {
    if (submitdata.diagnosis != "" || submitdata.prescription != "") {
      const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/addDiagnosis.php";
      const data6 = {
        doctor_id: doctorDetails?.doctorID,
        p_email: doctorDetails?.email,
        book_date: doctorDetails.date,
        diagnosis: submitdata.diagnosis,
        prescription: submitdata.prescription,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data6),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        if (response.ok) {
          alert("Submit Successfully");
          setSubmitData({ diagnosis: "", prescription: "" });
          window.location.href = "/doctordashboard";
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error sending JSON data:", error);
      }
    } else {
      alert("Diagnosis and Prescription can't be empty ");
    }
  };
  const [show, setShow] = useState(false);
  const [showdigitaltwin, setShowdigitaltwin] = useState(false);
  const handleClose = () => {
    if (showdigitaltwin === true) {
      setShowdigitaltwin(false);
    } else {
      espInfo();
    }

    setShow(!show);
  };
  const handleCloseDigitalTwin = () => {
    if (show === true) {
      setShow(false);
    } else {
      digitaltwin();
    }
    setShowdigitaltwin(!showdigitaltwin);
  };

  return (
    <div>
      <VerticalNavDoctor />
      <div className="ml-56 mt-16 ">
        <div className="flex border-2 border-[#2cda6d] rounded-2xl overflow-hidden bg-white ">
          <div className="rounded-md p-6 shade bg-white w-full ">
            <h1 className="font-semibold text-xl">Patients</h1>
            <table className="w-full border-collapse mt-4">
              <thead className="flex-wrap">
                <tr>
                  <th className="border-b-2 p-2 text-center  font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Patient Name
                  </th>
                  <th className="border-b-2 p-2 text-center  font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Gender
                  </th>
                  <th className="border-b-2 p-2 text-center  font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Add Diagnosis
                  </th>
                  <th className="border-b-2 p-2 text-center  font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Add Prescribe
                  </th>
                  <th className="border-b-2 p-2 text-center  font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Patient Vitals
                  </th>
                  <th className="border-b-2 p-2 text-center  font-semibold bg-[#f5f9fe] border-[#f5f9fe]">
                    Submit
                  </th>
                </tr>
              </thead>
              <tbody className="flex-wrap">
                <tr>
                  <td className="border-b-2 p-2 text-center">
                    {doctorDetails?.name}
                  </td>
                  <td className="border-b-2 p-2 text-center">
                    {doctorDetails?.gender}
                  </td>

                  <td className="border-b-2 p-2 text-center">
                    <div className="flex justify-center">
                      <textarea
                        autoComplete="off"
                        id="diagnosis"
                        onChange={handleInputChange}
                        name="diagnosis"
                        className="style_input"
                        placeholder="Write diagnosis"
                        rows={5}
                      />
                    </div>
                  </td>
                  <td className="border-b-2 p-2 text-center">
                    <div className="flex justify-center">
                      <textarea
                        autoComplete="off"
                        id="prescription"
                        name="prescription"
                        onChange={handleInputChange}
                        className="style_input"
                        placeholder="Write prescribe"
                        rows={5}
                      />
                    </div>
                  </td>
                  <td className="border-b-2 p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="w-24"
                        onClick={() => {
                          espInfo();
                          handleClose();
                        }}
                      >
                        View Vitals
                      </button>
                      <button
                        className="w-24"
                        onClick={() => {
                          digitaltwin();
                          handleCloseDigitalTwin();
                        }}
                      >
                        Digital Twin
                      </button>
                    </div>
                  </td>
                  <td className="border-b-2 p-2 text-center">
                    <button className="w-24" onClick={submitDiagnosis}>
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {show && (
          <div className="bg-white p-8  rounded-3xl my-5 mb-10 border-2 border-[#2cda6d] w-full">
            <div className="flex justify-center font-bold text-3xl border-b-2 mb-3 pb-3  border-[#2cda6d] border-dashed ">
              <p>Paitent Vitals</p>
            </div>
            <div className="flex justify-between font-bold">
              <span>Vitals Dashboard</span>
              <div>
                <label>Date :</label>

                <select
                  onChange={(e) => {
                    setDateId(parseInt(e.target.value));
                  }}
                >
                  <option value={0}>{date[0]}</option>
                  <option value={1}>{date[1]}</option>
                  <option value={2}>{date[2]}</option>
                  <option value={3}>{date[3]}</option>
                  <option value={4}>{date[4]}</option>
                </select>
              </div>
            </div>
            <div className="mb-10">
              <div className="ecg-container">
                <div className="p-6 shadow-md shadow-[#2cda6d] rounded-3xl my-5 mb-10">
                  <div>
                    <div> ECG</div>
                    <div className="">
                      <ReactApexChart
                        options={options}
                        series={series}
                        type="line"
                        height={250}
                        width={"95%"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="vitals-table">
                <div className="col">
                  <div className="row-vitals">
                    <div className="Progress">
                      <div className="Circle-vitals">
                        <div> Heart Rate</div>
                        <div className="Label-vitals">{pulse}</div>
                        {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                        <img src="./static/heartRate.png" alt="" width={150} />
                      </div>
                    </div>
                    <div className="Progress ">
                      <div className="Circle-vitals shadow-lg shadow-[#2cda6d] rounded-3xl ">
                        <div> SpO2</div>
                        <div className="Label-vitals-center">{SpO2}</div>
                        <Circle
                          percent={SpO2}
                          strokeWidth={7}
                          strokeColor="#25D366"
                          trailWidth={7}
                          trailColor="#d6e7da"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-vitals">
                    <div className="Progress">
                      <div className="Circle-vitals">
                        <div> Room Temp.</div>
                        <div className="Label-vitals-center">{roomTemp}°C</div>
                        <Circle
                          percent={
                            ((roomTemp - 15) * 100) / (30 - 15) > 100
                              ? 100
                              : ((roomTemp - 15) * 100) / (30 - 15)
                          }
                          strokeWidth={5}
                          strokeColor="#25D366"
                          trailWidth={5}
                          trailColor="#d6e7da"
                          gapDegree={90}
                          gapPosition="bottom"
                        />
                      </div>
                    </div>
                    <div className="progress">
                      <div className="Circle-vitals">
                        <div className="body-temp">
                          <p>Body Temp.</p>
                        </div>
                        <div className="Label-vitals">
                          <div className="h-20">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="150"
                              viewBox="0 0 45 125"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.5319 79.4599C14.8067 81.6438 14.044 83.8295 12.5307 85.197C8.75357 88.6097 6.34672 93.8771 6.35104 99.7902C6.35834 110.042 13.6289 118.346 22.5902 118.337C31.5516 118.329 38.8103 110.011 38.803 99.7596C38.7986 93.8468 36.3845 88.584 32.6022 85.1781C31.087 83.8134 30.3214 81.6292 30.5929 79.4451C30.6467 79.0122 30.6748 78.5674 30.6743 78.111L30.6302 16.2361C30.6264 11.1102 26.9913 6.95823 22.5105 6.9624C18.0299 6.96661 14.4005 11.1254 14.4043 16.2513L14.4483 78.1262C14.4489 78.5825 14.4775 79.0274 14.5319 79.4599ZM8.9956 16.2563C8.98938 7.7132 15.0382 0.78193 22.5061 0.774908C29.9739 0.767916 36.0326 7.68786 36.0389 16.231L36.0829 78.1061C36.0835 78.8563 36.0375 79.5942 35.9477 80.3163C40.9753 84.8437 44.2059 91.8668 44.2116 99.7546C44.2213 113.424 34.5431 124.514 22.5946 124.525C10.6463 124.536 0.952126 113.464 0.94239 99.7951C0.936711 91.9073 4.15729 84.878 9.17841 80.3413C9.08755 79.6196 9.04022 78.8817 9.03968 78.1311L8.9956 16.2563Z"
                                fill="#317873"
                              />
                              <path
                                d="M22.5215 22.4313C22.5201 20.7226 23.7301 19.3363 25.2236 19.335L30.6323 19.3301L30.6366 25.5176L25.228 25.5225C23.7344 25.5238 22.5226 24.1399 22.5215 22.4313Z"
                                fill="#317873"
                              />
                              <path
                                d="M22.5303 34.8063C22.5289 33.0976 23.7388 31.7113 25.2322 31.71L30.6408 31.7051L30.6454 37.8926L25.2368 37.8975C23.7432 37.8988 22.5314 36.5149 22.5303 34.8063Z"
                                fill="#317873"
                              />
                              <path
                                d="M22.5391 47.1812C22.5377 45.4726 23.7476 44.0863 25.241 44.085L30.6496 44.0801L30.6542 50.2676L25.2456 50.2725C23.752 50.2738 22.5401 48.8899 22.5391 47.1812Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.87402 82.1305L36.9395 113.043L40.7607 108.664L13.6952 77.752L9.87402 82.1305Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.86523 69.7558L39.6372 103.759L43.4586 99.38L13.6867 65.377L9.86523 69.7558Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.6846 61.7524L31.277 81.8454L35.0982 77.4665L17.5058 57.3735L13.6846 61.7524Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24.502 61.7422L31.2679 69.4697L35.0894 65.0912L28.3232 57.3633L24.502 61.7422Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.7285 56.4726L33.3634 56.4521L33.3677 62.6396L11.7328 62.6601L11.7285 56.4726Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.38379 90.5093L33.4492 121.421L37.2707 117.042L10.2053 86.1304L6.38379 90.5093Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M2.89355 98.8877L24.546 123.617L28.3672 119.239L6.71477 94.5088L2.89355 98.8877Z"
                                fill="#317873"
                              />
                            </svg>
                          </div>
                          <div>{bodyTemp}°C</div>
                        </div>

                        {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                      </div>
                    </div>
                  </div>
                  {/* if needed paste humidity and gsr here it is their original position */}
                </div>
                <div className="col">
                  <div className="row-vitals">
                    <div className="progress">
                      <div className="row-vitals">
                        <div className="progress">
                          <div className="Circle-vitals">
                            <div> Humidity</div>
                            <div className="Label-vitals">{humidity}</div>

                            {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                          </div>
                          <div className="progress mt-8">
                            <div className="Circle-vitals">
                              <div> GSR</div>
                              <div className="Label-vitals">{gsr}</div>

                              {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                            </div>
                          </div>
                        </div>

                        <div className="Progress-col">
                          <div className="blood-pressure">
                            <div className="">
                              <div className="blood-pressure-heading ">
                                Blood Pressure
                              </div>
                              <div className="row-vitals ">
                                <div className="Progress ">
                                  <div className="Circle-vitals" id="sys">
                                    <div> Systolic</div>
                                    <div className="Label-vitals">{sys}</div>

                                    {/* <Circle percent={sys} strokeWidth={6} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                                  </div>
                                </div>
                                <div className="Progress ">
                                  <div className="Circle-vitals" id="dia">
                                    <div> Diastolic</div>
                                    <div className="Label-vitals">{dia}</div>

                                    {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showdigitaltwin && (
          <div className="bg-white p-8  rounded-3xl my-5 mb-10 border-2 border-[#2cda6d] w-full">
            <div className="flex justify-center font-bold text-3xl border-b-2 mb-3 pb-3  border-[#2cda6d] border-dashed ">
              <p>Digital Twin</p>
            </div>
            <div className="flex justify-between font-bold">
              <span>Vitals Dashboard</span>
            </div>
            <div className="mb-10">
              <div className="ecg-container">
                <div className="p-6 shadow-md shadow-[#2cda6d] rounded-3xl my-5 mb-10">
                  <div>
                    <div> ECG</div>
                    <div className="">
                      <ReactApexChart
                        options={options}
                        series={series}
                        type="line"
                        height={250}
                        width={"95%"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="vitals-table">
                <div className="col">
                  <div className="row-vitals">
                    <div className="Progress">
                      <div className="Circle-vitals">
                        <div> Heart Rate</div>
                        <div className="Label-vitals">{pulse}</div>
                        {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                        <img src="./static/heartRate.png" alt="" width={150} />
                      </div>
                    </div>
                    <div className="Progress ">
                      <div className="Circle-vitals shadow-lg shadow-[#2cda6d] rounded-3xl ">
                        <div> SpO2</div>
                        <div className="Label-vitals-center">{SpO2}</div>
                        <Circle
                          percent={SpO2}
                          strokeWidth={7}
                          strokeColor="#25D366"
                          trailWidth={7}
                          trailColor="#d6e7da"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row-vitals">
                    <div className="Progress">
                      <div className="Circle-vitals">
                        <div> Room Temp.</div>
                        <div className="Label-vitals-center">{roomTemp}°C</div>
                        <Circle
                          percent={
                            ((roomTemp - 15) * 100) / (30 - 15) > 100
                              ? 100
                              : ((roomTemp - 15) * 100) / (30 - 15)
                          }
                          strokeWidth={5}
                          strokeColor="#25D366"
                          trailWidth={5}
                          trailColor="#d6e7da"
                          gapDegree={90}
                          gapPosition="bottom"
                        />
                      </div>
                    </div>
                    <div className="progress">
                      <div className="Circle-vitals">
                        <div className="body-temp">
                          <p>Body Temp.</p>
                        </div>
                        <div className="Label-vitals">
                          <div className="h-20">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="150"
                              viewBox="0 0 45 125"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.5319 79.4599C14.8067 81.6438 14.044 83.8295 12.5307 85.197C8.75357 88.6097 6.34672 93.8771 6.35104 99.7902C6.35834 110.042 13.6289 118.346 22.5902 118.337C31.5516 118.329 38.8103 110.011 38.803 99.7596C38.7986 93.8468 36.3845 88.584 32.6022 85.1781C31.087 83.8134 30.3214 81.6292 30.5929 79.4451C30.6467 79.0122 30.6748 78.5674 30.6743 78.111L30.6302 16.2361C30.6264 11.1102 26.9913 6.95823 22.5105 6.9624C18.0299 6.96661 14.4005 11.1254 14.4043 16.2513L14.4483 78.1262C14.4489 78.5825 14.4775 79.0274 14.5319 79.4599ZM8.9956 16.2563C8.98938 7.7132 15.0382 0.78193 22.5061 0.774908C29.9739 0.767916 36.0326 7.68786 36.0389 16.231L36.0829 78.1061C36.0835 78.8563 36.0375 79.5942 35.9477 80.3163C40.9753 84.8437 44.2059 91.8668 44.2116 99.7546C44.2213 113.424 34.5431 124.514 22.5946 124.525C10.6463 124.536 0.952126 113.464 0.94239 99.7951C0.936711 91.9073 4.15729 84.878 9.17841 80.3413C9.08755 79.6196 9.04022 78.8817 9.03968 78.1311L8.9956 16.2563Z"
                                fill="#317873"
                              />
                              <path
                                d="M22.5215 22.4313C22.5201 20.7226 23.7301 19.3363 25.2236 19.335L30.6323 19.3301L30.6366 25.5176L25.228 25.5225C23.7344 25.5238 22.5226 24.1399 22.5215 22.4313Z"
                                fill="#317873"
                              />
                              <path
                                d="M22.5303 34.8063C22.5289 33.0976 23.7388 31.7113 25.2322 31.71L30.6408 31.7051L30.6454 37.8926L25.2368 37.8975C23.7432 37.8988 22.5314 36.5149 22.5303 34.8063Z"
                                fill="#317873"
                              />
                              <path
                                d="M22.5391 47.1812C22.5377 45.4726 23.7476 44.0863 25.241 44.085L30.6496 44.0801L30.6542 50.2676L25.2456 50.2725C23.752 50.2738 22.5401 48.8899 22.5391 47.1812Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.87402 82.1305L36.9395 113.043L40.7607 108.664L13.6952 77.752L9.87402 82.1305Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.86523 69.7558L39.6372 103.759L43.4586 99.38L13.6867 65.377L9.86523 69.7558Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.6846 61.7524L31.277 81.8454L35.0982 77.4665L17.5058 57.3735L13.6846 61.7524Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24.502 61.7422L31.2679 69.4697L35.0894 65.0912L28.3232 57.3633L24.502 61.7422Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.7285 56.4726L33.3634 56.4521L33.3677 62.6396L11.7328 62.6601L11.7285 56.4726Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.38379 90.5093L33.4492 121.421L37.2707 117.042L10.2053 86.1304L6.38379 90.5093Z"
                                fill="#317873"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M2.89355 98.8877L24.546 123.617L28.3672 119.239L6.71477 94.5088L2.89355 98.8877Z"
                                fill="#317873"
                              />
                            </svg>
                          </div>
                          <div>{bodyTemp}°C</div>
                        </div>

                        {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                      </div>
                    </div>
                  </div>
                  {/* if needed paste humidity and gsr here it is their original position */}
                </div>
                <div className="col">
                  <div className="row-vitals">
                    <div className="progress">
                      <div className="row-vitals">
                        <div className="progress">
                          <div className="Circle-vitals">
                            <div> Humidity</div>
                            <div className="Label-vitals">{humidity}</div>

                            {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                          </div>
                          <div className="progress mt-8">
                            <div className="Circle-vitals">
                              <div> GSR</div>
                              <div className="Label-vitals">{gsr}</div>

                              {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                            </div>
                          </div>
                        </div>

                        <div className="Progress-col">
                          <div className="blood-pressure">
                            <div className="">
                              <div className="blood-pressure-heading ">
                                Blood Pressure
                              </div>
                              <div className="row-vitals ">
                                <div className="Progress ">
                                  <div className="Circle-vitals" id="sys">
                                    <div> Systolic</div>
                                    <div className="Label-vitals">{sys}</div>

                                    {/* <Circle percent={sys} strokeWidth={6} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                                  </div>
                                </div>
                                <div className="Progress ">
                                  <div className="Circle-vitals" id="dia">
                                    <div> Diastolic</div>
                                    <div className="Label-vitals">{dia}</div>

                                    {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientsList;
