import React from 'react'

interface Props {
  value: string
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
  return <input type="text" value={props.value} onChange={props.onChange} />
}

export default Input
