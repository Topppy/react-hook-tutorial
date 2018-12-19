import React from 'react'
import s from './index.module.css'
import useControl from '../../hooks/useControl'

const SwitchLight = props => {
  const [ checked, onChange ] = useControl(false, console.log)

  return (
    <div className={s.switch}>
      <input
        type="checkbox"
        name="toggle"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="toggle"><i></i></label>
      <span></span>
    </div>
  )
}

export default SwitchLight
