import React, { useState } from "react";
import VerticalNavDoctor from "../../components/verticalNavDoctor";
import { userLogout } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
const SetSlot = () => {
  const doctor_id = useSelector(
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
        phone: string;

        mobile_no: string;
        doctor_id: string;
        registration_no: string;
        specilization: string;
        rating: number;
      };
    }) => state.user.doctor_id
  );
  const [slots, setSlots] = useState({
    TimeSlotMon: "",
    TimeSlotTue: "",
    TimeSlotWed: "",
    TimeSlotThu: "",
    TimeSlotFri: "",
    TimeSlotSat: "",
    TimeSlotSun: "",
  });
  const clearTime = (day: string) => {
    setSlots({ ...slots, [day]: "" });
  };
  const [slotsPossible, setSlotsPossible] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChange = (e: any) => {
    setSlots({ ...slots, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (startDate === "" || endDate === "" || slotsPossible === 0) {
      alert("Please fill in all required fields.");
      return;
    }
    if (
      slots.TimeSlotFri === "" &&
      slots.TimeSlotMon === "" &&
      slots.TimeSlotSat === "" &&
      slots.TimeSlotSun === "" &&
      slots.TimeSlotThu === "" &&
      slots.TimeSlotTue === "" &&
      slots.TimeSlotWed === ""
    ) {
      alert("At least one day should have a time slot.");
      return;
    }
    const data = {
      doctor_id: doctor_id,
      ...slots,
      slots_possible: slotsPossible,
      start_date: startDate,
      end_date: endDate,
    };
    console.log(data);

    fetch("http://52.66.241.131/IoMTAppAPI/api/slotSet.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    alert("Slot added successfully");
    setSlots({
      TimeSlotMon: "",
      TimeSlotTue: "",
      TimeSlotWed: "",
      TimeSlotThu: "",
      TimeSlotFri: "",
      TimeSlotSat: "",
      TimeSlotSun: "",
    });
    setSlotsPossible(0);
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <VerticalNavDoctor />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 mt-6 rounded-lg shadow-md bg-white"
        >
          {Object.entries(slots).map(([day, time]) => (
            <div key={day} className="flex justify-between mb-4">
              <label
                htmlFor={day}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {day}
              </label>
              <div className="flex items-center">
                <input
                  type="time"
                  id={day}
                  name={day}
                  value={time}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => clearTime(day)}
                  className="ml-2 py-1 px-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                >
                  Clear Time
                </button>
              </div>
            </div>
          ))}
          <div>
            <label
              htmlFor="slotsPossible"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Slots Possible
            </label>
            <input
              type="number"
              id="slotsPossible"
              name="slotsPossible"
              value={slotsPossible}
              onChange={(e) => setSlotsPossible(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              htmlFor="startDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label
              htmlFor="endDate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Set Slots
          </button>
        </form>
      </div>
    </>
  );
};

export default SetSlot;
