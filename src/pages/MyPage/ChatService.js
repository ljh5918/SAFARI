// services/chatService.js
import axios from 'axios';


const getAuthToken = () => {
  return localStorage.getItem('token'); // Replace 'token' with the actual key used for JWT in local storage
};
export const getChatRooms = async (itemId) => {
  try {
    const token = getAuthToken();
    // const response = await axios.get('http://localhost:8080/chat/rooms', {
    const response = await axios.post(`http://localhost:8080/item/${itemId}/chat`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization he`ader
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    throw error; // Re-throw the error for further handling
  }
};
export const getMessages = async (roomId) => {
  const response = await axios.get(`http://localhost:8080/chat/rooms/${roomId}/messages`); // Adjust URL
  return response.data;
};

export const sendMessage = async (roomId, message) => {
  const response = await axios.post(`http://localhost:8080/chat/rooms/${roomId}/messages`, { message }); // Adjust URL
  return response.data;
};
