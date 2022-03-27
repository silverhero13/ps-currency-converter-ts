import React from 'react'
import History from '.'
import { render, screen } from '@testing-library/react'

describe('History component', () => {
  it('should show the history items', () => {
    const items = [<p />, <p />, <p />]
    render(<History items={items} paginator={<div />} onClear={jest.fn()} />)
    const elements = screen.getAllByRole('listitem')

    expect(elements).toHaveLength(3)
  })

  it('should show the paginator', () => {
    render(
      <History
        items={[]}
        paginator={<div data-testid="paginator" />}
        onClear={jest.fn()}
      />,
    )
    const element = screen.getByTestId('paginator')

    expect(element).toBeInTheDocument()
  })
})
