import React from "react";

const StudentTable = ({ students, onMark }) => {
  return (
    <table border="1" style={{ width: "100%", marginTop: 20 }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Roll No</th>
          <th>Today Attendance</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.roll_no}</td>
            <td>{s.today_status || "Not Marked"}</td>
            <td>
              <button onClick={() => onMark(s.id, "present")}>✅ Present</button>
              <button onClick={() => onMark(s.id, "absent")}>❌ Absent</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
