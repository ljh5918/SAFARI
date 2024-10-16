// // // // // // // // // // // // // // // // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // // // // // import styles from '../../styles/MyPage/Chat.module.css';

// // // // // // // // // // // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // // // // // // // // // // //   const [message, setMessage] = useState('');
// // // // // // // // // // // // // // // // // // // // // // //   const [currentRoom, setCurrentRoom] = useState('Room 1');
// // // // // // // // // // // // // // // // // // // // // // //   const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
// // // // // // // // // // // // // // // // // // // // // // //   const [messages, setMessages] = useState({});
// // // // // // // // // // // // // // // // // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // // // // // // // // // // // // // // // // //   const chatEndRef = useRef(null); // Ref for scrolling
  

 
  

// // // // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // // // //     const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
// // // // // // // // // // // // // // // // // // // // // // //     setMessages(savedMessages);
// // // // // // // // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // // // //     const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
// // // // // // // // // // // // // // // // // // // // // // //     setMessages(savedMessages);
// // // // // // // // // // // // // // // // // // // // // // //     scrollToBottom(); // Scroll to bottom when room changes
// // // // // // // // // // // // // // // // // // // // // // //   }, [currentRoom]);

// // // // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // // // //     scrollToBottom(); // Scroll to bottom when messages change
// // // // // // // // // // // // // // // // // // // // // // //   }, [messages]);

// // // // // // // // // // // // // // // // // // // // // // //   const handleMessageChange = (e) => {
// // // // // // // // // // // // // // // // // // // // // // //     setMessage(e.target.value);
// // // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // // //   const handleImageChange = (e) => {
// // // // // // // // // // // // // // // // // // // // // // //     const selectedImage = e.target.files[0];
// // // // // // // // // // // // // // // // // // // // // // //     setImage(selectedImage);
    
// // // // // // // // // // // // // // // // // // // // // // //     if (selectedImage) {
// // // // // // // // // // // // // // // // // // // // // // //       handleSubmitImage(selectedImage); // Automatically send the image
// // // // // // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // // //   const handleSubmitImage = (imageFile) => {
// // // // // // // // // // // // // // // // // // // // // // //     const newMessages = { ...messages };
// // // // // // // // // // // // // // // // // // // // // // //     if (!newMessages[currentRoom]) {
// // // // // // // // // // // // // // // // // // // // // // //       newMessages[currentRoom] = [];
// // // // // // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // // // // // //     const now = new Date();
// // // // // // // // // // // // // // // // // // // // // // //     const time = formatTime(now);
// // // // // // // // // // // // // // // // // // // // // // //     const newMessage = { image: URL.createObjectURL(imageFile), sender: 'user', time };

// // // // // // // // // // // // // // // // // // // // // // //     newMessages[currentRoom].push(newMessage);
// // // // // // // // // // // // // // // // // // // // // // //     setMessages(newMessages);
// // // // // // // // // // // // // // // // // // // // // // //     setImage(null); // Clear image after sending
// // // // // // // // // // // // // // // // // // // // // // //     localStorage.setItem('messages', JSON.stringify(newMessages));
// // // // // // // // // // // // // // // // // // // // // // //     scrollToBottom(); // Scroll to bottom after sending message
// // // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // // //   const handleSubmit = (e) => {
// // // // // // // // // // // // // // // // // // // // // // //     e.preventDefault();

// // // // // // // // // // // // // // // // // // // // // // //     if (!message.trim() && !image) {
// // // // // // // // // // // // // // // // // // // // // // //       alert('메시지를 입력하세요.');
// // // // // // // // // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // // // // // // // //     const newMessages = { ...messages };
// // // // // // // // // // // // // // // // // // // // // // //     if (!newMessages[currentRoom]) {
// // // // // // // // // // // // // // // // // // // // // // //       newMessages[currentRoom] = [];
// // // // // // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // // // // // //     const now = new Date();
// // // // // // // // // // // // // // // // // // // // // // //     const time = formatTime(now);
// // // // // // // // // // // // // // // // // // // // // // //     const newMessage = { text: message, sender: 'user', time };

