import React, { useEffect, useState } from "react";

interface PrevModalProps {
  doctor_id: string;
  patientEmail: string;
  bookDate: string;
}

const PrevModal: React.FC<PrevModalProps> = ({
  doctor_id,
  patientEmail,
  bookDate,
}) => {
  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/getDiagnosis.php";
      const data = {
        doctor_id: doctor_id,
        p_email: patientEmail,
        book_date: bookDate,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        setIsLoading(true);
        const response = await fetch(apiUrl, requestOptions);
        if (response.ok) {
          const jsonResponse = await response.json();
          if (Array.isArray(jsonResponse.data)) {
            setPrescriptionData(jsonResponse.data[0]); // Access the first item in the array
            console.log(jsonResponse.data);
          }
        } else {
          console.error("Data array not found in response:", response);
        }
      } catch (error) {
        console.error("Error fetching diagnosis:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptionData();
  }, [doctor_id, patientEmail, bookDate]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-xl">
        {isLoading && <p>Loading...</p>}
        {prescriptionData && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-500">
              Prescription Details
            </h2>
            <p className="mb-2">
              Doctor ID:{" "}
              <span className="text-red-400">{prescriptionData.Doc_ID}</span>
            </p>
            <p className="mb-2">
              Booking Date:{" "}
              <span className="text-red-400">{prescriptionData.Book_Date}</span>
            </p>
            <h3 className="text-lg font-semibold mt-4">Diagnosis:</h3>
            <p>{prescriptionData.Diagnosis}</p>
            <h3 className="text-lg font-semibold mt-4">Prescription:</h3>
            <p>{prescriptionData.Prescription}</p>
          </div>
        )}
        <button
          onClick={() => {
            // Close modal functionality here
          }}
          className="mt-6 py-2 px-4 bg-green-500 w-24 text-white rounded hover:text-green-900 hover:bg-green-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PrevModal;
