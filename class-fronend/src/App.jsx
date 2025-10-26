// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeacherRegister from "./Pages/TeacherRegister";
import StudentRegister from "./Pages/StudentRegister";
import TeacherLogin from "./Pages/TeacherLogin";
import StudentLogin from "./Pages/StudentLogin";


function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Class Management</h1>
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/teacher-register">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Teacher Register</button>
        </Link>
        <Link to="/teacher-login">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Teacher Login</button>
        </Link>
        <Link to="/student-register">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Student Register</button>
        </Link>
        <Link to="/student-login">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>Student Login</button>
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
        
      </Routes>
    </Router>
  );
}

export default App;
