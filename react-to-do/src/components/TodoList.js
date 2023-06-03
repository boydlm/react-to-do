import React from 'react';

function TodoList({ todos, updateTodos }) {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <div
          key={index}
          className="todo">
          Item {index + 1}: {todo.task}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
