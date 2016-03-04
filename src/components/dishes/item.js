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
      <li className='element-item'>
        <Link className='element-name' to={`/dishes/${dish.id}/show`}>{dish.name}</Link>
        {' '}
        <Link className='button button-sm button-primary' to={`/dishes/${dish.id}/edit`}><span className='fa fa-pencil'></span>{ editText }</Link>
        {' '}
        <button className='button button-sm button-error' onClick={ this.handleRemove }><span className='fa fa-trash'></span>{ removeText }</button>
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