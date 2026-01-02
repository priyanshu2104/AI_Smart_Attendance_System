import { motion } from "framer-motion";
import bg from "../assets/bg.png";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { useState } from "react";
import { loginUser } from "../utils/auth";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const res = loginUser(email, password);

    if (!res) {
      setError("Invalid Email or Password ❌");
      return;
    }

    // Save logged user
    localStorage.setItem("loggedUser", JSON.stringify(res));

    // Redirect based on role
    if (res.role === "teacher") {
      window.location.href = "/teacher";
    } else {
      window.location.href = "/student-dashboard";
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-start pt-10 relative"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* -------- Title -------- */}
      <h1 className="text-5xl font-bold text-[#9ddcff] mb-6">
        AI Smart Attendance System
      </h1>

      {/* -------- Login Box -------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-[520px] p-10 rounded-xl bg-[#001020dd]
        border border-[#4dd2ff9d] shadow-[0_0_60px_#4cc9ff80] mt-6"
      >

        {/* Futuristic Frame Lines */}
        <div className="absolute -top-1 left-10 w-[70%] h-[2px] bg-[#74d6ff]"></div>
        <div className="absolute top-2 left-0 h-[30%] w-[2px] bg-[#74d6ff]"></div>
        <div className="absolute -bottom-1 left-10 w-[70%] h-[2px] bg-[#74d6ff]"></div>
        <div className="absolute bottom-2 right-0 h-[30%] w-[2px] bg-[#74d6ff]"></div>

        <h2 className="text-3xl text-center font-extrabold text-[#9ddcff] mb-2">
          Welcome Back!
        </h2>

        <p className="text-center text-gray-300 text-sm">
          Please sign in to continue.
        </p>

        {/* INPUT FIELDS */}
        <div className="mt-8 space-y-5">

          {/* Email */}
          <div className="flex items-center bg-[#071b3a] border border-[#2b4f8b] rounded-xl px-4">
            <HiMail className="text-[#6dd3ff] text-xl mr-3" />
            <input
              placeholder="Enter your email"
              className="w-full bg-transparent p-3 text-gray-200 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-[#071b3a] border border-[#2b4f8b] rounded-xl px-4">
            <HiLockClosed className="text-[#6dd3ff] text-xl mr-3" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent p-3 text-gray-200 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="text-right text-sm text-gray-300 cursor-pointer hover:text-white">
            Forgot Password?
          </p>
        </div>

        {/* LOGIN BUTTON */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLogin}
            className="w-[90%] py-3 font-bold text-white rounded-xl
            bg-gradient-to-r from-[#39befe] to-[#79d1ff]
            shadow-[0_0_35px_#48c8ff]
            border border-[#8fe3ff]
            hover:scale-[1.03] transition"
          >
            Login
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-center text-red-400 mt-3">
            {error}
          </p>
        )}

        {/* Divider */}
        <p className="text-center text-gray-300 mt-6">Or sign in with</p>

        {/* Google Button */}
        <button className="w-full mt-3 flex items-center justify-center gap-3 
        bg-[#0f172a] text-white border border-gray-600 py-3 rounded-xl
        hover:bg-[#1d2744] transition">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
               className="w-6"/>
          Sign in with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-300 mt-6">
          Don’t have an account? 
          <span 
            className="text-[#6dd3ff] cursor-pointer hover:underline ml-1"
            onClick={() => (window.location.href = "/register")}
          >
            Register Here
          </span>
        </p>
      </motion.div>
    </div>
  );
}
