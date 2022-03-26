import React from 'react'

import './styles.css'

interface Props {
  label?: string
  className?: string
  onClick: React.MouseEventHandler
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={`button ${props.className ? props.className : ''}`}
      onClick={props.onClick}
      aria-label={props.label}
    >
      {props.children}
    </button>
  )
}

export default Button
