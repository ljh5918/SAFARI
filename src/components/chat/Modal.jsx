import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/chat/Modal.css';

const Modal = ({ isOpen, onClose, children, scrollable = true, isChatRoomActive }) => {
  const modalRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const body = document.body;
    body.style.overflow = isOpen && !isChatRoomActive ? 'hidden' : 'auto'; 

    return () => {
      body.style.overflow = 'auto'; 
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
            style={{ overflowY: scrollable && !isChatRoomActive ? 'auto' : 'hidden' }}
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




















