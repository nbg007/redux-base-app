import React, { PropTypes, Component } from 'react'

class DishIngredientItem extends Component {
  render(){
    const { ingredient } = this.props
    return (
      <li>{ingredient.name} ({ingredient.amount})</li>
    )
  }
}

DishIngredientItem.propTypes = {
  ingredient: PropTypes.object.isRequired
}

export default class DishIngredientList extends Component {
  render(){
    const { ingredients } = this.props
    const items = ingredients ? ingredients.map(ing => <DishIngredientItem key={ing.id} ingredient={ing} />) : []
    return (
      <div className='brick'>
        <h3 className='gamma'>Ingredients</h3>
        <ul className='element-list'>
          { items }
        </ul>
      </div>
    )
  }
}

DishIngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
}