// // // // // // // // // // // // // // // // // // // // // // //     newMessages[currentRoom].push(newMessage);
// // // // // // // // // // // // // // // // // // // // // // //     setMessages(newMessages);
// // // // // // // // // // // // // // // // // // // // // // //     setMessage(''); // Clear message input
// // // // // // // // // // // // // // // // // // // // // // //     localStorage.setItem('messages', JSON.stringify(newMessages));
// // // // // // // // // // // // // // // // // // // // // // //     scrollToBottom(); // Scroll to bottom after sending message
// // // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // // //   const handleRoomChange = (room) => {
// // // // // // // // // // // // // // // // // // // // // // //     setCurrentRoom(room);
// // // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // // //   const formatTime = (time) => {
// // // // // // // // // // // // // // // // // // // // // // //     const hours = time.getHours();
// // // // // // // // // // // // // // // // // // // // // // //     const minutes = time.getMinutes().toString().padStart(2, '0');
// // // // // // // // // // // // // // // // // // // // // // //     const period = hours >= 12 ? '오후' : '오전';
// // // // // // // // // // // // // // // // // // // // // // //     const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
// // // // // // // // // // // // // // // // // // // // // // //     return `${period} ${formattedHours}:${minutes}`;
// // // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // // //   const renderMessages = () => {
// // // // // // // // // // // // // // // // // // // // // // //     const messageList = messages[currentRoom] || [];
// // // // // // // // // // // // // // // // // // // // // // //     return messageList.map((msg, index) => {
// // // // // // // // // // // // // // // // // // // // // // //       const showTime =
// // // // // // // // // // // // // // // // // // // // // // //         index === messageList.length - 1 || // Last message always shows time
// // // // // // // // // // // // // // // // // // // // // // //         msg.time !== messageList[index + 1]?.time; // Show time if different from next message

