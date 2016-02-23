import { createSelector } from "reselect"
import { findById } from '../../utils/common'

function findIngredients(ingredients, dishIngredients) {
  return ingredients.reduce( (acc, i) => {
    const dishIngredient = dishIngredients.find(di => {
      return i.id == di.id
    })
    dishIngredient ? acc.push(Object.assign({}, i, {amount: dishIngredient.amount})) : acc
    return acc
  }, [])
}

function find(ingredients, dishes, dishId) {
  const dish = findById(dishId, dishes)
  //WHATS THIS???
  dish.ingredients || (dish.ingredients = [])
  //dish.ingredients = dish.ingredients ? findIngredients(ingredients, dish.ingredients) : []
  return dish
}

const routeSelector = (state, props) => props.params.id
const listSelector = state => state.dishes.list
const ingredientsSelector = (state) => state.ingredients.list
const formSelector = (state) => state.form['create-dish'] ? state.form['create-dish'].ingredients : undefined

export const dishSelector = createSelector(
  routeSelector,
  ingredientsSelector,
  listSelector,
  (dishId, ingredients, dishes) => {
    return find(ingredients, dishes, dishId)
  }
)



function escandallo(ingredients, dishIngredients) {
  return dishIngredients.reduce((acc, di) => {
    const i = ingredients.find(i => {
      return i.id == di.id.value ? di.id.value : di.id
    })
    return acc + (i.cost * (di.amount.value ? di.amount.value : di.amount))
  }, 0)
}

export const escandalloSelector = createSelector(
  ingredientsSelector,
  formSelector,
  dishSelector,
  (ingredients, formIngredients, dish) => {
    return escandallo(ingredients, formIngredients ? formIngredients : dish.ingredients)
  }
)

export const totalSelector = createSelector(
  [dishSelector, escandalloSelector, ingredientsSelector],
  (dish, escandallo, ingredients) => {
    console.log('totalselector', dish, escandallo, ingredients)
    return {
      dish: dish,
      ingredients: ingredients,
      escandallo: escandallo
    }
  }
)
