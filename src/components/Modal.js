import React from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure?</h2>
        <p>This will delete all your to-do items.</p>
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

