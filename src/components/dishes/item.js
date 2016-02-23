import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class DishItem extends Component {
  constructor(props){
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }
  handleRemove(e){
    this.props.onRemove(this.props.dish)
  }

  render(){
    const { dish, editText, removeText } = this.props

    return (
      <li>
        <Link to={`/dishes/${dish.id}/show`}>{dish.name}</Link>
        {' '}
        <Link to={`/dishes/${dish.id}/edit`}>{ editText }</Link>
        {' '}
        <button onClick={ this.handleRemove }>{ removeText }</button>
      </li>
    )
  }
}

DishItem.propTypes = {
  dish: PropTypes.object.isRequired,
  editText: PropTypes.string.isRequired,
  removeText: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default DishItem