import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeOrder, fetchOrder } from '../modules/orders'
// Example with reselect
import { totalSelector } from '../modules/orders/selectors'
import React, { Component, PropTypes } from 'react'
import { formatDate } from "../utils/common"
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'


export class ShowOrder extends Component {
  componentDidMount() {
    this.props.fetchOrder(this.props.params.id)  
  }
  render() {
    const { order, order: { id, createdAt}, pvp, isFetching, removeOrder, t, style } = this.props
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
              <li><p>{pvp}</p></li>
            </div>
          }
        </ul>
        <Link to={`/orders/${id}/edit/`}>{t('showOrder.editButton')}</Link>
        {' '}
        <button onClick={(order) => removeOrder(order)}>{t('showOrder.removeButton')}</button>
        
      </div>
    )
  }
}

ShowOrder.propTypes = {
  order: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  removeOrder: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeOrder, fetchOrder }, dispatch)
}

export default connect(totalSelector, mapDispatchToProps)(translate(['common'])(ShowOrder))
