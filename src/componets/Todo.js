import { useState } from "react"
import styles from './Todo.module.css'


function Todo({ todo, deleteTodo, toggleTodo }) {
   return (
      <div className={`${styles.todo} ${todo.isCompleted ? styles.completedTodo : ''}`}>
         <div className={styles.todoText}>
            <div className={styles.checkIcon} onClick={() => toggleTodo(todo.id)}></div>
            {todo.text}
            </div>
         <div className={styles.deleteIcon} onClick={() => deleteTodo(todo.id)}>remove</div>
      </div>
   )
}

export default Todo