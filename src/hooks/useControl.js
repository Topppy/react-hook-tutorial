import { useState } from 'react'

export default (initialValue) => {
  const [val, setVal] = useState(initialValue)

  return [
    val,
    e => {
      const newVal = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setVal(newVal)
    }
  ]
}
