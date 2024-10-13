// // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // import styles from '../../styles/MyPage/Chat.module.css';

// // // // // // // const Chat = () => {
// // // // // // //   const [message, setMessage] = useState('');
// // // // // // //   const [currentRoom, setCurrentRoom] = useState('Room 1');
// // // // // // //   const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
// // // // // // //   const [messages, setMessages] = useState({});
// // // // // // //   const [image, setImage] = useState(null);
// // // // // // //   const chatEndRef = useRef(null); // Ref for scrolling
  

 
  

// // // // // // //   useEffect(() => {
// // // // // // //     const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
// // // // // // //     setMessages(savedMessages);
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
// // // // // // //     setMessages(savedMessages);
// // // // // // //     scrollToBottom(); // Scroll to bottom when room changes
// // // // // // //   }, [currentRoom]);

// // // // // // //   useEffect(() => {
// // // // // // //     scrollToBottom(); // Scroll to bottom when messages change
// // // // // // //   }, [messages]);

// // // // // // //   const handleMessageChange = (e) => {
// // // // // // //     setMessage(e.target.value);
// // // // // // //   };

// // // // // // //   const handleImageChange = (e) => {
// // // // // // //     const selectedImage = e.target.files[0];
// // // // // // //     setImage(selectedImage);
    
