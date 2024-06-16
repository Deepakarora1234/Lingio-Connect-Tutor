
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CallingState,
  StreamCall,
  SpeakerLayout,
  CallControls,
  StreamVideo,
  StreamTheme,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  ParticipantView,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import io from 'socket.io-client';


const VideoCall = () => {
  const { tutor } = useAppContext(); 
  const [socket, setSocket] = useState(null);

  const tutorId = tutor[0]?._id;
  const name = tutor[0]?.fullName
  const { studentId } = useParams();

  const apiKey = 'mmhfdzb5evj2';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUGFkbV9fQW1pZGFsYSIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvUGFkbV9fQW1pZGFsYSIsImlhdCI6MTcxODM1MzczOSwiZXhwIjoxNzE4OTU4NTQ0fQ.rxXt4khjVNHlhASsVCiqcWDpCphlJXAJq-bVFQGBBZI'; // the token can be found in the "Credentials" section
  const userId = 'Padm__Amidala'; 
  const callId = `LingioConnect_${tutorId}`; 

  useEffect(() => {
    const newSocket = io('https://lingio-connect.onrender.com');
    setSocket(newSocket);

    newSocket.emit('joinRoom', { senderId: tutorId, receiverId: studentId });
    newSocket.emit("sendCallId", {senderId: tutorId, receiverId: studentId,callId:callId })

    // newSocket.on('receiveMessage', (message) => {
    //     setRealTimeMessages((prevMessages) => [...prevMessages, message]);
    // });
    

    return () => newSocket.close();
}, [tutorId, userId]);



  
  const navigate = useNavigate();
  console.log('Home component rendered. Tutor:', tutor);
  


  const user = {
    id: userId,
    name: name,
    image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
  };

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call('default', callId);

  useEffect(() => {
    const joinCall = async () => {
      await call.join({ create: true });
    };
    joinCall();

    return () => {
      call.leave();
    };
  }, [call]);

  return (
    <div>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout navigate={navigate} studentId={studentId} />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCall;

export const MyUILayout = ({ navigate, studentId }) => {
  const call = useCall();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();

  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();



  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={()=> navigate(`/student/${studentId}`)} />
    </StreamTheme>
  );
};

export const MyParticipantList = (props) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};
