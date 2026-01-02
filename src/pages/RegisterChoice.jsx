import { motion } from "framer-motion";
import bg from "../assets/bg.png";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

export default function RegisterChoice() {
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-start pt-10 relative"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold text-[#9ddcff] mb-6">
        AI Smart Attendance System
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-[700px] p-10 rounded-xl bg-[#001020dd]
        border border-[#4dd2ff9d] shadow-[0_0_60px_#4cc9ff80] mt-6"
      >

        <h2 className="text-3xl text-center font-bold text-[#9ddcff] mb-6">
          Choose Account Type
        </h2>

        <div className="grid grid-cols-2 gap-6 mt-4">

          {/* STUDENT CARD */}
          <div
            onClick={() => (window.location.href = "/register-student")}
            className="bg-[#071b3a] border border-[#2b4f8b] rounded-xl p-8 text-center cursor-pointer
            hover:scale-105 transition shadow-[0_0_25px_#48c8ff50]"
          >
            <FaUserGraduate className="text-5xl text-[#7fd3ff] mx-auto mb-3" />
            <h3 className="text-[#9ddcff] text-xl font-bold">Student</h3>
            <p className="text-gray-300 text-sm mt-2">
              Register as a Student to use the attendance system
            </p>
          </div>

          {/* TEACHER CARD */}
          <div
            onClick={() => (window.location.href = "/register-teacher")}
            className="bg-[#071b3a] border border-[#2b4f8b] rounded-xl p-8 text-center cursor-pointer
            hover:scale-105 transition shadow-[0_0_25px_#48c8ff50]"
          >
            <FaChalkboardTeacher className="text-5xl text-[#7fd3ff] mx-auto mb-3" />
            <h3 className="text-[#9ddcff] text-xl font-bold">Teacher</h3>
            <p className="text-gray-300 text-sm mt-2">
              Teacher Registration (coming soon)
            </p>
          </div>
        </div>

        <p
          onClick={() => (window.location.href = "/")}
          className="text-center text-[#7fd3ff] mt-6 cursor-pointer hover:underline"
        >
          Already have an account? Login here
        </p>
      </motion.div>
    </div>
  );
}
