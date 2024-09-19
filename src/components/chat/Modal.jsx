import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/chat/Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - modalRef.current.getBoundingClientRect().left,
      y: e.clientY - modalRef.current.getBoundingClientRect().top,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const modal = modalRef.current;
      modal.style.left = `${e.clientX - offset.current.x}px`;
      modal.style.top = `${e.clientY - offset.current.y}px`;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        style={{ position: 'absolute', cursor: 'move' }}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;


