import React from 'react'
import range from '../../utils/range'

const usePagination = <Item>(items: Item[], maxItems: number) => {
  const [page, setPage] = React.useState(1)

  const handlePageChange =
    (page: number): React.MouseEventHandler =>
    () => {
      setPage(page)
    }

  const pages = React.useMemo(() => {
    const maxPage = Math.ceil(items.length / maxItems)
    const pages = range(0, maxPage - 1)

    return pages.map((page) => {
      const start = maxItems * page
      const end = start + maxItems
      return items.slice(start, end)
    })
  }, [items.length])

  return {
    count: pages.length,
    page,
    pages,
    currentContents: pages[page - 1] || [],
    handlePageChange,
  }
}

export default usePagination
