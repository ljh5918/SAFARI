// import React, { useState, useEffect } from 'react';
// import styles from '../../styles/MyPage/Chat.module.css';

// const Chat = () => {
//   const [message, setMessage] = useState('');
//   const [currentRoom, setCurrentRoom] = useState('Room 1');
//   const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
//   const [messages, setMessages] = useState({});
//   const [image, setImage] = useState(null);
//   const [formattedDate, setFormattedDate] = useState('');

//   useEffect(() => {
//     const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
//     setMessages(savedMessages);
//     updateFormattedDate();
//   }, []);

//   useEffect(() => {
//     const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
//     setMessages(savedMessages);
//     updateFormattedDate();
//   }, [currentRoom]);

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//     handleSubmitImage(selectedImage);
//   };

//   const handleSubmitImage = (imageFile) => {
//     if (!imageFile) {
//       alert('이미지를 선택하세요.');
//       return;
//     }

//     const newMessages = { ...messages };
//     if (!newMessages[currentRoom]) {
//       newMessages[currentRoom] = [];
//     }
//     const now = new Date();
//     const time = formatTime(now);
//     const newMessage = { image: URL.createObjectURL(imageFile), sender: 'user', time };

//     newMessages[currentRoom].push(newMessage);
//     setMessages(newMessages);
//     setMessage(''); 
//     setImage(null); 
//     localStorage.setItem('messages', JSON.stringify(newMessages));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 메시지도 없고 이미지도 없는 경우
//     if (!message.trim() && !image) {
//       alert('메시지를 입력하세요.');
//       return;
//     }

//     const newMessages = { ...messages };
//     if (!newMessages[currentRoom]) {
//       newMessages[currentRoom] = [];
//     }
//     const now = new Date();
//     const time = formatTime(now);
//     const newMessage = { text: message, sender: 'user', time };

//     newMessages[currentRoom].push(newMessage);
//     setMessages(newMessages);
//     setMessage(''); 
//     localStorage.setItem('messages', JSON.stringify(newMessages));
//   };

//   const handleRoomChange = (room) => {
//     setCurrentRoom(room);
//   };

//     const getChatPartner = () => {
//     return currentRoom; // 방 이름을 상대방의 이름으로 사용
//   };

//   const formatTime = (time) => {
//     const hours = time.getHours();
//     const minutes = time.getMinutes().toString().padStart(2, '0');
//     const period = hours >= 12 ? '오후' : '오전';
//     const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
//     return `${period} ${formattedHours}:${minutes}`;
//   };

//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}년 ${month}월 ${day}일`;
//   };

//   const updateFormattedDate = () => {
//     const now = new Date();
//     const formatted = formatDate(now);
//     setFormattedDate(formatted);
//   };

//   const renderMessages = () => {
//     const messageList = messages[currentRoom] || [];
//     return messageList.map((msg, index) => {
//       const showTime =
//         index === messageList.length - 1 ||         // 마지막 메시지는 항상 시간 표시
//         msg.time !== messageList[index + 1]?.time;  // 다음 메시지와 시간 다를 때

//       return (
//         <div
//           key={index}
//           className={`${styles.message} ${msg.sender === 'user' ? styles.sent : styles.received}`}
//         >
//           <div className={`${styles.messageContent} ${msg.image ? styles.imageMessage : ''}`}>
//             {msg.text}
//             {msg.image && (
//               <img src={msg.image} alt="첨부 이미지" className={styles.messageImage} />
//             )}
//           </div>
//           {showTime && <div className={styles.messageTime}>{msg.time}</div>}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <div className={styles.roomList}>
//         <div className={styles.roomListTitle}>대화 목록</div>
//         {rooms.map((room, index) => (
//           <div
//             key={index}
//             className={`${styles.room} ${currentRoom === room ? styles.activeRoom : ''}`}
//             onClick={() => handleRoomChange(room)}
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
//           <div className={styles.dateSeparator}>
//             <hr className={styles.dateLine} />
//             <div className={styles.dateText}>{formattedDate}</div>
//             <hr className={styles.dateLine} />
//           </div>
//           {renderMessages()}
//         </div>
//         <form className={styles.messageForm} onSubmit={handleSubmit}>
//           <div className={styles.inputWrapper}>
//             <input
//               type="text"
//               className={styles.messageInput}
//               placeholder="메시지를 입력하세요."
//               value={message}
//               onChange={handleMessageChange}
//               disabled={image}  // 이미지가 선택된 경우 텍스트 입력 비활성화
//             />
//             <div className={styles.inputIcons}>
//               <input
//                 id="fileInput"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange} 
//                 className={styles.fileInput}
//                 disabled={message.trim()}  // 메시지가 입력된 경우 파일 선택 비활성화
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

