import { Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaCamera, FaUsers, FaListAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import bg from "../assets/bg.png";

export default function TeacherLayout() {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full h-screen flex text-white"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* SIDEBAR */}
      <div className="w-64 h-full bg-[#000a1ccc]/80 backdrop-blur-md
          border-r border-[#38bdf8] shadow-[0_0_30px_#38bdf860] p-6">

        <h1 className="text-2xl font-bold text-[#7fd3ff] mb-10">
          AI Attendance
        </h1>

        <ul className="space-y-6 text-gray-300">

          <li onClick={() => navigate("/teacher/dashboard")}
              className="hover:text-[#7fd3ff] cursor-pointer flex gap-3 items-center">
            <FaHome /> Dashboard
          </li>

          <li onClick={() => navigate("/teacher/take-attendance")}
              className="hover:text-[#7fd3ff] cursor-pointer flex gap-3 items-center">
            <FaCamera /> Take Attendance
          </li>

          <li onClick={() => navigate("/teacher/manage-students")}
              className="hover:text-[#7fd3ff] cursor-pointer flex gap-3 items-center">
            <FaUsers /> Manage Students
          </li>

          <li className="hover:text-[#7fd3ff] cursor-pointer flex gap-3 items-center">
            <FaListAlt /> Records
          </li>

          <li onClick={() => navigate("/teacher/settings")}
              className="hover:text-[#7fd3ff] cursor-pointer flex gap-3 items-center">
            <FaCog /> Settings
          </li>

          <li
            onClick={() => {
              localStorage.removeItem("loggedUser");
              window.location.href = "/";
            }}
            className="hover:text-[#ff6b6b] cursor-pointer flex gap-3 items-center"
          >
            <FaSignOutAlt /> Logout
          </li>


        </ul>
      </div>

      {/* MAIN PAGE CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
