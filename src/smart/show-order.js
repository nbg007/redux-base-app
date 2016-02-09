import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeOrder, fetchOrder } from '../modules/orders'
// Example with reselect
import { totalSelector, escandalloSelector } from '../modules/orders/selectors'
import ShowOrder from '../components/show-order'


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeOrder, fetchOrder }, dispatch)
}

export default connect(totalSelector, mapDispatchToProps)(ShowOrder)
