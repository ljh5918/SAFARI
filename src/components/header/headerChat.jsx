// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import Modal from "../chat/Modal";
// // // import Chat from "../../pages/MyPage/Chat";
// // // import styles from '../../styles/header/Header.module.css';

// // // const HeaderChat = () => {
// // //   const [chatRooms, setChatRooms] = useState([]);
// // //   const [selectedRoom, setSelectedRoom] = useState(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [isChatOpen, setIsChatOpen] = useState(false);
// // //   const [messageInput, setMessageInput] = useState("");
// // //   const [webSocket, setWebSocket] = useState(null);

// // //   // Fetch chat rooms for the logged-in user
// // //   useEffect(() => {
// // //     const fetchChatRooms = async () => {
// // //       const token = localStorage.getItem("token");
// // //       try {
// // //         const response = await axios.get("http://localhost:8080/chat/rooms", {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         });
// // //         setChatRooms(response.data);
// // //       } catch (error) {
// // //         console.error("Error fetching chat rooms:", error);
// // //         setError("Failed to load chat rooms.");
// // //       }
// // //     };

// // //     fetchChatRooms();
// // //   }, []);

// // //   // Fetch messages for a selected chat room
// // //   const handleSelectRoom = async (roomId) => {
// // //     setLoading(true);
// // //     const token = localStorage.getItem("token");

// // //     try {
// // //       const response = await axios.get(`http://localhost:8080/chat/${roomId}/messages`, {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //       });

// // //       setMessages(response.data);
// // //       setSelectedRoom(roomId);
// // //       openWebSocket(roomId); // Open WebSocket for the selected chat room
// // //     } catch (error) {
// // //       console.error("Error fetching chat messages:", error);
// // //       setError("Failed to load chat messages.");
// // //     } finally {
// // //       setLoading(false);
// // //       setIsChatOpen(true); // Open the chat modal
// // //     }
// // //   };

// // //   // Open WebSocket connection for real-time chat
// // //   const openWebSocket = (roomId) => {
// // //     const token = localStorage.getItem("token");
// // //     const memberId = localStorage.getItem("memberId"); // Make sure to set memberId

// // //     const socket = new WebSocket(`ws://localhost:8080/ws/${roomId}/${memberId}?token=${token}`);

// // //     socket.onopen = () => {
// // //       console.log("WebSocket opened");
// // //     };

// // //     socket.onmessage = (event) => {
// // //       const incomingMessage = JSON.parse(event.data);
// // //       setMessages((prevMessages) => [...prevMessages, incomingMessage]);
// // //     };

// // //     socket.onclose = () => {
// // //       console.log("WebSocket closed");
// // //     };

// // //     setWebSocket(socket);
// // //   };

// // //   const sendMessage = () => {
// // //     if (!messageInput.trim()) return; // Don't send empty messages

// // //     const message = {
// // //       roomId: selectedRoom,
// // //       memberId: localStorage.getItem("memberId"),
// // //       content: messageInput,
// // //     };

// // //     webSocket.send(JSON.stringify(message)); // Send the message over WebSocket
// // //     setMessageInput(""); // Clear the input
// // //   };

// // //   // Close chat modal and WebSocket
// // //   const handleCloseChat = () => {
// // //     setIsChatOpen(false);
// // //     if (webSocket) {
// // //       webSocket.close();
// // //     }
// // //   };

// // //   // Render the list of chat rooms
// // //   return (
// // //     <div className={styles.headerChat}>
// // //       <h2>My Chat Rooms</h2>
// // //       {chatRooms.length === 0 && <p>No chat rooms available.</p>}

// // //       <ul className={styles.chatRoomList}>
// // //         {chatRooms.map((room) => (
// // //           <li key={room.roomId} onClick={() => handleSelectRoom(room.roomId)}>
// // //             {room.itemTitle} (Room ID: {room.roomId})
// // //           </li>
// // //         ))}
// // //       </ul>

// // //       {error && <div className={styles.error}>{error}</div>}

// // //       {isChatOpen && (
// // //         <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
// // //           <Chat
// // //             roomId={selectedRoom}
// // //             messages={messages}
// // //             messageInput={messageInput}
// // //             setMessageInput={setMessageInput}
// // //             sendMessage={sendMessage}
// // //           />
// // //         </Modal>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default HeaderChat;




















// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Modal from "../chat/Modal";
// // import Chat from "../../pages/MyPage/Chat";
// // import styles from '../../styles/MyPage/Chat.module.css';


// // const HeaderChat = () => {
// //   const [chatRooms, setChatRooms] = useState([]);
// //   const [selectedRoom, setSelectedRoom] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [messageInput, setMessageInput] = useState("");
// //   const [webSocket, setWebSocket] = useState(null);

// //   // Fetch chat rooms for the logged-in user
// //   useEffect(() => {
// //     const fetchChatRooms = async () => {
// //       const token = localStorage.getItem("token");
// //       try {
// //         const response = await axios.get("http://localhost:8080/chat/rooms", {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setChatRooms(response.data);
// //       } catch (error) {
// //         console.error("Error fetching chat rooms:", error);
// //         setError("Failed to load chat rooms.");
// //       }
// //     };

// //     fetchChatRooms();
// //   }, []);

// //   // Open WebSocket connection for real-time chat
// //   const openWebSocket = (roomId) => {
// //     const token = localStorage.getItem("token");
// //     const memberId = localStorage.getItem("memberId");

// //     const socket = new WebSocket(`ws://localhost:8080/ws/${roomId}/${memberId}?token=${token}`);

// //     socket.onopen = () => {
// //       console.log("WebSocket opened");
// //     };

// //     socket.onmessage = (event) => {
// //       const incomingMessage = JSON.parse(event.data);
// //       setMessages((prevMessages) => [...prevMessages, incomingMessage]);
// //     };

