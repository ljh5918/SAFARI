import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../chat/Modal"; 
import Chat from "../../pages/MyPage/Chat";
import styles from '../../styles/header/HeaderChat.module.css';

const HeaderChat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [webSockets, setWebSockets] = useState({});
  const [messageInputs, setMessageInputs] = useState({});
  const [error, setError] = useState(null);
  const [selectedItemTitles, setSelectedItemTitles] = useState({});

  useEffect(() => {
    const fetchChatRooms = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/chat/rooms", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const roomsWithItems = await Promise.all(response.data.map(async (room) => {
          const itemResponse = await axios.get(`http://localhost:8080/item/${room.itemId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return { ...room, itemNm: itemResponse.data.itemNm };
        }));

        setChatRooms(roomsWithItems);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
        setError("Failed to load chat rooms.");
      }
    };

    fetchChatRooms();
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        Object.keys(selectedRooms).forEach((roomId) => handleCloseChat(roomId));
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [selectedRooms]);

  const openWebSocket = (roomId) => {
    const token = localStorage.getItem("token");
    const memberId = localStorage.getItem("memberId");
    const socket = new WebSocket(`ws://localhost:8080/ws/${roomId}/${memberId}?token=${token}`);

    socket.onopen = () => {
      console.log(`WebSocket opened for room ${roomId}`);
    };

    socket.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      setSelectedRooms((prevRooms) => ({
        ...prevRooms,
        [roomId]: [...(prevRooms[roomId] || []), incomingMessage],
      }));
    };

    socket.onclose = () => {
      console.log(`WebSocket closed for room ${roomId}`);
    };

    socket.onerror = (error) => {
      console.error(`WebSocket error for room ${roomId}:`, error);
    };

    setWebSockets((prevSockets) => ({
      ...prevSockets,
      [roomId]: socket,
    }));
  };

  const handleSelectRoom = async (roomId, itemNm) => {
    const token = localStorage.getItem("token");
    setSelectedItemTitles((prevTitles) => ({
      ...prevTitles,
      [roomId]: itemNm,
    }));

    try {
      const response = await axios.get(`http://localhost:8080/chat/${roomId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formattedMessages = response.data.map(msg => ({
        ...msg,
        sendTime: msg.sendTime || new Date().toISOString(),
      }));

      setSelectedRooms((prevRooms) => ({
        ...prevRooms,
        [roomId]: formattedMessages,
      }));

      if (!webSockets[roomId]) {
        openWebSocket(roomId);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      setError("Failed to load chat messages.");
    }
  };

  const sendMessage = (roomId) => {
    if (!messageInputs[roomId]?.trim()) return;

    const memberId = localStorage.getItem("memberId");
    const message = {
      roomId,
      senderId: memberId,
      content: messageInputs[roomId].trim(),
      sendTime: new Date().toISOString(),
    };

    if (webSockets[roomId] && webSockets[roomId].readyState === WebSocket.OPEN) {
      webSockets[roomId].send(JSON.stringify(message));
      setSelectedRooms((prevRooms) => ({
        ...prevRooms,
        [roomId]: [...(prevRooms[roomId] || []), message],
      }));
    }

    setMessageInputs((prevInputs) => ({
      ...prevInputs,
      [roomId]: "",
    }));
  };

  const handleMessageInputChange = (roomId, value) => {
    setMessageInputs((prevInputs) => ({
      ...prevInputs,
      [roomId]: value,
    }));
  };

  const handleCloseChat = (roomId) => {
    if (webSockets[roomId]) {
      webSockets[roomId].close();
      setWebSockets((prevSockets) => {
        const { [roomId]: _, ...remainingSockets } = prevSockets;
        return remainingSockets;
      });
    }
    setSelectedRooms((prevRooms) => {
      const { [roomId]: _, ...remainingRooms } = prevRooms;
      return remainingRooms;
    });
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

      {Object.keys(selectedRooms).map((roomId) => (
        <Modal key={roomId} isOpen={!!selectedRooms[roomId]} onClose={() => handleCloseChat(roomId)}>
          <Chat
            roomId={roomId}
            messages={selectedRooms[roomId]}
            messageInput={messageInputs[roomId] || ""}
            setMessageInput={(value) => handleMessageInputChange(roomId, value)}
            sendMessage={() => sendMessage(roomId)}
            productTitle={selectedItemTitles[roomId]}
          />
        </Modal>
      ))}
    </div>
  );
};

export default HeaderChat;



































