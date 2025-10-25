import { useState } from "react";
import Todo from "./Todo";
import styles from './TodoList.module.css'

function TodoList({ todos, deleteTodo, toggleTodo, editTodo, reorderTodos }) {
    const [draggedId, setDraggedId] = useState(null);
    const [dragOverId, setDragOverId] = useState(null);

    const sortedTodos = [...todos].sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) return 1;
        if (!a.isCompleted && b.isCompleted) return -1;
        return 0;
    });

    const handleDragStart = (e, id) => {
        setDraggedId(id);
    };

    const handleDragOver = (e, targetId) => {
        e.preventDefault();
        setDragOverId(targetId);
        if (draggedId && draggedId !== targetId) {
            const draggedIndex = todos.findIndex(todo => todo.id === draggedId);
            const targetIndex = todos.findIndex(todo => todo.id === targetId);
            
            if (draggedIndex !== -1 && targetIndex !== -1) {
                const newTodos = [...todos];
                const [removed] = newTodos.splice(draggedIndex, 1);
                newTodos.splice(targetIndex, 0, removed);
                reorderTodos(newTodos);
            }
        }
    };

    const handleDrop = (e, targetId) => {
        e.preventDefault();
        setDragOverId(null);
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setDragOverId(null);
    };

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
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragEnd={handleDragEnd}
                    isDragOver={dragOverId === todo.id}
                />
            )}
        </div>
    )
}

export default TodoList