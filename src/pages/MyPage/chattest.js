// import React, { useState } from 'react';
// import Chat from './Chat'; // Adjust the import path as necessary

// const TestChat = () => {
//   const [roomId, setRoomId] = useState('');
//   const [memberId, setMemberId] = useState('');
//   const [showChat, setShowChat] = useState(false);

//   const handleStartChat = () => {
//     if (roomId && memberId) {
//       setShowChat(true);
//     } else {
//       alert('방 ID와 멤버 ID를 입력하세요.');
//     }
//   };

//   return (
//     <div>
//       <h1>채팅 테스트</h1>
//       {!showChat ? (
//         <div>
//           <input
//             type="text"
//             placeholder="방 ID를 입력하세요"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="멤버 ID를 입력하세요"
//             value={memberId}
//             onChange={(e) => setMemberId(e.target.value)}
//           />
//           <button onClick={handleStartChat}>채팅 시작</button>
//         </div>
//       ) : (
//         <Chat roomId={roomId} memberId={memberId} />
//       )}
//     </div>
//   );
// };

// export default TestChat;





















