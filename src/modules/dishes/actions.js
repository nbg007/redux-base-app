import { routeActions } from 'react-router-redux'
import { CALL_API } from '../../middleware/api'

const MODULE_NAME = "base-app/dishes/"

export const REQUEST_DISHES_ATTEMPTED = MODULE_NAME.concat("REQUEST:DISHES")
export const REQUEST_DISHES_SUCCEEDED = MODULE_NAME.concat("RECEIVE:DISHES")
export const REQUEST_DISH_ATTEMPTED = MODULE_NAME.concat("REQUEST:DISH")
export const REQUEST_DISH_SUCCEEDED = MODULE_NAME.concat("RECEIVE:DISH")
export const ADD_DISH_SUCCEEDED = MODULE_NAME.concat("ADD:DISH")
export const ADD_DISH_ATTEMPTED = MODULE_NAME.concat("ADD:DISH_ATTEMPT")
export const ADD_DISH_FAILED = MODULE_NAME.concat("ADD:DISH_FAIL")
export const EDIT_DISH_SUCCEEDED = MODULE_NAME.concat("EDIT:DISH")
export const EDIT_DISH_FAILED = MODULE_NAME.concat("EDIT:DISH_FAIL")
export const EDIT_DISH_ATTEMPTED = MODULE_NAME.concat("EDIT:DISH_ATTEMPT")
export const REMOVE_DISH_SUCCEEDED = MODULE_NAME.concat("REMOVE:DISH")
export const REMOVE_DISH_ATTEMPTED = MODULE_NAME.concat("REMOVE:DISH_ATTEMPT")
export const REMOVE_DISH_FAILED = MODULE_NAME.concat("REMOVE:DISH_FAIL")


export function fetchDishes() {
  return {
    [CALL_API]: {
      endpoint: 'dishes',
      authenticated: true,
      types: [REQUEST_DISHES_ATTEMPTED, REQUEST_DISHES_SUCCEEDED]
    }
  }
}

export function fetchDish(id) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['dishes', '/',  id].join(''),
        authenticated: true,
        types: [REQUEST_DISH_ATTEMPTED, REQUEST_DISH_SUCCEEDED]
      }
    })
  }
}

export function addDish(dish) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: 'dishes',
        authenticated: true,
        config: {
          method: 'POST',
          body: JSON.stringify(dish)
        },
        types: [ADD_DISH_ATTEMPTED, ADD_DISH_SUCCEEDED, ADD_DISH_FAILED]
      }
    }).then( ({ payload }) => {
      dispatch(routeActions.push('/dishes/'))
    }).catch(() => {
      return Promise.reject({name: "Dish already exists", _error: 'Addition fail'})
    })
  }
}

export function editDish(dish) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['dishes', '/',  dish.id].join(''),
        authenticated: true,
        config: {
          method: 'PUT',
          body: JSON.stringify(dish)
        },
        types: [EDIT_DISH_ATTEMPTED, EDIT_DISH_SUCCEEDED, EDIT_DISH_FAILED]
      }
    }).then( ({ payload }) => {
      dispatch(routeActions.push('/dishes/'))
    }).catch(() => {
      return Promise.reject({name: "Dish does not exists", _error: 'Edition fail'})
    })
  }
}

export function removeDish(dish) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['dishes', '/',  dish.id].join(''),
        authenticated: true,
        config: {
          method: 'DELETE'
        },
        types: [REMOVE_DISH_ATTEMPTED, REMOVE_DISH_SUCCEEDED, REMOVE_DISH_FAILED]
      }
    }).then( ({ payload }) => {
      dispatch(routeActions.push('/dishes/'))
    })
  }
}
