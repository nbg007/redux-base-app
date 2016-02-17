import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import CalendarOrder from '../smart/calendar-order';
import { formatDate } from '../utils/common'
import { translate } from 'react-i18next/lib'

class ListOrders extends Component {
  render() {
    const { isFetching, list, removeOrder, t } = this.props
    return (
      <div className='component' style={this.props.style}>
        <span>
          <h1>{t('listOrders.title')}</h1>
        </span>
        <ul>
          {isFetching && <p>{t('listOrders.loading')}</p>}
          {!isFetching && list.length == 0 && <p>{t('listOrders.empty')}</p>}
          {!isFetching && list.length > 0 && list.map((o, index) =>
            <li key={index}>
              <Link to={`/orders/${o.id}/show`}>{t('listOrders.order')}{o.id} </Link>
              {t('listOrders.date', { date: formatDate(o.createdAt)})}
              {' '}
              <Link to={`/orders/${o.id}/edit`}>{t('listOrders.editButton')}</Link>
              {' '}
              <button onClick={removeOrder.bind(this, o)}>{t('listOrders.removeButton')}</button>
            </li>)
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
  list: PropTypes.array.isRequired
}

export default translate(['common'])(ListOrders) 
