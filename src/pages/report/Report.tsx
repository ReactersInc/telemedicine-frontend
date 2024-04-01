// ReportPage.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./report.css";
import VerticalNavPatient from '../../components/verticalNavPatient';



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
      return (
      <div className='display-container'>
      <div className='vital-heading'>
      <h1>Your Blood Oxygen level is good.</h1>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.healthline.com/health/normal-blood-oxygen-level#symptoms'>click here</a></p>
      </div>
      </div>

      </div>
    );
    } else if (SpO2 >= 85 && SpO2 < 95) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
        <p>HYPOXEMIA</p>
      <h1>Your Blood Oxygen level is low.</h1>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.healthline.com/health/normal-blood-oxygen-level#symptoms'>click here</a></p>
      </div>
      </div>

      </div>
      );
    } else if (SpO2 >= 67 && SpO2 < 85) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <h1>Your Blood Oxygen level is very low.</h1>
      <h1>visual and cognitive changes may start to develop.</h1>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      
      <p>To know More <a href='https://www.healthline.com/health/normal-blood-oxygen-level#symptoms'><span className='click-here-link'>click here</span></a></p>
      
      </div>

      </div>
      );
    } else {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
        <p>CYANOSIS</p>
      <h1>Your Blood Oxygen level is critically low.</h1>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.healthline.com/health/normal-blood-oxygen-level#symptoms'>click here</a></p>
      </div>
      </div>

      </div>
      );
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
    if (sys< 120  && dia<80) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <h1>Normal Blood Pressure</h1>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
      );
    } else if (sys >= 120 && dia < 80) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <p>Elevated Blood Pressure</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
      );
    } else if (sys >= 130 && dia >= 80) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <p>Stage 1 Hypertension</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
      );
    } else if(sys>=140 && dia>=90) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <p>Stage 2 Hypertension</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
      );
    }


  };


  const generateReportBody_temp = (body_Temp:number) => {
    if (body_Temp >= 36.5 && body_Temp <37.3) {
      return (<div className='display-container'>
      <div className='vital-heading'>
      <p>Normal Body Temperature</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>);
    } else if (body_Temp >= 37.3 && body_Temp < 37.9) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <p>Low Grade Fever</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
      );
    } else if (body_Temp >38) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <p>Fever (Pyrexia)</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
      );
    } else{
      return(
        <div className='display-container'>
      <div className='vital-heading'>
      <p>Hypothermia</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
      );
    }


  };


  const generateReportPulse = (pulse:number) => {
    if (pulse<=100 && pulse>=60) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <p>Normal Pulse</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
        
      );
    } else if (pulse>100) {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <p>High Pulse(Tachycardia)</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
        
      );
   
    } else {
      return (
        <div className='display-container'>
      <div className='vital-heading'>
      <p>Low Pulse (Bradycardia)</p>
      </div>
      <div className='display-icon'>
        <img src="./static/healthySpo2.png" alt="" />

      </div>
      <div className='more-info-link'>
      <div >
      <p>To know More <a href='https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139'>click here</a></p>
      </div>
      </div>

      </div>
      );
    }


  };

 

  return (
    <div>
      <VerticalNavPatient/>
      <div className='report-title-heading'>
        <div>
          <p>Report Page</p>

        </div>

      </div>

      <div className='report-container'>
  <div className='report-text'>
    <p> SpO2 Report: {(SpO2)} {generateReportspo2(SpO2)}</p>
  </div>
  <div className='report-text'>
    <p>GSR Report: {(gsr)} {generateReportgsr(gsr)}</p>
  </div>
  <div className='report-text'>
    <p>BP Report: {generateReportBP(sys, dia)}</p>
  </div>
  <div className='report-text'>
    <p>body temp Report: {generateReportBody_temp(bodyTemp)}</p>
  </div>
  <div className='report-text'>
    <p>Pulse Report: {generateReportPulse(pulse)}</p>
  </div>
</div>


    </div>
  );
};

export default ReportPage;
