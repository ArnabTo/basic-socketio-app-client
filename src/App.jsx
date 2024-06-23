import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'
import { nanoid } from 'nanoid';

// env file
const socket = io.connect('http://localhost:3000');
const userName = nanoid(4)

function App() {

  const [ message, setMessage ] = useState('');
  const [chat, setChat] = useState([]);


  const sendMessage = (e) =>{
    e.preventDefault();
    socket.emit('chat', {message, userName});
    setMessage('');
  }

  useEffect(()=>{
    socket.on('chat', (paylaod) => {
      console.log(paylaod)
      setChat((prevchat) => [...prevchat, paylaod]);
    })
  return () =>{
    socket.off('chat')
  }
  },[])
  
// console.log(chat)
  return (
    <>
      <h1>Chat app</h1>

      <div>
         {chat.map((payload, index)=>(
          <p key={index}>{payload?.message}: <span>{payload?.userName}</span></p>
         ))}
        <form onSubmit={sendMessage}>
          <input type='text' name='message' value={message}
           onChange={(e) =>{
            setMessage(e.target.value);
           }}/>
           <button type='submit'>Send</button>
        </form>
      </div>
    </>
  )
}

export default App
