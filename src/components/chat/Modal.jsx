// // import React, { useRef, useEffect, useState } from 'react';
// // import ReactDOM from 'react-dom';
// // import '../../styles/chat/Modal.css';

// // const Modal = ({ isOpen, onClose, children }) => {
// //   const modalRef = useRef(null);
// //   const [position, setPosition] = useState({ x: 0, y: 0 });
// //   const isDragging = useRef(false);
// //   const offset = useRef({ x: 0, y: 0 });

// //   // 모달이 열릴 때 중앙에 위치하도록 초기 설정
// //   useEffect(() => {
// //     if (isOpen && modalRef.current) {
// //       const { innerWidth, innerHeight } = window;
// //       const { offsetWidth, offsetHeight } = modalRef.current;
// //       setPosition({
// //         x: (innerWidth - offsetWidth) / 2,
// //         y: (innerHeight - offsetHeight) / 2,
// //       });
// //     }
// //   }, [isOpen]);

// //   const handleMouseDown = (e) => {
// //     isDragging.current = true;
// //     const rect = modalRef.current.getBoundingClientRect();
// //     offset.current = {
// //       x: e.clientX - rect.left,
// //       y: e.clientY - rect.top,
// //     };
// //   };

// //   const handleMouseMove = (e) => {
// //     if (isDragging.current) {
// //       setPosition({
// //         x: e.clientX - offset.current.x,
// //         y: e.clientY - offset.current.y,
// //       });
// //     }
// //   };

// //   const handleMouseUp = () => {
// //     isDragging.current = false;
// //   };

// //   const handleKeyDown = (e) => {
// //     if (e.key === 'Escape') {
// //       onClose();
// //     }
// //   };

// //   useEffect(() => {
// //     if (isOpen) {
// //       document.addEventListener('mousemove', handleMouseMove);
// //       document.addEventListener('mouseup', handleMouseUp);
// //       document.addEventListener('keydown', handleKeyDown);
// //     }
// //     return () => {
// //       document.removeEventListener('mousemove', handleMouseMove);
// //       document.removeEventListener('mouseup', handleMouseUp);
// //       document.removeEventListener('keydown', handleKeyDown);
// //     };
// //   }, [isOpen]);

// //   if (!isOpen) return null;

// //   return ReactDOM.createPortal(
// //     <div className="modal-overlay">
// //       <div
// //         ref={modalRef}
// //         className="modal-content"
// //         onMouseDown={handleMouseDown}
// //         style={{
// //           left: `${position.x}px`,
// //           top: `${position.y}px`,
// //           cursor: isDragging.current ? 'grabbing' : 'grab',
// //         }}
// //         role="dialog"
// //         aria-modal="true"
// //       >
// //         <button className="modal-close" onClick={onClose}>
// //           ×
// //         </button>
// //         {children}
// //       </div>
// //     </div>,
// //     document.getElementById('modal-root')
// //   );
// // };

// // export default Modal;


















// import React, { useRef, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import '../../styles/chat/Modal.css';

// const Modal = ({ isOpen, onClose, children, scrollable = true }) => {
//   const modalRef = useRef(null);
//   const isDragging = useRef(false);
//   const offset = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     if (isOpen) {
//       const body = document.body;
//       body.style.overflow = 'hidden'; // 배경 스크롤 비활성화
//     } else {
//       const body = document.body;
//       body.style.overflow = 'auto'; // 배경 스크롤 활성화
//     }

//     return () => {
//       const body = document.body;
//       body.style.overflow = 'auto'; // Cleanup: 스크롤을 기본값으로 되돌림
//     };
//   }, [isOpen]);

//   const handleMouseDown = (e) => {
//     isDragging.current = true;
//     offset.current = {
//       x: e.clientX - modalRef.current.getBoundingClientRect().left,
//       y: e.clientY - modalRef.current.getBoundingClientRect().top,
//     };
//   };

//   const handleMouseUp = () => {
//     isDragging.current = false;
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging.current) {
//       modalRef.current.style.left = `${e.clientX - offset.current.x}px`;
//       modalRef.current.style.top = `${e.clientY - offset.current.y}px`;
//     }
//   };

//   useEffect(() => {
//     const modalElement = modalRef.current;
//     if (modalElement) {
//       modalElement.addEventListener('mousedown', handleMouseDown);
//       window.addEventListener('mouseup', handleMouseUp);
//       window.addEventListener('mousemove', handleMouseMove);
//     }

//     return () => {
//       if (modalElement) {
//         modalElement.removeEventListener('mousedown', handleMouseDown);
//       }
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return isOpen
//     ? ReactDOM.createPortal(
//         <div className="modal-overlay" onClick={onClose}>
//           <div
//             className="modal-content"
//             ref={modalRef}
//             onClick={(e) => e.stopPropagation()}
//             style={{ overflowY: scrollable ? 'auto' : 'hidden' }} // 스크롤 설정
//           >
//             <button className="modal-close" onClick={onClose}>
//               &times;
//             </button>
//             {children}
//           </div>
//         </div>,
//         document.body
//       )
//     : null;
// };

// export default Modal;


















import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/chat/Modal.css';

const Modal = ({ isOpen, onClose, children, scrollable = true, isChatRoomActive }) => {
  const modalRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const body = document.body;
    body.style.overflow = isOpen && !isChatRoomActive ? 'hidden' : 'auto'; // Disable scroll when modal is open and not in chat room

    return () => {
      body.style.overflow = 'auto'; // Cleanup
    };
  }, [isOpen, isChatRoomActive]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - modalRef.current.getBoundingClientRect().left,
      y: e.clientY - modalRef.current.getBoundingClientRect().top,
    };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      modalRef.current.style.left = `${e.clientX - offset.current.x}px`;
      modalRef.current.style.top = `${e.clientY - offset.current.y}px`;
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="modal-content"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            style={{ overflowY: scrollable && !isChatRoomActive ? 'auto' : 'hidden' }} // Disable scroll if in chat room
          >
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
