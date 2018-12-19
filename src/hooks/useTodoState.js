import { useState } from 'react'

export default initialValue => {
  const [todos, setTodos] = useState(initialValue)

  return {
    todos,
    addTodo: todoText => {
      setTodos([...todos, {text: todoText, id: +new Date()}])
    },
    deleteTodo: todoId => {
      const newTodos = todos
        .filter((todo) => todo.id !== todoId)

      setTodos(newTodos)
    }
  }
}
