import { useState } from 'react';
import styles from './Todo.module.css'

function Todo({ todo, deleteTodo, toggleTodo, editTodo, onDragStart, onDragOver, onDrop, onDragEnd, isDragOver }) {
   const [isEditing, setIsEditing] = useState(false);
   const [editText, setEditText] = useState(todo.text);
   const [isDragging, setIsDragging] = useState(false);

   const handleEdit = () => {
      if (isEditing) {
         editTodo(todo.id, editText);
      }
      setIsEditing(!isEditing);
   };

   const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
         handleEdit();
      }
   };

   const handleDragStart = (e) => {
      setIsDragging(true);
      onDragStart(e, todo.id);
   };

   const handleDragEnd = () => {
      setIsDragging(false);
      onDragEnd();
   };

   const handleDragOver = (e) => {
      e.preventDefault();
      onDragOver(e, todo.id);
   };

   const handleDrop = (e) => {
      e.preventDefault();
      onDrop(e, todo.id);
   };

   return (
      <div 
         className={styles.todoWrapper}
         onDragOver={handleDragOver}
         onDrop={handleDrop}
      >
         {!todo.isCompleted && (
            <div 
               className={styles.dragIcon}
               draggable
               onDragStart={handleDragStart}
               onDragEnd={handleDragEnd}
            ></div>
         )}
         <div 
            className={`${styles.todo} ${todo.isCompleted ? styles.completedTodo : ''} ${isDragging ? styles.dragging : ''} ${isDragOver ? styles.dragOver : ''}`}
         >
            <div className={styles.todoText} onClick={() => !isEditing && toggleTodo(todo.id)}>
               <div className={styles.checkIcon}></div>
               {isEditing ? (
                  <input
                     type="text"
                     value={editText}
                     onChange={(e) => setEditText(e.target.value)}
                     onKeyPress={handleKeyPress}
                     className={styles.editInput}
                     autoFocus
                  />
               ) : (
                  <span className={styles.todoTextConcent}>{todo.text}</span>
               )}
            </div>
            <div className={styles.todoActions}>
               <div className={styles.editIcon} onClick={handleEdit}></div>
               <div className={styles.deleteIcon} onClick={() => deleteTodo(todo.id)}></div>
            </div>
         </div>
      </div>
   )
}

export default Todo