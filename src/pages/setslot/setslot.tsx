import React, { useState } from "react";
import VerticalNavDoctor from "../../components/verticalNavDoctor";
import { userLogout } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
const SetSlot = () => {
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
  const [slots, setSlots] = useState({
    TimeSlotMon: "",
    TimeSlotTue: "",
    TimeSlotWed: "",
    TimeSlotThu: "",
    TimeSlotFri: "",
    TimeSlotSat: "",
    TimeSlotSun: "",
  });

  const [slotsPossible, setSlotsPossible] = useState(10);
  const [startDate, setStartDate] = useState("16-12-2023");
  const [endDate, setEndDate] = useState("20-12-2023");

  const handleChange = (e: any) => {
    setSlots({ ...slots, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      doctor_id: "D-17027906782",
      ...slots,
      slots_possible: slotsPossible,
      start_date: startDate,
      end_date: endDate,
    };

    fetch("http://your-api-url/slotSet.php", {
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
  };

  return (
    <>
      <VerticalNavDoctor />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} >
          {Object.entries(slots).map(([day, time]) => (
            <div key={day} className="flex justify-between mb-4">
              <label htmlFor={day} className="mr-4">
                {day}
              </label>
              <input
                type="time"
                id={day}
                name={day}
                value={time}
                onChange={handleChange}
                className="border-2 border-gray-200 rounded-md p-2"
              />
            </div>
          ))}
          <div>
            <label htmlFor="slotsPossible" className="mr-4">
              Slots Possible
            </label>
            <input
              type="number"
              id="slotsPossible"
              name="slotsPossible"
              value={slotsPossible}
              onChange={(e) => setSlotsPossible(parseInt(e.target.value))}
              className="border-2 border-gray-200 rounded-md p-2"
            />
            <label htmlFor="startDate" className="mr-4">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border-2 border-gray-200 rounded-md p-2"
            />
            <label htmlFor="endDate" className="mr-4">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border-2 border-gray-200 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Set Slots
          </button>
        </form>
      </div>
    </>
  );
};

export default SetSlot;
