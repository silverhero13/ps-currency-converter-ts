import React from 'react'
import Loader from '../Loader'

import './styles.css'

interface Props {
  loading?: boolean
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
      {props.loading ? <Loader /> : props.children}
    </button>
  )
}

export default Button
