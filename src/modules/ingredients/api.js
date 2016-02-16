import * as actionTypes from './action_types';
import { fetch, create, update, del } from '../../utils/rest_api';

const endpoint = 'ingredients/';
const singleEndpoint = (id) => endpoint + id;

function parse(json){
  return json.data;
}

/**
 * Converts API JSON Schema errors
 * into the _weird_ format expected by redux-form
 */
function createFormError(message){
  return (response) => {
    const errors = response.errors
    if(!errors) return response
    let rfError = {
      _error: message
    };
    errors.forEach(err => {
      rfError[err.property] = err.property + ' ' + err.message
    })
    return rfError
  }
}

function prepareIngredient(ing){
  return Object.assign({}, { name: ing.name, cost: parseFloat(ing.cost), stock: parseInt(ing.stock)})
}

export function loadAll(){
  return fetch(endpoint,
    [
      actionTypes.LOAD_INGREDIENTS_ATTEMPTED,
      actionTypes.LOAD_INGREDIENTS_SUCCEEDED,
      actionTypes.LOAD_INGREDIENTS_FAILED
    ],
    {
      parse
    })
}

export function loadById(id){
  return fetch(singleEndpoint(id),
    [
      actionTypes.LOAD_ONE_INGREDIENT_ATTEMPTED,
      actionTypes.LOAD_ONE_INGREDIENT_SUCCEEDED,
      actionTypes.LOAD_ONE_INGREDIENT_FAILED
    ],
    {
      parse
    })
}

export function createIngredient(data){
  return create(
    endpoint,
    data,
    [
      actionTypes.CREATE_INGREDIENT_ATTEMPTED,
      actionTypes.CREATE_INGREDIENT_SUCCEEDED,
      actionTypes.CREATE_INGREDIENT_FAILED
    ],
    {
      prepare: prepareIngredient,
      parse,
      onError: createFormError('Ingredient can not be saved')
    }
  )
}

export function updateIngredient(id, data){
  return update(
    singleEndpoint(id),
    data,
    [
      actionTypes.UPDATE_INGREDIENT_ATTEMPTED,
      actionTypes.UPDATE_INGREDIENT_SUCCEEDED,
      actionTypes.UPDATE_INGREDIENT_FAILED
    ],
    {
      prepare: prepareIngredient,
      parse,
      onError: createFormError('Ingredient can not be saved')
    }
  )
}

const IngredientAPI = {
  loadAll,
  loadById,
  createIngredient,
  updateIngredient
}

export default IngredientAPI;