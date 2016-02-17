/* Example with selectors */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeDish, fetchDish } from '../modules/dishes'
import { totalSelector } from '../modules/dishes/selectors'
import ShowDish from '../components/show-dish'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish, fetchDish }, dispatch)
}

export default connect(totalSelector, mapDispatchToProps)(ShowDish)
