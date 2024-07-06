// StudentCard.jsx
import React from 'react';
import { Link } from "react-router-dom";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white text-cyan-950 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">{student.name}</h3>
      <p className="text-sm">{student.email}</p>
      <Link to={`/student/${student.userId}`} className="mt-4 inline-block bg-cyan-950 text-white px-4 py-2 rounded-lg shadow-md hover:bg-black hover:text-cyan-950 transition duration-300">
        View Profile
      </Link>
    </div>
  );
}

export default StudentCard;
