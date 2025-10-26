import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function TeacherLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // First get CSRF token
      await API.get("csrf/");
      
      // Then login
      const res = await API.post("login/", form);

      if (res.status === 200) {
        setMessage("Login successful!");
        setTimeout(() => {
          navigate("/teacher-dashboard");
        }, 500);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Teacher Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="username" 
          placeholder="Username" 
          onChange={handleChange}
          required 
        /><br /><br />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange}
          required 
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
    </div>
  );
}