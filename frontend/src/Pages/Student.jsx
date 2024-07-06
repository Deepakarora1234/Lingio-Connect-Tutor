import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import io from 'socket.io-client';
import {BsSend} from "react-icons/bs"
import Messages from '../components/Messages.jsx'
import Navbar from '../components/Navbar.jsx';

const Student = () => {
    const { tutor } = useAppContext();
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Home component rendered. Tutor:", tutor);
    }, [tutor]);

    useEffect(() => {
        const newSocket = io('https://lingio-connect-l8k2.onrender.com'); 
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    const tutorId = tutor[0]?._id

    const {studentId} = useParams()
    console.log(studentId)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;

        const newMessage = { studentId,tutorId , message };
        // mutation.mutate(newMessage);

        socket.emit('sendMessage', { senderId: tutorId, receiverId: studentId, message });

        setMessage("");
    };
    const handleKeyPress = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!message) return;

            const newMessage = { studentId,tutorId , message };
            // mutation.mutate(newMessage);

            socket.emit('sendMessage', { senderId: tutorId, receiverId: studentId, message });

            setMessage("");
        }
    };
    const handleClick = ()=>{
        navigate(`/videocall/${studentId}`)

    }
  return (
    
    <div>
        <Navbar />
    <div className="flex flex-col items-center min-h-screen justify-center bg-gray-900">
    <form onSubmit={handleSubmit} className=' border-orange-200 flex flex-col p-6 w-full max-w-3xl rounded-lg shadow-lg bg-gray-800'>
      <div className=' border  text-white p-4 text-3xl rounded-t-lg bg-gray-700'>
        Chat with <span className='font-bold'>your tutor</span>
      </div>
      <div className=' flex-grow  text-white h-96 overflow-y-scroll p-4 bg-gray-700'>
        <Messages tutorId={tutorId} userId={studentId} />
      </div>
      <div className=' text-white border-green-700 p-4 rounded-b-lg bg-gray-700'>
        <div className='flex justify-between gap-2 items-center'>
          <textarea
            type='text'
            className='border text-sm rounded-lg flex-grow p-2.5 bg-gray-700 border-gray-600 text-white resize-none'
            placeholder='Send a message'
            value={message}
            rows={1}
            onChange={(e) => { setMessage(e.target.value) }}
            onKeyDown={handleKeyPress}
          />
          <button type='submit' className='bg-cyan-950 rounded-lg p-3 flex items-center text-white hover:bg-cyan-800 transition duration-300'>
            <BsSend />
          </button>
        </div>
      </div>
    </form>
    <button onClick={handleClick} className='text-white border border-cyan-950 p-4 mt-6 rounded-lg bg-gray-700 hover:bg-cyan-950 transition duration-300'>
      Start Live Session
    </button>
  </div>
  </div>
  )
}

export default Student
