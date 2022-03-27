import React from 'react'
import usePagination from '.'
import { act, cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

describe('usePagination hook', () => {
  afterEach(cleanup)

  it('should partition the pages correctly', () => {
    const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const { result } = renderHook(() => usePagination(items, 5))

    expect(result.current.count).toEqual(2)
    expect(result.current.pages).toEqual([
      ['A', 'B', 'C', 'D', 'E'],
      ['F', 'G'],
    ])
  })

  it('should switch pages correctly', () => {
    const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const { result } = renderHook(() => usePagination(items, 5))

    expect(result.current.page).toEqual(1)
    expect(result.current.currentContents).toEqual(['A', 'B', 'C', 'D', 'E'])

    act(() => {
      result.current.handlePageChange(2)({} as React.MouseEvent)
    })

    expect(result.current.page).toEqual(2)
    expect(result.current.currentContents).toEqual(['F', 'G'])
  })
})
