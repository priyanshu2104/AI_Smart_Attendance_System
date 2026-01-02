import { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import { motion } from "framer-motion";
import { FaUserGraduate, FaCheckCircle, FaBell, FaSignOutAlt, FaClipboardList } from "react-icons/fa";

export default function StudentDashboard() {

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedUser"));

    if (!logged || logged.role !== "student") {
      window.location.href = "/";
    } else {
      setStudent(logged.user);
    }
  }, []);

  if (!student) return null;

  return (
    <div
      className="h-screen w-full flex flex-col items-center pt-10 text-white"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h1 className="text-4xl font-bold text-[#9ddcff] drop-shadow-[0_0_25px_#5cd4ff] mb-4">
        Student Dashboard
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-[900px] p-8 rounded-xl bg-[#001020dd]
        border border-[#4dd2ff9d] shadow-[0_0_60px_#4cc9ff80]"
      >
        {/* HEADER INFO */}
        <div className="flex justify-between items-center border-b border-[#2b4f8b] pb-4 mb-5">
          <div className="flex gap-4 items-center">
            <FaUserGraduate className="text-5xl text-[#7fd3ff]" />
            <div>
              <h2 className="text-2xl font-bold text-[#9ddcff]">{student.name}</h2>
              <p className="text-gray-300">
                Roll: {student.roll || "N/A"} — {student.course}, {student.year}
              </p>
              <p className="text-gray-300">
                {student.branch} — Section {student.section}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("loggedUser");
              window.location.href = "/";
            }}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-3 gap-6">

          {/* ATTENDANCE % */}
          <div className="bg-[#071b3a] border border-[#2b4f8b] rounded-xl p-6 shadow-[0_0_25px_#48c8ff40]">
            <FaCheckCircle className="text-4xl text-[#7fd3ff]" />
            <h3 className="text-xl mt-2 text-[#9ddcff] font-bold">Overall Attendance</h3>
            <p className="text-4xl font-bold mt-2 text-[#7fd3ff]">92%</p>
            <p className="text-gray-400 text-sm">Great job! Keep maintaining.</p>
          </div>

          {/* TODAY STATUS */}
          <div className="bg-[#071b3a] border border-[#2b4f8b] rounded-xl p-6 shadow-[0_0_25px_#48c8ff40]">
            <FaClipboardList className="text-4xl text-[#7fd3ff]" />
            <h3 className="text-xl mt-2 text-[#9ddcff] font-bold">Today's Attendance</h3>
            <p className="text-4xl font-bold text-green-400 mt-2">Present</p>
            <p className="text-gray-400 text-sm">Last Updated: Just now</p>
          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-[#071b3a] border border-[#2b4f8b] rounded-xl p-6 shadow-[0_0_25px_#48c8ff40]">
            <FaBell className="text-4xl text-[#7fd3ff]" />
            <h3 className="text-xl mt-2 text-[#9ddcff] font-bold">Notifications</h3>

            <ul className="text-gray-300 text-sm mt-2 space-y-1">
              <li>• Attendance recorded successfully</li>
              <li>• Last class: Marked Present</li>
              <li>• System running smoothly</li>
            </ul>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="px-6 py-3 bg-gradient-to-r from-[#39befe] to-[#79d1ff]
          border border-[#8fe3ff] rounded-xl shadow-[0_0_35px_#48c8ff]">
            View Attendance History
          </button>

          <button className="px-6 py-3 bg-gray-600 rounded-xl hover:bg-gray-700"
            onClick={() => (window.location.href = "/student-profile")}>
            View Profile
          </button>

          <button
            onClick={() => (window.location.href = "/student-notifications")}
            className="px-6 py-3 bg-[#0ea5e9] rounded-xl hover:bg-[#38bdf8]">
            View Notifications
        </button>

        </div>
      </motion.div>
    </div>
  );
}
