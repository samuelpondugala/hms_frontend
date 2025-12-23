import { useEffect, useState } from "react";
import { getDoctors, deleteDoctor } from "../../api/doctorApi";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = async (email) => {
    await deleteDoctor(email);
    loadDoctors();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Doctors
        </h2>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Specialization</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Consultation Fee</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((d, index) => (
                <tr
                  key={d._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{d._id}</td>
                  <td className="py-3 px-4">{d.specialization}</td>
                  <td className="py-3 px-4">{d.experience} yrs</td>
                  <td className="py-3 px-4">₹{d.consultationFee}</td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {doctors.length === 0 && (
          <p className="text-center text-gray-600 mt-5">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
