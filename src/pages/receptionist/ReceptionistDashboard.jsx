import { useEffect, useState } from "react";
import { getPrescriptionsByDoctor } from "../../api/prescriptionApi";
import { useAuth } from "../../context/AuthProvider";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getPrescriptionsByDoctor(user.email).then((res) => {
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
                className="border border-gray-300 bg-gray-50 rounded-lg p-6 shadow-md"
              >
                {/* Patient */}
                <p className="text-lg mb-2">
                  <strong className="text-gray-700">Patient: </strong>
                  <span className="font-medium text-blue-700">
                    {p.patientId}
                  </span>
                </p>

                {/* Diagnosis */}
                <p className="text-lg mb-4">
                  <strong className="text-gray-700">Diagnosis: </strong>
                  <span className="font-medium">{p.diagnosis}</span>
                </p>

                {/* Medicines */}
                <div className="mb-4">
                  <strong className="text-gray-700 text-lg">Medicines:</strong>
                  <ul className="mt-2 pl-5 list-disc text-gray-800">
                    {p.medicines.map((m, idx) => (
                      <li key={idx} className="mb-1">
                        <span className="font-medium">{m.name}</span> —
                        <span> {m.dosage}</span> —
                        <span> {m.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notes */}
                <p className="text-lg">
                  <strong className="text-gray-700">Notes:</strong>{" "}
                  <span className="italic text-gray-800">{p.notes}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
