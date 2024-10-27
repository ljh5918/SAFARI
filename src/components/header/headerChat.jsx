// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "../chat/Modal";
// import Chat from "../../pages/MyPage/Chat";
// import styles from '../../styles/header/HeaderChat.module.css';

// const HeaderChat = () => {
//   const [chatRooms, setChatRooms] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messageInput, setMessageInput] = useState("");
//   const [webSocket, setWebSocket] = useState(null);
//   const [selectedItemTitle, setSelectedItemTitle] = useState(""); // 상품 제목 상태 추가

//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get("http://localhost:8080/chat/rooms", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Fetch item details for each chat room
//         const roomsWithItems = await Promise.all(response.data.map(async (room) => {
//           const itemResponse = await axios.get(`http://localhost:8080/item/${room.itemId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           return {
//             ...room,
//             itemNm: itemResponse.data.itemNm, // Add item name to the room object
//           };
//         }));

//         setChatRooms(roomsWithItems);
//       } catch (error) {
//         console.error("Error fetching chat rooms:", error);
//         setError("Failed to load chat rooms.");
//       }
//     };

//     fetchChatRooms();
//   }, []);

//   const openWebSocket = (roomId) => {
//     if (webSocket) {
//       webSocket.close();
//     }

//     const token = localStorage.getItem("token");
//     const memberId = localStorage.getItem("memberId");

//     const socket = new WebSocket(`ws://localhost:8080/ws/${roomId}/${memberId}?token=${token}`);

//     socket.onopen = () => {
//       console.log("WebSocket opened");
//     };

//     socket.onmessage = (event) => {
//       const incomingMessage = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, incomingMessage]);
//     };

//     socket.onclose = () => {
//       console.log("WebSocket closed");
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     setWebSocket(socket);
//   };

//   const handleSelectRoom = async (roomId, itemNm) => { // itemNm 추가
//     setLoading(true);
//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.get(`http://localhost:8080/chat/${roomId}/messages`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const formattedMessages = response.data.map(msg => ({
//         ...msg,
//         sendTime: msg.sendTime || new Date().toISOString(),
//       }));

//       setMessages(formattedMessages);
//       setSelectedRoom(roomId);
//       setSelectedItemTitle(itemNm); // 상품 제목 설정
//       openWebSocket(roomId);
//     } catch (error) {
//       console.error("Error fetching chat messages:", error);
//       setError("Failed to load chat messages.");
//     } finally {
//       setLoading(false);
//       setIsChatOpen(true);
//     }
//   };

//   const sendMessage = async () => {
//     if (!messageInput.trim()) return;

//     const memberId = localStorage.getItem("memberId");
//     const message = {
//       roomId: selectedRoom,
//       senderId: memberId,
//       content: messageInput.trim(),
//       memberId: memberId,
//       sendTime: new Date().toISOString(),
//     };

//     if (webSocket && webSocket.readyState === WebSocket.OPEN) {
//       webSocket.send(JSON.stringify(message));
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { ...message, timestamp: new Date().toLocaleTimeString() }
//       ]);
//     } else {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.post(
//           `http://localhost:8080/chat/${selectedRoom}/message`,
//           message,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setMessages((prevMessages) => [...prevMessages, response.data]);
//       } catch (error) {
//         console.error("Error sending message via REST API:", error);
//         setError("Failed to send message.");
//       }
//     }

//     setMessageInput("");
//   };

//   const handleCloseChat = () => {
//     setIsChatOpen(false);
//     if (webSocket) {
//       webSocket.close();
//       setWebSocket(null);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (webSocket) {
//         webSocket.close();
//       }
//     };
//   }, [webSocket]);

//   return (
//     <div className={styles.headerChat}>
//       <h2 className={styles.chatlist}>채팅방</h2>
//       {chatRooms.length === 0 && <p>채팅방이 없습니다.</p>}

//       <ul className={styles.roomList}>
//         {chatRooms.map((room) => (
//           <li key={room.roomId} className={styles.room} onClick={() => handleSelectRoom(room.roomId, room.itemNm)}> {/* itemNm 전달 */}
//             <div className={styles.roomIconWrapper}>
//               <i className={`${styles.icon} fas fa-store`}></i>
//             </div>
//             {room.itemNm}  {/* Display item name */}
//           </li>
//         ))}
//       </ul>

//       {error && <div className={styles.error}>{error}</div>}

