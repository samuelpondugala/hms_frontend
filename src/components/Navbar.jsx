import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navbar when user is NOT logged in
  if (!user) {
    return (
      <nav className="w-full bg-blue-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold">HMS</h1>

        <div className="flex items-center gap-6 text-lg">
          <Link
            to="/login"
            className="hover:text-blue-300 transition font-medium"
          >
            Login
          </Link>

          <Link
            to="/register/patient"
            className="hover:text-blue-300 transition font-medium"
          >
            Register
          </Link>
        </div>
      </nav>
    );
  }

  // Navbar when user IS logged in
  return (
    <div className="w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between shadow-md">
      {/* Left Section — User Info */}
      <p className="text-lg font-medium">
        Logged in as:{" "}
        <strong className="font-semibold">{user.name}</strong>{" "}
        <span className="text-blue-200">({user.role})</span>
      </p>

      {/* Middle Section — Navigation Links */}
      <nav className="flex items-center gap-6 text-lg font-medium">
        {user.role === "admin" && (
          <>
            <Link to="/admin" className="hover:text-blue-300 transition">
              Dashboard
            </Link>
            <Link to="/admin/users" className="hover:text-blue-300 transition">
              Users
            </Link>
            <Link to="/admin/doctors" className="hover:text-blue-300 transition">
              Doctors
            </Link>
          </>
        )}

        {user.role === "doctor" && (
          <>
            <Link to="/doctor" className="hover:text-blue-300 transition">
              Dashboard
            </Link>
            <Link
              to="/doctor/appointments"
              className="hover:text-blue-300 transition"
            >
              Appointments
            </Link>
            <Link
              to="/doctor/prescriptions"
              className="hover:text-blue-300 transition"
            >
              Prescriptions
            </Link>
            <Link
              to="/doctor/create-prescription"
              className="hover:text-blue-300 transition"
            >
              Create Prescription
            </Link>
            
          </>
        )}

        {user.role === "receptionist" && (
          <>
            <Link to="/receptionist" className="hover:text-blue-300 transition">
              Dashboard
            </Link>
            <Link
              to="/receptionist/patients"
              className="hover:text-blue-300 transition"
            >
              Patients
            </Link>
            <Link
              to="/receptionist/appointments"
              className="hover:text-blue-300 transition"
            >
              Appointments
            </Link>
          </>
        )}

        {user.role === "patient" && (
          <>
            <Link to="/patient" className="hover:text-blue-300 transition">
              Dashboard
            </Link>
            <Link
              to="/patient/appointments"
              className="hover:text-blue-300 transition"
            >
              My Appointments
            </Link>
            <Link
              to="/patient/prescriptions"
              className="hover:text-blue-300 transition"
            >
              My Prescriptions
            </Link>
          </>
        )}
      </nav>

      {/* Right Section — Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg shadow 
                   hover:bg-gray-200 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
