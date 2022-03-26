import React from 'react'

import './styles.css'

interface Props {
  message: string
}

const ErrorNotification: React.FC<Props> = (props) => {
  return (
    <div className="error" role="alert">
      <p>{props.message}</p>
    </div>
  )
}

export default ErrorNotification
