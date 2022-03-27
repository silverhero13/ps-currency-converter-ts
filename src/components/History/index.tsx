import React from 'react'
import Button from '../Button'

interface Props {
  items: JSX.Element[]
  paginator: JSX.Element
  onClear: React.MouseEventHandler
}

const History: React.FC<Props> = (props) => {
  return (
    <div
      className="history"
      hidden={props.items.length === 0}
      aria-labelledby="history-title"
    >
      <div className="control has-button-icon-right">
        <h2 id="history-title">Previous amounts</h2>
        <Button className="is-static" onClick={props.onClear}>
          <small>CLEAR ALL</small>
        </Button>
      </div>

      <div className="previous-amounts" role="list">
        {props.items.map((item, idx) => (
          <div key={`conversion-history-${idx}`} role="listitem">
            {item}
          </div>
        ))}
      </div>

      {props.paginator}
    </div>
  )
}

export default History
