import React, { useEffect, useState } from "react";
import API from "../api";
import StudentTable from "../components/StudentTable";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
  try {
    const res = await API.get("attendance/students/");
    setStudents(res.data);
  } catch (err) {
    console.error("Error fetching students:", err);
  }
};


  const markAttendance = async (studentId, status) => {
    try {
      await API.post("attendance/mark/", {
  student_id: studentId,
  status: status,
});

      alert(`Marked ${status} for student ${studentId}`);
    } catch (err) {
      console.error("Error marking attendance:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Teacher Dashboard</h2>
      <StudentTable students={students} onMark={markAttendance} />
    </div>
  );
};

export default TeacherDashboard;
