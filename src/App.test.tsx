import React from 'react'
import { act, cleanup, render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'

jest.mock('./utils/api', () => {
  return {
    fetchRates: async () => {
      return {
        PHP: 50,
        JPY: 100,
      }
    },
  }
})

describe('App', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<App />)
    const element = screen.getByRole('main')
    expect(element).toBeInTheDocument()
  })

  it('should have a header', () => {
    render(<App />)
    const element = screen.getByText(/Currency Converter/i)
    expect(element).toBeInTheDocument()
  })

  it('should have a user input field', () => {
    render(<App />)
    const element = screen.getByLabelText('Currency conversion query')
    expect(element).toBeInTheDocument()
  })

  it('should show an error message if the query has an invalid format', () => {
    render(<App />)
    const query = screen.getByLabelText('Currency conversion query')
    const convert = screen.getByLabelText('Convert')

    userEvent.type(query, 'invalid query')
    userEvent.click(convert)

    const notification = screen.getByRole('alert')

    expect(notification).toBeInTheDocument()
    expect(notification).toHaveTextContent('Invalid input structure.')
  })

  it('should show the conversion result after a successful conversion query', async () => {
    render(<App />)
    const query = screen.getByLabelText('Currency conversion query')
    const convert = screen.getByLabelText('Convert')

    userEvent.type(query, '1 EUR to PHP')

    await act(async () => {
      userEvent.click(convert)
    })

    const conversion = screen.getByLabelText('Conversion result')

    expect(conversion).toBeInTheDocument()
    expect(conversion).toHaveTextContent('1 EUR equals50.00 PHP')
  })

  it('should push the earlier conversion result to the history after another successful conversion query', async () => {
    render(<App />)
    const query = screen.getByLabelText('Currency conversion query')
    const convert = screen.getByLabelText('Convert')

    userEvent.type(query, '1 EUR to PHP')
    await act(async () => {
      userEvent.click(convert)
    })

    const conversion = screen.getByLabelText('Conversion result')
    expect(conversion).toHaveTextContent('1 EUR equals50.00 PHP')

    userEvent.clear(query)
    userEvent.type(query, '1 EUR to JPY')
    await act(async () => {
      userEvent.click(convert)
    })

    const history = screen.getByLabelText('Previous amounts')
    expect(history).toHaveTextContent('1 EUR equals50.00 PHP')
  })
})
