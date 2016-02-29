import * as actions from './actions'
export * from './actions'

function addToList(list, payload, idAttribute = 'id'){
  let existing = list.find(x => x[idAttribute] === payload[idAttribute])
  if(existing){
    return list.map(x => x[idAttribute] === payload[idAttribute] ? Object.assign({}, payload) : x)
  }
  return [payload, ...list]
}

function orderList(state=[], action) {
  switch (action.type) {
    case actions.REQUEST_ORDERS_SUCCEEDED:
      return action.payload
    case actions.REQUEST_ORDER_SUCCEEDED:
    case actions.EDIT_ORDER_SUCCEEDED:
      return addToList(state, action.payload)
    case actions.ADD_ORDER_SUCCEEDED:
      return [
        {
          ...action.payload
        },
        ...state
      ]
    case actions.REMOVE_ORDER_SUCCEEDED:
      return state.filter(order =>
        order.id !== action.payload.id
      )
    default:
      return state
  }
}

export default function reducer(state = {
    isFetching: false,
    list: []
  }, action) {
  switch (action.type) {
    case actions.EDIT_ORDER_SUCCEEDED:
    case actions.REMOVE_ORDER_SUCCEEDED:
    case actions.ADD_ORDER_SUCCEEDED:
      return Object.assign({}, state, {
        isFetching: false,
        list: orderList(state.list, action)
      })
    case actions.REQUEST_ORDERS_ATTEMPTED:
    case actions.REQUEST_ORDER_ATTEMPTED:
      return Object.assign({}, state, {
        isFetching: true
      })
    case actions.REQUEST_ORDERS_SUCCEEDED:
    case actions.REQUEST_ORDER_SUCCEEDED:
      return Object.assign({}, state, {
        isFetching: false,
        list: orderList(state.list, action)
      })
    default:
      return state
  }
}
