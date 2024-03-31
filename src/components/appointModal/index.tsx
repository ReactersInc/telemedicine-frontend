import React, { useState } from "react";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";

function AppointModal() {
  const timeSlots = [
    { value: "10:30 AM", label: "10:30 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "12:00 AM", label: "12:00 AM" },
    { value: "12:30 PM", label: "12:30 PM" },
  ];

  const [time, setTime] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (selectedOption: any) => {
    if (selectedOption) {
      setTime(selectedOption.value);
      setSelectedTime(selectedOption.value);
    } else {
      setTime("none");
      setSelectedTime("");
    }
    console.log(selectedOption.value);
  };

  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setModal());
  };

  const handleConfirmAppointment = () => {
    window.alert("Appointment confirmation done!");

    toggleModal();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the outer div
    event.stopPropagation();
  };

  return (
    <>
      <div className={styles.overlay} onClick={toggleModal}>
        <div className={styles.modalContainer} onClick={handleContentClick}>
          <div className="mt-4 px-4">
          <div className="closeModal ">
                            <button className="w-5 h-5 items-center" onClick={toggleModal}>x</button>
                        </div>
            <div>
              <label htmlFor="dob" className="text-lg font-semibold pt-2">
                Date
              </label>
              <br />
              <input
                type="date"
                name="dob"
                id="dob"
                className={styles.style_input}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="degree" className="text-lg font-semibold pt-2">
              Time
            </label>
            <br />
            <div className="flex space-x-6">
              {timeSlots.map((timeOption) => (
                <button
                  key={timeOption.value}
                  onClick={() => handleTimeChange(timeOption)}
                  className={`border py-2 px-4 border-[#2cda6d] rounded-md ${
                    selectedTime === timeOption.value ? "bg-green-300" : ""
                  }`}
                >
                  <h3>{timeOption.label}</h3>
                </button>
              ))}
            </div>
          </div>
          <button
            className="mt-6 py-2 px-4 font-semibold text-white text-lg bg-[#2cda6d] rounded-md"
            onClick={handleConfirmAppointment}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </>
  );
}

export default AppointModal;
