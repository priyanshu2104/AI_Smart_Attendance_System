import { motion } from "framer-motion";
import bg from "../assets/bg.png";
import { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { saveTeacher } from "../utils/auth";


export default function RegisterTeacher() {

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    empId: "",
    department: "",
    designation: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const registerTeacher = () => {

    if (!teacher.name || !teacher.email || !teacher.empId ||
        !teacher.department || !teacher.designation ||
        !teacher.password || !teacher.confirmPassword) {
      setMessage("Please fill all required fields");
      return;
    }

    if (teacher.password !== teacher.confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    saveTeacher({
      role: "teacher",
      name: teacher.name,
      email: teacher.email,
      empId: teacher.empId,
      department: teacher.department,
      designation: teacher.designation,
      password: teacher.password

    });

    setMessage("Teacher Registered Successfully ✔");
    setTimeout(() => window.location.href = "/", 1200);

  };

  const resetForm = () => {
    setTeacher({
      name: "",
      email: "",
      empId: "",
      department: "",
      designation: "",
      password: "",
      confirmPassword: ""
    });
    setMessage("");
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center pt-10"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h1 className="text-5xl font-bold text-[#9ddcff] mb-6">
        AI Smart Attendance System
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-[800px] p-10 rounded-xl bg-[#001020dd]
        border border-[#4dd2ff9d] shadow-[0_0_60px_#4cc9ff80] mt-6"
      >
        <div className="flex items-center justify-center mb-4 gap-3">
          <FaUserTie className="text-4xl text-[#7fd3ff]" />
          <h2 className="text-3xl text-center font-bold text-[#9ddcff]">
            Teacher Registration
          </h2>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-5">

          <input
            name="name"
            placeholder="Full Name *"
            value={teacher.name}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-200 outline-none"
          />

          <input
            name="email"
            placeholder="Email *"
            value={teacher.email}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-200 outline-none"
          />

          <input
            name="empId"
            placeholder="Employee ID *"
            value={teacher.empId}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-200 outline-none"
          />

          <select
            name="department"
            value={teacher.department}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-400 outline-none"
          >
            <option>Select Department</option>
            <option>CSE</option>
            <option>AI</option>
            <option>IT</option>
            <option>ECE</option>
            <option>EEE</option>
          </select>

          <select
            name="designation"
            value={teacher.designation}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-400 outline-none col-span-2"
          >
            <option>Select Designation</option>
            <option>Assistant Professor</option>
            <option>Associate Professor</option>
            <option>Professor</option>
            <option>HOD</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Create Password *"
            value={teacher.password}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-200 outline-none"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password *"
            value={teacher.confirmPassword}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-200 outline-none"
          />
        </div>

        {/* MESSAGE */}
        {message && (
          <p className="text-center mt-5 text-[#7fd3ff]">
            {message}
          </p>
        )}

        {/* BUTTONS */}
        <div className="flex justify-center gap-5 mt-6">
          <button
            onClick={registerTeacher}
            className="px-6 py-3 bg-gradient-to-r from-[#39befe] to-[#79d1ff]
            border border-[#8fe3ff] rounded-xl shadow-[0_0_35px_#48c8ff]"
          >
            Register Teacher
          </button>

          <button
            onClick={resetForm}
            className="px-6 py-3 bg-gray-600 rounded-xl"
          >
            Reset
          </button>
        </div>

        <p
          onClick={() => (window.location.href = "/register")}
          className="text-center text-[#7fd3ff] mt-6 cursor-pointer hover:underline"
        >
          Back to Account Type Selection
        </p>
      </motion.div>
    </div>
  );
}
