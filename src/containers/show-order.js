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
      <div className='component' style={style}>
        <span>
          <h1>{t('showOrder.title')}</h1>
        </span>
        <ul>
          {isFetching && <p>Loading...</p>}
          {!isFetching &&
            <div>
              <li><p>Order {id}</p></li>
              <li><p>{formatDate(createdAt)}</p></li>
              <li><p>{totalPrice}</p></li>
            </div>
          }
        </ul>
        <Link to={`/orders/${id}/edit/`}>{t('showOrder.editButton')}</Link>
        {' '}
        <button onClick={(order) => removeOrder(order)}>{t('showOrder.removeButton')}</button>
        <hr />
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
