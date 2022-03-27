import { render, screen } from '@testing-library/react'
import React from 'react'
import Pagination from '.'

describe('Pagination component', () => {
  it('should render', () => {
    render(<Pagination count={5} page={1} handlePageChange={jest.fn()} />)
    const element = screen.getByRole('navigation')

    expect(element).toBeInTheDocument()
  })
})
