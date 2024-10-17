// // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // import styles from '../../styles/MyPage/Chat.module.css';

// // // // // // // // const Chat = () => {
// // // // // // // //   const [message, setMessage] = useState('');
// // // // // // // //   const [currentRoom, setCurrentRoom] = useState('Room 1');
// // // // // // // //   const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
// // // // // // // //   const [messages, setMessages] = useState({});
// // // // // // // //   const [image, setImage] = useState(null);
// // // // // // // //   const chatEndRef = useRef(null); // Ref for scrolling
  

 
  

// // // // // // // //   useEffect(() => {
// // // // // // // //     const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
// // // // // // // //     setMessages(savedMessages);
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
// // // // // // // //     setMessages(savedMessages);
// // // // // // // //     scrollToBottom(); // Scroll to bottom when room changes
// // // // // // // //   }, [currentRoom]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     scrollToBottom(); // Scroll to bottom when messages change
// // // // // // // //   }, [messages]);

// // // // // // // //   const handleMessageChange = (e) => {
// // // // // // // //     setMessage(e.target.value);
// // // // // // // //   };

// // // // // // // //   const handleImageChange = (e) => {
// // // // // // // //     const selectedImage = e.target.files[0];
// // // // // // // //     setImage(selectedImage);
    
// // // // // // // //     if (selectedImage) {
// // // // // // // //       handleSubmitImage(selectedImage); // Automatically send the image
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSubmitImage = (imageFile) => {
// // // // // // // //     const newMessages = { ...messages };
// // // // // // // //     if (!newMessages[currentRoom]) {
// // // // // // // //       newMessages[currentRoom] = [];
// // // // // // // //     }
// // // // // // // //     const now = new Date();
// // // // // // // //     const time = formatTime(now);
// // // // // // // //     const newMessage = { image: URL.createObjectURL(imageFile), sender: 'user', time };

// // // // // // // //     newMessages[currentRoom].push(newMessage);
// // // // // // // //     setMessages(newMessages);
// // // // // // // //     setImage(null); // Clear image after sending
// // // // // // // //     localStorage.setItem('messages', JSON.stringify(newMessages));
// // // // // // // //     scrollToBottom(); // Scroll to bottom after sending message
// // // // // // // //   };

// // // // // // // //   const handleSubmit = (e) => {
// // // // // // // //     e.preventDefault();

// // // // // // // //     if (!message.trim() && !image) {
// // // // // // // //       alert('메시지를 입력하세요.');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const newMessages = { ...messages };
// // // // // // // //     if (!newMessages[currentRoom]) {
// // // // // // // //       newMessages[currentRoom] = [];
// // // // // // // //     }
// // // // // // // //     const now = new Date();
// // // // // // // //     const time = formatTime(now);
// // // // // // // //     const newMessage = { text: message, sender: 'user', time };

// // // // // // // //     newMessages[currentRoom].push(newMessage);
// // // // // // // //     setMessages(newMessages);
// // // // // // // //     setMessage(''); // Clear message input
// // // // // // // //     localStorage.setItem('messages', JSON.stringify(newMessages));
// // // // // // // //     scrollToBottom(); // Scroll to bottom after sending message
// // // // // // // //   };

// // // // // // // //   const handleRoomChange = (room) => {
// // // // // // // //     setCurrentRoom(room);
// // // // // // // //   };

// // // // // // // //   const formatTime = (time) => {
// // // // // // // //     const hours = time.getHours();
// // // // // // // //     const minutes = time.getMinutes().toString().padStart(2, '0');
// // // // // // // //     const period = hours >= 12 ? '오후' : '오전';
// // // // // // // //     const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
// // // // // // // //     return `${period} ${formattedHours}:${minutes}`;
// // // // // // // //   };

// // // // // // // //   const renderMessages = () => {
// // // // // // // //     const messageList = messages[currentRoom] || [];
// // // // // // // //     return messageList.map((msg, index) => {
// // // // // // // //       const showTime =
// // // // // // // //         index === messageList.length - 1 || // Last message always shows time
// // // // // // // //         msg.time !== messageList[index + 1]?.time; // Show time if different from next message

// // // // // // // //       return (
// // // // // // // //         <div
// // // // // // // //           key={index}
// // // // // // // //           className={`${styles.message} ${msg.sender === 'user' ? styles.sent : styles.received}`}
// // // // // // // //         >
// // // // // // // //           <div className={`${styles.messageContent} ${msg.image ? styles.imageMessage : ''}`}>
// // // // // // // //             {msg.text}
// // // // // // // //             {msg.image && (
// // // // // // // //               <img src={msg.image} alt="첨부 이미지" className={styles.messageImage} />
// // // // // // // //             )}
// // // // // // // //           </div>
// // // // // // // //           {showTime && <div className={styles.messageTime}>{msg.time}</div>}
// // // // // // // //         </div>
// // // // // // // //       );
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const scrollToBottom = () => {
// // // // // // // //     // Ensure that the last message/image is fully visible
// // // // // // // //     chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className={styles.chatContainer}>
// // // // // // // //       <div className={styles.roomList}>
// // // // // // // //         <div className={styles.roomListTitle}>대화 목록</div>
// // // // // // // //         {rooms.map((room, index) => (
// // // // // // // //           <div
// // // // // // // //             key={index}
// // // // // // // //             className={`${styles.room} ${currentRoom === room ? styles.activeRoom : ''}`}
// // // // // // // //             onClick={() => handleRoomChange(room)}
// // // // // // // //           >
// // // // // // // //             <div className={styles.roomIconWrapper}>
// // // // // // // //               <i className={`${styles.roomIcon} fas fa-store`}></i>
// // // // // // // //             </div>
// // // // // // // //             {room}
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>
// // // // // // // //       <div className={styles.chatBox}>
// // // // // // // //         <div className={styles.chatHeader}>
// // // // // // // //           <div className={styles.chatHeaderIconWrapper}>
// // // // // // // //             <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
// // // // // // // //           </div>
// // // // // // // //           {currentRoom}
// // // // // // // //         </div>
// // // // // // // //         <div className={styles.chatMessages}>
// // // // // // // //           {renderMessages()}
// // // // // // // //           <div ref={chatEndRef} />
// // // // // // // //         </div>
// // // // // // // //         <form className={styles.messageForm} onSubmit={handleSubmit}>
// // // // // // // //           <div className={styles.inputWrapper}>
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               className={styles.messageInput}
// // // // // // // //               placeholder="메시지를 입력하세요."
// // // // // // // //               value={message}
// // // // // // // //               onChange={handleMessageChange}
// // // // // // // //               disabled={image} 
// // // // // // // //             />
// // // // // // // //             <div className={styles.inputIcons}>
// // // // // // // //               <input
// // // // // // // //                 id="fileInput"
// // // // // // // //                 type="file"
// // // // // // // //                 accept="image/*"
// // // // // // // //                 onChange={handleImageChange} 
// // // // // // // //                 className={styles.fileInput}
// // // // // // // //                 disabled={message.trim()} 
// // // // // // // //               />
// // // // // // // //               <label htmlFor="fileInput" className={styles.fileInputLabel}>
// // // // // // // //                 <i className="fas fa-camera"></i>
// // // // // // // //               </label>
// // // // // // // //               <button type="submit" className={styles.sendButton}>
// // // // // // // //                 전송
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </form>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Chat;






















// // // // // // // // // // // import React from 'react';
// // // // // // // // // // // import styles from '../../styles/MyPage/Chat.module.css';



// // // // // // // // // // // const Chat = ({ roomId, messages, messageInput, setMessageInput, sendMessage }) => {
// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className={styles.chatContainer}>
// // // // // // // // // // //       <div className={styles.chatMessages}>
// // // // // // // // // // //         {messages.map((message, index) => (
// // // // // // // // // // //           <div key={index} className={styles.message}>
// // // // // // // // // // //             {/* Conditional class for sent/received messages */}
// // // // // // // // // // //             <div className={`${styles.messageContent} ${message.senderId === localStorage.getItem("memberId") ? styles.sent : styles.received}`}>
// // // // // // // // // // //               <p>{message.content}</p>
// // // // // // // // // // //               <span className={styles.messageTime}>{message.timestamp}</span>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ))}
// // // // // // // // // // //       </div>
// // // // // // // // // // //       <div className={styles.inputWrapper}>
// // // // // // // // // // //         <input
// // // // // // // // // // //           type="text"
// // // // // // // // // // //           className={styles.messageInput}
// // // // // // // // // // //           value={messageInput}
// // // // // // // // // // //           onChange={(e) => setMessageInput(e.target.value)}
// // // // // // // // // // //           placeholder="Type a message..."
// // // // // // // // // // //         />
// // // // // // // // // // //         <button className={styles.sendButton} onClick={sendMessage}>Send</button>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Chat;




























// // // // // import React from 'react';
// // // // // import styles from '../../styles/MyPage/Chat.module.css';

// // // // // const Message = ({ message, isSent }) => {
// // // // //   return (
// // // // //     <div className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
// // // // //       <div className={styles.messageContent}>
// // // // //         <p>{message.content}</p>
// // // // //         <span className={styles.messageTime}>{message.timestamp}</span>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const MessageList = ({ messages }) => {
// // // // //   return (
// // // // //     <div className={styles.chatMessages}>
// // // // //       {messages.map((message, index) => (
// // // // //         <Message
// // // // //           key={index}
// // // // //           message={message}
// // // // //           isSent={message.senderId === localStorage.getItem("memberId")}
// // // // //         />
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const InputArea = ({ messageInput, setMessageInput, sendMessage }) => {
// // // // //   return (
// // // // //     <div className={styles.inputWrapper}>
// // // // //       <input
// // // // //         type="text"
// // // // //         className={styles.messageInput}
// // // // //         value={messageInput}
// // // // //         onChange={(e) => setMessageInput(e.target.value)}
// // // // //         placeholder="Type a message..."
// // // // //       />
// // // // //       <button className={styles.sendButton} onClick={sendMessage}>
// // // // //         Send
// // // // //       </button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const Chat = ({ roomId, messages, messageInput, setMessageInput, sendMessage }) => {
// // // // //   return (
// // // // //     <div className={styles.chatContainer}>
// // // // //       <h2 className={styles.chatTitle}>Chat Room: {roomId}</h2>
// // // // //       <MessageList messages={messages} />
// // // // //       <InputArea messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Chat;
























// // // import React from 'react';
// // // import styles from '../../styles/MyPage/Chat.module.css';

// // // const Message = ({ message, isSent }) => {
// // //   return (
// // //     <div className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
// // //       <div className={styles.messageContent}>
// // //         <p>{message.content}</p>
// // //         <span className={styles.messageTime}>{message.timestamp}</span>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const MessageList = ({ messages }) => {
// // //   return (
// // //     <div className={styles.chatMessages}>
// // //       {messages.map((message, index) => (
// // //         <Message
// // //           key={index}
// // //           message={message}
// // //           isSent={message.senderId === localStorage.getItem("memberId")}
// // //         />
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // const InputArea = ({ messageInput, setMessageInput, sendMessage }) => {
// // //   return (
// // //     <div className={styles.inputWrapper}>
// // //       <input
// // //         type="text"
// // //         className={styles.messageInput}
// // //         value={messageInput}
// // //         onChange={(e) => setMessageInput(e.target.value)}
// // //         placeholder="Type a message..."
// // //       />
// // //       <button className={styles.sendButton} onClick={sendMessage}>
// // //         Send
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // const Chat = ({ roomId, messages, messageInput, setMessageInput, sendMessage }) => {
// // //   return (
// // //     <div className={styles.chatContainer}>
// // //       <h2 className={styles.chatTitle}>Chat Room: {roomId}</h2>
// // //       <MessageList messages={messages} />
// // //       <InputArea messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
// // //     </div>
// // //   );
// // // };

// // // export default Chat;






















// // import React from 'react';
// // import styles from '../../styles/MyPage/Chat.module.css';

// // const Message = ({ message, isSent }) => {
// //   return (
// //     <div className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
// //       <div className={styles.messageContent}>
// //       <p>{message.content}</p>
// //         <span className={styles.messageTime}>{message.timestamp}</span>
// //       </div>
// //     </div>
// //   );
// // };

// // const MessageList = ({ messages }) => {
// //   return (
// //     <div className={styles.chatMessages}>
// //       {messages.map((message, index) => (
// //         <Message
// //           key={index}
// //           message={message}
// //           isSent={message.senderId === localStorage.getItem("memberId")}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // const InputArea = ({ messageInput, setMessageInput, sendMessage }) => {
// //   return (
// //     <div className={styles.inputWrapper}>
// //       <input
// //         type="text"
// //         className={styles.messageInput}
// //         value={messageInput}
// //         onChange={(e) => setMessageInput(e.target.value)}
// //         placeholder="Type a message..."
// //       />
// //       <button className={styles.sendButton} onClick={sendMessage}>
// //         Send
// //       </button>
// //     </div>
// //   );
// // };

// // const Chat = ({ roomId, messages, messageInput, setMessageInput, sendMessage }) => {
// //   return (
// //     <div className={styles.chatContainer}>
// //       <h2 className={styles.chatTitle}>Chat Room: {roomId}</h2>
// //       <MessageList messages={messages} />
// //       <InputArea messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
// //     </div>
// //   );
// // };

// // export default Chat;




















// import React from 'react';
// import styles from '../../styles/MyPage/Chat.module.css';

// const Message = ({ message, isSent }) => {
//   return (
//     <div className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
//       <div className={styles.messageContent}>
//         <p>{message.content}</p>
//         <span className={styles.messageTime}>{message.timestamp}</span>
//       </div>
//     </div>
//   );
// };





// const MessageList = ({ messages }) => {
//   const memberId = localStorage.getItem("memberId"); // 로컬 스토리지에서 memberId 가져오기
//   console.log("메세지 받는 사람:", memberId);

//   return (
//     <div className={styles.chatMessages}>
//       {messages.map((message, index) => {
//         console.log("메세지 보내는 사람 : ", message.senderId); // message에서 senderId를 가져옴
//         return (
//           <Message
//             key={index}
//             message={message}
//             isSent={message.senderId === memberId} // 발신자와 수신자 구분
//           />
//         );
//       })}
//     </div>
//   );
// };




// const InputArea = ({ messageInput, setMessageInput, sendMessage }) => {
//   return (
//     <div className={styles.inputWrapper}>
//       <input
//         type="text"
//         className={styles.messageInput}
//         value={messageInput}
//         onChange={(e) => setMessageInput(e.target.value)}
//         placeholder="Type a message..."
//       />
//       <button className={styles.sendButton} onClick={sendMessage}>
//         Send
//       </button>
//     </div>
//   );
// };

// const Chat = ({ roomId, messages, messageInput, setMessageInput, sendMessage }) => {
//   return (
//     <div className={styles.chatContainer}>
//       <h2 className={styles.chatTitle}>Chat Room: {roomId}</h2>
//       <MessageList messages={messages} />
//       <InputArea messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
//     </div>
//   );
// };

// export default Chat;















import React from 'react';
import styles from '../../styles/MyPage/Chat.module.css';

const Message = ({ message, isSent }) => {
  return (
    <div className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
      <div className={styles.messageContent}>
        <p>{message.content}</p>
        <span className={styles.messageTime}>{message.timestamp}</span>
      </div>
    </div>
  );
};

// const MessageList = ({ messages }) => {
//   const memberId = localStorage.getItem("memberId"); // 로컬 스토리지에서 memberId 가져오기
//   console.log("로그인한 계정 memberid:", memberId);

//   return (
//     <div className={styles.chatMessages}>
//       {messages.map((message, index) => {
//         console.log("메세지 보내는 사람 senderid: ", message.senderId); // message에서 senderId를 가져옴
//         return (
//           <Message
//             key={index}
//             message={message}
//             isSent={message.senderId === memberId} // senderId가 memberId와 같으면 오른쪽, 아니면 왼쪽
//           />
//         );
//       })}
//     </div>
//   );
// };




const MessageList = ({ messages }) => {
  const memberId = localStorage.getItem("memberId"); // 로컬 스토리지에서 memberId 가져오기

  return (
    <div className={styles.chatMessages}>
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          isSent={message.senderId === memberId} // senderId와 memberId 비교
        />
      ))}
    </div>
  );
};


const InputArea = ({ messageInput, setMessageInput, sendMessage }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={styles.messageInput}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button className={styles.sendButton} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

const Chat = ({ roomId, messages, messageInput, setMessageInput, sendMessage }) => {
  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatTitle}>Chat Room: {roomId}</h2>
      <MessageList messages={messages} />
      <InputArea messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
