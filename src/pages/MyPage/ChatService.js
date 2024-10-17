// // // services/chatService.js
// // import axios from 'axios';


// // const getAuthToken = () => {
// //   return localStorage.getItem('token'); // Replace 'token' with the actual key used for JWT in local storage
// // };
// // export const getChatRooms = async (itemId) => {
// //   try {
// //     const token = getAuthToken();
// //     const response = await axios.post(`http://localhost:8080/item/${itemId}/chat`, {}, {  // Use POST and pass empty body
// //       headers: {
// //         Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error starting chat room:', error);
// //     throw error;
// //   }
// // };

// // export const getMessages = async (roomId) => {
// //   try {
// //     const token = getAuthToken();
// //     const response = await axios.get(`http://localhost:8080/chat/${roomId}/messages`, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching messages:', error);
// //     throw error;
// //   }
// // };


// // export const sendMessage = async (roomId, message) => {
// //   try {
// //     const token = getAuthToken();
// //     const response = await axios.post(`http://localhost:8080/chat/${roomId}/message`, { content: message }, { // Ensure correct endpoint and request body
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error sending message:', error);
// //     throw error;
// //   }
// // };





// // services/chatService.js
// import axios from 'axios';

// const getAuthToken = () => {
//   return localStorage.getItem('token'); // Replace 'token' with the actual key used for JWT in local storage
// };

// export const getChatRooms = async (itemId) => {
//   // Check if itemId is valid
//   if (!itemId) {
//     console.error('Error: itemId is undefined or null.');
//     throw new Error('itemId is required to fetch chat rooms.');
//   }

//   try {
//     const token = getAuthToken();
//     const response = await axios.post(`http://localhost:8080/item/${itemId}/chat`, {}, { // Use POST and pass empty body
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error starting chat room:', error);
//     throw error;
//   }
// };

// export const getMessages = async (roomId) => {
//   try {
//     const token = getAuthToken();
//     const response = await axios.get(`http://localhost:8080/chat/${roomId}/messages`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     throw error;
//   }
// };

// export const sendMessage = async (roomId, message) => {
//   try {
//     const token = getAuthToken();
//     const response = await axios.post(`http://localhost:8080/chat/${roomId}/message`, { content: message }, { // Ensure correct endpoint and request body
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error sending message:', error);
//     throw error;
//   }
// };
