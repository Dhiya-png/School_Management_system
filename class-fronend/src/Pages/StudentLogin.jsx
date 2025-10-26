import React, { useState, useEffect } from "react";

export default function StudentLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/class/login/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form)
});

    const data = await res.json();
    setMessage(data.message || data.error);
    if (data.message) fetchAttendance();
  };

  const fetchAttendance = async () => {
    const res = await fetch("http://127.0.0.1:8000/class/my-attendance/", {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();
    setAttendance(data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <input name="username" placeholder="Username" onChange={handleChange} /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br /><br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}

      {attendance.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Your Attendance</h3>
          <table border="1" style={{ margin: "0 auto" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((att) => (
                <tr key={att.id}>
                  <td>{att.date}</td>
                  <td>{att.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
