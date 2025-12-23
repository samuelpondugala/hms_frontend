import { useEffect, useState } from "react";
import { createPrescription, getPatientsForDoctor } from "../../api/prescriptionApi";
import { useAuth } from "../../context/AuthProvider";

const CreatePrescription = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);

  const [form, setForm] = useState({
    patientEmail: "",
    doctorEmail: user.email,
    diagnosis: "",
    medicines: [],
    notes: "",
  });

  const [medicineInput, setMedicineInput] = useState({
    name: "",
    dosage: "",
    duration: "",
  });

  useEffect(() => {
    getPatientsForDoctor(user.email).then((res) => {
        setPatients(res.data);
    });
    }, []);

  const handleAddMedicine = () => {
    if (
      !medicineInput.name ||
      !medicineInput.dosage ||
      !medicineInput.duration
    ) {
      alert("Please fill all medicine fields");
      return;
    }

    setForm({
      ...form,
      medicines: [...form.medicines, medicineInput],
    });

    setMedicineInput({ name: "", dosage: "", duration: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createPrescription(form);

    alert("Prescription created successfully!");

    setForm({
      patientEmail: "",
      doctorEmail: user.email,
      diagnosis: "",
      medicines: [],
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8">
        
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Create Prescription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Select Patient */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Patient
            </label>
            <select
              value={form.patientEmail}
              onChange={(e) =>
                setForm({ ...form, patientEmail: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Choose Patient</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p._id})
                </option>
              ))}
            </select>
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Diagnosis
            </label>
            <input
              type="text"
              value={form.diagnosis}
              onChange={(e) =>
                setForm({ ...form, diagnosis: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter diagnosis"
            />
          </div>

          {/* Medicines Section */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <label className="block text-gray-700 font-medium mb-2">
              Add Medicines
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Medicine Name"
                value={medicineInput.name}
                onChange={(e) =>
                  setMedicineInput({ ...medicineInput, name: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />

              <input
                type="text"
                placeholder="Dosage (eg: 1-0-1)"
                value={medicineInput.dosage}
                onChange={(e) =>
                  setMedicineInput({ ...medicineInput, dosage: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />

              <input
                type="text"
                placeholder="Duration (eg: 5 days)"
                value={medicineInput.duration}
                onChange={(e) =>
                  setMedicineInput({
                    ...medicineInput,
                    duration: e.target.value,
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="button"
              onClick={handleAddMedicine}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg 
                         hover:bg-blue-700 transition"
            >
              Add Medicine
            </button>

            {/* Show Added Medicines */}
            {form.medicines.length > 0 && (
              <ul className="mt-4 list-disc pl-6">
                {form.medicines.map((m, idx) => (
                  <li key={idx} className="text-gray-700">
                    <span className="font-semibold">{m.name}</span> — {m.dosage} — {m.duration}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Additional instructions"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white 
                       font-semibold py-3 rounded-lg text-lg"
          >
            Submit Prescription
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePrescription;
