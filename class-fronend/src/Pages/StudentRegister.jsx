import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegister() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    roll_no: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/class/student/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Student Registered Successfully!");
        navigate("/student-login"); // ✅ redirect after success
      } else {
        setMessage(data.detail || "Registration failed. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br /><br />
        <input name="name" placeholder="Name" onChange={handleChange} /><br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />
        <input name="roll_no" placeholder="Roll Number" onChange={handleChange} /><br /><br />
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
