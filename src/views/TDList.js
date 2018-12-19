import React, { useState } from 'react';
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

export default function TDList() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>实现TODO List</h1>
      <AddTodo
        saveTodo={ todoText => {
          const trimmedText = todoText.trim();
          trimmedText.length > 0 && setTodos([...todos, trimmedText]);
        }}
      />
      <TodoList
        todos={todos}
        deleteTodo={todoIndex => {
          const newTodos = todos
            .filter((_, index) => index !== todoIndex);
          setTodos(newTodos);
        }}
      />
    </div>
  );
}