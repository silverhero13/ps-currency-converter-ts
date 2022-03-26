import React from 'react'
import Conversion, { DismissibleConversion, SwappableConversion } from '.'
import { act, cleanup, render, screen } from '@testing-library/react'

describe('Conversion component', () => {
  afterEach(cleanup)
  
  it('should render', () => {
    render(<Conversion base={'USD'} amount={1} total={50} quote={'PHP'} reverse={false} />)
    const element = screen.getByRole('article')

    expect(element).toBeInTheDocument()
  })

  it('should display the amount and base before the total and quote if display is not reversed', () => {
    render(<Conversion base={'USD'} amount={1} total={50} quote={'PHP'} reverse={false} />)
    const element = screen.getByRole('article')
    
    expect(element).toHaveTextContent('1 USD equals50.00 PHP')
  })

  it('should display the amount and base before the total and quote if display is not reversed', () => {
    render(<Conversion base={'USD'} amount={1} total={50} quote={'PHP'} reverse={true} />)
    const element = screen.getByRole('article')
    
    expect(element).toHaveTextContent('50.00 PHP equals1 USD')
  })
})

describe('SwappableConversion component', () =>{
  afterEach(cleanup)
  
  it('should render', () => {
    render(<SwappableConversion base={'USD'} amount={1} total={50} quote={'PHP'} reverse={false} handleSwap={jest.fn()} />)
    const element = screen.getByRole('figure')

    expect(element).toBeInTheDocument()
  })
})

describe('DismissibleConversion component', () =>{
  afterEach(cleanup)
  
  it('should render', () => {
    render(<DismissibleConversion base={'USD'} amount={1} total={50} quote={'PHP'} reverse={false} handleDismiss={jest.fn()} />)
    const element = screen.getByRole('figure')

    expect(element).toBeInTheDocument()
  })
})
