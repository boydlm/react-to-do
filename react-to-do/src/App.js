import React from 'react';
import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState([
        { complete: false, task: "Read about MongoDb" },
        { complete: false, task: "Create a React ToDo App" },
        { complete: false, task: "Find my key" }
      ]);
  return (
    <div className="App">
      <TodoList todos={todos}></TodoList>
    </div>
  );
}

export default App;
