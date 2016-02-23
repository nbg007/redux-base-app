import { routeActions } from 'react-router-redux'
import { fetch, create, update, del } from '../../utils/rest_api'

const MODULE_NAME = "base-app/dishes/"
const URL = 'dishes'
const parse = x => x.data
const opts = { parse }

export const REQUEST_DISHES_ATTEMPTED = MODULE_NAME.concat("REQUEST:DISHES:ATTEMPTED")
export const REQUEST_DISHES_SUCCEEDED = MODULE_NAME.concat("RECEIVE:DISHES:SUCCEEDED")
export function fetchDishes() {
  let types = [REQUEST_DISHES_ATTEMPTED, REQUEST_DISHES_SUCCEEDED]
  return fetch(URL, types, opts)
}

export const REQUEST_DISH_ATTEMPTED = MODULE_NAME.concat("REQUEST:DISH:ATTEMPTED")
export const REQUEST_DISH_SUCCEEDED = MODULE_NAME.concat("RECEIVE:DISH:SUCCEEDED")
export function fetchDish(id) {
  let types = [REQUEST_DISH_ATTEMPTED, REQUEST_DISH_SUCCEEDED]
  return (dispatch, getState) => {
    return dispatch(fetch(`${URL}/${id}`, types, opts))
  }
}

export const ADD_DISH_ATTEMPTED = MODULE_NAME.concat("ADD:DISH:ATTEMPTED")
export const ADD_DISH_SUCCEEDED = MODULE_NAME.concat("ADD:DISH:SUCCEEDED")
export const ADD_DISH_FAILED = MODULE_NAME.concat("ADD:DISH:FAILED")
export function addDish(dish) {
  let types = [ADD_DISH_ATTEMPTED, ADD_DISH_SUCCEEDED, ADD_DISH_FAILED]
  return (dispatch, getState) => {
    return dispatch(create(URL, dish, types, opts))
    .then(() => {
      dispatch(routeActions.push('/dishes/'))
    })
    .catch((err) => {
      console.log(err)
      return Promise.reject({name: "Dish already exists", _error: 'Addition fail'})
    })
  }
}


export const EDIT_DISH_ATTEMPTED = MODULE_NAME.concat("EDIT:DISH:ATTEMPTED")
export const EDIT_DISH_SUCCEEDED = MODULE_NAME.concat("EDIT:DISH:SUCCEEDED")
export const EDIT_DISH_FAILED = MODULE_NAME.concat("EDIT:DISH:FAILED")
export function editDish(dish) {
  let types = [EDIT_DISH_ATTEMPTED, EDIT_DISH_SUCCEEDED, EDIT_DISH_FAILED]
  return (dispatch, getState) => {
    return dispatch(update(`${URL}/${dish.id}`, dish, types, opts))
    .then( ({ payload }) => {
      dispatch(routeActions.push('/dishes/'))
    })
    .catch((err) => {
      console.log('Update dish fail', err)
      return Promise.reject({name: "Dish does not exists", _error: 'Edition fail'})
    })
  }
}

export const REMOVE_DISH_ATTEMPTED = MODULE_NAME.concat("REMOVE:DISH:ATTEMPTED")
export const REMOVE_DISH_SUCCEEDED = MODULE_NAME.concat("REMOVE:DISH:SUCCEEDED")
export const REMOVE_DISH_FAILED = MODULE_NAME.concat("REMOVE:DISH:FAILED")
export function removeDish(dish) {
  console.log('Delete dish', dish)
  return (dispatch, getState) => {
    let types = [REMOVE_DISH_ATTEMPTED, REMOVE_DISH_SUCCEEDED, REMOVE_DISH_FAILED]
    let delParse = x => ({ id: dish.id })
    let delOptions = { parse: delParse }
    return dispatch(del(`${URL}/${dish.id}`, types, delOptions))
    .then((x) => {
      console.log('Remove dish', x)
      dispatch(routeActions.push('/dishes/'))
    })
  }
}
