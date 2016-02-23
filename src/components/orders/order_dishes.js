import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class OrderDishes extends Component {
  render(){
    const dishes = this.props.dishes || []
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ul>
          { dishes.map(d => <li key={d.id}><Link to={`/dishes/${d.id}/show`}>{d.name}</Link></li>) }
        </ul>
      </div>
    )
  }
}

OrderDishes.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired
}

export default OrderDishes