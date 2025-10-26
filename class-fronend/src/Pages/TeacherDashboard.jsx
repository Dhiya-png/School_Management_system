// src/pages/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import StudentTable from "../components/StudentTable";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setError(null);
    try {
      const res = await API.get("attendance/students/"); // resolves to /class/attendance/students/
      console.log("API response (attendance/students):", res);

      // If your DRF view uses pagination it may return { results: [...] }
      let data = res.data;
      if (data && data.results) data = data.results;

      // Defensive: ensure it's an array
      if (!Array.isArray(data)) {
        console.error("students response is not an array:", data);
        setError("Unexpected response format from server. Check browser console.");
        setStudents([]);
        return;
      }

      const studentsWithStatus = data.map((s) => ({
        ...s,
        today_status: s.today_status ?? "Not Marked",
      }));
      setStudents(studentsWithStatus);
    } catch (err) {
      console.error("Error fetching students:", err);
      // show the HTTP response body if available
      if (err.response) {
        console.error("Server response data:", err.response.data);
        setError(`Server error: ${err.response.status} ${JSON.stringify(err.response.data)}`);
      } else {
        setError("Network or CORS error. See console for details.");
      }
      setStudents([]);
    }
  };

  const markAttendance = async (studentId, status) => {
    setError(null);
    try {
      const res = await API.post("attendance/mark/", { student_id: studentId, status });
      console.log("Marked attendance response:", res);
      fetchStudents(); // refresh
    } catch (err) {
      console.error("Error marking attendance:", err);
      if (err.response) setError(`Mark error: ${err.response.status} ${JSON.stringify(err.response.data)}`);
      else setError("Network/CORS error while marking attendance.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Teacher Dashboard</h2>
      <p>View students and mark attendance for today.</p>

      {error && (
        <div style={{ background: "#ffdede", padding: 10, marginBottom: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <StudentTable students={students} onMark={markAttendance} />

      {/* Debug output - remove later */}
      <div style={{ marginTop: 20 }}>
        <h3>Debug: raw student data</h3>
        <pre style={{ maxHeight: 300, overflow: "auto", background: "#f5f5f5", padding: 10 }}>
          {JSON.stringify(students, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TeacherDashboard;
