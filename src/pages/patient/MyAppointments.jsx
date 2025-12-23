import { useEffect, useState } from "react";
import { getAppointments } from "../../api/appointmentApi";
import { useAuth } from "../../context/AuthProvider";
import BookAppointment from "../../components/BookAppointmentForm";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    getAppointments().then((res) => {
      const data = res.data || [];
      setAppointments(data);

      let filtered = [];

      if (user.role === "patient") {
        filtered = data.filter((app) => app.patientId === user.email);
      } else if (user.role === "doctor") {
        filtered = data.filter((app) => app.doctorId === user.email);
      } else if (user.role === "receptionist") {
        filtered = data;
      }

      setFilteredAppointments(filtered);
    });
  }, [user]);

  if (!user) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      
      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        My Appointments
      </h2>

      {/* Appointments Table */}
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-8 mb-10">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-center text-gray-600 text-lg"
                  >
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((a, index) => (
                  <tr
                    key={a._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4">{a.doctorId}</td>
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
                              : a.status === "completed"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Appointment Section */}
      {(user.role === "patient" || user.role === "receptionist") && (
        <div className="w-full max-w-3xl">
          <BookAppointment />
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
