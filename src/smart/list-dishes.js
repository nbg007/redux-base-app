import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeDish } from '../modules/dishes'

// Components
import ListDishes from '../components/list-dishes'


function mapStateToProps(state) {
  return {
    isFetching: state.dishes.isFetching,
    list: state.dishes.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDishes)
