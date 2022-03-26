import React from 'react'

import './styles.css';

interface Props {
  value: string
  placeholder?: string
  onChange: React.ChangeEventHandler
}

export const useInput = () => {
  const [value, setValue] = React.useState('')
  
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange,
  }
}

const Input: React.FC<Props> = (props) => {
  return <input className="input" type="text" value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
}

export default Input
