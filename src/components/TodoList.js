import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <Todo
          key={index.toString()}
          todo={todo}
          deleteMe={ () => {
            deleteTodo(index)
          }}
        />
      ))}
    </div>
  )
}

export default TodoList
