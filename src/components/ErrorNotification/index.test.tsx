import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import ErrorNotification from '.'

describe('ErrorNotification component', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<ErrorNotification message="Oh no!" />)
    const errorElement = screen.getByRole('alert')

    expect(errorElement).toBeInTheDocument()
  })

  it('should display the correct text', () => {
    render(<ErrorNotification message="Oh no!" />)
    const errorElement = screen.getByRole('alert')

    expect(errorElement).toHaveTextContent('Oh no!')
  })
})
