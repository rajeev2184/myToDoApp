// Inside your 'App.js' file

import React, { useState } from 'react';
import './App.css';

function TodoItem({ todo, onDelete, onToggle, showCompleted }) {
  const handleComplete = () => {
    onToggle(todo.id);
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <span className="bullet">{todo.completed ? '\u2714' : '\u2022'}</span>
      <span onClick={() => onToggle(todo.id)} className="description">
        {todo.text}
      </span>
      <div className="description-tooltip">{todo.description}</div>
      {!showCompleted && !todo.completed && (
        <button onClick={handleComplete} className="complete-btn">
          Complete
        </button>
      )}
      <button onClick={() => onDelete(todo.id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
}

function Header({ todosRemaining }) {
  return (
    <div className="header">
      <h1>To-Do List</h1>
      <p>{todosRemaining} {todosRemaining === 1 ? 'To-Do' : 'To-Dos'} Remaining</p>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        description: inputDescription,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setInputDescription('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <Header todosRemaining={todos.length} />
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new todo..."
        />
        <input
          type="text"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          placeholder="Description..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todos">
        <h2>Current Tasks</h2>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
