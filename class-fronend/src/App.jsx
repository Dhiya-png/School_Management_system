// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import TeacherRegister from "./pages/TeacherRegister";
import StudentRegister from "./pages/StudentRegister";
import TeacherLogin from "./pages/TeacherLogin";
import StudentLogin from "./pages/StudentLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentAttendance from "./pages/StudentAttendance"; // <-- new page
import AttendanceTable from "./components/AttendanceTable";
import StudentTable from "./components/StudentTable";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Class Management</h1>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/teacher-register">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Teacher Register
          </button>
        </Link>
        <Link to="/teacher-login">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Teacher Login
          </button>
        </Link>
        <Link to="/student-register">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Student Register
          </button>
        </Link>
        <Link to="/student-login">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Student Login
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-attendance" element={<StudentAttendance />} />
        <Route path="/attendance" element={<AttendanceTable />} />
        <Route path="/student-table" element={<StudentTable />} />

        </Routes>
    </Router>
  );
}

export default App;
