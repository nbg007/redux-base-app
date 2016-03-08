import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class OrderDishes extends Component {
  render(){
    const dishes = this.props.dishes || []
    return (
      <div className='brick'>
        <h3 className='gamma'>{this.props.title}</h3>
        <ul className='element-list'>
          { dishes.map(d => <li key={d.id}>{d.amount} x <Link to={`/dishes/${d.id}/show`}>{d.name}</Link> ({d.price})</li>) }
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