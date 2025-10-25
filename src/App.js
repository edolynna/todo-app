import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); 

  const saveTodosToLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4(),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const deleteTodoHandler = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const toggleTodoHandler = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo }
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const clearAllTodosHandler = () => {
    setIsModalOpen(true);
  };

  const confirmClearAll = () => {
    setTodos([]);
    saveTodosToLocalStorage([]);
    setIsModalOpen(false);
  };

  const cancelClearAll = () => {
    setIsModalOpen(false);
  };

  const editTodoHandler = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const reorderTodosHandler = (reorderedTodos) => {
    setTodos(reorderedTodos);
    saveTodosToLocalStorage(reorderedTodos);
  };

  return (
    <div className="App">
      <h1>To do list</h1>
      <TodoForm addTodo={addTodoHandler} />
      <TodoList 
        todos={todos} 
        deleteTodo={deleteTodoHandler} 
        toggleTodo={toggleTodoHandler}
        editTodo={editTodoHandler}
        reorderTodos={reorderTodosHandler}
      />
      {todos.length > 4 && (
        <button 
          className="clear-all-button" 
          onClick={clearAllTodosHandler}
        >
          Clear all
        </button>
      )}
      <Modal 
        isOpen={isModalOpen} 
        onConfirm={confirmClearAll} 
        onCancel={cancelClearAll}
      />
    </div>
  );
}

export default App;