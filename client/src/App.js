import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('send_message', message);
  }
  useEffect(() => { 
    socket.on('receive_message', (data) => {
      setMessages(prev => ([...prev, data]))
    })
    return () => socket.off('receive_message')
  },[socket])
  return (
    <div className="App">
      <h1>React - Socket.io Example</h1>
      <h3>Send Message</h3>
      <input onChange={(e) => setMessage(e.target.value)} placeholder='type your message' />
      <button onClick={(e) => handleSubmit(e)}>Send</button>


      <h3>Messages = {messages.length}</h3>
      {messages.length > 0 && messages.map(message => {
        return <p key={message}>{message}</p>
      })}
      {messages.length == 0 && <p style={{color:'black'}}>No Messages yet!</p>}
      
    </div>
  );
}

export default App;
