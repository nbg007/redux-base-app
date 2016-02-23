import { routeActions} from 'react-router-redux'
import { findById } from '../../utils/common'
import { fetch, create, update, del } from '../../utils/rest_api'


const MODULE_NAME = "base-app/ingredients/"
/* Common parse for every op in the API */
const parse = (x) => x.data
const opts = {
  parse
}

export const REQUEST_INGREDIENTS_ATTEMPTED = MODULE_NAME.concat("REQUEST:INGREDIENTS:ATTEMPTED")
export const REQUEST_INGREDIENTS_SUCCEEDED = MODULE_NAME.concat("REQUEST:INGREDIENTS:SUCCEEDED")

export function fetchIngredients() {
  return fetch('ingredients', [REQUEST_INGREDIENTS_ATTEMPTED, REQUEST_INGREDIENTS_SUCCEEDED], opts)
}



export const ADD_INGREDIENT_SUCCEEDED = MODULE_NAME.concat("ADD:INGREDIENT:SUCCEEDED")
export const ADD_INGREDIENT_ATTEMPTED = MODULE_NAME.concat("ADD:INGREDIENT:ATTEMPTED")
export const ADD_INGREDIENT_FAILED = MODULE_NAME.concat("ADD:INGREDIENT:FAILED")

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

export const EDIT_INGREDIENT_SUCCEEDED = MODULE_NAME.concat("EDIT:INGREDIENT:SUCCEEDED")
export const EDIT_INGREDIENT_FAILED = MODULE_NAME.concat("EDIT:INGREDIENT:FAILED")
export const EDIT_INGREDIENT_ATTEMPTED = MODULE_NAME.concat("EDIT:INGREDIENT:ATTEMPTED")

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

export function saveIngredient(ingredient){
  if(ingredient.id)
    return editIngredient(ingredient)
  else
    return addIngredient(ingredient)
}

export const REMOVE_INGREDIENT_SUCCEEDED = MODULE_NAME.concat("REMOVE:INGREDIENT:SUCCEEDED")
export const REMOVE_INGREDIENT_ATTEMPTED = MODULE_NAME.concat("REMOVE:INGREDIENT:ATTEMPTED")
export const REMOVE_INGREDIENT_FAILED = MODULE_NAME.concat("REMOVE:INGREDIENT:FAILED")


export function removeIngredient(ingredient) {
  return (dispatch, getState) => {
    const types = [REMOVE_INGREDIENT_ATTEMPTED, REMOVE_INGREDIENT_SUCCEEDED, REMOVE_INGREDIENT_FAILED]

    //NOTE ******
    //DELETING IS NOT CLEAR, in this case we're forcing that
    //the server answer is the ingredient id we just deleted
    //because the the reducer expects that
    const delParse = (x) => { return { id: ingredient.id } }
    //const delOnError = errors => errors[0]

    return dispatch(
      del(['ingredients', '/',  ingredient.id].join(''), types, { parse: delParse })
    ).then(() => {
      dispatch(routeActions.push('/ingredients/'))
    })
    .catch(err => {
      console.log(err)
      let error = err.errors[0];
      if(error.code === 'INGREDIENT_IN_USE'){
        window.alert('El ingredient está en uso en algún plato')
      }
      // TODO: Carlos. Control when the ingredient can not be removed due to referencial integrity
      // TODO: Carlos. Los errores deberian devolver un formato comun. Este podria ser {nameOfTheFieldIfExist: specificError, _error: genericError}
    })
  }
}

