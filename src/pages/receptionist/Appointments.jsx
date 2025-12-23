import { useEffect, useState } from "react";
import {
  getAppointments,
  updateAppointment,
  deleteAppointment
} from "../../api/appointmentApi";
import BookAppointment from "../../components/BookAppointmentForm";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const res = await getAppointments();
    setAppointments(res.data);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateAppointment(id, { status });
    loadAppointments();
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    loadAppointments();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Appointments
      </h2>

      {/* Book Appointment Form */}
      <div className="w-full max-w-3xl mb-10">
        <BookAppointment />
      </div>

      {/* Appointments Table */}
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Update</th>
                <th className="py-3 px-4">Delete</th>
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
                  <td className="py-3 px-4">{a.doctorId}</td>
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
                            : a.status === "completed"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  {/* STATUS DROPDOWN */}
                  <td className="py-3 px-4">
                    <select
                      value={a.status}
                      onChange={(e) =>
                        handleStatusChange(a._id, e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg bg-white
                                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* DELETE BUTTON */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(a._id)}
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
