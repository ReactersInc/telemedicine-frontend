// ReportPage.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VerticalNav from '../../components/verticalNavDoc';
import "./report.css";



const ReportPage = ({ SpO2: spo2 }: { SpO2: number }, { gsr: GSR }: { gsr: number }, ) => {
  const [pulse, setPulse] = useState(0)
  const [SpO2, setSpO2] = useState(0)
  const [roomTemp, setRoomTemp] = useState(0)
  const [bodyTemp, setBodyTemp] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [gsr, setGsr] = useState(0)
  const [sys, setSys] = useState(0)
  const [dia, setDia] = useState(0)
  const [ecgData, setEcgData] = useState([])
  const [date, setDate] = useState([0, 0, 0, 0, 0])
  const [dateId, setDateId] = useState(0)

  const email = useSelector((state: { user: { id: string, email: string, dob: string, exp: number, gender: string, name: string, photoUrl: string, state: string, timeStamp: string } }) => state.user.email)
  const name = useSelector((state: { user: { id: string, email: string, dob: string, exp: number, gender: string, name: string, photoUrl: string, state: string, timeStamp: string } }) => state.user.name)

  console.log(email)

  const espInfo = async () => {
    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/getWebData.php";
    const data = {
      // "email": email,  
      "email": "rajveerjdh2021@gmail.com",
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {

          console.log(jsonResponse.Status.record);
          console.log(jsonResponse.Status.record[dateId].pulse);

          setPulse(jsonResponse.Status.record[dateId].pulse);
          setSpO2(jsonResponse.Status.record[dateId].SpO2);
          setBodyTemp(jsonResponse.Status.record[dateId].body_temp)
          setDia(jsonResponse.Status.record[dateId].dia)
          setGsr(jsonResponse.Status.record[dateId].gsr)
          setHumidity(jsonResponse.Status.record[dateId].humidity)
          setRoomTemp(jsonResponse.Status.record[dateId].room_temp)
          setSys(jsonResponse.Status.record[dateId].sys)
          setEcgData(jsonResponse.Status.record[dateId].ecg)
          date[0] = jsonResponse.Status.record[0].timestamp
          date[1] = jsonResponse.Status.record[1].timestamp
          date[2] = jsonResponse.Status.record[2].timestamp
          date[3] = jsonResponse.Status.record[3].timestamp
          date[4] = jsonResponse.Status.record[4].timestamp
          console.log(date);

        }
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error sending JSON data:', error);
    }
  }

  useEffect(() => {
    espInfo();
  }, [dateId])

  const generateReportspo2 = (SpO2: number) => {
    if (SpO2 >= 95) {
      return "SpO2 OK";
    } else if (SpO2 >= 85 && SpO2 < 95) {
      return "HYPOXEMIA";
    } else if (SpO2 >= 67 && SpO2 < 85) {
      return "Visual and Cognitive Signs";
    } else {
      return "Cyanosis";
    }


  };

  const generateReportgsr = (gsr: number) => {
    if (gsr >= 2000) {
      return "gsr OK";
    } else if (gsr >= 85 && gsr < 95) {
      return "HYPOXEMIA";
    } else if (gsr >= 67 && gsr < 85) {
      return "Visual and Cognitive Signs";
    } else {
      return "Cyanosis";
    }


  };


  const generateReportBP = (sys:number, dia:number) => {
    if (sys >= 100) {
      return "bp OK";
    } else if (gsr >= 85 && gsr < 95) {
      return "HYPOXEMIA";
    } else if (dia >= 67 && gsr < 85) {
      return "Visual and Cognitive Signs";
    } else {
      return "Cyanosis";
    }


  };


  const generateReportBody_temp = (body_Temp:number) => {
    if (body_Temp >= 30) {
      return "body temp  OK";
    } else if (gsr >= 85 && gsr < 95) {
      return "HYPOXEMIA";
    } else if (dia >= 67 && gsr < 85) {
      return "Visual and Cognitive Signs";
    } else {
      return "Cyanosis";
    }


  };


  const generateReportPulse = (pulse:number) => {
    if (pulse >= 90) {
      return "pulse  OK";
    } else if (gsr >= 85 && gsr < 95) {
      return "HYPOXEMIA";
    } else if (dia >= 67 && gsr < 85) {
      return "Visual and Cognitive Signs";
    } else {
      return "Cyanosis";
    }


  };

  return (
    <div>
      
      <VerticalNav />
      <div className='report-heading'>
        <div>
          <h2>Report Page</h2>

        </div>

      </div>

      <div className='report-text'>
        <div>
          <p> SpO2 Report: {generateReportspo2(SpO2)}</p>
          <p>GSR Report: {generateReportgsr(gsr)}</p>
          <p>BP Report: {generateReportBP(sys, dia)}</p>
          <p>body temp Report: {generateReportBody_temp(bodyTemp)}</p>
          <p>Pulse Report: {generateReportPulse(pulse)}</p>

        </div>


      </div>
    </div>
  );
};

export default ReportPage;
