import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import TakeAttendance from "./pages/TakeAttendance";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterChoice from "./pages/RegisterChoice";
import RegisterTeacher from "./pages/RegisterTeacher";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentNotifications from "./pages/StudentNotifications";
import TeacherManageStudents from "./pages/TeacherManageStudents";
import TeacherSettings from "./pages/TeacherSettings";
import TeacherLayout from "./layouts/TeacherLayout";

// OPTIONAL — Only if you created these pages
// import TeacherRecords from "./pages/TeacherRecords";
// import TeacherSettings from "./pages/TeacherSettings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterChoice />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />

        {/* ---------- STUDENT ---------- */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/student-notifications" element={<StudentNotifications />} />

        {/* ---------- TEACHER (WITH GLOBAL LAYOUT) ---------- */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="take-attendance" element={<TakeAttendance />} />
          <Route path="manage-students" element={<TeacherManageStudents />} />
          <Route path="settings" element={<TeacherSettings />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}
