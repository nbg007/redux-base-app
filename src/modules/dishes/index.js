import * as actions from './actions'
export * from './actions'

function receiveSingleDish(list, dish){
  console.log('Receiving single dish', dish)
  let existing = list.find(x => x.id === dish.id)
  if(existing){
    return list.map(d => d.id === dish.id ? Object.assign({}, dish) : d)
  }
  return [dish, ...list]
}

function dishList(state=[], action) {
  switch (action.type) {
    case actions.REQUEST_DISH_SUCCEEDED:
      return receiveSingleDish(state, action.payload)
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
          ...action.payload
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
    case actions.REQUEST_DISH_ATTEMPTED:
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
