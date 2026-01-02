import { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import { motion } from "framer-motion";
import { FaUserGraduate, FaSave, FaArrowLeft } from "react-icons/fa";

export default function StudentProfile() {

  const [student, setStudent] = useState(null);
  const [editable, setEditable] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedUser"));

    if (!logged || logged.role !== "student") {
      window.location.href = "/";
    } else {
      setStudent({ ...logged.user });
    }
  }, []);

  if (!student) return null;

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    // Update students DB
    const students = JSON.parse(localStorage.getItem("students") || "[]");
    const updatedStudents = students.map(s =>
      s.email === student.email ? student : s
    );
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Update logged user
    const logged = JSON.parse(localStorage.getItem("loggedUser"));
    logged.user = student;
    localStorage.setItem("loggedUser", JSON.stringify(logged));

    setEditable(false);
    setMessage("Profile Updated Successfully ✔");
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center pt-10 text-white"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <h1 className="text-4xl font-bold text-[#9ddcff] drop-shadow-[0_0_25px_#5cd4ff] mb-5">
        Student Profile
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-[900px] p-8 rounded-xl bg-[#001020dd]
        border border-[#4dd2ff9d] shadow-[0_0_60px_#4cc9ff80]"
      >

        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#2b4f8b] pb-3 mb-6">
          <div className="flex gap-4 items-center">
            <FaUserGraduate className="text-5xl text-[#7fd3ff]" />
            <h2 className="text-2xl font-bold text-[#9ddcff]">
              {student.name}
            </h2>
          </div>

          <button
            onClick={() => window.location.href = "/student-dashboard"}
            className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-2 gap-6">

          <input
            disabled={!editable}
            name="name"
            value={student.name}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <input
            disabled
            value={student.roll}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <input
            disabled={!editable}
            name="email"
            value={student.email}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <input
            disabled={!editable}
            name="course"
            value={student.course}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <input
            disabled={!editable}
            name="year"
            value={student.year}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <input
            disabled={!editable}
            name="branch"
            value={student.branch}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <input
            disabled={!editable}
            name="section"
            value={student.section}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none col-span-2"
          />
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-[#7fd3ff] mt-4">{message}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-7">
          {!editable ? (
            <button
              onClick={() => setEditable(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#39befe] to-[#79d1ff]
              border border-[#8fe3ff] rounded-xl shadow-[0_0_35px_#48c8ff]"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={saveProfile}
              className="flex gap-2 items-center px-6 py-3 bg-green-600 rounded-xl hover:bg-green-700"
            >
              <FaSave /> Save
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
