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
    if (!messageInput.trim()) return; // Don't send empty messages
  
    // memberId를 직접 가져옵니다.
    const memberId = localStorage.getItem("memberId");
  
    // 메시지 객체를 만듭니다. 이제 memberId가 올바르게 설정됩니다.
    const message = {
      roomId: selectedRoom,
      memberId: memberId,
      content: messageInput.trim(), // 메시지 내용을 추가합니다.
    };
  
    // Check if WebSocket is connected
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      // Send the message over WebSocket
      webSocket.send(JSON.stringify(message)); // WebSocket을 통해 JSON 형식으로 전송합니다.
  
      // 메시지를 즉시 업데이트 (senderName 추가)
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderName: 'You', content: messageInput }, // senderName을 추가
      ]);
    } else {
      // Send the message via REST API as a fallback
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `http://localhost:8080/chat/${selectedRoom}/message`,
          messageInput.trim(), // 여기서는 messageInput을 직접 보냅니다.
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // 메시지를 서버 응답으로 업데이트
        setMessages((prevMessages) => [...prevMessages, response.data]);
      } catch (error) {
        console.error("Error sending message via REST API:", error);
        setError("Failed to send message.");
      }
    }
  
    setMessageInput(""); // Clear the input
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