// // // // // // //     if (selectedImage) {
// // // // // // //       handleSubmitImage(selectedImage); // Automatically send the image
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmitImage = (imageFile) => {
// // // // // // //     const newMessages = { ...messages };
// // // // // // //     if (!newMessages[currentRoom]) {
// // // // // // //       newMessages[currentRoom] = [];
// // // // // // //     }
// // // // // // //     const now = new Date();
// // // // // // //     const time = formatTime(now);
// // // // // // //     const newMessage = { image: URL.createObjectURL(imageFile), sender: 'user', time };

// // // // // // //     newMessages[currentRoom].push(newMessage);
// // // // // // //     setMessages(newMessages);
// // // // // // //     setImage(null); // Clear image after sending
// // // // // // //     localStorage.setItem('messages', JSON.stringify(newMessages));
// // // // // // //     scrollToBottom(); // Scroll to bottom after sending message
// // // // // // //   };

// // // // // // //   const handleSubmit = (e) => {
// // // // // // //     e.preventDefault();

// // // // // // //     if (!message.trim() && !image) {
// // // // // // //       alert('메시지를 입력하세요.');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const newMessages = { ...messages };
// // // // // // //     if (!newMessages[currentRoom]) {
// // // // // // //       newMessages[currentRoom] = [];
// // // // // // //     }
// // // // // // //     const now = new Date();
// // // // // // //     const time = formatTime(now);
// // // // // // //     const newMessage = { text: message, sender: 'user', time };

// // // // // // //     newMessages[currentRoom].push(newMessage);
// // // // // // //     setMessages(newMessages);
// // // // // // //     setMessage(''); // Clear message input
// // // // // // //     localStorage.setItem('messages', JSON.stringify(newMessages));
// // // // // // //     scrollToBottom(); // Scroll to bottom after sending message
// // // // // // //   };

// // // // // // //   const handleRoomChange = (room) => {
// // // // // // //     setCurrentRoom(room);
// // // // // // //   };

// // // // // // //   const formatTime = (time) => {
// // // // // // //     const hours = time.getHours();
// // // // // // //     const minutes = time.getMinutes().toString().padStart(2, '0');
// // // // // // //     const period = hours >= 12 ? '오후' : '오전';
// // // // // // //     const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
// // // // // // //     return `${period} ${formattedHours}:${minutes}`;
// // // // // // //   };

// // // // // // //   const renderMessages = () => {
// // // // // // //     const messageList = messages[currentRoom] || [];
// // // // // // //     return messageList.map((msg, index) => {
// // // // // // //       const showTime =
// // // // // // //         index === messageList.length - 1 || // Last message always shows time
// // // // // // //         msg.time !== messageList[index + 1]?.time; // Show time if different from next message

// // // // // // //       return (
// // // // // // //         <div
// // // // // // //           key={index}
// // // // // // //           className={`${styles.message} ${msg.sender === 'user' ? styles.sent : styles.received}`}
// // // // // // //         >
// // // // // // //           <div className={`${styles.messageContent} ${msg.image ? styles.imageMessage : ''}`}>
// // // // // // //             {msg.text}
// // // // // // //             {msg.image && (
// // // // // // //               <img src={msg.image} alt="첨부 이미지" className={styles.messageImage} />
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //           {showTime && <div className={styles.messageTime}>{msg.time}</div>}
// // // // // // //         </div>
// // // // // // //       );
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const scrollToBottom = () => {
// // // // // // //     // Ensure that the last message/image is fully visible
// // // // // // //     chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className={styles.chatContainer}>
// // // // // // //       <div className={styles.roomList}>
// // // // // // //         <div className={styles.roomListTitle}>대화 목록</div>
// // // // // // //         {rooms.map((room, index) => (
// // // // // // //           <div
// // // // // // //             key={index}
// // // // // // //             className={`${styles.room} ${currentRoom === room ? styles.activeRoom : ''}`}
// // // // // // //             onClick={() => handleRoomChange(room)}
// // // // // // //           >
// // // // // // //             <div className={styles.roomIconWrapper}>
// // // // // // //               <i className={`${styles.roomIcon} fas fa-store`}></i>
// // // // // // //             </div>
// // // // // // //             {room}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>
// // // // // // //       <div className={styles.chatBox}>
// // // // // // //         <div className={styles.chatHeader}>
// // // // // // //           <div className={styles.chatHeaderIconWrapper}>
// // // // // // //             <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
// // // // // // //           </div>
// // // // // // //           {currentRoom}
// // // // // // //         </div>
// // // // // // //         <div className={styles.chatMessages}>
// // // // // // //           {renderMessages()}
// // // // // // //           <div ref={chatEndRef} />
// // // // // // //         </div>
// // // // // // //         <form className={styles.messageForm} onSubmit={handleSubmit}>
// // // // // // //           <div className={styles.inputWrapper}>
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               className={styles.messageInput}
// // // // // // //               placeholder="메시지를 입력하세요."
// // // // // // //               value={message}
// // // // // // //               onChange={handleMessageChange}
// // // // // // //               disabled={image} 
// // // // // // //             />
// // // // // // //             <div className={styles.inputIcons}>
// // // // // // //               <input
// // // // // // //                 id="fileInput"
// // // // // // //                 type="file"
// // // // // // //                 accept="image/*"
// // // // // // //                 onChange={handleImageChange} 
// // // // // // //                 className={styles.fileInput}
// // // // // // //                 disabled={message.trim()} 
// // // // // // //               />
// // // // // // //               <label htmlFor="fileInput" className={styles.fileInputLabel}>
// // // // // // //                 <i className="fas fa-camera"></i>
// // // // // // //               </label>
// // // // // // //               <button type="submit" className={styles.sendButton}>
// // // // // // //                 전송
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </form>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Chat;




















// // //ui
// // import React, { useState, useEffect, useRef } from 'react';
// // import styles from '../../styles/MyPage/Chat.module.css';

// // const Chat = () => {
// //   const [currentRoom, setCurrentRoom] = useState('Room 1');
// //   const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
// //   const chatEndRef = useRef(null);

// //   const renderMessages = () => {
// //     // Placeholder for rendering messages
// //     return (
// //       <div>
// //         {/* Messages would be rendered here */}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className={styles.chatContainer}>
// //       <div className={styles.roomList}>
// //         <div className={styles.roomListTitle}>대화 목록</div>
// //         {rooms.map((room, index) => (
// //           <div
// //             key={index}
// //             className={`${styles.room} ${currentRoom === room ? styles.activeRoom : ''}`}
// //             onClick={() => setCurrentRoom(room)}
// //           >
// //             <div className={styles.roomIconWrapper}>
// //               <i className={`${styles.roomIcon} fas fa-store`}></i>
// //             </div>
// //             {room}
// //           </div>
// //         ))}
// //       </div>
// //       <div className={styles.chatBox}>
// //         <div className={styles.chatHeader}>
// //           <div className={styles.chatHeaderIconWrapper}>
// //             <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
// //           </div>
// //           {currentRoom}
// //         </div>
// //         <div className={styles.chatMessages}>
// //           {renderMessages()}
// //           <div ref={chatEndRef} />
// //         </div>
// //         <form className={styles.messageForm}>
// //           <div className={styles.inputWrapper}>
// //             <input
// //               type="text"
// //               className={styles.messageInput}
// //               placeholder="메시지를 입력하세요."
// //             />
// //             <div className={styles.inputIcons}>
// //               <input
// //                 id="fileInput"
// //                 type="file"
// //                 accept="image/*"
// //                 className={styles.fileInput}
// //               />
// //               <label htmlFor="fileInput" className={styles.fileInputLabel}>
// //                 <i className="fas fa-camera"></i>
// //               </label>
// //               <button type="submit" className={styles.sendButton}>
// //                 전송
// //               </button>
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chat;































// // import React, { useState, useEffect, useRef } from 'react';
// // import SockJS from 'sockjs-client';
// // import { Client } from '@stomp/stompjs';
// // import styles from '../../styles/MyPage/Chat.module.css';
// // import axios from 'axios';

// // const Chat = ({ itemId }) => {
// //   const [currentRoom, setCurrentRoom] = useState(null);
// //   const [rooms, setRooms] = useState([]);
// //   const [messages, setMessages] = useState([]);
// //   const [itemDetails, setItemDetails] = useState(null); // State for item details
// //   const chatEndRef = useRef(null);
// //   const stompClient = useRef(null);

// //   useEffect(() => {
// //     console.log('itemId:', itemId);
    
// //     // Fetch item details when the component mounts
// //     const fetchItemDetails = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:8080/item/${itemId}`);
// //         setItemDetails(response.data); // Set the item details
// //         // Fetch chat rooms after fetching item details
// //         fetchChatRooms(response.data.id); // Use the fetched item ID to get chat rooms
// //       } catch (error) {
// //         console.error('Error fetching item details:', error.response ? error.response.data : error.message);
// //       }
// //     };

// //     fetchItemDetails();
// //   }, [itemId]);

// //   // Fetch chat rooms
// //   const fetchChatRooms = async (itemId) => {
// //     try {
// //       const token = localStorage.getItem('token'); // Adjust this based on how you're storing the token
// //       const response = await axios.post(`http://localhost:8080/item/${itemId}/chat`, {}, {
// //         headers: {
// //           Authorization: `Bearer ${token}` // Assuming you're using Bearer token
// //         }
// //       });
// //       setRooms([response.data]); // Assuming response.data is the room created or fetched
// //       setCurrentRoom(response.data.id); // Set the current room to the new or fetched room
// //     } catch (error) {
// //       console.error('Error fetching chat rooms:', error.response ? error.response.data : error.message);
// //     }
// //   };

// //   const connectWebSocket = () => {
// //     const socket = new SockJS('http://localhost:8080/ws'); // Update URL as needed
// //     stompClient.current = new Client({
// //       webSocketFactory: () => socket,
// //       debug: (str) => { console.log(str); },
// //       onConnect: () => {
// //         console.log('Connected to WebSocket');
// //         console.log('Current room:', currentRoom); // Log current room for debugging
// //         // Subscribe to the current room
// //         stompClient.current.subscribe(`/topic/${currentRoom}`, (message) => {
// //           setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
// //           chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //         });
// //       },
// //       onStompError: (frame) => {
// //         console.error('Broker error: ' + frame.headers['message']);
// //         console.error(frame.body);
// //       },
// //     });

// //     stompClient.current.activate();
// //   };

// //   useEffect(() => {
// //     if (currentRoom) {
// //       connectWebSocket();
// //       // Fetch messages for the current room
// //       const fetchMessages = async () => {
// //         try {
// //           const response = await axios.get(`http://localhost:8080/chat/${currentRoom}/messages`);
// //           setMessages(response.data);
// //         } catch (error) {
// //           console.error('Error fetching messages:', error);
// //         }
// //       };

// //       fetchMessages();

// //       return () => {
// //         if (stompClient.current) {
// //           stompClient.current.deactivate();
// //         }
// //       };
// //     }
// //   }, [currentRoom]);

// //   const sendMessage = (event) => {
// //     event.preventDefault();
// //     const input = event.target.elements.message;
// //     const messageContent = input.value;

// //     if (messageContent && currentRoom) {
// //       stompClient.current.send(`/app/chat/${currentRoom}`, {}, JSON.stringify({ content: messageContent }));
// //       input.value = ''; // Clear the input field
// //     }
// //   };

// //   return (
// //     <div className={styles.chatContainer}>
// //       <div className={styles.roomList}>
// //         <div className={styles.roomListTitle}>대화 목록</div>
// //         {rooms.map((room, index) => (
// //           <div
// //             key={index}
// //             className={`${styles.room} ${currentRoom === room.id ? styles.activeRoom : ''}`}
// //             onClick={() => setCurrentRoom(room.id)}
// //           >
// //             <div className={styles.roomIconWrapper}>
// //               <i className={`${styles.roomIcon} fas fa-store`}></i>
// //             </div>
// //             {room.name} {/* Assuming room has a name field */}
// //           </div>
// //         ))}
// //       </div>
// //       <div className={styles.chatBox}>
// //         <div className={styles.chatHeader}>
// //           <div className={styles.chatHeaderIconWrapper}>
// //             <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
// //           </div>
// //           {currentRoom ? `Room ID: ${currentRoom}` : 'Select a room'}
// //         </div>
// //         <div className={styles.chatMessages}>
// //           {messages.map((msg, index) => (
// //             <div key={index}>{msg.content}</div>
// //           ))}
// //           <div ref={chatEndRef} />
// //         </div>
// //         <form className={styles.messageForm} onSubmit={sendMessage}>
// //           <div className={styles.inputWrapper}>
// //             <input
// //               type="text"
// //               name="message"
// //               className={styles.messageInput}
// //               placeholder="메시지를 입력하세요."
// //             />
// //             <button type="submit" className={styles.sendButton}>
// //               전송
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chat;



















// import React, { useState, useEffect, useRef } from 'react';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';
// import styles from '../../styles/MyPage/Chat.module.css';

// const Chat = () => {
//   const [currentRoom, setCurrentRoom] = useState('Room 1');
//   const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
//   const [messages, setMessages] = useState([]); // State for messages
//   const chatEndRef = useRef(null);
//   const stompClient = useRef(null); // Reference for STOMP client

//   // Function to connect to the WebSocket
//   const connectWebSocket = () => {
//     const token = localStorage.getItem('token'); // Get your JWT token from local storage or wherever it's stored
//     const userNumber =localStorage.getItem('memberId')
//     console.log(token);
//     // const socket = new SockJS('http://localhost:8080/ws'); // Update URL as needed
//     const socket = new SockJS(`http://localhost:8080/ws/${currentRoom}/${userNumber}`);
//     console.log(currentRoom);
//     console.log(userNumber);

//     stompClient.current = new Client({
//         webSocketFactory: () => socket,
//         debug: (str) => { console.log(str); },
//         connectHeaders: {
//             Authorization: `Bearer ${token}` // Set the authorization header
//         },
//         onConnect: () => {
//             console.log('Connected to WebSocket');
//             console.log('Current room:', currentRoom);
//             stompClient.current.subscribe(`/topic/${currentRoom}`, (message) => {
//                 setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
//                 chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//             });
//         },
//         onStompError: (frame) => {
//             console.error('Broker error: ' + frame.headers['message']);
//             console.error(frame.body);
//         },
//     });

//     stompClient.current.activate();
// };

 

//   useEffect(() => {
//     connectWebSocket(); // Establish WebSocket connection on component mount

//     // Cleanup function to deactivate WebSocket on component unmount
//     return () => {
//       if (stompClient.current) {
//         stompClient.current.deactivate();
//       }
//     };
//   }, [currentRoom]); // Reconnect when currentRoom changes

//   const renderMessages = () => {
//     return (
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg.content}</div>
//         ))}
//       </div>
//     );
//   };

//   const sendMessage = (event) => {
//     event.preventDefault();
//     const input = event.target.elements.message;
//     const messageContent = input.value;

//     if (messageContent) {
//       stompClient.current.send(`/app/chat/${currentRoom}`, {}, JSON.stringify({ content: messageContent }));
//       input.value = ''; // Clear the input field
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.roomList}>
//         <div className={styles.roomListTitle}>대화 목록</div>
//         {rooms.map((room, index) => (
//           <div
//             key={index}
//             className={`${styles.room} ${currentRoom === room ? styles.activeRoom : ''}`}
//             onClick={() => setCurrentRoom(room)}
//           >
//             <div className={styles.roomIconWrapper}>
//               <i className={`${styles.roomIcon} fas fa-store`}></i>
//             </div>
//             {room}
//           </div>
//         ))}
//       </div>
//       <div className={styles.chatBox}>
//         <div className={styles.chatHeader}>
//           <div className={styles.chatHeaderIconWrapper}>
//             <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
//           </div>
//           {currentRoom}
//         </div>
//         <div className={styles.chatMessages}>
//           {renderMessages()}
//           <div ref={chatEndRef} />
//         </div>
//         <form className={styles.messageForm} onSubmit={sendMessage}>
//           <div className={styles.inputWrapper}>
//             <input
//               type="text"
//               name="message" // Add name attribute to access the input value
//               className={styles.messageInput}
//               placeholder="메시지를 입력하세요."
//             />
//             <div className={styles.inputIcons}>
//               <input
//                 id="fileInput"
//                 type="file"
//                 accept="image/*"
//                 className={styles.fileInput}
//               />
//               <label htmlFor="fileInput" className={styles.fileInputLabel}>
//                 <i className="fas fa-camera"></i>
//               </label>
//               <button type="submit" className={styles.sendButton}>
//                 전송
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chat;

















