import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo.text}
          deleteMe={ () => {
            deleteTodo(todo.id)
          }}
        />
      ))}
    </div>
  )
}

export default TodoList
