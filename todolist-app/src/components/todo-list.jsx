import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

function TodoList() {
  const [todoItems, setTodoItems] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const navigate = useNavigate();

  const onDelete = (id) => {
    const updatedTodos = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <div className="flex space-between items-center">
        <h1 className="todo-list-title">Todo List</h1>
        <button onClick={() => navigate("/add")} className="primary-button">
          Add Task
        </button>
      </div>
      <div className="todo-list">
        {todoItems.map((todo, index) => (
          <div key={todo.id} className="todo-item">
            <h1 className="name">{todo.name}</h1>
            <p>{todo.description}</p>
            <div className="flex space-between footer">
              <div className="flex">
                <div className="status-priority">
                  <label>Status</label>
                  <span>{todo.status}</span>
                </div>
                <div className="status-priority">
                  <label>Priority</label>
                  <span>{todo.priority}</span>
                </div>
              </div>
              <div className="flex action-btns">
                <span onClick={() => onDelete(todo.id)}>Delete</span>
                <span onClick={() => navigate(`/edit/${todo.id}`)}>Edit</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
