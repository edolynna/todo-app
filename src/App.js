import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoFrom from './componets/TodoForm';
import TodoList from './componets/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([])

  const addTodoHandler = (text) => {
    const newTodo = {
      text: text, 
      isCompleted: false,
      id: uuidv4()
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodoHandler = (id) => {
    setTodos (
      todos.map((todo) =>
        todo.id === id 
          ? {...todo, isCompleted: !todo.isCompleted}
          : {...todo}
    ))
  }

  return (
    <div className="App">
      <h1>To do list</h1>
      <TodoFrom addTodo={addTodoHandler} />
      <TodoList todos={todos} deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoHandler} />
    </div>
  );
}

export default App;