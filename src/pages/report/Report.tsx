import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./report.css";
import VerticalNavPatient from "../../components/verticalNavPatient";
interface ReportCardProps {
  reading: string;
  result: string;
  symptoms: string;
  title: string;
  val: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  reading,
  result,
  symptoms,
  title,
  val,
}) => {
  // Define a variable to hold the color class based on the reading
  let readingColorClass = "";
  let resultColorClass = "";

  // Check the reading and assign colorClass accordingly
  if (reading === "Normal" || reading == "Relaxed") {
    readingColorClass = "text-green-500"; // Green color for normal reading
    resultColorClass = "text-blue-500"; // Blue color for result
  } else if (
    reading === "Low" ||
    reading === "Critically Low" ||
    reading == "High" ||
    reading == "Elevated" ||
    reading == "Highly Stressed" ||
    reading == "Stressed"
  ) {
    readingColorClass = "text-red-500"; // Red color for low or critically low reading
    resultColorClass = "text-blue-500"; // Blue color for result
  }
  else if (reading === "Preliminary Data") {
    readingColorClass = "text-[#0d9488]"; // Blue color for low or critically low reading
    resultColorClass = "text-blue-500"; // Blue color for result
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <p className="font-semibold text-lg">{title}</p>
        <p className={`font-semibold text-lg ${readingColorClass}`}>{val}</p>
      </div>
      <p className={`mt-2 font-semibold text-2xl  ${readingColorClass}`}>
        {reading}
      </p>
      <p className={`font-medium ${resultColorClass}`}>{result}</p>
    </div>
  );
};

