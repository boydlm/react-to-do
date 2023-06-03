import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="App">
      <TodoForm addTodo={(todo) => {
        if (todo.task.trim().length > 0) {
          setTodos([...todos, todo]);
        }
      }} />
      <TodoList todos={todos} updateTodos={(list) => { setTodos(list) }}></TodoList>
    </div>
  );
}

export default App;