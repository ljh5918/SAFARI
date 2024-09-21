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
          <div ref={chatEndRef} />
        </div>
        <form className={styles.messageForm} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.messageInput}
              placeholder="메시지를 입력하세요."
              value={message}
              onChange={handleMessageChange}
              disabled={image} 
            />
            <div className={styles.inputIcons}>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange} 
                className={styles.fileInput}
                disabled={message.trim()} 
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