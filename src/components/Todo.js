import styles from './Todo.module.css'

function Todo({ todo, deleteTodo, toggleTodo }) {
   return (
      <div className={`${styles.todo} ${todo.isCompleted ? styles.completedTodo : ''}`}>
         <div className={styles.todoText} onClick={() => toggleTodo(todo.id)}>
            <div className={styles.checkIcon}></div>
            <span className={styles.todoTextConcent}>{todo.text}</span>
         </div>
         <div className={styles.deleteIcon} onClick={() => deleteTodo(todo.id)}></div>
      </div>
   )
}

export default Todo