// // // // // // // // // // // // // // // // // // // // // // //       return (
// // // // // // // // // // // // // // // // // // // // // // //         <div
// // // // // // // // // // // // // // // // // // // // // // //           key={index}
// // // // // // // // // // // // // // // // // // // // // // //           className={`${styles.message} ${msg.sender === 'user' ? styles.sent : styles.received}`}
// // // // // // // // // // // // // // // // // // // // // // //         >
// // // // // // // // // // // // // // // // // // // // // // //           <div className={`${styles.messageContent} ${msg.image ? styles.imageMessage : ''}`}>
// // // // // // // // // // // // // // // // // // // // // // //             {msg.text}
// // // // // // // // // // // // // // // // // // // // // // //             {msg.image && (
// // // // // // // // // // // // // // // // // // // // // // //               <img src={msg.image} alt="첨부 이미지" className={styles.messageImage} />
// // // // // // // // // // // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // //           {showTime && <div className={styles.messageTime}>{msg.time}</div>}
// // // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // // //       );
// // // // // // // // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // // // // // // // // // // // // // // // //     // Ensure that the last message/image is fully visible
// // // // // // // // // // // // // // // // // // // // // // //     chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
// // // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // // //     <div className={styles.chatContainer}>
// // // // // // // // // // // // // // // // // // // // // // //       <div className={styles.roomList}>
// // // // // // // // // // // // // // // // // // // // // // //         <div className={styles.roomListTitle}>대화 목록</div>
// // // // // // // // // // // // // // // // // // // // // // //         {rooms.map((room, index) => (
// // // // // // // // // // // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // // // // // // // // // // //             key={index}
// // // // // // // // // // // // // // // // // // // // // // //             className={`${styles.room} ${currentRoom === room ? styles.activeRoom : ''}`}
// // // // // // // // // // // // // // // // // // // // // // //             onClick={() => handleRoomChange(room)}
// // // // // // // // // // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // // // // // // // // // //             <div className={styles.roomIconWrapper}>
// // // // // // // // // // // // // // // // // // // // // // //               <i className={`${styles.roomIcon} fas fa-store`}></i>
// // // // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // // // //             {room}
// // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // //       <div className={styles.chatBox}>
// // // // // // // // // // // // // // // // // // // // // // //         <div className={styles.chatHeader}>
// // // // // // // // // // // // // // // // // // // // // // //           <div className={styles.chatHeaderIconWrapper}>
// // // // // // // // // // // // // // // // // // // // // // //             <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
// // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // //           {currentRoom}
// // // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // // //         <div className={styles.chatMessages}>
// // // // // // // // // // // // // // // // // // // // // // //           {renderMessages()}
// // // // // // // // // // // // // // // // // // // // // // //           <div ref={chatEndRef} />
// // // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // // //         <form className={styles.messageForm} onSubmit={handleSubmit}>
// // // // // // // // // // // // // // // // // // // // // // //           <div className={styles.inputWrapper}>
// // // // // // // // // // // // // // // // // // // // // // //             <input
// // // // // // // // // // // // // // // // // // // // // // //               type="text"
// // // // // // // // // // // // // // // // // // // // // // //               className={styles.messageInput}
// // // // // // // // // // // // // // // // // // // // // // //               placeholder="메시지를 입력하세요."
// // // // // // // // // // // // // // // // // // // // // // //               value={message}
// // // // // // // // // // // // // // // // // // // // // // //               onChange={handleMessageChange}
// // // // // // // // // // // // // // // // // // // // // // //               disabled={image} 
// // // // // // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // // // // // //             <div className={styles.inputIcons}>
// // // // // // // // // // // // // // // // // // // // // // //               <input
// // // // // // // // // // // // // // // // // // // // // // //                 id="fileInput"
// // // // // // // // // // // // // // // // // // // // // // //                 type="file"
// // // // // // // // // // // // // // // // // // // // // // //                 accept="image/*"
// // // // // // // // // // // // // // // // // // // // // // //                 onChange={handleImageChange} 
// // // // // // // // // // // // // // // // // // // // // // //                 className={styles.fileInput}
// // // // // // // // // // // // // // // // // // // // // // //                 disabled={message.trim()} 
// // // // // // // // // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // // // // // // // // //               <label htmlFor="fileInput" className={styles.fileInputLabel}>
// // // // // // // // // // // // // // // // // // // // // // //                 <i className="fas fa-camera"></i>
// // // // // // // // // // // // // // // // // // // // // // //               </label>
// // // // // // // // // // // // // // // // // // // // // // //               <button type="submit" className={styles.sendButton}>
// // // // // // // // // // // // // // // // // // // // // // //                 전송
// // // // // // // // // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // // // // export default Chat;




















// // // // // // // // // // // // // // // // // // // // // // //ui
// // // // // // // // // // // // // // // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // // // // import styles from '../../styles/MyPage/Chat.module.css';

// // // // // // // // // // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // // // // // // // // // //   const [currentRoom, setCurrentRoom] = useState('Room 1');
// // // // // // // // // // // // // // // // // // // // // //   const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
// // // // // // // // // // // // // // // // // // // // // //   const chatEndRef = useRef(null);

