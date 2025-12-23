import { useEffect, useState } from "react";
import { createPatient, getPatients } from "../../api/patientApi";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    email: "",
    name: "",
    age: "",
    gender: "",
    phone: ""
  });

  const loadPatients = async () => {
    const res = await getPatients();
    setPatients(res.data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPatient(form);
    setForm({ email: "", name: "", age: "", gender: "", phone: "" });
    loadPatients();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      {/* Page Title */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Patients</h2>

      {/* Form Section */}
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Patient
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="gender"
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg"
          >
            Add Patient
          </button>
        </form>
      </div>

      {/* Patients Table */}
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient List</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Phone</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p, index) => (
                <tr
                  key={p._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{p._id}</td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.age}</td>
                  <td className="py-3 px-4 capitalize">{p.gender}</td>
                  <td className="py-3 px-4">{p.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {patients.length === 0 && (
          <p className="text-center text-gray-600 mt-5">
            No patients found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Patients;
