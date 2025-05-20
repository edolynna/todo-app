import { useState } from 'react';
import styles from './Todo.module.css'

function Todo({ todo, deleteTodo, toggleTodo, editTodo }) {
   const [isEditing, setIsEditing] = useState(false);
   const [editText, setEditText] = useState(todo.text);

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

   return (
      <div className={`${styles.todo} ${todo.isCompleted ? styles.completedTodo : ''}`}>
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
   )
}

export default Todo