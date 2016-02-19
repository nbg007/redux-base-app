import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeIngredient } from '../modules/ingredients'
import ShowIngredient from '../components/show-ingredient'

function mapStateToProps(state, ownProps) {
  return {
    ingredient: state.ingredients.list.find((e) => {return e.id == ownProps.params.id})
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeIngredient }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowIngredient)
