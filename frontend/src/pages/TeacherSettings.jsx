import { useEffect, useState } from "react";
import { FaArrowLeft, FaSave, FaUserCog, FaSignOutAlt, FaCamera, FaTimes } from "react-icons/fa";

export default function TeacherSettings() {

  const [teacher, setTeacher] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    newPassword: "",
    confirmPassword: "",
    photo: ""   // blank default
  });

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedUser"));

    if (!logged || logged.role !== "teacher") {
      window.location.href = "/";
    } else {
      setTeacher(logged.user);

      setForm({
        name: logged.user.name,
        email: logged.user.email,
        department: logged.user.department || "",
        designation: logged.user.designation || "",
        newPassword: "",
        confirmPassword: "",
        photo: logged.user.photo || ""   // Load saved photo
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -------------- Upload Photo ---------------- */
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, photo: reader.result }));
    };

    reader.readAsDataURL(file);
  };

  /* -------------- Remove Photo ---------------- */
  const removePhoto = () => {
    setForm(prev => ({ ...prev, photo: "" }));
  };

  /* -------------- Save Settings ---------------- */
  const saveSettings = () => {

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    let updatedTeacher = {
      ...teacher,
      name: form.name,
      email: form.email,
      department: form.department,
      designation: form.designation,
      photo: form.photo   // may be "" if removed
    };

    if (form.newPassword) updatedTeacher.password = form.newPassword;

    // Update teachers list
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
    const index = teachers.findIndex(t => t.email === teacher.email);
    teachers[index] = updatedTeacher;
    localStorage.setItem("teachers", JSON.stringify(teachers));

    // Update logged user
    localStorage.setItem("loggedUser", JSON.stringify({
      role: "teacher",
      user: updatedTeacher
    }));

    setTeacher(updatedTeacher);

    alert("Settings Updated Successfully ✔");
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/";
  };

  if (!teacher) return null;

  return (
    <div className="flex-1 p-8 overflow-y-scroll text-white">

      {/* HEADER SAME AS OTHER PAGES */}
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Settings</h2>

        <div className="flex gap-4 items-center">
          <div
            className="w-12 h-12 rounded-full border border-[#7fd3ff] bg-black overflow-hidden"
          >
            {teacher.photo && (
              <img src={teacher.photo} className="w-full h-full object-cover" />
            )}
          </div>

          <div>
            <p className="font-semibold">{teacher.name}</p>
            <p className="text-gray-300 text-sm">Teacher</p>
          </div>
        </div>
      </div>

      {/* MAIN SETTINGS AREA */}
      <div className="bg-[#06152d]/90 border border-[#2a5ba6]
        shadow-[0_0_40px_#2fa9ff50] rounded-xl p-6">

        {/* TITLE */}
        <div className="flex justify-between items-center border-b border-[#2b4f8b] pb-3 mb-5">
          <div className="flex items-center gap-3">
            <FaUserCog className="text-3xl text-[#7fd3ff]" />
            <h3 className="text-2xl font-bold text-[#9ddcff]">
              Account Settings
            </h3>
          </div>

          <button
            onClick={() => window.location.href = "/teacher/dashboard"}
            className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* PROFILE PICTURE SECTION */}
        <div className="flex items-center gap-6 mb-6">

          {/* Black Circle Default */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-2 border-[#7fd3ff] bg-black overflow-hidden">
              {form.photo && (
                <img src={form.photo} className="w-full h-full object-cover" />
              )}
            </div>

            {/* Remove Button if image exists */}
            {form.photo && (
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Upload */}
          <label className="cursor-pointer bg-[#0ea5e9] hover:bg-[#38bdf8]
           px-4 py-2 rounded-xl flex items-center gap-2">
            <FaCamera /> Upload Photo
            <input type="file" accept="image/*" hidden onChange={handlePhoto} />
          </label>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-5">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
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
            value={form.designation}
            onChange={handleChange}
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          >
            <option>Select Designation</option>
            <option>Assistant Professor</option>
            <option>Associate Professor</option>
            <option>Professor</option>
            <option>HOD</option>
          </select>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="bg-[#071b3a] border border-[#2b4f8b] p-3 rounded-xl outline-none"
          />

        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          <button
            onClick={saveSettings}
            className="px-6 py-3 bg-[#38bdf8] border border-[#8fe3ff]
            rounded-xl flex items-center gap-2"
          >
            <FaSave /> Save Changes
          </button>

          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 rounded-xl flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

      </div>

    </div>
  );
}
