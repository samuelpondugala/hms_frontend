import { Link, Outlet } from "react-router-dom";

const RegisterLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Register As
        </h2>

        {/* Navigation Tabs */}
        <nav className="flex justify-center gap-6 text-lg font-medium mb-8">
          <Link
            to="patient"
            className="text-blue-700 hover:text-blue-900 transition"
          >
            Patient
          </Link>

          <span className="text-gray-400">|</span>

          <Link
            to="doctor"
            className="text-blue-700 hover:text-blue-900 transition"
          >
            Doctor
          </Link>

          <span className="text-gray-400">|</span>

          <Link
            to="receptionist"
            className="text-blue-700 hover:text-blue-900 transition"
          >
            Receptionist
          </Link>
        </nav>

        {/* Render Selected Register Form */}
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterLayout;
