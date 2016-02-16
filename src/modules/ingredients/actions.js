import * as actionTypes from './action_types'
import API from './api'
import { push } from 'react-router-redux'

export function loadAll(){
  return (dispatch, getState) => {
    return dispatch(API.loadAll())
  }
}

export function loadById(id){
  return (dispatch, getState) => {
    return dispatch(API.loadById(id))
  }
}

export function createIngredient(data){
  return (dispatch, getState) => {
    return dispatch(API.createIngredient(data))
      .then(ingredient => {
        //view the newly created ingredient
        return dispatch(push(`/ingredients/${ingredient.id}`))
      })
  }
}

export function updateIngredient(id, data){
  return (dispatch, getState) => {
    return dispatch(API.updateIngredient(id, data))
      .then(ingredient => {
        return dispatch(push(`/ingredients/${ingredient.id}`))
      })
  }
}