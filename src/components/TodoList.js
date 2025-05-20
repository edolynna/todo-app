import Todo from "./Todo";
import styles from './TodoList.module.css'

function TodoList({ todos, deleteTodo, toggleTodo, editTodo }) {
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) return 1;
        if (!a.isCompleted && b.isCompleted) return -1;
        return 0;
    });

    return (
        <div className={styles.todoListContainer}>
            {!todos.length && <h2>To do list is empty</h2>}
            {sortedTodos.map((todo) => 
                <Todo 
                    key={todo.id} 
                    todo={todo} 
                    deleteTodo={deleteTodo} 
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                />
            )}
        </div>
    )
}

export default TodoList