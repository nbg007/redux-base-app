import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class Item extends Component {
  render(){
    const { id, name, cost, stock } = this.props.item;
    return (
      <li>
        <Link to={`/ingredients/${id}`}>{ name }</Link>. Cost: { cost }. Stock: { stock }
      </li>
    )
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Item;