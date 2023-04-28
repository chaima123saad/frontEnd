import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:2000', { transports: ['websocket'] });

function ChatInterface() {
  const [teamId, setTeamId] = useState('');
  const [senderId, setSenderId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageStatus, setMessageStatus] = useState('');
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    // Fetch initial chat messages for the team
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:2000/chat/${teamId}`);

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (teamId) {
      fetchMessages();
    }
  }, [teamId]);

  useEffect(() => {
    socket.on('chat-message', (data) => {
      console.log('Received message from socket:', data);
      setMessages([...messages, data]);
      setLastMessage(data);
    });
  }, [messages]);
  

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:2000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, senderId, message }),
      });
  
      if (response.ok) {
        setMessageStatus('Message sent!');
        
        // Add the new message to the state
        const newMessage = {
          teamId,
          sender: { id: senderId },
          message
        };
        setMessages([...messages, newMessage]);
  
        // Send the message through the socket
        socket.emit('chat-message', newMessage);
      } else {
        setMessageStatus('Failed to send message');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="chat-container">
      <input
        type="text"
        className="chat-input"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        placeholder="Team ID"
      />
      <input
        type="text"
        className="chat-input"
        value={senderId}
        onChange={(e) => setSenderId(e.target.value)}
        placeholder="Sender ID"
      />
      <div className="chat-messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender?.id === senderId ? 'outgoing' : 'incoming'}`}
            >
            <div className="chat-bubble">{msg.message}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="chat-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button className="chat-button" onClick={() => handleSendMessage()}>
        Send
      </button>
      <div className="chat-status">{messageStatus}</div>
    </div>
  );
}

export default ChatInterface;

