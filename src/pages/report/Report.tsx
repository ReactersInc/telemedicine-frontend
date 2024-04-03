import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./report.css";
import VerticalNavPatient from "../../components/verticalNavPatient";

interface ReportCardProps {
  reading: string;
  result: string;
  symptoms: string;
  title: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  reading,
  result,
  symptoms,
  title,
}) => (
  <div className="mb-4">
    <p className="font-semibold text-lg text-[#2cda6d]">{title}</p>
    <p className="mt-2 font-semibold text-2xl text-slate-700">{reading}</p>
    <p className="font-medium text-blue-400">{result}</p>
  </div>
);

const ReportPage1 = (
  { SpO2: spo2 }: { SpO2: number },
  { gsr: GSR }: { gsr: number }
) => {
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
  const name = useSelector(
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
    }) => state.user.name
  );

  console.log(email);

  const espInfo = async () => {
    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/getWebData.php";
    const data = {
      // "email": email,
      email: "rajveerjdh2021@gmail.com",
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
          console.log(jsonResponse.Status.record);
          console.log(jsonResponse.Status.record[dateId].pulse);

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
          console.log(date);
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

  const generateReportSpO2 = (SpO2: number): string[] => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "SpO2 Reading";
    let range: string = "";

    if (SpO2 >= 95) {
      reading = "Normal";
      result = "Your Blood Oxygen level is Normal";
    } else if (SpO2 >= 85 && SpO2 < 95) {
      reading = "Low";
      result =
        "Your Blood Oxygen Level is Low. Low blood oxygen levels may lead to Hypoxemia.";
    } else if (SpO2 >= 67 && SpO2 < 85) {
      reading = "Very Low";
      result = "Your Current Blood Oxygen Level is Very Low.";
      symptoms = "At 67%, Visual and Cognitive changes may start to develop ";
    } else {
      reading = "Critically Low";
      result =
        "Your SpO2 level is dangerously low. you’re at risk of developing symptoms of Cyanosis. Immediate medical attention is required.";
    }

    return [reading, result, symptoms, title];
  };

  const generateReportGSR = (gsr: number) => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "GSR Reading";

    if (gsr >= 2000) {
      reading = "Normal";
      result = "GSR reading is Normal";
      symptoms = "";
    } else if (gsr >= 85 && gsr < 95) {
      reading = "";
      result = "";
      symptoms = "";
    } else if (gsr >= 67 && gsr < 85) {
      reading = "";
      result = "";
      symptoms = "";
    } else {
      reading = "";
      result = "";
      symptoms = "";
    }
    return [reading, result, symptoms, title];
  };

  const generateReportBP = (sys: number, dia: number) => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "Blood Pressure Reading";

    if (sys < 120 && dia < 80) {
      reading = "Normal";
      result = "Blood Pressure is Normal";
      symptoms = "";
    } else if (sys >= 120 && dia < 80) {
      reading = "High";
      result = "Elevated Blood Pressure";
      symptoms = "";
    } else if (sys >= 130 && dia >= 80) {
      reading = "Very High";
      result = "Stage 1 Hypertension";
      symptoms = "";
    } else if (sys >= 140 && dia >= 90) {
      reading = "Critically High";
      result = "Stage 2 Hypertension";
      symptoms = "";
    }
    return [reading, result, symptoms, title];
  };

  const generateReportBT = (body_Temp: number) => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "Body Temperature Reading";

    if (body_Temp >= 36.5 && body_Temp < 37.3) {
      reading = "Normal";
      result = "Normal Body Temperature";
      symptoms = "";
    } else if (body_Temp >= 37.3 && body_Temp < 37.9) {
      reading = "Slightly High";
      result = "Low Grade Fever";
      symptoms = "";
    } else if (body_Temp > 38) {
      reading = "Critically High";
      result = "Pyrexia";
      symptoms = "";
    } else {
      reading = "Critically Low";
      result = "Hypothermia";
      symptoms = "";
    }
    return [reading, result, symptoms, title];
  };

  const generateReportPulse = (pulse: number) => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "Pulse Reading";

    if (pulse <= 100 && pulse >= 60) {
      reading = "Normal";
      result = "Pulse reading is Normal";
      symptoms = "";
    } else if (pulse > 100) {
      reading = "High";
      result = "Pulse reading is High. May be at risk of Tachycardia";
      symptoms = "";
    } else {
      reading = "Low";
      result = "Pulse reading is Low. May be at risk of Bradycardia";
      symptoms = "";
    }
    return [reading, result, symptoms, title];
  };
  return (
    <div>
      <VerticalNavPatient />

      <h1 className="mt-12 ml-48 font-semibold text-2xl">Vitals Report</h1>
      <div className="mt-6 ml-48 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="shadow-md rounded-lg p-4 bg-white">
          <ReportCard
            reading={generateReportSpO2(SpO2)[0]}
            result={generateReportSpO2(SpO2)[1]}
            symptoms={generateReportSpO2(SpO2)[2]}
            title={generateReportSpO2(SpO2)[3]}
          />
          <div className="grid grid-cols-2 mt-4">
            <div className="bg-gray-100 py-2 px-4 font-semibold">
              Ranges (in %)
            </div>
            <div className="bg-gray-100 py-2 px-4 font-semibold">Reading</div>
            <div className="py-2 px-4 text-emerald-400">≥ 95</div>
            <div className="py-2 px-4 text-emerald-400">Normal</div>
            <div className="py-2 px-4 text-amber-400">85 ≤ x &lt; 95</div>
            <div className="py-2 px-4 text-amber-400">Low</div>
            <div className="py-2 px-4 text-red-400">67 ≤ x &lt; 85</div>
            <div className="py-2 px-4 text-red-400">Very Low</div>
            <div className="py-2 px-4 text-red-900">&lt; 67</div>
            <div className="py-2 px-4 text-red-900">Critically Low</div>
          </div>
          <p className=" mt-2 text-blue-500">
            For more information, click{" "}
            <a
              className="underline"
              href="https://www.healthline.com/health/normal-blood-oxygen-level#symptoms"
            >
              here
            </a>
          </p>
        </div>
        <div className="shadow-md rounded-lg p-4 bg-white">
          <ReportCard
            reading={generateReportGSR(gsr)[0]}
            result={generateReportGSR(gsr)[1]}
            symptoms={generateReportGSR(gsr)[2]}
            title={generateReportGSR(gsr)[3]}
          />
          <div className="grid grid-cols-2 mt-4">
            <div className="bg-gray-100 py-2 px-4 font-semibold">
              Ranges (in mm/Hg)
            </div>
            <div className="bg-gray-100 py-2 px-4 font-semibold">Reading</div>
            <div className="py-2 px-4">≥ 2000</div>
            <div className="py-2 px-4">Normal</div>
            <div className="py-2 px-4">85 ≤ x &lt; 95</div>
            <div className="py-2 px-4">Low</div>
            <div className="py-2 px-4">67 ≤ x &lt; 85</div>
            <div className="py-2 px-4">Very Low</div>
            <div className="py-2 px-4">&lt; 67</div>
            <div className="py-2 px-4">Critically Low</div>
          </div>
          <p className=" mt-2 text-blue-500">
            For more information, click{" "}
            <a
              className="underline"
              href="https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139"
            >
              here
            </a>
          </p>
        </div>
        <div className="shadow-md rounded-lg p-4 bg-white">
          <ReportCard
            reading={generateReportBP(sys, dia)[0]}
            result={generateReportBP(sys, dia)[1]}
            symptoms={generateReportBP(sys, dia)[2]}
            title={generateReportBP(sys, dia)[3]}
          />
          <div className="grid grid-cols-2 mt-4">
            <div className="bg-gray-100 py-2 px-4 font-semibold">
              Ranges (in mm Hg)
            </div>
            <div className="bg-gray-100 py-2 px-4 font-semibold">Reading</div>
            <div className="py-2 px-4 text-emerald-400">
              sys &lt; 120 and dia &lt; 80
            </div>
            <div className="py-2 px-4 text-emerald-400">Normal</div>
            <div className="py-2 px-4 text-amber-400 ">
              sys ≥ 120 and dia &lt; 80
            </div>
            <div className="py-2 px-4 text-amber-400">High</div>
            <div className="py-2 px-4 text-red-400">sys ≥ 130 and dia ≥ 80</div>
            <div className="py-2 px-4 text-red-400">Very High</div>
            <div className="py-2 px-4 text-red-900">sys ≥ 140 and dia ≥ 90</div>
            <div className="py-2 px-4 text-red-900">Critically High</div>
          </div>
          <div className="py-2 px-4 text-slate-400">
            sys - Systolic | dia - Diastolic
          </div>
          <p className=" mt-2 text-blue-500">
            For more information, click{" "}
            <a
              className="underline"
              href="https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/in-depth/blood-pressure/art-20050982#:~:text=Normal%20blood%20pressure%20Maintain%20or%20adopt%20a%20healthy,or%20adopt%20a%20healthy%20lifestyle.%20130%20to%20139"
            >
              here
            </a>
          </p>
        </div>
        <div className="shadow-md rounded-lg p-4 bg-white">
          <ReportCard
            reading={generateReportBT(bodyTemp)[0]}
            result={generateReportBT(bodyTemp)[1]}
            symptoms={generateReportBT(bodyTemp)[2]}
            title={generateReportBT(bodyTemp)[3]}
          />
          <div className="grid grid-cols-2 mt-4">
            <div className="bg-gray-100 py-2 px-4 font-semibold">
              Ranges (in Celsius)
            </div>
            <div className="bg-gray-100 py-2 px-4 font-semibold">Reading</div>
            <div className="py-2 px-4 text-red-400">≤ 36.5</div>
            <div className="py-2 px-4 text-red-400">Critically Low</div>
            <div className="py-2 px-4 text-emerald-400">36.5 ≤ x &lt; 37.3</div>
            <div className="py-2 px-4 text-emerald-400">Normal</div>
            <div className="py-2 px-4 text-amber-400">37.3 ≤ x &lt; 37.9</div>
            <div className="py-2 px-4 text-amber-400">Slightly High</div>
            <div className="py-2 px-4 text-red-400">{">"} 38</div>
            <div className="py-2 px-4 text-red-400">Critically High</div>
          </div>
          <p className=" mt-2 text-blue-500">
            For more information, click{" "}
            <a
              className="underline"
              href="https://en.wikipedia.org/wiki/Human_body_temperature#:~:text=The%20normal%20human%20body%20temperature%20range%20is,typically%20stated%20as%2036.5%E2%80%9337.5%20%C2%B0C%20%2897.7%E2%80%9399.5%20%C2%B0F%29"
            >
              here
            </a>
          </p>
        </div>
        <div className="shadow-md rounded-lg p-4 bg-white">
          <ReportCard
            reading={generateReportPulse(pulse)[0]}
            result={generateReportPulse(pulse)[1]}
            symptoms={generateReportPulse(pulse)[2]}
            title={generateReportPulse(pulse)[3]}
          />
          <div className="grid grid-cols-2 mt-4">
            <div className="bg-gray-100 py-2 px-4 font-semibold">
              Ranges (in units)
            </div>
            <div className="bg-gray-100 py-2 px-4 font-semibold">Reading</div>
            <div className="py-2 px-4 text-red-400">{"<"} 60</div>
            <div className="py-2 px-4 text-red-400">Low</div>
            <div className="py-2 px-4 text-emerald-400">60 ≤ x ≤ 100</div>
            <div className="py-2 px-4 text-emerald-400">Normal</div>
            <div className="py-2 px-4 text-red-400">{">"} 100</div>
            <div className="py-2 px-4 text-red-400">High</div>
          </div>
          <p className=" mt-2 text-blue-500">
            For more information, click{" "}
            <a
              className="underline"
              href="https://www.healthline.com/health/normal-blood-oxygen-level#symptoms"
            >
              here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage1;
