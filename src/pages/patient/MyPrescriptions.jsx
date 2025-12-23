import { useEffect, useState } from "react";
import { getPrescriptionsByPatient } from "../../api/prescriptionApi";
import { useAuth } from "../../context/AuthProvider";

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getPrescriptionsByPatient(user.email).then((res) => {
      setPrescriptions(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          My Prescriptions
        </h2>

        {prescriptions.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No prescriptions found.
          </p>
        ) : (
          <div className="space-y-6">
            {prescriptions.map((p) => (
              <div
                key={p._id}
                className="p-6 bg-gray-50 border border-gray-300 rounded-lg shadow"
              >
                {/* Doctor */}
                <p className="text-lg mb-2">
                  <span className="font-semibold text-gray-800">Doctor: </span>
                  <span className="font-medium text-blue-700">{p.doctorId}</span>
                </p>

                {/* Diagnosis */}
                <p className="text-lg mb-4">
                  <span className="font-semibold text-gray-800">Diagnosis: </span>
                  {p.diagnosis}
                </p>

                {/* Medicines */}
                <div className="mb-4">
                  <span className="font-semibold text-gray-800 text-lg">
                    Medicines:
                  </span>

                  <ul className="list-disc pl-6 mt-2 text-gray-800">
                    {p.medicines.map((m, idx) => (
                      <li key={idx} className="mb-1">
                        <span className="font-medium">{m.name}</span> — {m.dosage} — {m.duration}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notes */}
                <p className="text-lg">
                  <span className="font-semibold text-gray-800">Notes: </span>
                  <span className="italic">{p.notes}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPrescriptions;
