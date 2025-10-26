// src/components/AttendanceTable.jsx
import React from "react";

const AttendanceTable = ({ attendance }) => {
  return (
    <table border="1" style={{ width: "100%", marginTop: 20 }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((a) => (
          <tr key={a.id}>
            <td>{a.date}</td>
            <td>{a.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
