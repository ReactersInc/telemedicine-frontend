// src/App.tsx
import { useState } from "react";
import "./index.css";
import { Circle } from "rc-progress";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import VerticalNavPatient from "../../components/verticalNavPatient";
import { Link } from "react-router-dom";
import axios from 'axios';

function VitalsDashboard() {
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
  const [dateId, setDateId] = useState(0);

  const reportdata = {
    report_pulse: 0,
    report_SpO2: 0,
    report_roomTemp: 0,
    report_bodyTemp: 0,
    report_humidity: 0,
    report_gsr: 0,
    report_sys: 0,
    report_dia: 0,
    report_gsr_highest: 0,
    report_gsr_lowest: 0,
    report_gsr_average: 0,
  };
  const email = useSelector(
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
      };
    }) => state.user.email
  );
  const [gsrdata, setgsrdata] = useState({
    average: 0,
    highest: 0,
    lowest: 0,
  });
  const gsrvalues = {
    average: 0,
    highest: 0,
    lowest: 0,
  }
    const getgsrInfo = async () => {
      const apiUrl = "https://makemytwin.com/IoMTAppAPI/api/getGSRTrends.php";
      const data = {
        email: email,
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
        // const response = await fetch(apiUrl, requestOptions);
        const response = await axios.post(
          "https://makemytwin.com/IoMTAppAPI/api/getGSRTrends.php",
          {
            email: email,
          }
        );  
        
          // const jsonResponse = await response.json();
          const objectvalue = Object.values(response);
          // console.log("GSR VALUES "+objectvalue[0].Data.gsrTrend[0].average);
          gsrvalues.average = parseInt(objectvalue[0].Data.gsrTrend[0].average);
          gsrvalues.highest = parseInt(objectvalue[0].Data.gsrTrend[0].highest);
          gsrvalues.lowest = parseInt(objectvalue[0].Data.gsrTrend[0].lowest);
          setgsrdata({
            lowest: gsrvalues.lowest,
            highest: gsrvalues.highest,
            average: gsrvalues.average,
          });
          console.log("GSR VALUES "+gsrdata.lowest);


          // console.log("GSR VALUES "+gsrdata.highest);
          // console.log("GSR VALUES "+gsrdata.average);
       
      } catch (error) {
        console.error("Error sending JSON data:", error);
      }
    };
    getgsrInfo();
  // console.log(email);

  const espInfo = async () => {
    const apiUrl = "https://makemytwin.com/IoMTAppAPI/api/getWebData.php";
    const data = {
      email: email,
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
          // console.log(jsonResponse.Status.record);
          // console.log(jsonResponse.Status.record[dateId].pulse);

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
          // console.log(date);
        }
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error sending JSON data:", error);
    }
  };

  useEffect(() => {
    espInfo();
  }, [dateId]);

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

  return (
    <div>
      <VerticalNavPatient />
      <div id="vitals-dashboard">
        <div className="timestamp">
          <span>Vitals Dashboard</span>
          <div>
            <label>Data :</label>

            <select
              name="timestamp"
              id="timestamp"
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
      </div>
      <div className="vitalscontainer">
        <div className="ecg-container">
          <div className="col-vitals">
            <div>
              <div> ECG</div>
              <div className="Label-vitals-ecg">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="line"
                  height={250}
                  width={"100%"}
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
              <div className="Progress">
                <div className="Circle-vitals">
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
                    {" "}
                    <p>Body Temp.</p>{" "}
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
                    <div className="progress">
                      <div className="Circle-vitals">
                        <div> GSR</div>
                        <div className="Label-vitals">{gsr}</div>

                        {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                      </div>
                    </div>
                  </div>

                  <div className="Progress-col">
                    <div className="blood-pressure">
                      <div>
                        <div className="blood-pressure-heading">
                          Blood Pressure
                        </div>
                        <div className="row-vitals">
                          <div className="Progress">
                            <div className="Circle-vitals" id="sys">
                              <div> Systolic</div>
                              <div className="Label-vitals">{sys}</div>

                              {/* <Circle percent={sys} strokeWidth={6} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                            </div>
                          </div>
                          <div className="Progress">
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

                  <div className="vitals-report">
                    <div>
                      <Link
                        to={{ pathname: "/report" }}
                        state={{ data: reportdata }}
                        className="report-button"
                      >
                      <button
                        className="w-24 report-button"
                        onClick={() => {
                          reportdata.report_SpO2 = SpO2;
                          reportdata.report_pulse = pulse;
                          reportdata.report_bodyTemp = bodyTemp;
                          reportdata.report_dia = dia;
                          reportdata.report_gsr = gsr;
                          reportdata.report_humidity = humidity;
                          reportdata.report_roomTemp = roomTemp;
                          reportdata.report_sys = sys;
                          reportdata.report_gsr_average = gsrdata.average;
                          reportdata.report_gsr_highest = gsrdata.highest;
                          reportdata.report_gsr_lowest = gsrdata.lowest;
                          console.log(reportdata);
                        }}
                      >
                        Report
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VitalsDashboard;
