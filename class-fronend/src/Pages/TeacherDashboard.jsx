import React, { useEffect, useState } from "react";
import API from "../api";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await API.get("attendance/students/"); 
      console.log("Students:", response.data);
      setStudents(response.data);
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students. Make sure you are logged in as teacher.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleMarkAttendance = async (studentId, status) => {
    try {
      const res = await API.post("attendance/mark/", {
        student_id: studentId,
        status: status,
      });
      console.log("Marked attendance:", res.data);
      alert(`Attendance marked as ${status}!`);
      fetchStudents(); // refresh list
    } catch (err) {
      console.error("Error marking attendance:", err);
      alert("Failed to mark attendance.");
    }
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading students...</div>;
  if (error) return <div style={{ padding: "20px", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Teacher Dashboard</h2>
      <p>Total Students: {students.length}</p>
      
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #333" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Roll No</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{s.id}</td>
                <td style={{ padding: "10px" }}>{s.name}</td>
                <td style={{ padding: "10px" }}>{s.email}</td>
                <td style={{ padding: "10px" }}>{s.roll_no || "-"}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleMarkAttendance(s.id, "present")}
                    style={{ 
                      marginRight: "5px", 
                      padding: "5px 10px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Present
                  </button>
                  <button 
                    onClick={() => handleMarkAttendance(s.id, "absent")}
                    style={{ 
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}