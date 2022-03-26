import React from 'react'
import Input, { useInput } from '.'
import { act, cleanup, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event'

describe('Input component', () => {
  afterEach(cleanup)
  
  it('should render', () => {
    render(<Input value='' onChange={jest.fn()} />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })
})

describe('useInput hook', () => {
  afterEach(cleanup)

  it('should display the correct value', () => {
    const {result} = renderHook(() => useInput())

    expect(result.current.value).toBe('')

    act(() => {
      const event = {target: {value: "Hello"}} as React.ChangeEvent<HTMLInputElement>
      result.current.onChange(event)
    })

    expect(result.current.value).toBe('Hello')
  })
})

describe('Input component with useInput hook', () => {
  afterEach(cleanup)

  it('should have its value be updateable', () => {
    const Component = () => {
      const {value, onChange} = useInput()
      return <Input value={value} onChange={onChange} />
    }

    render(<Component />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveValue('')

    userEvent.type(inputElement, 'Hello')
    expect(inputElement).toHaveValue('Hello')

    userEvent.type(inputElement, ' John Doe')
    expect(inputElement).toHaveValue('Hello John Doe')

    userEvent.clear(inputElement)
    expect(inputElement).toHaveValue('')
  })
})
