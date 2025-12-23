import { useEffect, useState } from "react";
import {
  getAppointments,
  updateAppointment
} from "../../api/appointmentApi";
import { useAuth } from "../../context/AuthProvider";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();

  const loadAppointments = async () => {
    const res = await getAppointments();

    const filtered = res.data.filter(
      (a) => a.doctorId === user.email
    );

    setAppointments(filtered);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    await updateAppointment(id, { status });
    loadAppointments();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          My Appointments
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4">Patient Email</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Update</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a, index) => (
                <tr
                  key={a._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4">{a.patientId}</td>
                  <td className="py-3 px-4">
                    {new Date(a.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{a.time}</td>

                  <td className="py-3 px-4 capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white
                        ${
                          a.status === "pending"
                            ? "bg-yellow-500"
                            : a.status === "confirmed"
                            ? "bg-blue-600"
                            : "bg-green-600"
                        }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <select
                      value={a.status}
                      onChange={(e) =>
                        handleStatusUpdate(a._id, e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg bg-white
                                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {appointments.length === 0 && (
          <p className="text-center text-gray-600 mt-5">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