// // // // // // // // // // // // // // // // // // // // // //   const renderMessages = () => {
// // // // // // // // // // // // // // // // // // // // // //     // Placeholder for rendering messages
// // // // // // // // // // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // // // // // // // // // //       <div>
// // // // // // // // // // // // // // // // // // // // // //         {/* Messages would be rendered here */}
// // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // //     <div className={styles.chatContainer}>
// // // // // // // // // // // // // // // // // // // // // //       <div className={styles.roomList}>
// // // // // // // // // // // // // // // // // // // // // //         <div className={styles.roomListTitle}>대화 목록</div>
// // // // // // // // // // // // // // // // // // // // // //         {rooms.map((room, index) => (
// // // // // // // // // // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // // // // // // // // // //             key={index}
// // // // // // // // // // // // // // // // // // // // // //             className={`${styles.room} ${currentRoom === room ? styles.activeRoom : ''}`}
// // // // // // // // // // // // // // // // // // // // // //             onClick={() => setCurrentRoom(room)}
// // // // // // // // // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // // // // // // // // //             <div className={styles.roomIconWrapper}>
// // // // // // // // // // // // // // // // // // // // // //               <i className={`${styles.roomIcon} fas fa-store`}></i>
// // // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // // //             {room}
// // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // //       <div className={styles.chatBox}>
// // // // // // // // // // // // // // // // // // // // // //         <div className={styles.chatHeader}>
// // // // // // // // // // // // // // // // // // // // // //           <div className={styles.chatHeaderIconWrapper}>
// // // // // // // // // // // // // // // // // // // // // //             <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
// // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // //           {currentRoom}
// // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // //         <div className={styles.chatMessages}>
// // // // // // // // // // // // // // // // // // // // // //           {renderMessages()}
// // // // // // // // // // // // // // // // // // // // // //           <div ref={chatEndRef} />
// // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // //         <form className={styles.messageForm}>
// // // // // // // // // // // // // // // // // // // // // //           <div className={styles.inputWrapper}>
// // // // // // // // // // // // // // // // // // // // // //             <input
// // // // // // // // // // // // // // // // // // // // // //               type="text"
// // // // // // // // // // // // // // // // // // // // // //               className={styles.messageInput}
// // // // // // // // // // // // // // // // // // // // // //               placeholder="메시지를 입력하세요."
// // // // // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // // // // //             <div className={styles.inputIcons}>
// // // // // // // // // // // // // // // // // // // // // //               <input
// // // // // // // // // // // // // // // // // // // // // //                 id="fileInput"
// // // // // // // // // // // // // // // // // // // // // //                 type="file"
// // // // // // // // // // // // // // // // // // // // // //                 accept="image/*"
// // // // // // // // // // // // // // // // // // // // // //                 className={styles.fileInput}
// // // // // // // // // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // // // // // // // // //               <label htmlFor="fileInput" className={styles.fileInputLabel}>
// // // // // // // // // // // // // // // // // // // // // //                 <i className="fas fa-camera"></i>
// // // // // // // // // // // // // // // // // // // // // //               </label>
// // // // // // // // // // // // // // // // // // // // // //               <button type="submit" className={styles.sendButton}>
// // // // // // // // // // // // // // // // // // // // // //                 전송
// // // // // // // // // // // // // // // // // // // // // //               </button>
// // // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // // // export default Chat;

















// // // 채팅 메세지 저장됨
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/MyPage/Chat.module.css';

