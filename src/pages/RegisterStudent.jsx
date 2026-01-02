import { motion } from "framer-motion";
import bg from "../assets/bg.png";
import { useState } from "react";
import { saveStudent } from "../utils/auth";


export default function RegisterStudent() {

  const [student, setStudent] = useState({
    name: "",
    roll: "",
    email: "",
    course: "",
    year: "",
    branch: "",
    section: ""
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const copy = [...images];
    copy.splice(index, 1);
    setImages(copy);
  };

  const registerStudent = () => {
    if (!student.name || !student.roll || !student.course || !student.year || !student.branch || !student.section) {
      setMessage("Please fill all required fields");
      return;
    }

    if (images.length === 0) {
      setMessage("Please upload at least 1 face image");
      return;
    }

    saveStudent({
      role: "student",
      name: student.name,
      roll: student.roll,
      email: student.email,
      course: student.course,
      year: student.year,
      branch: student.branch,
      section: student.section,
      password: student.roll

    });

    setMessage("Student Registered Successfully ✔");
    setTimeout(() => window.location.href = "/", 1200);

  };

  const resetForm = () => {
    setStudent({
      name: "",
      roll: "",
      email: "",
      course: "",
      year: "",
      branch: "",
      section: ""
    });

    setImages([]);
    setMessage("");
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center pt-8"
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
        className="relative w-[850px] p-10 rounded-xl bg-[#001020dd]
        border border-[#4dd2ff9d] shadow-[0_0_60px_#4cc9ff80] mt-6"
      >

        <h2 className="text-3xl text-center font-bold text-[#9ddcff] mb-6">
          Register New Student
        </h2>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-5">

          <input
            name="name"
            placeholder="Student Name *"
            value={student.name}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-200 outline-none"
          />

          <input
            name="roll"
            placeholder="Roll Number *"
            value={student.roll}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-200 outline-none"
          />

          <input
            name="email"
            placeholder="Email (Optional)"
            value={student.email}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-200 outline-none"
          />

          <select name="course" value={student.course} onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-400 outline-none">
              <option>Select Course</option>
              <option>B.Tech</option>
              <option>BCA</option>
              <option>M.Tech</option>
          </select>

          <select name="year" value={student.year} onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-400 outline-none">
              <option>Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
          </select>

          <select name="branch" value={student.branch} onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-400 outline-none">
              <option>Select Branch</option>
              <option>CSE</option>
              <option>AI</option>
              <option>IT</option>
          </select>

          <select name="section" value={student.section} onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl text-gray-400 outline-none col-span-2">
              <option>Select Section</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
          </select>
        </div>

        {/* IMAGE UPLOAD */}
        <p className="text-[#9ddcff] mt-6">Upload Face Images *</p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 text-gray-300"
        />

        {/* IMAGE PREVIEW */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <img src={img.url} className="rounded-xl border border-[#4dd2ff]" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            </div>
          ))}
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
            onClick={registerStudent}
            className="px-6 py-3 bg-gradient-to-r from-[#39befe] to-[#79d1ff]
            border border-[#8fe3ff] rounded-xl shadow-[0_0_35px_#48c8ff]"
          >
            Register Student
          </button>

          <button
            onClick={resetForm}
            className="px-6 py-3 bg-gray-600 rounded-xl"
          >
            Reset
          </button>
        </div>
      </motion.div>
    </div>
  );
}
