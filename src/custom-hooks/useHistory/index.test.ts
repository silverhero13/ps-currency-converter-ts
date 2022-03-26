import React from 'react'
import useHistory from '.'
import { act, cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

describe('useHistory hook', () => {
  afterEach(cleanup)

  it('should initially have an empty history', () => {
    const {result} = renderHook(() => useHistory())

    expect(result.current.items).toEqual([])
  })

  it('should allow adding items to the history', () => {
    const {result} = renderHook(() => useHistory())

    expect(result.current.items).toEqual([])

    act(() => {
      result.current.dispatch({
        type: 'ADD',
        item: 'Alpha'
      })
    })

    expect(result.current.items).toEqual(['Alpha'])
  })

  it('should add the latest history to the beginning of the list', () => {
    const {result} = renderHook(() => useHistory())

    expect(result.current.items).toEqual([])

    act(() => {
      result.current.dispatch({
        type: 'ADD',
        item: 'Alpha'
      })

      result.current.dispatch({
        type: 'ADD',
        item: 'Beta'
      })
    })

    expect(result.current.items[0]).toEqual('Beta')
  })

  it('should allow removing of a history item using its index', () => {
    const {result} = renderHook(() => useHistory())

    expect(result.current.items).toEqual([])

    act(() => {
      result.current.dispatch({
        type: 'ADD',
        item: 'Alpha'
      })

      result.current.dispatch({
        type: 'ADD',
        item: 'Beta'
      })

      result.current.dispatch({
        type: 'ADD',
        item: 'Gamma'
      })
    })

    expect(result.current.items).toEqual(['Gamma', 'Beta', 'Alpha'])

    act(() => {
      result.current.dispatch({
        type: 'REMOVE',
        index: 1
      })
    })

    expect(result.current.items).toEqual(['Gamma', 'Alpha'])

    act(() => {
      result.current.dispatch({
        type: 'REMOVE',
        index: 1
      })
    })

    expect(result.current.items).toEqual(['Gamma'])
  })
})
