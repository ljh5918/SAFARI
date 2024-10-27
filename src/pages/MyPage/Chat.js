// import React, { useEffect, useRef, useState } from 'react';
// import styles from '../../styles/MyPage/Chat.module.css';

// const Message = ({ message, isSent }) => {
//   const formattedTime = message.sendTime
//     ? new Date(message.sendTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     : '';

//   return (
//     <div className={`${styles.messageWrapper} ${isSent ? styles.sentWrapper : styles.receivedWrapper}`}>
//       {isSent ? (
//         <>
//           <span className={styles.sentTime}>{formattedTime}</span>
//           <div className={`${styles.message} ${styles.sent}`}>
//             <div className={styles.messageContent}>
//               <p>{message.content}</p>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className={`${styles.message} ${styles.received}`}>
//             <div className={styles.messageContent}>
//               <p>{message.content}</p>
//             </div>
//           </div>
//           <span className={styles.receivedTime}>{formattedTime}</span>
//         </>
//       )}
//     </div>
//   );
// };

// const MessageList = ({ messages }) => {
//   const memberId = localStorage.getItem("memberId");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   return (
//     <div className={styles.chatMessages}>
//       {messages.map((message, index) => (
//         <Message
//           key={index}
//           message={message}
//           isSent={parseInt(message.senderId) === parseInt(memberId)}
//         />
//       ))}
//       <div ref={messagesEndRef} />
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

// const Chat = ({ messages, messageInput, setMessageInput, sendMessage, modalOpen, productTitle }) => {
//   const chatRef = useRef(null);
//   const isDragging = useRef(false);
//   const offset = useRef({ x: 0, y: 0 });
//   const [isVisible, setIsVisible] = useState(true); // State to manage visibility

//   const handleMouseDown = (e) => {
//     isDragging.current = true;
//     offset.current = {
//       x: e.clientX - chatRef.current.getBoundingClientRect().left,
//       y: e.clientY - chatRef.current.getBoundingClientRect().top,
//     };
//   };

//   const handleMouseUp = () => {
//     isDragging.current = false;
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging.current) {
//       chatRef.current.style.left = `${e.clientX - offset.current.x}px`;
//       chatRef.current.style.top = `${e.clientY - offset.current.y}px`;
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Escape') {
//       setIsVisible(false); // Hide the chat when Esc is pressed
//     }
//   };

//   useEffect(() => {
//     const chatElement = chatRef.current;

//     if (chatElement) {
//       chatElement.addEventListener('mousedown', handleMouseDown);
//       window.addEventListener('mouseup', handleMouseUp);
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('keydown', handleKeyDown); // Add keydown listener
//     }

//     return () => {
//       if (chatElement) {
//         chatElement.removeEventListener('mousedown', handleMouseDown);
//       }
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('keydown', handleKeyDown); // Clean up listener
//     };
//   }, []);

//   if (!isVisible) return null; // Hide the chat if isVisible is false

//   return (
//     <div
//       className={styles.chatContainer}
//       style={{ overflowY: modalOpen ? 'hidden' : 'auto' }}
//       ref={chatRef}
//     >
//       <h2 className={styles.chatTitle}> {productTitle}</h2>
//       <div className={styles.chatMessages}>
//         <MessageList messages={messages} />
//       </div>
//       <InputArea messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
//     </div>
//   );
// };

// export default Chat;

























//채팅방 동시입장
import React, { useEffect, useRef, useState } from 'react';
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
            <div className={styles.messageContent}>
              <p>{message.content}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.message} ${styles.received}`}>
            <div className={styles.messageContent}>
              <p>{message.content}</p>
            </div>
          </div>
          <span className={styles.receivedTime}>{formattedTime}</span>
        </>
      )}
    </div>
  );
};

const MessageList = ({ messages }) => {
  const memberId = localStorage.getItem('memberId');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.chatMessages}>
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          isSent={parseInt(message.senderId) === parseInt(memberId)}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const InputArea = ({ messageInput, setMessageInput, sendMessage }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(messageInput);
      setMessageInput(''); // Clear the input after sending the message
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        className={styles.messageInput}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyPress={handleKeyPress} // Handle Enter key press
        placeholder="Type a message..."
      />
      <button
        className={styles.sendButton}
        onClick={() => {
          sendMessage(messageInput);
          setMessageInput(''); // Clear the input after sending the message
        }}
      >
        Send
      </button>
    </div>
  );
};

const Chat = ({ roomId, messages, sendMessage, productTitle }) => {
  const [messageInput, setMessageInput] = useState('');

  return (
    <div className={styles.chatContainer}>
      <h3 className={styles.productTitle}>{productTitle}</h3>
      <MessageList messages={messages} />
      <InputArea messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
