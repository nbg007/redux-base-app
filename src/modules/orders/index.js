import * as actions from './actions'
export * from './actions'

function orderList(state=[], action) {
  switch (action.type) {
    case actions.REQUEST_ORDER_SUCCEEDED:
      return state.map(order=>
        order.id == action.payload.id ?
          Object.assign({}, order, action.payload) :
          order
      )
    case actions.REQUEST_ORDERS_SUCCEEDED:
      return action.payload
    case actions.EDIT_ORDER_SUCCEEDED:
      return state.map(order =>
        order.id == action.payload.id ?
          Object.assign({}, order, action.payload) :
          order
      )
    case actions.ADD_ORDER_SUCCEEDED:
      return [
        {
          ...action.payload,
          id: state.reduce((maxId, order) => Math.max(order.id, maxId), 0) + 1
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