const Chat = ({ roomId, memberId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  // Fetch all messages from the server when the component is mounted
  useEffect(() => {
    console.log('roomId:', roomId); // Debugging
     console.log('memberId:', memberId); // Debugging
    const fetchMessages = async () => {
      try {
        //채팅방의 메세지 가져옴
        const response = await fetch(`http://localhost:8080/chat/${roomId}/messages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data); // Set the messages from the server
        } else {
          console.error('Failed to fetch messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (roomId) {
      fetchMessages(); // Fetch messages when roomId is available
    }
  }, [roomId]);





  // WebSocket connection
  useEffect(() => {
    if (!roomId || !memberId) return;

    const token = localStorage.getItem('token');
    const socket = new WebSocket(`ws://localhost:8080/ws/${roomId}/${memberId}?token=${token}`);

    socket.onopen = () => {
        console.log(`Connected to WebSocket chat room: ${roomId}`);
        socketRef.current = socket;  // WebSocket을 성공적으로 설정한 후 저장
    };

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('Disconnected from WebSocket chat room');
    };

    return () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close();  // 연결이 성공적으로 설정된 경우에만 닫기
        }
    };
}, [roomId, memberId]);

  
  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      //채팅 메세지 전송
      const response = await fetch(`http://localhost:8080/chat/${roomId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
        },
        body: JSON.stringify({ content: newMessage, senderId: memberId }), // Send message and sender ID
      });

      if (response.ok) {
        const sentMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, sentMessage]);
        setNewMessage(''); // Clear the input field
      } else if (response.status === 401) {
        console.error('User is not authenticated');
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <span>{msg.senderId}: {msg.content}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className={styles.messageForm} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요."
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>전송</button>
      </form>
    </div>
  );
};

export default Chat;











// sockjs
// import React, { useState, useEffect, useRef } from 'react';
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
// import styles from '../../styles/MyPage/Chat.module.css';

// const Chat = ({ roomId, memberId }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const stompClientRef = useRef(null); // Reference for the STOMP client
//   const chatEndRef = useRef(null); // Reference to scroll to the bottom of the chat

//   // Fetch all messages from the server when the component is mounted
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/chat/${roomId}/messages`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setMessages(data); // Set the messages from the server
//         } else {
//           console.error('Failed to fetch messages:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     if (roomId) {
//       fetchMessages(); // Fetch messages when roomId is available
//     }
//   }, [roomId]);

//   // Connect to WebSocket with STOMP
//   const connectHandler = (roomId, memberId) => {
//     const token = localStorage.getItem('token');
    
//     // Initialize SockJS and STOMP client
//     const socket = new SockJS(`http://localhost:8080/ws/${roomId}/${memberId}`);
//     stompClientRef.current = Stomp.over(socket);

//     // Connect the client, passing the token in the headers
//     stompClientRef.current.connect(
//       {
//         Authorization: `Bearer ${token}`, // Add the JWT token to the headers
//       },
//       () => {
//         console.log('Connected to WebSocket chat room:', roomId);

//         // Subscribe to the chat room
//         stompClientRef.current.subscribe(`/topic/chat/${roomId}`, (message) => {
//           if (message.body) {
//             const newMessage = JSON.parse(message.body);
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//           }
//         });
//       },
//       (error) => {
//         console.error('Error connecting to WebSocket:', error);
//       }
//     );
//   };

//   // Handle sending a new message
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() === '') return;

//     try {
//       const messageObject = { content: newMessage, senderId: memberId };
//       if (stompClientRef.current && stompClientRef.current.connected) {
//         stompClientRef.current.send(`http://localhost:8080/chat/${roomId}/message`, {}, JSON.stringify(messageObject));
//         setNewMessage(''); // Clear the input field
//       } else {
//         console.error('STOMP client is not connected');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   // Scroll to the bottom of the chat when new messages arrive
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // Connect to the WebSocket when roomId and memberId are available
//   useEffect(() => {
//     if (roomId && memberId) {
//       connectHandler(roomId, memberId);
//     }
//   }, [roomId, memberId]);

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.chatMessages}>
//         {messages.map((msg, index) => (
//           <div key={index} className={styles.message}>
//             <span>{msg.senderId}: {msg.content}</span>
//           </div>
//         ))}
//         <div ref={chatEndRef} />
//       </div>
//       <form className={styles.messageForm} onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="메시지를 입력하세요."
//           className={styles.messageInput}
//         />
//         <button type="submit" className={styles.sendButton}>전송</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;





















// //채팅 메세지 저장됨
// // // // // // // // // // import React, { useState, useEffect, useRef } from 'react'; 
// // // // // // // // // // import styles from '../../styles/MyPage/Chat.module.css';

// // // // // // // // // // const Chat = ({ roomId, memberId, otherMemberId }) => { // otherMemberId 추가
// // // // // // // // // //   const [messages, setMessages] = useState([]);
// // // // // // // // // //   const [newMessage, setNewMessage] = useState('');
// // // // // // // // // //   const socketRef = useRef(null);
// // // // // // // // // //   const chatEndRef = useRef(null);

// // // // // // // // // //   // Fetch all messages from the server when the component is mounted
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     console.log('roomId:', roomId); // Debugging
// // // // // // // // // //     console.log('memberId:', memberId); // Debugging
// // // // // // // // // //     const fetchMessages = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         const response = await fetch(`http://localhost:8080/chat/${roomId}/messages`, {
// // // // // // // // // //           method: 'GET',
// // // // // // // // // //           headers: {
// // // // // // // // // //             'Content-Type': 'application/json',
// // // // // // // // // //             'Accept': 'application/json',  // Explicitly set Accept header
// // // // // // // // // //             Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
// // // // // // // // // //           },
// // // // // // // // // //         });
    
// // // // // // // // // //         if (response.ok) {
// // // // // // // // // //           const data = await response.json();
// // // // // // // // // //           setMessages(data); // Set the messages from the server
// // // // // // // // // //         } else {
// // // // // // // // // //           console.error('Failed to fetch messages:', response.statusText);
// // // // // // // // // //         }
// // // // // // // // // //       } catch (error) {
// // // // // // // // // //         console.error('Error fetching messages:', error);
// // // // // // // // // //       }
// // // // // // // // // //     };
    

// // // // // // // // // //     if (roomId) {
// // // // // // // // // //       fetchMessages(); // Fetch messages when roomId is available
// // // // // // // // // //     }
// // // // // // // // // //   }, [roomId]);

// // // // // // // // // //   // WebSocket connection
// // // // // // // // // //   // useEffect(() => {
// // // // // // // // // //   //   if (!roomId || !memberId) return;
  
// // // // // // // // // //   //   const token = localStorage.getItem('token');
    
// // // // // // // // // //   //   if (!token) {
// // // // // // // // // //   //     console.error("JWT token is missing!");
// // // // // // // // // //   //     return;
// // // // // // // // // //   //   }
  
// // // // // // // // // //   //   const socketUrl = `ws://localhost:8080/ws/${roomId}/${memberId}?token=${token}`;
  
// // // // // // // // // //   //   const socket = new WebSocket(socketUrl);
  
// // // // // // // // // //   //   socket.onopen = () => {
// // // // // // // // // //   //     console.log(`Connected to WebSocket chat room: ${roomId}`);
// // // // // // // // // //   //   };
  
// // // // // // // // // //   //   socket.onmessage = (event) => {
// // // // // // // // // //   //     const message = JSON.parse(event.data);
// // // // // // // // // //   //     setMessages((prevMessages) => [...prevMessages, message]);
// // // // // // // // // //   //   };
  
// // // // // // // // // //   //   socket.onclose = (event) => {
// // // // // // // // // //   //     console.log('WebSocket closed:', event.code, event.reason);
// // // // // // // // // //   //   };
  
// // // // // // // // // //   //   socketRef.current = socket;
  
// // // // // // // // // //   //   return () => {
// // // // // // // // // //   //     socket.close();
// // // // // // // // // //   //   };
// // // // // // // // // //   // }, [roomId, memberId]);
  

// // // // // // // // // //   // Handle sending a new message
// // // // // // // // // //   const handleSendMessage = async (e) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     if (newMessage.trim() === '') return;
  
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await fetch(`http://localhost:8080/chat/${roomId}/message`, {
// // // // // // // // // //         method: 'POST',
// // // // // // // // // //         headers: {
// // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // //           'Accept': 'application/json',  // Explicitly set Accept header
// // // // // // // // // //           Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
// // // // // // // // // //         },
// // // // // // // // // //         body: JSON.stringify({ content: newMessage, senderId: memberId }), // Send message and sender ID
// // // // // // // // // //       });
  
// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         const sentMessage = await response.json();
// // // // // // // // // //         setMessages((prevMessages) => [...prevMessages, sentMessage]);
// // // // // // // // // //         setNewMessage(''); // Clear the input field
// // // // // // // // // //       } else if (response.status === 401) {
// // // // // // // // // //         console.error('User is not authenticated');
// // // // // // // // // //       } else {
// // // // // // // // // //         console.error('Failed to send message:', response.statusText);
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Error sending message:', error);
// // // // // // // // // //     }
// // // // // // // // // //   };
  

// // // // // // // // // //   // Scroll to the bottom of the chat when new messages arrive
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (chatEndRef.current) {
// // // // // // // // // //       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
// // // // // // // // // //     }
// // // // // // // // // //   }, [messages]);

// // // // // // // // // //   return (
// // // // // // // // // //     <div className={styles.chatContainer}>
// // // // // // // // // //       <div className={styles.chatMessages}>
// // // // // // // // // //         {messages.map((msg, index) => (
// // // // // // // // // //           <div key={index} className={`${styles.message} ${msg.senderId === memberId ? styles.myMessage : styles.otherMessage}`}>
// // // // // // // // // //             <span>{msg.senderId === memberId ? '나' : otherMemberId}: {msg.content}</span>
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //         <div ref={chatEndRef} />
// // // // // // // // // //       </div>
// // // // // // // // // //       <form className={styles.messageForm} onSubmit={handleSendMessage}>
// // // // // // // // // //         <input
// // // // // // // // // //           type="text"
// // // // // // // // // //           value={newMessage}
// // // // // // // // // //           onChange={(e) => setNewMessage(e.target.value)}
// // // // // // // // // //           placeholder="메시지를 입력하세요."
// // // // // // // // // //           className={styles.messageInput}
// // // // // // // // // //         />
// // // // // // // // // //         <button type="submit" className={styles.sendButton}>전송</button>
// // // // // // // // // //       </form>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Chat;






































































// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const ChatRoom = ({ memberId, roomId, jwtToken }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const webSocket = useRef(null);

//   // WebSocket 연결 및 설정
//   useEffect(() => {
//     const jwtToken = localStorage.getItem('token'); 
//     console.log('roomId:', roomId); // Debugging
//         console.log('memberId:', memberId); // Debugging
//     console.log('token',jwtToken)
//     // WebSocket 연결 URL
//     const webSocketUrl = `ws://localhost:8080/ws/${roomId}/${memberId}`; // userNumber는 사용자 번호

//     // WebSocket 설정
//     webSocket.current = new WebSocket(webSocketUrl, [], {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     });

//     // WebSocket 연결이 열렸을 때
//     webSocket.current.onopen = () => {
//       console.log("WebSocket 연결됨");
//     };

//     // WebSocket으로부터 메시지를 받을 때
//     webSocket.current.onmessage = (messageEvent) => {
//       const message = JSON.parse(messageEvent.data);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     // WebSocket 연결이 닫혔을 때
//     webSocket.current.onclose = () => {
//       console.log("WebSocket 연결 종료");
//     };
//     webSocket.current.onerror = (error) => {
//       console.error('WebSocket error:', error);
//   };

//     // 컴포넌트가 언마운트 될 때 WebSocket 연결 종료
//     return () => {
//       if (webSocket.current) {
//         webSocket.current.close();
//       }
//     };
//   }, [roomId, jwtToken,memberId]);

//   // 메시지 전송
//   const sendMessage = () => {
//     if (inputMessage.trim() !== "" && webSocket.current) {
//       const messagePayload = {
//         content: inputMessage,
//         type: "message",
//       };
//       webSocket.current.send(JSON.stringify(messagePayload));
//       setInputMessage("");
//     }
//   };

//   // 메시지 입력 핸들러
//   const handleInputChange = (e) => {
//     setInputMessage(e.target.value);
//   };

//   return (
//     <div>
//       <h2>Chat Room</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.senderName}</strong>: {msg.content}
//           </p>
//         ))}
//       </div>

//       <input
//         type="text"
//         value={inputMessage}
//         onChange={handleInputChange}
//         placeholder="메시지를 입력하세요"
//       />
//       <button onClick={sendMessage}>메시지 전송</button>
//     </div>
//   );
// };
// export default ChatRoom;











