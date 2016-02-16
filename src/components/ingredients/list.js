import React, { PropTypes, Component } from 'react'
import IngredientItem from './item'


class List extends Component {
  handleItemClick(item){
    this.props.onIngredientClick(item)
  }

  render(){

    const ingredients = this.props.items.map(x =>
      <IngredientItem key={x.id}
        onClick={(item) => this.handleItemClick(item)}
        item={x} />
    )

    return (
      <div>
        <h1>Ingredients</h1>
        <ul>
          { ingredients }
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  onIngredientClick: PropTypes.func.isRequired
}

export default List;