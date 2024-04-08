import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

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

  return (
    <div className="App">
      <h1>To do list</h1>
      <TodoForm addTodo={addTodoHandler} />
      <TodoList todos={todos} deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoHandler} />
    </div>
  );
}

export default App;