import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/MyPage/Chat.module.css';
import { getChatRooms, getMessages, sendMessage } from './ChatService'; // Assuming you create these service methods

const Chat = () => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [webSocket, setWebSocket] = useState(null);
  const chatEndRef = useRef(null);

  // Fetch chat rooms when component mounts
  useEffect(() => {
    const fetchChatRooms = async () => {
      const roomsData = await getChatRooms(); // API call to fetch chat rooms
      setRooms(roomsData);
      if (roomsData.length > 0) {
        setCurrentRoom(roomsData[0]); // Set the first room as default
      }
    };
    fetchChatRooms();
  }, []);

  // Open WebSocket connection when a room is selected
  useEffect(() => {
    if (currentRoom) {
      const ws = new WebSocket(`ws://localhost:8080/ws/chat/${currentRoom.roomId}/${currentRoom.userNumber}`);
      setWebSocket(ws);

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

      return () => {
        ws.close(); // Close the WebSocket when component unmounts or room changes
      };
    }
  }, [currentRoom]);

  // Fetch messages when the current room changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentRoom) {
        const messagesData = await getMessages(currentRoom.roomId); // API call to fetch messages
        setMessages(messagesData);
        scrollToBottom();
      }
    };
    fetchMessages();
  }, [currentRoom]);

  // Scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle message input change
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Send message to WebSocket server
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      const messageObj = {
        content: newMessage,
        type: 'message', // The message type for WebSocket
      };
      webSocket.send(JSON.stringify(messageObj));
      setNewMessage('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.roomList}>
        <div className={styles.roomListTitle}>대화 목록</div>
        {rooms.map((room, index) => (
          <div
            key={index}
            className={`${styles.room} ${currentRoom && currentRoom.roomId === room.roomId ? styles.activeRoom : ''}`}
            onClick={() => setCurrentRoom(room)}
          >
            <div className={styles.roomIconWrapper}>
              <i className={`${styles.roomIcon} fas fa-store`}></i>
            </div>
            {room.name} {/* Assuming each room has a 'name' */}
          </div>
        ))}
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderIconWrapper}>
            <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
          </div>
          {currentRoom?.name || 'No Room Selected'}
        </div>
        <div className={styles.chatMessages}>
          {messages.map((message, index) => (
            <div key={index} className={styles.message}>
              <span className={styles.sender}>{message.sender.name}: </span>
              <span className={styles.content}>{message.content}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form className={styles.messageForm} onSubmit={handleSendMessage}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.messageInput}
              placeholder="메시지를 입력하세요."
              value={newMessage}
              onChange={handleInputChange}
            />
            <div className={styles.inputIcons}>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className={styles.fileInput}
              />
              <label htmlFor="fileInput" className={styles.fileInputLabel}>
                <i className="fas fa-camera"></i>
              </label>
              <button type="submit" className={styles.sendButton}>
                전송
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
