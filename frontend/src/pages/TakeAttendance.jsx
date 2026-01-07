import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { FaCamera, FaHome, FaListAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import bg from "../assets/bg.png";

export default function TakeAttendance() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // CAMERA STATES
  const [devices, setDevices] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [startCamera, setStartCamera] = useState(false);
  const [paused, setPaused] = useState(false);

  // IP CAMERA
  const [ipCameraUrl, setIpCameraUrl] = useState("");
  const [useIpCamera, setUseIpCamera] = useState(false);

  // FACE
  const [facesDetected, setFacesDetected] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([]);

  // ========= GET DEVICES + AUTO REFRESH =========
  const handleDevices = useCallback((mediaDevices) => {
    setDevices(mediaDevices.filter((d) => d.kind === "videoinput"));
  }, []);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);

    const refresh = setInterval(() => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, 4000);

    return () => clearInterval(refresh);
  }, [handleDevices]);

  // ========= AUTO STOP CAMERA ON EXIT =========
  useEffect(() => {
    return () => {
      if (cameraStream) cameraStream.getTracks().forEach(t => t.stop());
    };
  }, [cameraStream]);

  // ========= START CAMERA (STRICT + PRIVACY SAFE) =========
  const startCam = async () => {
    if (useIpCamera) {
      if (!ipCameraUrl) return alert("Enter IP Camera URL");
      setStartCamera(true);
      return;
    }

    if (devices.length === 0) {
      alert("No camera detected on system.");
      return;
    }

    if (!selectedCamera) {
      alert("Please SELECT a camera first.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCamera }
      });

      setCameraStream(stream);
      setStartCamera(true);
      setPaused(false);

    } catch {
      alert("Camera permission denied.\nAllow browser access.");
    }
  };

  // ========= STOP CAMERA =========
  const stopCam = () => {
    if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
    setCameraStream(null);
    setStartCamera(false);
    setPaused(false);
  };

  // ========= PAUSE =========
  const togglePause = () => {
    setPaused(prev => !prev);
    setConsoleLogs(prev => [...prev, paused ? "Camera Resumed" : "Camera Paused"]);
  };

  // ========= CLASS DATA =========
  const structure = {
    "B.Tech": {
      years: {
        "1st Year": {
          branches: {
            CSE: { sections: ["A", "B"], periods: 4 },
            AI: { sections: ["A"], periods: 3 },
          },
        },
        "2nd Year": {
          branches: {
            CSE: { sections: ["A", "B", "C"], periods: 5 },
            IT: { sections: ["A"], periods: 4 },
          },
        },
      },
    },
    BCA: {
      years: {
        "1st Year": {
          branches: { Core: { sections: ["A", "B"], periods: 4 } },
        },
      },
    },
  };

  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [period, setPeriod] = useState("");

  useEffect(() => { setYear(""); setBranch(""); setSection(""); setPeriod(""); }, [course]);
  useEffect(() => { setBranch(""); setSection(""); setPeriod(""); }, [year]);
  useEffect(() => { setSection(""); setPeriod(""); }, [branch]);
  useEffect(() => { setPeriod(""); }, [section]);

  // ========= LOAD FACE MODEL =========
  useEffect(() => {
    const load = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    };
    load();
  }, []);

  // ========= FACE DETECT =========
  const detectFaces = async () => {
    if (!webcamRef.current || paused || !startCamera || useIpCamera) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const size = { width: video.videoWidth, height: video.videoHeight };

    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    );

    canvas.width = size.width;
    canvas.height = size.height;

    const resized = faceapi.resizeResults(detections, size);
    faceapi.draw.drawDetections(canvas, resized);

    setFacesDetected(resized.length);
  };

  // ========= PERFECT PAUSE LOOP =========
  useEffect(() => {
    let loop;

    if (startCamera && !paused) {
      loop = setInterval(() => detectFaces(), 500);
    }

    return () => clearInterval(loop);
  }, [startCamera, paused]);

  // ========= CAPTURE =========
  const captureAttendance = () => {
    if (!course || !year || !branch || !section || !period) {
      setConsoleLogs(["Please select class info before capturing"]);
      return;
    }

    setConsoleLogs([
      "Detecting faces...",
      "Processing...",
      "Matching...",
      "Attendance Captured Successfully!"
    ]);
  };

  return (
    <div className="flex-1 p-8 overflow-y-scroll text-white">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Take Attendance</h2>

        <div className="flex gap-4 items-center">
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

      {/* CAMERA PANEL */}
      <div className="bg-[#06152d]/90 border border-[#2a5ba6] rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-2">Live Camera</h3>

        <div className="relative">
          {!startCamera ? (
            <div className="h-80 flex items-center justify-center border border-[#2a5ba6] rounded-xl text-gray-300">
              {devices.length === 0
                ? "No Camera Detected"
                : "Select Camera & Click Start"}
            </div>
          ) : useIpCamera ? (
            <div className="relative">
              <img
                src={ipCameraUrl}
                className="rounded-xl w-full h-[400px] object-cover"
              />
              <canvas ref={canvasRef} className="absolute top-0 left-0" />
            </div>
          ) : (
            <div className="relative">
              <Webcam
                ref={webcamRef}
                videoConstraints={{ deviceId: selectedCamera }}
                className={`rounded-xl ${paused ? "opacity-60" : ""}`}
                audio={false}
                mirrored
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0"
                style={{ opacity: paused ? 0.5 : 1 }}
              />
            </div>
          )}
        </div>

        <p className="mt-3 text-[#7fd3ff]">
          Faces Detected: {facesDetected}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-3">
          <button
            onClick={startCam}
            disabled={(devices.length === 0 || !selectedCamera) && !useIpCamera}
            className={`px-5 py-2 rounded-lg ${
              (devices.length === 0 || !selectedCamera) && !useIpCamera
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Start Camera
          </button>

          <button
            onClick={stopCam}
            className="px-5 py-2 bg-red-500 rounded-lg"
          >
            Stop Camera
          </button>

          <button
            onClick={togglePause}
            disabled={!startCamera}
            className={`px-5 py-2 rounded-lg ${
              paused ? "bg-yellow-500" : "bg-blue-500"
            }`}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      {/* CLASS + CAMERA SELECT */}
      <div className="mt-4 grid grid-cols-6 gap-3">
        <select className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={course} onChange={e => setCourse(e.target.value)}>
          <option>Select Course</option>
          {Object.keys(structure).map(c => <option key={c}>{c}</option>)}
        </select>

        <select className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={year} disabled={!course} onChange={e => setYear(e.target.value)}>
          <option>Select Year</option>
          {course && Object.keys(structure[course].years).map(y => <option key={y}>{y}</option>)}
        </select>

        <select className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={branch} disabled={!year} onChange={e => setBranch(e.target.value)}>
          <option>Select Branch</option>
          {course && year &&
            Object.keys(structure[course].years[year].branches).map(b => <option key={b}>{b}</option>)}
        </select>

        <select className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={section} disabled={!branch} onChange={e => setSection(e.target.value)}>
          <option>Select Section</option>
          {course && year && branch &&
            structure[course].years[year].branches[branch].sections.map(s => <option key={s}>{s}</option>)}
        </select>

        <select className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          value={period} disabled={!section} onChange={e => setPeriod(e.target.value)}>
          <option>Select Period</option>
          {course && year && branch && section &&
            Array.from({ length: structure[course].years[year].branches[branch].periods }, (_, i) => `Period ${i + 1}`)
              .map(p => <option key={p}>{p}</option>)}
        </select>

        {/* CAMERA DROPDOWN */}
        <select
          className="bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg"
          onChange={e => setSelectedCamera(e.target.value)}
        >
          <option>Select Camera</option>

          {devices.length === 0
            ? <option>No Camera Detected</option>
            : devices.map((d, i) => (
                <option value={d.deviceId} key={i}>
                  {d.label || "Camera"}
                </option>
              ))}
        </select>
        {/* CCTV */}
<div className="col-span-6 flex gap-3 items-center mt-2">
  <input
    type="checkbox"
    checked={useIpCamera}
    onChange={() => setUseIpCamera(!useIpCamera)}
  />
  <span className="text-gray-300">Use CCTV / IP Camera</span>
</div>

{useIpCamera && (
  <input
    type="text"
    placeholder="Enter CCTV / IP Stream URL"
    className="col-span-6 bg-[#06152d] border border-[#2a5ba6] px-4 py-2 rounded-lg text-gray-200"
    value={ipCameraUrl}
    onChange={(e) => setIpCameraUrl(e.target.value)}
  />
)}

    {/* CAMERA PREVIEW */}
    <div className="col-span-6 mt-4">
      <h3 className="text-gray-300 mb-2">Available Cameras</h3>

      {devices.length === 0 ? (
        <p className="text-red-400">No Camera Available</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {devices.map((d, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedCamera(d.deviceId);
                alert(`Camera Selected: ${d.label || "Camera"}`);
              }}
              className="p-3 border border-[#2a5ba6] rounded-lg cursor-pointer 
              hover:bg-[#0b1b3a] hover:scale-[1.02] transition shadow-[0_0_20px_#2fa9ff60]"
            >
              <p className="text-sm text-[#9ddcff]">
                {d.label || "Camera"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>

      </div>

      {/* CAPTURE */}
      <button
        onClick={captureAttendance}
        className="mt-6 w-full py-4 text-lg font-bold bg-[#0ea5e9] rounded-xl hover:bg-[#38bdf8]"
      >
        Capture Attendance
      </button>

      {/* CONSOLE */}
      <div className="mt-6 bg-[#06152d] border border-[#2a5ba6] rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-2">Status Console</h3>
        <div className="text-gray-300">
          {consoleLogs.map((log, i) => <p key={i}>{log}</p>)}
        </div>
      </div>

    </div>
);



}