const ReportPage1 = () => {
  const location = useLocation();

  const [pulse, setPulse] = useState(0);
  const [SpO2, setSpO2] = useState(0);
  const [roomTemp, setRoomTemp] = useState(0);
  const [bodyTemp, setBodyTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [gsr_highest, setGsrhighest] = useState(0);
  const [gsr_lowest, setGsrlowest] = useState(0);
  const [gsr_average, setGsraverage] = useState(0);
  const [gsr, setGsr] = useState(0);
  const [sys, setSys] = useState(0);
  const [dia, setDia] = useState(0);
  const [state, setstate] = useState(true);
  const [lode, setLode] = useState(false);
  useEffect(() => {
    // console.log(location.state?.data);
    if (location.state?.data) {
      if (
        location.state?.data.report_bodyTemp == 0 &&
        location.state?.data.report_dia == 0 &&
        location.state?.data.report_gsr == 0 &&
        location.state?.data.report_humidity == 0 &&
        location.state?.data.report_pulse == 0 &&
        location.state?.data.report_roomTemp == 0 &&
        location.state?.data.report_SpO2 == 0 &&
        location.state?.data.report_sys == 0
      ) {
        setstate(false);
      }
      setBodyTemp(location.state?.data.report_bodyTemp);
      setDia(location.state?.data.report_dia);
      setGsr(location.state?.data.report_gsr);
      setHumidity(location.state?.data.report_humidity);
      setPulse(location.state?.data.report_pulse);
      setRoomTemp(location.state?.data.report_roomTemp);
      setSpO2(location.state?.data.report_SpO2);
      setSys(location.state?.data.report_sys);
      setGsraverage(location.state?.data.report_gsr_average);
      setGsrhighest(location.state?.data.report_gsr_highest);
      setGsrlowest(location.state?.data.report_gsr_lowest);
      console.log(gsr_average);
      console.log(gsr_highest);
      console.log(gsr_lowest);
    }
  }, [location.state?.data]);
  useEffect(() => {
    setTimeout(() => {
      setLode(true);
    }, 2500);
  }, []);
  const generateReportSpO2 = (SpO2: number): string[] => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "SpO2 Reading";
    let val: string = SpO2 + " %";

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

    return [reading, result, symptoms, title, val];
  };

  const generateReportGSR = (gsr: number) => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "GSR Reading";
    let val: string = gsr + " mm/Hg";
    if (gsr == gsr_average && gsr == gsr_highest && gsr == gsr_lowest)
    {
      reading = "Preliminary Data";
      result =
        "The Data is the first reading and Doesn't have a comparison point yet.";
      symptoms = "";
    }
    else if (gsr > gsr_highest) {
      reading = "Highly Stressed";
      result = "Urgent Attention Needed";
      symptoms = "";
    } else if (gsr > gsr_average && gsr <= gsr_highest) {
      reading = "Stressed";
      result = "Monitor, Not Urgent";
      symptoms = "";
    } else if (gsr > gsr_lowest && gsr <= gsr_average) {
      reading = "Normal";
      result = "No Concern";
      symptoms = "";
    } else if (gsr <= gsr_lowest) {
      reading = "Relaxed";
      result = "No Action Needed";
      symptoms = "";
    } else {
      reading = "N/A";
      result = "No Data Available";
      symptoms = "";
    }
    return [reading, result, symptoms, title, val];
  };

  const generateReportBP = (sys: number, dia: number) => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "Blood Pressure Reading";
    let val: string = sys + "/" + dia + " mm Hg";

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
    } else if (sys >= 180 && dia >= 120) {
      reading = "Emergency";
      result = "Hypertensive Crisis";
      symptoms = "";
    } else if (sys > 90 && dia > 60) {
      reading = "Low";
      result = "Hypotension";
      symptoms = "";
    }
    return [reading, result, symptoms, title, val];
  };

  const generateReportBT = (body_Temp: number) => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "Body Temperature Reading";
    let val: string = body_Temp + " Celsius";

    if (body_Temp >= 35.0 && body_Temp < 37.5) {
      reading = "Normal";
      result = "Normal Body Temperature";
      symptoms = "";
    } else if (body_Temp >= 37.6 && body_Temp < 38.3) {
      reading = "Slightly High";
      result = "Low Grade Fever";
      symptoms = "";
    } else if (body_Temp > 38.3) {
      reading = "Critically High";
      result = "Pyrexia";
      symptoms = "";
    } else {
      reading = "Critically Low";
      result = "Hypothermia";
      symptoms = "";
    }
    return [reading, result, symptoms, title, val];
  };

  const generateReportPulse = (pulse: number) => {
    let reading: string = "";
    let result: string = "";
    let symptoms: string = "";
    let title: string = "Pulse Reading";
    let val: string = pulse + " bpm";

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
    return [reading, result, symptoms, title, val];
  };
  
  return (
    <div>
      <VerticalNavPatient />
      <div className="mt-6 ml-48 border-2  border-green-500 rounded-2xl p-5">
        {state ? (
          <div>
            <h1 className="font-semibold text-2xl text-center">
              Vitals Report
            </h1>
            {lode ? (
              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="shadow-md rounded-lg p-4 bg-white shadow-green-500 ">
                  <ReportCard
                    reading={generateReportSpO2(SpO2)[0]}
                    result={generateReportSpO2(SpO2)[1]}
                    symptoms={generateReportSpO2(SpO2)[2]}
                    title={generateReportSpO2(SpO2)[3]}
                    val={generateReportSpO2(SpO2)[4]}
                  />
                  <div className="grid grid-cols-2 mt-4">
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Ranges (in %)
                    </div>
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Reading
                    </div>
                    <div className="py-2 px-4 text-emerald-400">≥ 95</div>
                    <div className="py-2 px-4 text-emerald-400">Normal</div>
                    <div className="py-2 px-4 text-amber-400">
                      85 ≤ x &lt; 95
                    </div>
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
                <div className="shadow-md rounded-lg p-4 bg-white shadow-green-500 ">
                  <ReportCard
                    reading={generateReportGSR(gsr)[0]}
                    result={generateReportGSR(gsr)[1]}
                    symptoms={generateReportGSR(gsr)[2]}
                    title={generateReportGSR(gsr)[3]}
                    val={generateReportGSR(gsr)[4]}
                  />
                  <div className="grid grid-cols-2 mt-4">
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Ranges (in mm/Hg)
                    </div>
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Reading
                    </div>
                    <div className="py-2 px-4 text-blue-400 font-semibold">
                      {gsr}
                    </div>
                    <div className="py-2 px-4 text-blue-400 font-semibold">
                      Current Reading
                    </div>
                    <div className="py-2 px-4 text-red-400">{gsr_highest}</div>
                    <div className="py-2 px-4 text-red-400">Your Highest</div>
                    <div className="py-2 px-4 text-amber-400">
                      {gsr_average}
                    </div>
                    <div className="py-2 px-4 text-amber-400">Your Average</div>
                    <div className="py-2 px-4 text-green-400">{gsr_lowest}</div>
                    <div className="py-2 px-4 text-green-400">Your Lowest</div>
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
                <div className="shadow-md rounded-lg p-4 bg-white shadow-green-500 ">
                  <ReportCard
                    reading={generateReportBP(sys, dia)[0]}
                    result={generateReportBP(sys, dia)[1]}
                    symptoms={generateReportBP(sys, dia)[2]}
                    title={generateReportBP(sys, dia)[3]}
                    val={generateReportBP(sys, dia)[4]}
                  />
                  <div className="grid grid-cols-2 mt-4">
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Ranges (in mm Hg)
                    </div>
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Reading
                    </div>
                    <div className="py-2 px-4 text-red-400">
                      sys &lt; 90 and dia &lt; 60
                    </div>
                    <div className="py-2 px-4 text-red-400">Low</div>
                    <div className="py-2 px-4 text-emerald-400">
                      sys &lt; 120 and dia &lt; 80
                    </div>
                    <div className="py-2 px-4 text-emerald-400">Normal</div>
                    <div className="py-2 px-4 text-amber-400 ">
                      sys ≥ 120 and dia &lt; 80
                    </div>
                    <div className="py-2 px-4 text-amber-400">Elevated</div>
                    <div className="py-2 px-4 text-red-400">
                      sys ≥ 130 and dia ≥ 80
                    </div>
                    <div className="py-2 px-4 text-red-400">High</div>
                    <div className="py-2 px-4 text-red-700">
                      sys ≥ 140 and dia ≥ 90
                    </div>
                    <div className="py-2 px-4 text-red-700">Very High</div>
                    <div className="py-2 px-4 text-red-900">
                      sys ≥ 180 and dia ≥ 120
                    </div>
                    <div className="py-2 px-4 text-red-900">
                      Critically High
                    </div>
                  </div>

                  <div className="py-2 px-4 text-slate-400">
                    sys - Systolic | dia - Diastolic
                  </div>
                  <p className=" mt-2 text-blue-500">
                    For more information, click{" "}
                    <a
                      className="underline"
                      href="https://www.healthline.com/health/diastole-vs-systole"
                    >
                      here
                    </a>
                  </p>
                </div>
                <div className="shadow-md rounded-lg p-4 bg-white shadow-green-500 ">
                  <ReportCard
                    reading={generateReportBT(bodyTemp)[0]}
                    result={generateReportBT(bodyTemp)[1]}
                    symptoms={generateReportBT(bodyTemp)[2]}
                    title={generateReportBT(bodyTemp)[3]}
                    val={generateReportBT(bodyTemp)[4]}
                  />
                  <div className="grid grid-cols-2 mt-4">
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Ranges (in Celsius)
                    </div>
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Reading
                    </div>
                    <div className="py-2 px-4 text-red-400">≤ 36.5</div>
                    <div className="py-2 px-4 text-red-400">Critically Low</div>
                    <div className="py-2 px-4 text-emerald-400">
                      36.5 ≤ x &lt; 37.3
                    </div>
                    <div className="py-2 px-4 text-emerald-400">Normal</div>
                    <div className="py-2 px-4 text-amber-400">
                      37.3 ≤ x &lt; 37.9
                    </div>
                    <div className="py-2 px-4 text-amber-400">
                      Slightly High
                    </div>
                    <div className="py-2 px-4 text-red-400">{">"} 38</div>
                    <div className="py-2 px-4 text-red-400">
                      Critically High
                    </div>
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
                <div className="shadow-md rounded-lg p-4 bg-white shadow-green-500 ">
                  <ReportCard
                    reading={generateReportPulse(pulse)[0]}
                    result={generateReportPulse(pulse)[1]}
                    symptoms={generateReportPulse(pulse)[2]}
                    title={generateReportPulse(pulse)[3]}
                    val={generateReportPulse(pulse)[4]}
                  />
                  <div className="grid grid-cols-2 mt-4">
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Ranges (in beats per minute)
                    </div>
                    <div className="bg-gray-100 py-2 px-4 font-semibold">
                      Reading
                    </div>
                    <div className="py-2 px-4 text-red-400">{"<"} 60</div>
                    <div className="py-2 px-4 text-red-400">Low</div>
                    <div className="py-2 px-4 text-emerald-400">
                      60 ≤ x ≤ 100
                    </div>
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
            ) : (
              <div className="h-[340px] text-center text-blue-500 font-bold text-2xl font-serif mt-72">
                <h5>Loading...</h5>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[340px] text-center text-red-500 font-bold text-2xl font-serif mt-72">
            {" "}
            NO DATA
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage1;
