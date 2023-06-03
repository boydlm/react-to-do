import React from 'react';

function TodoList({ todos, updateTodos }) {

    const markComplete = (id) => {
        const updatedList = todos.map((item, index) => {
            if (id !== index) return item;
            return { ...item, complete: !(item.complete) };
        });
        updateTodos(updatedList);
    }
    return (
        <div className="todo-list">
            {todos.map((todo, index) => (
                <div
                    key={index}
                    className={`todo ${todo.complete ? "taskDone" : ""}`}
                    onClick={() => markComplete(index)}>
                    Item {index + 1}: {todo.task}
                </div>
            ))}
        </div>
    );
};

export default TodoList;