import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";

interface DateTimeOption {
  Date: string;
  Time: string;
  Slots_Remaining: number;
}
interface AppointModalProps {
  doctor_id: string;
  patientEmail: string;
}

function AppointModal(props: AppointModalProps) {
  const [dateTimeOptions, setDateTimeOptions] = useState<DateTimeOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isDateTimeSelected, setIsDateTimeSelected] = useState<boolean>(false);

  useEffect(() => {
    console.log("AppointModal mounted");
    const fetchDateTimeOptions = async () => {
      const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/searchSlot.php";
      const doctorId = props.doctor_id;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctor_id: doctorId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.Status && data.Status.slots) {
            setDateTimeOptions(data.Status.slots);
          }
        } else {
          console.error(
            "Failed to fetch date and time options:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching date and time options:", error);
      }
    };

    fetchDateTimeOptions();

    // Cleanup function
    return () => {
      console.log("AppointModal unmounted");
    };
  }, []);

  const bookAppointment = async () => {
    if (selectedDate && selectedTime && props.doctor_id && props.patientEmail) {
      const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/bookAppointment.php";
      const data = {
        doctorID: props.doctor_id,
        patient_email: props.patientEmail,
        date: selectedDate,
        time: selectedTime,
      };

      console.log(data);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Appointment booked successfully!");
        } else {
          console.error("Failed to book appointment:", response.statusText);
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    } else {
      console.error("Incomplete data for booking appointment");
    }
  };

  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setModal());
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleDateSelection = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate("");
      setIsDateTimeSelected(false);
      console.log("inside if", setSelectedDate);
    } else {
      setSelectedDate(date);
      setSelectedTime("");
      setIsDateTimeSelected(false);
      console.log("inside else", setSelectedDate);
    }
  };

  const handleTimeSelection = (time: string) => {
    if (selectedTime === time) {
      setSelectedTime("");
      setIsDateTimeSelected(false);
      console.log("inside if", setSelectedTime);
    } else {
      setSelectedTime(time);
      setIsDateTimeSelected(true);
      console.log("inside else", setSelectedTime);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={toggleModal}>
        <div className={styles.modalContainer} onClick={handleContentClick}>
          <div className="mt-4 px-4">
            <div className="closeModal ">
              <button className="w-5 h-5 items-center" onClick={toggleModal}>
                x
              </button>
            </div>
            <div className={styles.dateTimeContainer}>
              <h1 className="text-xl font-semibold mb-2">
                Select Date and Time
              </h1>
              {dateTimeOptions.map((option) => (
                <div key={`${option.Date}-${option.Time}`} className="mt-2">
                  <div className="flex space-x-6">
                    <button
                      className={`border py-2 px-4 border-[#2cda6d] rounded-md ${
                        selectedDate === option.Date ? "bg-green-300" : ""
                      }`}
                      onClick={() => handleDateSelection(option.Date)}
                    >
                      {option.Date}
                    </button>
                    <button
                      className={`border py-2 px-4 border-[#2cda6d] rounded-md ${
                        selectedTime === option.Time ? "bg-green-300" : ""
                      }`}
                      onClick={() => handleTimeSelection(option.Time)}
                      disabled={!selectedDate || isDateTimeSelected}
                    >
                      {option.Time}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="mt-6 py-2 px-4 font-semibold text-white text-lg bg-[#2cda6d] rounded-md"
            onClick={bookAppointment}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </>
  );
}

export default AppointModal;
