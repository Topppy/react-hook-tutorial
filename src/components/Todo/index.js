import React from 'react'
import s from './Todo.module.css'
import SwitchLight from '../SwitchLight'

const Todo = ({todo, deleteMe}) => {
  return (
    <div className={`flex-box ${s.todo}`}>
      <SwitchLight />
      {todo}
      <i
        aria-label="Delete"
        className={s.iconRight}
        onClick={deleteMe}
      >
      </i>
    </div>
  )
}

export default Todo
