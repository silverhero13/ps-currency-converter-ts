import * as React from 'react'
import Header from './components/Header'
import Input, { useInput } from './components/Input'
import useHistory from './custom-hooks/useHistory'
import usePagination from './custom-hooks/usePagination'
import { fetchRates } from './utils/api'
import Search from './svg/magnify.svg'
import {
  DismissibleConversion,
  SwappableConversion,
} from './components/Conversion'
import ErrorNotification from './components/ErrorNotification'
import History from './components/History'
import { parseInput } from './utils/parseInput'
import Button from './components/Button'
import Pagination from './components/Pagination'

import './App.css'

interface ConversionData {
  base: string
  amount: number
  rate: number
  quote: string
  reverse: boolean
}

const App = () => {
  const txt_query = useInput()
  const history = useHistory<ConversionData>()
  const paginated_history = usePagination(history.items, 5)
  const [current_exchange, setCurrentExchange] =
    React.useState<ConversionData>()
  const [is_fetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSwapConversion = () => {
    if (current_exchange) {
      setCurrentExchange({
        ...current_exchange,
        reverse: !current_exchange?.reverse,
      })
    }
  }

  const handleDismissConversion =
    (index: number): React.MouseEventHandler =>
    () => {
      history.dispatch({
        type: 'REMOVE',
        index,
      })
    }

  const handleClearHistory = () => {
    history.dispatch({
      type: 'CLEAR',
    })
  }

  const handleSubmit = async () => {
    setError('')
    setIsFetching(true)

    try {
      const { fromAmount, fromCurrency, toCurrency } = parseInput(
        txt_query.value,
      )

      const rates = await fetchRates(fromCurrency)

      if (!rates[toCurrency]) {
        throw new Error(`Quote '${toCurrency}' is not supported.`)
      }

      if (current_exchange) {
        history.dispatch({
          type: 'ADD',
          item: current_exchange,
        })
      }

      setCurrentExchange({
        base: fromCurrency,
        amount: Number(fromAmount),
        rate: rates[toCurrency],
        quote: toCurrency,
        reverse: false,
      })
    } catch (e: any) {
      setError(e.message || 'An unexpected error occured.')
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div className="app" role="main">
      <div className="app__content">
        <Header />

        <div className="control has-button-icon-right">
          <Input
            value={txt_query.value}
            label="Currency conversion query"
            onChange={txt_query.onChange}
            placeholder="e.g. 1 EUR to USD"
          />
          <Button
            className="button"
            loading={is_fetching}
            onClick={handleSubmit}
            label="Convert"
          >
            <img src={Search} />
          </Button>
        </div>

        {error && <ErrorNotification message={error} />}

        {current_exchange && (
          <SwappableConversion
            base={current_exchange.base}
            amount={current_exchange.amount}
            total={current_exchange.amount * current_exchange.rate}
            quote={current_exchange.quote}
            reverse={current_exchange.reverse}
            handleSwap={handleSwapConversion}
          />
        )}

        <History
          items={paginated_history.content.map((item, idx) => (
            <DismissibleConversion
              base={item.base}
              amount={item.amount}
              total={item.amount * item.rate}
              quote={item.quote}
              reverse={item.reverse}
              handleDismiss={handleDismissConversion(
                (paginated_history.page - 1) * 5 + idx,
              )}
            />
          ))}
          paginator={
            <Pagination
              count={paginated_history.count}
              page={paginated_history.page}
              handlePageChange={paginated_history.handlePageChange}
            />
          }
          onClear={handleClearHistory}
        />
      </div>
    </div>
  )
}

export default App
