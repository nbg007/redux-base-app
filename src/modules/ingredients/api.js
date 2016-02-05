import * as actionTypes from './action_types';
import { fetch, create, update, del } from '../../utils/rest_api';

const endpoint = 'ingredients/';
const singleEndpoint = (id) => endpoint + id;

function parse(json){
  return json.data;
}

export function loadAll(){
  return fetch(endpoint,
    [actionTypes.LOAD_INGREDIENTS_ATTEMPTED, actionTypes.LOAD_INGREDIENTS_SUCCEEDED, actionTypes.LOAD_INGREDIENTS_FAILED],
    {
      parse
    })
}

export function loadById(id){
  return fetch(singleEndpoint(id),
    [actionTypes.LOAD_ONE_INGREDIENT_ATTEMPTED, actionTypes.LOAD_ONE_INGREDIENT_SUCCEEDED, actionTypes.LOAD_ONE_INGREDIENT_FAILED],
    {
      parse
    })
}

const IngredientAPI = {
  loadAll,
  loadById
}

export default IngredientAPI;