import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

/* Auth */
import Login from "../auth/Login";

/* Admin Pages */
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Doctors from "../pages/admin/Doctors";

/* Doctor Pages */
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorAppointments from "../pages/doctor/Appointments";
import DoctorPrescriptions from "../pages/doctor/Prescriptions";

/* Receptionist Pages */
import ReceptionistDashboard from "../pages/receptionist/ReceptionistDashboard";
import Patients from "../pages/receptionist/Patients";
import ReceptionistAppointments from "../pages/receptionist/Appointments";

/* Patient Pages */
import PatientDashboard from "../pages/patient/PatientDashboard";
import MyAppointments from "../pages/patient/MyAppointments";
import MyPrescriptions from "../pages/patient/MyPrescriptions";
import RegisterLayout from "../auth/register/RegisterLayout";
import RegisterDoctor from "../auth/register/RegisterDoctor";
import RegisterReceptionist from "../auth/register/RegisterReceptionist";
import RegisterPatient from "../auth/register/RegisterPatient";
import CreatePrescription from "../pages/doctor/CreatePrescription";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* DEFAULT REDIRECT */}
      <Route
        path="/"
        element={
          user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />
        }
      />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/doctors" element={<Doctors />} />

      {/* DOCTOR */}
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />
      <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
      <Route path="/doctor/create-prescription" element={<CreatePrescription />} />

      {/* RECEPTIONIST */}
      <Route
        path="/receptionist"
        element={<ReceptionistDashboard />}
      />
      <Route
        path="/receptionist/patients"
        element={<Patients />}
      />
      <Route
        path="/receptionist/appointments"
        element={<ReceptionistAppointments />}
      />
      {/* REGISTER */}
      <Route path="/register" element={<RegisterLayout />}>
        <Route path="patient" element={<RegisterPatient />} />
        <Route path="doctor" element={<RegisterDoctor />} />
        <Route path="receptionist" element={<RegisterReceptionist />} />
      </Route>

      {/* PATIENT */}
      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/patient/appointments" element={<MyAppointments />} />
      <Route path="/patient/prescriptions" element={<MyPrescriptions />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />

      

    </Routes>
  );
};

export default AppRoutes;
