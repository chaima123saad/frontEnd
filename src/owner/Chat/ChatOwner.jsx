import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatOwner.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {CheckCircleOutlined} from "@ant-design/icons";
import img from "./chat.png";
const socket = io('http://localhost:2000', { transports: ['websocket'] });

function ChatInterface() {
  const [teamId, setTeamId] = useState('');
  const [senderId, setSenderId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageStatus, setMessageStatus] = useState('');
  const [lastMessage, setLastMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});
  const now = new Date(); 
  const { id } = useParams();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:2000/users/${id}`)
      .then((response) => {
        if (response.data.team) {
          console.log("******", response.data);
          const teamId = response.data.team;
          setTeamId(teamId);
          localStorage.setItem('teamId', teamId);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [teamId]);

  const fetchUser = async (senderId) => {
    try {
      console.log("______________", senderId, "______________________");
      const response = await axios.get(`http://localhost:2000/users/${senderId}`);
      console.log("++++++++++++++++++______", response.data.name, "______++++++++++");
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchUserProfiles = async () => {
    const uniqueSenderIds = Array.from(new Set(messages.map(msg => msg.sender?._id)));

    const profiles = {};
    for (const senderId of uniqueSenderIds) {
      if (!userProfiles[senderId]) {
        const userProfile = await fetchUser(senderId);
        profiles[senderId] = userProfile;
      } else {
        profiles[senderId] = userProfiles[senderId];
      }
    }

    setUserProfiles(prevProfiles => ({ ...prevProfiles, ...profiles }));
  };

  useEffect(() => {
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
  
    fetchMessages();
  }, [teamId, id,messages]);
  

  useEffect(() => {
    socket.on('chat-message', (data) => {
      console.log('Received message from socket:', data);
      setMessages([...messages, data]);
      setLastMessage(data);
    });
  }, [messages]);

  useEffect(() => {
    fetchUserProfiles();
  }, [messages]);

  const handleSendMessage = async () => {
    try {
      const storedTeamId = localStorage.getItem('teamId');
      if (!storedTeamId) {
        console.log('Team ID not found in local storage');
        return;
      }
      const response = await fetch('http://localhost:2000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: storedTeamId, senderId: id, message }),
      });
  
      if (response.ok) {
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 1500);
  
        const newMessage = {
          storedTeamId,
          id,
          message,
        };
  
        // Update the messages state immediately after sending the message
        setMessages(prevMessages => [...prevMessages, newMessage]);
  
        socket.emit('chat-message', newMessage);
        setMessage('');
      } else {
        setMessageStatus('Failed to send message');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
        
        return (
        <div className="chat-container">
          <div style={{display:"flex",gap:"1rem",paddingBottom:10}}>
        <img src={img} style={{width:40}}/>
        <p className='titleChat'>Chat With The Squad</p>
        </div>
          <div className="chat-messages-container">
            {messages.map((msg, index) => {
              const sender = userProfiles[msg.sender?._id];
              return (
                <div
                style={{paddingTop:50}}
                  key={index}
                  className={`chat-message ${msg.sender?._id === id ? 'outgoing' : 'incoming'}`}
                >
                  <div className="sender-info" style={{display:"flex",gap:"1rem",paddingBottom:20,width:"32rem"}}>
                    <img src={sender?.profileImage} alt="Profile" className="profile-image" style={{height:40,borderRadius:"50%"}} />
                    <div style={{width:500,display:"flex",justifyContent:"space-between"}}>
                      <div>
                      <label>{msg.sender?._id === id ? 'You' : sender?.name}</label>
                      <p>{new Date(sender?.createdAt).getHours()}:{new Date(sender?.createdAt).getMinutes()}</p>
                      </div>
                      <p className='speciality'>{sender?.speciality}</p>
                    </div>
                  </div>
                  
                  <div >
                  <div className="chat-bubble">
                    {msg.message}
                    </div>
                  </div>
                </div>
              );
            })}
        
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
          {updateSuccess && (
        <div className="popup">
          <CheckCircleOutlined className="valideIcon" />&nbsp;&nbsp;
          <span className="popupText">Message sent</span>
        </div>
      )}
        </div>
        );
        }
        
        export default ChatInterface;