import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  FaUsers,
  FaChalkboardTeacher,
  FaHome,
  FaCamera,
  FaListAlt,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { MdWarning } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

import bg from "../assets/bg.png";

export default function TeacherDashboard() {
  // Academic Structure
  const structure = {
    "B.Tech": {
      years: {
        "1st Year": {
          branches: {
            CSE: { sections: ["A", "B"], periods: 4 },
            AI: { sections: ["A"], periods: 3 },
          }
        },
        "2nd Year": {
          branches: {
            CSE: { sections: ["A", "B", "C"], periods: 5 },
            IT: { sections: ["A"], periods: 4 },
          }
        }
      }
    },

    "BCA": {
      years: {
        "1st Year": {
          branches: {
            Core: { sections: ["A", "B"], periods: 4 }
          }
        }
      }
    },

    "BAM": {
      years: {
        "1st Year": {
          branches: {
            General: { sections: ["A"], periods: 3 }
          }
        }
      }
    }
  };

  // States
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [period, setPeriod] = useState("");

  // Reset on change
  useEffect(() => {
    setYear(""); setBranch(""); setSection(""); setPeriod("");
  }, [course]);

  useEffect(() => {
    setBranch(""); setSection(""); setPeriod("");
  }, [year]);

  useEffect(() => {
    setSection(""); setPeriod("");
  }, [branch]);

  useEffect(() => {
    setPeriod("");
  }, [section]);

  // Smart dynamic stats generator
  const generateStats = () => {
    if (!course || !year || !branch || !section || !period) {
      return {
        totalStudents: 0,
        accuracy: 0,
        alerts: 0,
        graph: [],
        logs: ["Please select all filters to view statistics"]
      };
    }

    const totalStudents =
      branch === "AI" ? 45 :
      branch === "IT" ? 60 :
      75;

    const present = Math.floor(totalStudents * (Math.random() * (0.9 - 0.7) + 0.7));
    const accuracy = Math.floor(Math.random() * (99 - 92) + 92);
    const alerts = totalStudents - present > 10 ? 2 : 0;

    const graph = [
      { name: "Mon", present: Math.floor(present * 0.75), absent: totalStudents - Math.floor(present * 0.75) },
      { name: "Tue", present: Math.floor(present * 0.80), absent: totalStudents - Math.floor(present * 0.80) },
      { name: "Wed", present: Math.floor(present * 0.85), absent: totalStudents - Math.floor(present * 0.85) },
      { name: "Thu", present: Math.floor(present * 0.90), absent: totalStudents - Math.floor(present * 0.90) },
      { name: "Fri", present, absent: totalStudents - present },
    ];

    const logs = [
      `✔ Attendance captured for ${course} ${year} ${branch} - Sec ${section}`,
      alerts ? "⚠ High absence alert triggered" : "✔ Normal attendance level",
      "✔ AI Accuracy Stable",
      "✔ Camera Connected Successfully"
    ];

    return { totalStudents, accuracy, alerts, graph, logs };
  };

  const stats = generateStats();

  return (
    <div className="flex-1 p-8 text-white overflow-y-scroll">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome, <span className="text-[#7fd3ff]">Mr. Priyanshu Shekhar</span>
          </h2>
          <p className="text-gray-400 text-sm">Teacher</p>
        </div>

        <div className="flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            className="w-12 h-12 rounded-full border border-[#7fd3ff]"
          />
          <div>
            <p className="font-semibold">Priyanshu Shekhar</p>
            <p className="text-gray-400 text-sm">Teacher</p>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mb-6 grid grid-cols-5 gap-4">

        {/* Course */}
        <select
          className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={course}
          onChange={e => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {Object.keys(structure).map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Year */}
        <select
          className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={year}
          disabled={!course}
          onChange={e => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {course &&
            Object.keys(structure[course].years).map(y => (
              <option key={y}>{y}</option>
            ))}
        </select>

        {/* Branch */}
        <select
          className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={branch}
          disabled={!year}
          onChange={e => setBranch(e.target.value)}
        >
          <option value="">Select Branch</option>
          {course && year &&
            Object.keys(structure[course].years[year].branches).map(b => (
              <option key={b}>{b}</option>
            ))}
        </select>

        {/* Section */}
        <select
          className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={section}
          disabled={!branch}
          onChange={e => setSection(e.target.value)}
        >
          <option value="">Select Section</option>
          {course && year && branch &&
            structure[course].years[year].branches[branch].sections.map(s => (
              <option key={s}>{s}</option>
            ))}
        </select>

        {/* Period */}
        <select
          className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={period}
          disabled={!section}
          onChange={e => setPeriod(e.target.value)}
        >
          <option value="">Select Period</option>
          {course && year && branch && section &&
            Array.from(
              {
                length:
                  structure[course].years[year].branches[branch].periods
              },
              (_, i) => `Period ${i + 1}`
            ).map(p => <option key={p}>{p}</option>)
          }
        </select>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="p-5 bg-[#06152d]/90 rounded-xl border border-[#2a5ba6] shadow-[0_0_25px_#2fa9ff60]">
          <FaChalkboardTeacher className="text-3xl text-[#7fd3ff]" />
          <h3 className="mt-3 text-3xl font-bold">5</h3>
          <p className="text-gray-400">Classes Today</p>
        </div>

        <div className="p-5 bg-[#06152d]/90 rounded-xl border border-[#2a5ba6] shadow-[0_0_25px_#2fa9ff60]">
          <FaUsers className="text-3xl text-[#7fd3ff]" />
          <h3 className="mt-3 text-3xl font-bold">{stats.totalStudents}</h3>
          <p className="text-gray-400">Students</p>
        </div>

        <div className="p-5 bg-[#06152d]/90 rounded-xl border border-[#2a5ba6] shadow-[0_0_25px_#2fa9ff60]">
          <AiOutlineCheckCircle className="text-3xl text-green-400" />
          <h3 className="mt-3 text-3xl font-bold">{stats.accuracy}%</h3>
          <p className="text-gray-400">Accuracy</p>
        </div>

        <div className="p-5 bg-[#06152d]/90 rounded-xl border border-[#ff5c8a] shadow-[0_0_25px_#ff5c8a60]">
          <MdWarning className="text-3xl text-red-400" />
          <h3 className="mt-3 text-3xl font-bold">{stats.alerts}</h3>
          <p className="text-gray-400">Alerts</p>
        </div>
      </div>

      {/* GRAPH */}
      <div className="bg-[#06152d]/90 rounded-xl p-6 border border-[#2a5ba6] shadow-[0_0_25px_#2fa9ff60]">
        <h3 className="text-xl font-semibold mb-4">Attendance Overview</h3>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.graph}>
              <XAxis dataKey="name" stroke="#7fd3ff" />
              <YAxis stroke="#7fd3ff" />
              <Tooltip />
              <Line type="monotone" dataKey="present" stroke="#4dfcff" strokeWidth={3} />
              <Line type="monotone" dataKey="absent" stroke="#ff6b6b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LOGS */}
      <div className="mt-6 bg-[#06152d]/90 rounded-xl p-6 border border-[#2a5ba6] shadow-[0_0_25px_#2fa9ff60]">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

        <ul className="space-y-3 text-gray-300">
          {stats.logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
