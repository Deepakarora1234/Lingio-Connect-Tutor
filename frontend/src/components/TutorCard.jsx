// TutorCard.jsx
import React from 'react';

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-cyan-950 text-white p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <img src={tutor.image} alt="Tutor" className="w-32 h-32 rounded-full mx-auto shadow-md border-4 border-black"/>
        <h2 className="text-3xl mt-4 font-semibold">{tutor.fullName}</h2>
        <p className="mt-2 text-lg">{tutor.language} Tutor</p>
      </div>
      <div className="mt-6 space-y-2 text-center">
        <p>{tutor.description}</p>
        <p><strong>Email:</strong> {tutor.email}</p>
        <p><strong>Cost:</strong> ${tutor.cost}</p>
        <p><strong>Course Duration:</strong> {tutor.courseDuration} days</p>
      </div>
    </div>
  );
}

export default TutorCard;
