import { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import { motion } from "framer-motion";
import { FaBell, FaCheckCircle, FaTrash, FaArrowLeft } from "react-icons/fa";

export default function StudentNotifications() {

  const [student, setStudent] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Load student + notifications
  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedUser"));

    if (!logged || logged.role !== "student") {
      window.location.href = "/";
    } else {
      setStudent(logged.user);

      // Load existing notifications or add default
      const stored = JSON.parse(localStorage.getItem("studentNotifications") || "[]");

      if (stored.length === 0) {
        const defaultNotes = [
          {
            id: 1,
            text: "Attendance marked PRESENT successfully.",
            type: "success",
            time: "Just now",
            read: false
          },
          {
            id: 2,
            text: "If you are marked absent wrongly, contact your teacher.",
            type: "info",
            time: "Today",
            read: false
          }
        ];
        localStorage.setItem("studentNotifications", JSON.stringify(defaultNotes));
        setNotifications(defaultNotes);
      } else {
        setNotifications(stored);
      }
    }
  }, []);

  const markAsRead = (id) => {
    const updated = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("studentNotifications", JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("studentNotifications", JSON.stringify([]));
  };

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
        Notifications
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-[900px] p-8 rounded-xl bg-[#001020dd]
        border border-[#4dd2ff9d] shadow-[0_0_60px_#4cc9ff80]"
      >

        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#2b4f8b] pb-3 mb-6">
          <div className="flex gap-3 items-center">
            <FaBell className="text-4xl text-[#7fd3ff]" />
            <h2 className="text-2xl font-bold text-[#9ddcff]">
              Hello, {student.name}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={clearAll}
              className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <FaTrash /> Clear All
            </button>

            <button
              onClick={() => window.location.href = "/student-dashboard"}
              className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              <FaArrowLeft /> Back
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <p className="text-center text-gray-300">No Notifications 🎉</p>
        ) : (
          <div className="space-y-4">
            {notifications.map(note => (
              <div
                key={note.id}
                className={`p-4 rounded-xl border ${
                  note.read
                    ? "border-gray-600 opacity-60"
                    : "border-[#4dd2ff]"
                } bg-[#071b3a]`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-200">{note.text}</p>

                  {!note.read && (
                    <button
                      onClick={() => markAsRead(note.id)}
                      className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700"
                    >
                      <FaCheckCircle /> Mark Read
                    </button>
                  )}
                </div>

                <p className="text-right text-gray-400 text-sm mt-1">
                  {note.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
