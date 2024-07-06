// Home.jsx
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import TutorCard from '../components/TutorCard';
import StudentCard from '../components/StudentCard';
import Navbar from '../components/Navbar';

const Home = () => {
  const { tutor } = useAppContext();

  useEffect(() => {
    console.log("Home component rendered. Tutor:", tutor);
  }, [tutor]);

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <Navbar />
      {tutor && tutor.length > 0 && (
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <TutorCard tutor={tutor[0]} />
          </div>
          <div className="mt-10">
            <h2 className="text-3xl mb-6 text-cyan-950 font-semibold text-center">Students who booked this tutor:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tutor[0].bookings.map((student) => (
                <StudentCard key={student.userId} student={student} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
