import React, { useEffect, useState } from "react";
import API from "../api";
import AttendanceTable from "../components/AttendanceTable";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  const fetchAttendance = async () => {
    try {
      const res = await API.get("my-attendance/");
      setAttendance(res.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Attendance</h2>
      <AttendanceTable attendance={attendance} />
    </div>
  );
};

export default StudentAttendance;
