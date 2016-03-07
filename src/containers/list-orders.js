import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchOrders, removeOrder } from '../modules/orders'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CalendarOrder from './calendar-order';
import { formatDate } from '../utils/common'
import { translate } from 'react-i18next/lib'

import OrderListItem from '../components/orders/item'

export class ListOrders extends Component {
  constructor(props){
    super(props)
    this.handleItemRemove = this.handleItemRemove.bind(this)
  }
  componentDidMount(){
    this.props.fetchOrders()
  }
  handleItemRemove(order){
    this.props.removeOrder(order)
  }
  render() {
    const { isFetching, list, removeOrder, t } = this.props
    return (
      <div className='component' style={this.props.style}>
        <span>
          <h1 className='beta'>{t('listOrders.title')}</h1>
        </span>
        <ul className='element-list'>
          {isFetching && <p>{t('listOrders.loading')}</p>}
          {!isFetching && list.length == 0 && <p>{t('listOrders.empty')}</p>}
          {!isFetching && list.length > 0 && list.map((o) =>
            <OrderListItem key={o.id}
              order={o}
              orderText={t('listOrders.order')}
              dateText={t('listOrders.date', { date: formatDate(o.createdAt)})}
              editText={t('listOrders.editButton')}
              removeText={t('listOrders.removeButton')}
              onRemoveClick={ this.handleItemRemove } />)
          }
        </ul>
        <CalendarOrder />
      </div>
    )
  }
}



ListOrders.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  removeOrder: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    isFetching: state.orders.isFetching,
    list: state.orders.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeOrder, fetchOrders }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ListOrders))
