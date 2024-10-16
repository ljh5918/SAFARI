import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/chat/Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // 모달이 열릴 때 중앙에 위치하도록 초기 설정
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = modalRef.current;
      setPosition({
        x: (innerWidth - offsetWidth) / 2,
        y: (innerHeight - offsetHeight) / 2,
      });
    }
  }, [isOpen]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    const rect = modalRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div
        ref={modalRef}
        className="modal-content"
        onMouseDown={handleMouseDown}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging.current ? 'grabbing' : 'grab',
        }}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;

























// import React, { useRef, useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import '../../styles/chat/Modal.css';
// import axios from 'axios';

// const Modal = ({ isOpen, onClose, memberId }) => {
//   const modalRef = useRef(null);
//   const [messages, setMessages] = useState([]);

//   // Fetch all messages when the modal opens
//   useEffect(() => {
//     if (isOpen && memberId) {
//       const fetchMessages = async () => {
//         const token = localStorage.getItem('token');
//         try {
//           const response = await axios.get(`http://localhost:8080/members/${memberId}/chats/messages`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMessages(response.data);
//         } catch (error) {
//           console.error('Error fetching messages:', error);
//         }
//       };

//       fetchMessages();
//     }
//   }, [isOpen, memberId]);

//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className="modal-overlay">
//       <div ref={modalRef} className="modal-content" role="dialog" aria-modal="true">
//         <button className="modal-close" onClick={onClose}>
//           ×
//         </button>
//         <div className="chat-messages">
//           {messages.map((message) => (
//             <div key={message.id} className="chat-message">
//               <strong>{message.senderNickname}:</strong> {message.content}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>,
//     document.getElementById('modal-root')
//   );
// };

// export default Modal;
