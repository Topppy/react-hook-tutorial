import React, { useState } from 'react'
import s from './index.module.css'

const SwitchLight = props => {
  const [ checked, setChecked ] = useState(false)

  return (
    <div className={s.switch}>
      <input
        type="checkbox"
        name="toggle"
        checked={checked}
        onChange={e => {
          setChecked(e.target.checked)
        }}
      />
      <label htmlFor="toggle"><i></i></label>
      <span></span>
    </div>
  )
}

export default SwitchLight