const Chat = () => {
  const [message, setMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState('Room 1');
  const [rooms, setRooms] = useState(['Room 1', 'Room 2', 'Room 3']);
  const [messages, setMessages] = useState({});
  const [image, setImage] = useState(null);
  const chatEndRef = useRef(null); // Ref for scrolling

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || {};
    setMessages(savedMessages);
    scrollToBottom(); // Scroll to bottom when room changes
  }, [currentRoom]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    
    if (selectedImage) {
      handleSubmitImage(selectedImage); // Automatically send the image
    }
  };

  const handleSubmitImage = (imageFile) => {
    const newMessages = { ...messages };
    if (!newMessages[currentRoom]) {
      newMessages[currentRoom] = [];
    }
    const now = new Date();
    const time = formatTime(now);
    const newMessage = { image: URL.createObjectURL(imageFile), sender: 'user', time };

    newMessages[currentRoom].push(newMessage);
    setMessages(newMessages);
    setImage(null); // Clear image after sending
    localStorage.setItem('messages', JSON.stringify(newMessages));
    scrollToBottom(); // Scroll to bottom after sending message
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim() && !image) {
      alert('메시지를 입력하세요.');
      return;
    }

    const newMessages = { ...messages };
    if (!newMessages[currentRoom]) {
      newMessages[currentRoom] = [];
    }
    const now = new Date();
    const time = formatTime(now);
    const newMessage = { text: message, sender: 'user', time };

    newMessages[currentRoom].push(newMessage);
    setMessages(newMessages);
    setMessage(''); // Clear message input
    localStorage.setItem('messages', JSON.stringify(newMessages));
    scrollToBottom(); // Scroll to bottom after sending message
  };

  const handleRoomChange = (room) => {
    setCurrentRoom(room);
  };

  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${period} ${formattedHours}:${minutes}`;
  };

  const renderMessages = () => {
    const messageList = messages[currentRoom] || [];
    return messageList.map((msg, index) => {
      const showTime =
        index === messageList.length - 1 || // Last message always shows time
        msg.time !== messageList[index + 1]?.time; // Show time if different from next message

      return (
        <div
          key={index}
          className={`${styles.message} ${msg.sender === 'user' ? styles.sent : styles.received}`}
        >
          <div className={`${styles.messageContent} ${msg.image ? styles.imageMessage : ''}`}>
            {msg.text}
            {msg.image && (
              <img src={msg.image} alt="첨부 이미지" className={styles.messageImage} />
            )}
          </div>
          {showTime && <div className={styles.messageTime}>{msg.time}</div>}
        </div>
      );
    });
  };

  const scrollToBottom = () => {
    // Ensure that the last message/image is fully visible
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.roomList}>
        <div className={styles.roomListTitle}>대화 목록</div>
        {rooms.map((room, index) => (
          <div
            key={index}
            className={`${styles.room} ${currentRoom === room ? styles.activeRoom : ''}`}
            onClick={() => handleRoomChange(room)}
          >
            <div className={styles.roomIconWrapper}>
              <i className={`${styles.roomIcon} fas fa-store`}></i>
            </div>
            {room}
          </div>
        ))}
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderIconWrapper}>
            <i className={`${styles.chatHeaderIcon} fas fa-store`}></i>
          </div>
          {currentRoom}
        </div>
        <div className={styles.chatMessages}>
          {renderMessages()}
          <div ref={chatEndRef} /> {/* This div is used to scroll to the bottom */}
        </div>
        <form className={styles.messageForm} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.messageInput}
              placeholder="메시지를 입력하세요."
              value={message}
              onChange={handleMessageChange}
              disabled={image} // Disable text input if image is selected
            />
            <div className={styles.inputIcons}>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Automatically send image
                className={styles.fileInput}
                disabled={message.trim()} // Disable file input if message is entered
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
