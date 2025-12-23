import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Patient Dashboard
        </h2>

        {/* Options */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/patient/appointments"
              className="block bg-blue-600 text-white py-3 px-5 rounded-lg shadow 
                         hover:bg-blue-700 transition text-lg font-medium"
            >
              My Appointments
            </Link>
          </li>

          <li>
            <Link
              to="/patient/prescriptions"
              className="block bg-green-600 text-white py-3 px-5 rounded-lg shadow 
                         hover:bg-green-700 transition text-lg font-medium"
            >
              My Prescriptions
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PatientDashboard;
