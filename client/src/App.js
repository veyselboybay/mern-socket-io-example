
import './App.css';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001', {
  query: {token:'random_token'}
});

function App() {
  const [message, setMessage] = useState('')
  const [room,setRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [leaveRoom, setLeaveRoom] = useState(null)
  const [globalMessage, setGlobalMessage] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('send_message', { message, room });
  }
  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    socket.emit('message_everyone', globalMessage);
  }
  const handleJoin = (e) => {
    e.preventDefault();
    socket.emit('join_room', room);
  }
  const handleLeave = (e) => {
    e.preventDefault();
    socket.emit('leave_room', leaveRoom);
  }
  useEffect(() => { 
    socket.on('receive_message', (data) => {
      setMessages(prev => ([...prev, data]))
    })


    return () => socket.off('receive_message')
  }, [socket])

  useEffect(() => {
    socket.on('connect_error', (err) => {
      return alert(err.message)
    })

    return () => socket.off('connect_error')
  }, [socket])
  
  return (
    <div className="App">
      <h1>React - Socket.io Example</h1>
      <h3>Join Room</h3>
      <input onChange={(e) => setRoom(e.target.value)} placeholder='enter your room' />
      <button onClick={(e) => handleJoin(e)}>Join</button>
      <h3>Leave Room</h3>
      <input onChange={(e) => setLeaveRoom(e.target.value)} placeholder='enter your room' />
      <button onClick={(e) => handleLeave(e)}>Leave</button>
      <h3>Send Message to Your Room</h3>
      <input onChange={(e) => setMessage(e.target.value)} placeholder='type your message' />
      <button onClick={(e) => handleSubmit(e)}>Send</button>
      <h3>Send Message to Everyone</h3>
      <input onChange={(e) => setGlobalMessage(e.target.value)} placeholder='type your message' />
      <button onClick={(e) => handleGlobalSubmit(e)}>Send</button>


      <h3>Messages = {messages.length}</h3>
      {messages.length > 0 && messages.map(message => {
        return <p key={message}>{message}</p>
      })}
      {messages.length === 0 && <p style={{color:'black'}}>No Messages yet!</p>}
      
    </div>
  );
}

export default App;
