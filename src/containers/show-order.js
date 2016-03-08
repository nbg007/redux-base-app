import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeOrder, fetchOrder } from '../modules/orders'
// Example with reselect
import { totalSelector } from '../modules/orders/selectors'
import React, { Component, PropTypes } from 'react'
import { formatDate } from "../utils/common"
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'
import OrderDishes from '../components/orders/order_dishes'

export class ShowOrder extends Component {
  componentDidMount() {
    this.props.fetchOrder(this.props.params.id)
  }
  render() {
    const { order, order: { id, createdAt}, isFetching, totalPrice, removeOrder, t, style } = this.props
    return (
      <div className='component short-wrap' style={style}>
        <span>
          <h1 className='gamma'>{t('showOrder.title')}</h1>
        </span>
        <div className='element-list'>
          <ul>
            {isFetching && <p>Loading...</p>}
            {!isFetching &&
              <div>
                <li className='element-item'><p><span className='item-list'>Order: </span> Order {id}</p></li>
                <li className='element-item'><p><span className='item-list'>Date:</span> {formatDate(createdAt)}</p></li>
                <li className='element-item'><p><span className='item-list'>Total:</span> {totalPrice}</p></li>
              </div>
            }
          </ul>
          <div className='action-group'>
            <Link className='button button-primary' to={`/orders/${id}/edit/`}><span className='fa fa-pencil'></span>{t('showOrder.editButton')}</Link>
            {' '}
            <button className='button button-error' onClick={(order) => removeOrder(order)}><span className='fa fa-trash'></span>{t('showOrder.removeButton')}</button>
          </div>
        </div>
        <OrderDishes dishes={ order.dishes || []} title={t('dishes.title')} />
      </div>
    )
  }
}

ShowOrder.propTypes = {
  order: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removeOrder: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeOrder, fetchOrder }, dispatch)
}

function mapStateToProps(state, ownProps){
  const emptyOrder = {
    id: '',
    createdAt: null,
    dishes: []
  }

  let order = state.orders.list.find(x => x.id === ownProps.params.id) || emptyOrder
  let totalPrice = order.dishes ? order.dishes.reduce((acc, d) => acc + (d.amount*d.price), 0) : 0

  return {
    isFetching: state.orders.isFetching,
    order,
    totalPrice
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ShowOrder))
//export default connect(totalSelector, mapDispatchToProps)(translate(['common'])(ShowOrder))
