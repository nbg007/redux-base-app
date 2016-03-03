import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class OrderItem extends Component {
  constructor(props){
    super(props)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleRemoveClick(e){
    e.preventDefault()
    this.props.onRemoveClick(this.props.order)
  }

  render(){
    const { order, orderText, dateText, editText, removeText } = this.props
    return (
       <li className='element-item'>
        <div className='element-name'>
          <Link to={`/orders/${order.id}/show`}>{orderText} {order.id} </Link>
          {dateText}
          {' '}
        </div>
        <Link className='button button-sm button-primary' to={`/orders/${order.id}/edit`}>{editText}</Link>
        {' '}
        <button className='button button-sm button-error' onClick={this.handleRemoveClick}>{removeText}</button>
      </li>
    )
  }
}

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  orderText: PropTypes.string.isRequired,
  dateText: PropTypes.string.isRequired,
  editText: PropTypes.string.isRequired,
  removeText: PropTypes.string.isRequired
}

export default OrderItem