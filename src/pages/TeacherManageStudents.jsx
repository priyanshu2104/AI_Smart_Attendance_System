import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsersCog,
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaSave
} from "react-icons/fa";

export default function TeacherManageStudents() {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    course: "",
    branch: "",
    year: "",
    section: ""
  });

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedUser"));

    if (!logged || logged.role !== "teacher") {
      window.location.href = "/";
    } else {
      setTeacher(logged.user);
      const storedStudents = JSON.parse(localStorage.getItem("students") || "[]");
      setStudents(storedStudents);
    }
  }, []);

  const deleteStudent = (email) => {
    const updated = students.filter(s => s.email !== email);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    alert("Student Deleted");
  };

  const handleEditChange = (e, index) => {
    const updated = [...students];
    updated[index][e.target.name] = e.target.value;
    setStudents(updated);
  };

  const saveEdit = () => {
    localStorage.setItem("students", JSON.stringify(students));
    setEditingIndex(null);
    alert("Student Updated Successfully");
  };

  const filteredStudents = students.filter(s =>
    (s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.roll?.toLowerCase().includes(search.toLowerCase())) &&
    (filters.course ? s.course === filters.course : true) &&
    (filters.branch ? s.branch === filters.branch : true) &&
    (filters.year ? s.year === filters.year : true) &&
    (filters.section ? s.section === filters.section : true)
  );

  if (!teacher) return null;

  return (
    <div className="flex-1 p-8 overflow-y-scroll text-white">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">
          Manage Students
        </h2>

        <div className="flex gap-4 items-center">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            className="w-12 h-12 rounded-full border border-[#7fd3ff]"
          />
          <div>
          <p className="font-semibold">{teacher?.name}</p>
          <p className="text-gray-400 text-sm">Teacher</p>
          </div>
        </div>

      </div>

        <div className="mb-4">
            <button
                onClick={() => window.location.href = "/teacher/dashboard"}
                className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
            >
                <FaArrowLeft /> Back
            </button>
        </div>



      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#06152d]/90 border border-[#2a5ba6] 
        rounded-xl shadow-[0_0_40px_#2fa9ff50] p-6"
      >

        {/* SEARCH + FILTERS */}
        <div className="flex justify-between items-center mb-6">

          <input
            placeholder="Search by Name or Roll"
            className="bg-[#071b3a] border border-[#2b4f8b] px-4 py-2 rounded-xl outline-none w-[300px]"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-3">
            <select
              onChange={(e) => setFilters({ ...filters, course: e.target.value })}
              className="bg-[#071b3a] border border-[#2b4f8b] px-3 py-2 rounded-xl"
            >
              <option value="">Course</option>
              <option>B.Tech</option>
              <option>BCA</option>
              <option>M.Tech</option>
            </select>

            <select
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="bg-[#071b3a] border border-[#2b4f8b] px-3 py-2 rounded-xl"
            >
              <option value="">Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

            <select
              onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
              className="bg-[#071b3a] border border-[#2b4f8b] px-3 py-2 rounded-xl"
            >
              <option value="">Branch</option>
              <option>CSE</option>
              <option>AI</option>
              <option>IT</option>
            </select>

            <select
              onChange={(e) => setFilters({ ...filters, section: e.target.value })}
              className="bg-[#071b3a] border border-[#2b4f8b] px-3 py-2 rounded-xl"
            >
              <option value="">Section</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="max-h-[500px] overflow-y-scroll pr-2">
          <table className="w-full text-center border border-[#2b4f8b]">
            <thead className="bg-[#071b3a] sticky top-0">
              <tr>
                <th className="p-2 border border-[#2b4f8b]">Name</th>
                <th className="p-2 border border-[#2b4f8b]">Roll</th>
                <th className="p-2 border border-[#2b4f8b]">Course</th>
                <th className="p-2 border border-[#2b4f8b]">Year</th>
                <th className="p-2 border border-[#2b4f8b]">Branch</th>
                <th className="p-2 border border-[#2b4f8b]">Section</th>
                <th className="p-2 border border-[#2b4f8b]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-gray-400">
                    No Students Found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, index) => (
                  <tr key={index} className="bg-[#02152f] hover:bg-[#0c2b52]">
                    <td className="p-2 border border-[#2b4f8b]">
                      {editingIndex === index ? (
                        <input
                          name="name"
                          value={s.name}
                          onChange={(e) => handleEditChange(e, index)}
                          className="bg-transparent outline-none"
                        />
                      ) : (
                        s.name
                      )}
                    </td>

                    <td className="p-2 border border-[#2b4f8b]">{s.roll}</td>
                    <td className="p-2 border border-[#2b4f8b]">{s.course}</td>
                    <td className="p-2 border border-[#2b4f8b]">{s.year}</td>
                    <td className="p-2 border border-[#2b4f8b]">{s.branch}</td>
                    <td className="p-2 border border-[#2b4f8b]">{s.section}</td>

                    <td className="p-2 border border-[#2b4f8b] flex justify-center gap-3">

                      {editingIndex === index ? (
                        <button
                          onClick={saveEdit}
                          className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                          <FaSave /> Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingIndex(index)}
                          className="bg-yellow-500 px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
                        >
                          <FaEdit /> Edit
                        </button>
                      )}

                      <button
                        onClick={() => deleteStudent(s.email)}
                        className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 flex items-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </motion.div>
    </div>
  );
}
