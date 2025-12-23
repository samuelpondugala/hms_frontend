import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";
import { createAppointment } from "../api/appointmentApi";
import { useAuth } from "../context/AuthProvider";

const BookAppointment = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorEmail: "",
    date: "",
    time: ""
  });

  useEffect(() => {
    getDoctors().then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createAppointment({
      patientEmail: user.email,
      doctorEmail: form.doctorEmail,
      date: form.date,
      time: form.time
    });

    alert("Appointment booked");
    setForm({ doctorEmail: "", date: "", time: "" });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg mx-auto mt-10">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Book Appointment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Doctor Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Doctor
          </label>
          <select
            value={form.doctorEmail}
            onChange={(e) =>
              setForm({ ...form, doctorEmail: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d._id} ({d.specialization})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Appointment Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Appointment Time
          </label>
          <input
            type="time"
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white 
                     font-semibold py-2 rounded-lg"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
