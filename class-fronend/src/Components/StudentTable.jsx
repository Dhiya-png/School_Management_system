import React from "react";

const StudentTable = ({ students, onMark }) => {
  return (
    <table border="1" style={{ width: "100%", marginTop: 20 }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Student</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.user.username}</td>
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
