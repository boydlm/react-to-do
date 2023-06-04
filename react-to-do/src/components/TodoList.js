import React from 'react';

function TodoList({ todos, updateTodos }) {

    const removeTask = (index) => {
        const updatedList = todos.filter((task, taskIndex) => {
            return taskIndex !== index;
        });
        updateTodos(updatedList);
    }

    const markComplete = (id) => {
        return todos.map((item, index) => {
            if (id !== index) return item;
            return { ...item, complete: !(item.complete) };
        });
    }
    const swapElements = (array, index1, index2) => {
        let temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
        return array;
    }

    const up = (index) => {
        if (index == 0) {updateTodos(todos)}
        if (index !==0) {
            const newTodos = swapElements(todos, index, index-1);
            updateTodos([...newTodos]);
        }
    }
    const down = (index) => {
        if (index == (todos.length)-1) {updateTodos(todos)}
        else {
            const newTodos = swapElements(todos, index+1, index);
            updateTodos([...newTodos]);
        }
    }
    return (

        <div className="todo-list">
            {todos.map((todo, index) => (
                <div key={index}>
                    <div
                        className={`todo ${todo.complete ? "taskDone" : ""}`}
                        onClick={() => updateTodos(markComplete(index))}>
                        Item {index + 1}: {todo.task}
                    </div>
                    <div><button className="button" onClick={() => removeTask(index)}>Delete</button>  </div>
                    <div><button className="button2" onClick={() => up(index)}>Prioritize</button> </div>
                    <div><button className="button3" onClick={() => down(index)}>De-Prioritize</button> </div>


                </div>

            ))}
        </div>
    );
};

export default TodoList;