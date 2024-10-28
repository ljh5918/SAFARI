import React, { useEffect, useRef } from 'react';
import styles from '../../styles/MyPage/Chat.module.css';

const Message = ({ message, isSent }) => {
  const formattedTime = message.sendTime
    ? new Date(message.sendTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`${styles.messageWrapper} ${isSent ? styles.sentWrapper : styles.receivedWrapper}`}>
      {isSent ? (
        <>
          <span className={styles.sentTime}>{formattedTime}</span>
          <div className={`${styles.message} ${styles.sent}`}>
            <p>{message.content}</p>
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.message} ${styles.received}`}>
            <p>{message.content}</p>
          </div>
          <span className={styles.receivedTime}>{formattedTime}</span>
        </>
      )}
    </div>
  );
};

const MessageList = ({ messages }) => {
  const memberId = localStorage.getItem("memberId");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatMessages}>
      {messages.map((message, index) => (
        <Message key={index} message={message} isSent={parseInt(message.senderId) === parseInt(memberId)} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const InputArea = ({ messageInput, setMessageInput, sendMessage }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      if (messageInput.trim()) { 
        sendMessage();
        setMessageInput(''); 
      }
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={styles.messageInput}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={handleKeyDown} 
        placeholder="메시지를 입력하세요..."
      />
      <button className={styles.sendButton} onClick={sendMessage}>
        전송
      </button>
    </div>
  );
};


const Chat = ({ messages, messageInput, setMessageInput, sendMessage, productTitle }) => {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatTitle}> {productTitle} </div> {/* Add title here */}
      <MessageList messages={messages} />
      <InputArea messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;





















