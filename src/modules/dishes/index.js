import * as actions from './actions'
export * from './actions'

function dishList(state=[], action) {
  switch (action.type) {
    case actions.REQUEST_DISH_ATTEMPTED:
      return state.map(dish =>
        dish.id == action.payload.id ?
          Object.assign({}, action.payload) :
          dish
      )
    case actions.REQUEST_DISHES_SUCCEEDED:
      return action.payload
    case actions.EDIT_DISH:
      return state.map(dish =>
        dish.id == action.payload.id ?
          Object.assign({}, dish, action.payload) :
          dish
      )
    case actions.ADD_DISH_SUCCEEDED:
      return [
        {
          ...action.payload,
          id: state.reduce((maxId, dish) => Math.max(dish.id, maxId), 0) + 1
        },
        ...state
      ]
    case actions.REMOVE_DISH_SUCCEEDED:
      return state.filter(dish =>
        dish.id !== action.payload.id
      )
    default:
      return state
  }
}

// Reducers calculate a new state given the previous state and an action. They must be pure functions that return the exact same output for given inputs. They should also be free of side-effects.
export default function reducer(state = {
    isFetching: false,
    list: []
  }, action) {
  switch (action.type) {
    case actions.EDIT_DISH_SUCCEEDED:
    case actions.REMOVE_DISH_SUCCEEDED:
    case actions.ADD_DISH_SUCCEEDED:
      return Object.assign({}, state, {
        isFetching: false,
        list: dishList(state.list, action)
      })
    case actions.REQUEST_DISHES_ATTEMPTED:
      return Object.assign({}, state, {
        isFetching: true
      })
    case actions.REQUEST_DISHES_SUCCEEDED:
    case actions.REQUEST_DISH_SUCCEEDED:
      return Object.assign({}, state, {
        isFetching: false,
        list: dishList(state.list, action)
      })
    default:
      return state
  }
}
