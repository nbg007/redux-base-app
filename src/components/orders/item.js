import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class OrderItem extends Component {
  constructor(props){
    super(props)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleRemoveClick(e){
    e.preventDefault()
    console.log('Binded', this)
    //this.props.onRemoveClick(this.props.order)
  }

  render(){
    const { order, orderText, dateText, editText, removeText } = this.props
    return (
       <li>
          <Link to={`/orders/${order.id}/show`}>{orderText} {order.id} </Link>
          {dateText}
          {' '}
          <Link to={`/orders/${order.id}/edit`}>{editText}</Link>
          {' '}
          <button onClick={this.handleRemoveClick}>{removeText}</button>
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