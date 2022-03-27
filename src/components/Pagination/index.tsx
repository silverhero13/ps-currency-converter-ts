import React from 'react'
import range from '../../utils/range'
import Button from '../Button'

import './styles.css'

const Pagination: React.FC<{
  count: number
  page: number
  handlePageChange: (page: number) => React.MouseEventHandler
}> = (props) => {
  const pages = range(1, props.count)
  return (
    <div className="pagination" role="navigation" aria-label="Page navigation">
      {pages.map((page) => (
        <Button
          key={`pagination-button-${page}`}
          className={`page-number${props.page === page ? ' is-active' : ''}`}
          onClick={props.handlePageChange(page)}
          label={`Go to page ${page}`}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

export default Pagination
