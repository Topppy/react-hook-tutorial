import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import useTodoState from '../hooks/useTodoState'

export default function TDList() {
  const {todos, addTodo, deleteTodo} = useTodoState([])

  return (
    <div>
      <h1>实现TODO List</h1>
      <AddTodo
        saveTodo={ todoText => {
          const trimmedText = todoText.trim()
          if (trimmedText.length > 0){
            addTodo(trimmedText)
          }
        }}
      />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}