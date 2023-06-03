import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([
    { complete: false, task: "Read about MongoDb" },
    { complete: false, task: "Create a React ToDo App" },
    { complete: false, task: "Find my key" }
  ]);
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