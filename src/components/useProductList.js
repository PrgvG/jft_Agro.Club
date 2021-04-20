import { useCallback, useEffect, useReducer } from 'react'

// добавил поля для хранения категорий, которые придут от сервера и состояния запроса категорий, вроде ничего не забыл)
const initialState = {
  filter: {
    isNew: false,
    isLimited: false,
    category: [],
    search: '',
  },
  status: 'idle', // idle | work | success | error
  categoryStatus: 'idle', // success | error
  items: [],
  categories: [],
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'filter:change': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...state.filter,
          ...action.payload,
        },
      }
    }
    case 'filter:reset': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...initialState.filter,
        },
      }
    }
    case 'request:start': {
      return {
        ...state,
        status: 'work',
      }
    }
    case 'request:success': {
      return {
        ...state,
        status: 'success',
        items: action.payload,
      }
    }
    case 'request:error': {
      return {
        ...state,
        status: 'error',
      }
    }
    case 'cat-request:success': {
      return {
        ...state,
        categoryStatus: 'success',
        categories: action.payload,
      }
    }
    case 'cat-request:error': {
      return {
        ...state,
        categoryStatus: 'error',
      }
    }
  }
}
export const useProductList = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const updateFilter = useCallback((filter = {}) => dispatch({ type: 'filter:change', payload: filter }), [])
  const resetFilter = useCallback(() => dispatch({ type: 'filter:reset' }), [])

  // решил доработать то что было, оно ведь работало ;-)
  const performRequest = useCallback(
    (retries = 3) => {
      dispatch({ type: 'request:start' })
      const retryingFetch = url =>
        fetch(url).then(res => {
          if (res.ok) return res.json()
          if (retries > 0) performRequest(retries - 1)
          throw new Error(`Request failed with status code ${res.status}`)
        })
      // prettier-ignore
      const serializeFilter = filter =>
        [...filter.category.map(categoryId => `category[]=${categoryId}`), `isNew=${filter.isNew}`, `isLimited=${filter.isLimited}`, `search=${filter.search}`].join('&')
      retryingFetch(`/api/product?${serializeFilter(state.filter)}`)
        .then(data => dispatch({ type: 'request:success', payload: data.results }))
        .catch(() => dispatch({ type: 'request:error' }))
      retryingFetch('/api/category')
        .then(data => dispatch({ type: 'cat-request:success', payload: data }))
        .catch(() => dispatch({ type: 'cat-request:error' }))
    },
    [state.filter]
  )

  useEffect(() => {
    performRequest()
  }, [performRequest])

  return {
    ...state,
    updateFilter,
    resetFilter,
  }
}
