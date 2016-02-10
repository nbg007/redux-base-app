import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeOrder } from '../modules/orders'

//Components
import ListOrders from '../components/list-orders'

function mapStateToProps(state) {
  return {
    isFetching: state.orders.isFetching,
    list: state.orders.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOrders)
