import React from 'react'

const useHistory = <Item>() => {
  type Actions =
    | {
        type: 'ADD'
        item: Item
      }
    | {
        type: 'REMOVE'
        index: number
      }
    | {
        type: 'CLEAR'
      }

  type Reducer = React.Reducer<Item[], Actions>

  const reducer: Reducer = (state: Item[], action) => {
    switch (action.type) {
      case 'ADD':
        return [action.item, ...state]
      case 'REMOVE':
        const duplicate = [...state]
        duplicate.splice(action.index, 1)
        return duplicate
      case 'CLEAR':
        return []
    }
  }

  const [items, dispatch] = React.useReducer<Reducer>(reducer, [])

  return {
    items,
    dispatch,
  }
}

export default useHistory
