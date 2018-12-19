import React, { useState } from 'react'

const AddTodo = ({saveTodo}) => {
  const [value, setValue] = useState('');
  // 这是一个受控表单组件
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        saveTodo(value)
        setValue('')
      }}
    >
      <input
        placeholder="Add todo"
        onChange={event => {
          setValue(event.target.value);
        }}
        value={value}
      />
    </form>
  )
}

export default AddTodo
