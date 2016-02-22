import { routeActions} from 'react-router-redux'
import { findById } from '../../utils/common'
import { fetch, create, update, del } from '../../utils/rest_api'


const MODULE_NAME = "base-app/ingredients/"

export const REQUEST_INGREDIENTS_ATTEMPTED = MODULE_NAME.concat("REQUEST:INGREDIENTS")
export const REQUEST_INGREDIENTS_SUCCEEDED = MODULE_NAME.concat("RECEIVE:INGREDIENTS")
export const ADD_INGREDIENT_SUCCEEDED = MODULE_NAME.concat("ADD:INGREDIENT")
export const ADD_INGREDIENT_ATTEMPTED = MODULE_NAME.concat("ADD:INGREDIENT_ATTEMPT")
export const ADD_INGREDIENT_FAILED = MODULE_NAME.concat("ADD:INGREDIENT_FAIL")
export const EDIT_INGREDIENT_SUCCEEDED = MODULE_NAME.concat("EDIT:INGREDIENT")
export const EDIT_INGREDIENT_FAILED = MODULE_NAME.concat("EDIT:INGREDIENT_FAIL")
export const EDIT_INGREDIENT_ATTEMPTED = MODULE_NAME.concat("EDIT:INGREDIENT_ATTEMPT")
export const REMOVE_INGREDIENT_SUCCEEDED = MODULE_NAME.concat("REMOVE:INGREDIENT")
export const REMOVE_INGREDIENT_ATTEMPTED = MODULE_NAME.concat("REMOVE:INGREDIENT_ATTEMPT")
export const REMOVE_INGREDIENT_FAILED = MODULE_NAME.concat("REMOVE:INGREDIENT_FAIL")

const parse = (x) => x.data

const opts = {
  parse
}

export function fetchIngredients() {
  return fetch('ingredients', [REQUEST_INGREDIENTS_ATTEMPTED, REQUEST_INGREDIENTS_SUCCEEDED], opts)
}

export function addIngredient(ingredient) {
  return (dispatch, getState) => {
    const types = [ADD_INGREDIENT_ATTEMPTED, ADD_INGREDIENT_SUCCEEDED, ADD_INGREDIENT_FAILED]
    return dispatch(
      create('ingredients', ingredient, types, opts)
    )
    .then( ({ payload }) => {
      dispatch(routeActions.push('/ingredients/'))
    })
    .catch(() => {
      return Promise.reject({name: "Ingredient already exists", _error: 'Addition fail'})
    })
  }
}

export function editIngredient(ingredient) {
  return (dispatch, getState) => {
    const types = [EDIT_INGREDIENT_ATTEMPTED, EDIT_INGREDIENT_SUCCEEDED, EDIT_INGREDIENT_FAILED]
    return dispatch(
      update(['ingredients', '/',  ingredient.id].join(''), ingredient, types, opts)
    )
    .then( ({ payload }) => {
      dispatch(routeActions.push('/ingredients/'))
    })
    .catch((e) => {
      return Promise.reject({name: "Ingredient does not exists", _error: 'Edition fail'})
    })
  }
}

export function removeIngredient(ingredient) {
  return (dispatch, getState) => {
    const types = [REMOVE_INGREDIENT_ATTEMPTED, REMOVE_INGREDIENT_SUCCEEDED, REMOVE_INGREDIENT_FAILED]

    //REMOVING IS NOT CLEAR, in this case we're forcing that
    //the server answer is the ingredient id we just deleted
    //because the the reducer expects that
    const delParse = (x) => { return { id: ingredient.id } }

    return dispatch(
      del(['ingredients', '/',  ingredient.id].join(''), types, { parse: delParse })
    ).then(() => {
      // TODO: Carlos. Control when the ingredient can not be removed due to referencial integrity
      // TODO: Carlos. Los errores deberian devolver un formato comun. Este podria ser {nameOfTheFieldIfExist: specificError, _error: genericError}
      dispatch(routeActions.push('/ingredients/'))
    })
    .catch(err => {

    })
  }
}

export function checkAvailability(order) {
  return (dispatch, getState) => {
    return dispatch(fetchIngredients())
    return dispatch(fetchDishes())
    .then(() => {
      const ingredients = getState().ingredients.list
      const dishes = getState().dishes.list
      return order.dishes.reduce((acc, d) => {
        const dish = findById(d.id, dishes)
        const available = dish.ingredients.reduce((acc, ingredient) => {
          return acc && (ingredient.amount < findById(ingredient.id, ingredients).stock)
        }, true)
        available ? acc : acc.push(dish)
        return acc
      }, [])
    })
    .then((dishesNotAvailable) => {
      if (dishesNotAvailable.length > 0) {
        return Promise.reject({_error: "There are some dishes not available right now: " + dishesNotAvailable.map( d => {return d.name}).join(", "), name: 'dishes'})
      }
      return Promise.resolve()
    })
  }
}
