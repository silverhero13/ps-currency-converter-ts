import React from 'react'
import Close from '../../svg/close.svg'
import Swap from '../../svg/swap-vertical.svg'

import './styles.css';

interface ConversionProps {
  base: string
  amount: number
  total: number
  quote: string,
  reverse: boolean,
}

interface SwappableConversionProps extends ConversionProps {
  handleSwap: React.MouseEventHandler
}

interface DismissibleConversionProps extends ConversionProps {
  handleDismiss: React.MouseEventHandler
}

const Conversion: React.FC<ConversionProps> = (props) => {
  if (props.reverse) {
    return (
      <div role="article">
        <p className='top-text'>{props.total.toFixed(2)} {props.quote} equals</p>
        <p className='bottom-text'>{props.amount} {props.base}</p>
      </div>
    )
  } else {
    return (
      <div role="article">
        <p className='top-text'>{props.amount} {props.base} equals</p>
        <p className='bottom-text'>{props.total.toFixed(2)} {props.quote}</p>
      </div>
    )
  }
}

export const SwappableConversion: React.FC<SwappableConversionProps> = (props) => {
  return (
    <div className='conversion is-light control has-button-icon-right' role="figure">
      <Conversion
        base={props.base}
        amount={props.amount}
        total={props.total}
        quote={props.quote}
        reverse={props.reverse}
      />
      <button className='button' onClick={props.handleSwap} aria-label="Swap"><img src={Swap}/></button>
    </div>
  )
}

export const DismissibleConversion: React.FC<DismissibleConversionProps> = (props) => {
  return (
    <div className='conversion control has-button-icon-right' role="figure">
      <Conversion
        base={props.base}
        amount={props.amount}
        total={props.total}
        quote={props.quote}
        reverse={props.reverse}
      />
      <button className='button' onClick={props.handleDismiss} aria-label="Close"><img src={Close}/></button>
    </div>
  )
}

export default Conversion