//       {isChatOpen && (
//         <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
//           <Chat
//             roomId={selectedRoom}
//             messages={messages}
//             messageInput={messageInput}
//             setMessageInput={setMessageInput}
//             sendMessage={sendMessage}
//             productTitle={selectedRoom ? chatRooms.find(room => room.roomId === selectedRoom).itemNm : ''} // Pass the product title
//           />

//         </Modal>
//       )}
//     </div>
//   );
// };

// export default HeaderChat;

























//채팅방 동시입장
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../chat/Modal";
import Chat from "../../pages/MyPage/Chat";
import styles from '../../styles/header/HeaderChat.module.css';

const HeaderChat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [activeChats, setActiveChats] = useState({}); // Store active chat rooms and their messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [webSockets, setWebSockets] = useState({}); // Store WebSocket connections

  useEffect(() => {
    const fetchChatRooms = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/chat/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch item details for each chat room
        const roomsWithItems = await Promise.all(response.data.map(async (room) => {
          const itemResponse = await axios.get(`http://localhost:8080/item/${room.itemId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return {
            ...room,
            itemNm: itemResponse.data.itemNm, // Add item name to the room object
          };
        }));

        setChatRooms(roomsWithItems);
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
      console.log(`WebSocket opened for room: ${roomId}`);
    };

    socket.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      setActiveChats((prevChats) => ( {
        ...prevChats,
        [roomId]: {
          ...prevChats[roomId],
          messages: [...(prevChats[roomId]?.messages || []), incomingMessage]
        }
      }));
    };

    socket.onclose = () => {
      console.log(`WebSocket closed for room: ${roomId}`);
      setWebSockets((prev) => {
        const newWs = { ...prev };
        delete newWs[roomId];
        return newWs;
      });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWebSockets((prev) => ({ ...prev, [roomId]: socket }));
  };

  const handleSelectRoom = async (roomId, itemNm) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/chat/${roomId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedMessages = response.data.map(msg => ({
        ...msg,
        sendTime: msg.sendTime || new Date().toISOString(),
      }));

      setActiveChats((prev) => ({
        ...prev,
        [roomId]: { messages: formattedMessages, itemNm }
      }));

      openWebSocket(roomId);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      setError("Failed to load chat messages.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (roomId, messageInput) => {
    if (!messageInput.trim()) return;

    const memberId = localStorage.getItem("memberId");
    const message = {
      roomId,
      senderId: memberId,
      content: messageInput.trim(),
      memberId,
      sendTime: new Date().toISOString(),
    };

    const socket = webSockets[roomId];
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
      setActiveChats((prev) => ({
        ...prev,
        [roomId]: {
          ...prev[roomId],
          messages: [...prev[roomId].messages, { ...message, timestamp: new Date().toLocaleTimeString() }]
        }
      }));
    } else {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `http://localhost:8080/chat/${roomId}/message`,
          message,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActiveChats((prev) => ({
          ...prev,
          [roomId]: {
            ...prev[roomId],
            messages: [...prev[roomId].messages, response.data]
          }
        }));
      } catch (error) {
        console.error("Error sending message via REST API:", error);
        setError("Failed to send message.");
      }
    }
  };

  const handleCloseChat = (roomId) => {
    setActiveChats((prev) => {
      const newChats = { ...prev };
      delete newChats[roomId];
      return newChats;
    });
    if (webSockets[roomId]) {
      webSockets[roomId].close();
      delete webSockets[roomId];
    }
  };

  return (
    <div className={styles.headerChat}>
      <h2 className={styles.chatlist}>채팅방</h2>
      {chatRooms.length === 0 && <p>채팅방이 없습니다.</p>}
      <ul className={styles.roomList}>
        {chatRooms.map((room) => (
          <li key={room.roomId} className={styles.room} onClick={() => handleSelectRoom(room.roomId, room.itemNm)}>
            <div className={styles.roomIconWrapper}>
              <i className={`${styles.icon} fas fa-store`}></i>
            </div>
            {room.itemNm}
          </li>
        ))}
      </ul>
      {error && <div className={styles.error}>{error}</div>}
      {Object.keys(activeChats).map((roomId) => (
        <Modal key={roomId} isOpen={true} onClose={() => handleCloseChat(roomId)}>
          <Chat
            roomId={roomId}
            messages={activeChats[roomId]?.messages || []}
            sendMessage={(messageInput) => sendMessage(roomId, messageInput)} // Pass the function correctly
            productTitle={activeChats[roomId]?.itemNm}
          />
        </Modal>
      ))}
    </div>
  );
};

export default HeaderChat;