// //     socket.onclose = () => {
// //       console.log("WebSocket closed");
// //     };

// //     setWebSocket(socket);
// //   };

// //   // Fetch messages for a selected chat room
// //   const handleSelectRoom = async (roomId) => {
// //     setLoading(true);
// //     const token = localStorage.getItem("token");

// //     try {
// //       const response = await axios.get(`http://localhost:8080/chat/${roomId}/messages`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       setMessages(response.data);
// //       setSelectedRoom(roomId);
// //       openWebSocket(roomId); // Open WebSocket for the selected chat room
// //     } catch (error) {
// //       console.error("Error fetching chat messages:", error);
// //       setError("Failed to load chat messages.");
// //     } finally {
// //       setLoading(false);
// //       setIsChatOpen(true); // Open the chat modal
// //     }
// //   };

// //   const sendMessage = () => {
// //     if (!messageInput.trim()) return; // Don't send empty messages

// //     const message = {
// //       roomId: selectedRoom,
// //       memberId: localStorage.getItem("memberId"),
// //       content: messageInput,
// //     };

// //     webSocket.send(JSON.stringify(message)); // Send the message over WebSocket
// //     setMessageInput(""); // Clear the input
// //   };

// //   // Close chat modal and WebSocket
// //   const handleCloseChat = () => {
// //     setIsChatOpen(false);
// //     if (webSocket) {
// //       webSocket.close();
// //     }
// //   };

// //   // Cleanup WebSocket connection on component unmount
// //   useEffect(() => {
// //     return () => {
// //       if (webSocket) {
// //         webSocket.close();
// //       }
// //     };
// //   }, [webSocket]);

// //   // Render the list of chat rooms
// //   return (
// //     <div className={styles.headerChat}>
// //       <h2>My Chat Rooms</h2>
// //       {chatRooms.length === 0 && <p>No chat rooms available.</p>}

// //       <ul className={styles.chatRoomList}>
// //         {chatRooms.map((room) => (
// //           <li key={room.roomId} onClick={() => handleSelectRoom(room.roomId)}>
// //             {room.itemTitle} (Room ID: {room.roomId})
// //           </li>
// //         ))}
// //       </ul>

// //       {error && <div className={styles.error}>{error}</div>}

// //       {isChatOpen && (
// //         <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
// //           <Chat
// //             roomId={selectedRoom}
// //             messages={messages}
// //             messageInput={messageInput}
// //             setMessageInput={setMessageInput}
// //             sendMessage={sendMessage}
// //           />
// //         </Modal>
// //       )}
// //     </div>
// //   );
// // };

// // export default HeaderChat;

























import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../chat/Modal";
import Chat from "../../pages/MyPage/Chat";
import styles from '../../styles/header/HeaderChat.module.css';

const HeaderChat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/chat/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
        setError("Failed to load chat rooms.");
      }
    };

    fetchChatRooms();
  }, []);

  const openWebSocket = (roomId) => {
    const token = localStorage.getItem("token");
    const memberId = localStorage.getItem("memberId");

    const socket = new WebSocket(`ws://localhost:8080/ws/${roomId}/${memberId}?token=${token}`);

    socket.onopen = () => {
      console.log("WebSocket opened");
    };

    socket.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    setWebSocket(socket);
  };

  const handleSelectRoom = async (roomId) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/chat/${roomId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data);
      setSelectedRoom(roomId);
      openWebSocket(roomId); // Open WebSocket for the selected chat room
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      setError("Failed to load chat messages.");
    } finally {
      setLoading(false);
      setIsChatOpen(true); // Open the chat modal
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return; // 빈 메시지는 보내지 않음
    
    const memberId = localStorage.getItem("memberId"); // localStorage에서 memberId 가져오기
    
    // 메시지 객체 생성
    const message = {
      roomId: selectedRoom,
      senderId: memberId, // 여기에 senderId를 추가
      content: messageInput.trim(),
    };
  
    // WebSocket을 통해 메시지 전송
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify(message)); // WebSocket을 통해 메시지 전송
      
      // 즉시 메시지 목록에 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: memberId, content: messageInput, timestamp: new Date().toLocaleTimeString() }
      ]);
    } else {
      // WebSocket이 열려 있지 않으면 REST API로 메시지 전송
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `http://localhost:8080/chat/${selectedRoom}/message`,
          message, // message 객체를 전송
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // 서버 응답으로 메시지 업데이트
        setMessages((prevMessages) => [...prevMessages, response.data]);
      } catch (error) {
        console.error("Error sending message via REST API:", error);
        setError("Failed to send message.");
      }
    }
  
    setMessageInput(""); // 입력 필드 초기화
  };
  




  
  
  


  const handleCloseChat = () => {
    setIsChatOpen(false);
    if (webSocket) {
      webSocket.close();
    }
  };

  useEffect(() => {
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [webSocket]);

  return (
    <div className={styles.headerChat}>
      <h2 className={styles.chatlist}>채팅 목록</h2>
      {chatRooms.length === 0 && <p>채팅방이 없습니다.</p>}

      <ul className={styles.roomList}>
        {chatRooms.map((room) => (
          <li key={room.roomId} className={styles.room} onClick={() => handleSelectRoom(room.roomId)}>
            <div className={styles.roomIconWrapper}>
              <i className={`${styles.icon} fas fa-store`}></i>
            </div>
            {room.itemTitle} (Room ID: {room.roomId})
          </li>
        ))}
      </ul>

      {error && <div className={styles.error}>{error}</div>}

      {isChatOpen && (
        <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
          <Chat
            roomId={selectedRoom}
            messages={messages}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            sendMessage={sendMessage}
          />
        </Modal>
      )}
    </div>
  );
};

export default HeaderChat;














