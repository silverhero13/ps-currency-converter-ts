import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import Button from '.'

describe('Button component', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<Button onClick={jest.fn()}>Click me</Button>)
    const buttonElement = screen.getByRole('button')

    expect(buttonElement).toBeInTheDocument()
  })
})
