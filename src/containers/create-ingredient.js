/* Example without selectors */

import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/* Actions */
import { saveIngredient } from '../modules/ingredients'

/* Components */
import CreateIngredientForm from '../components/ingredients/create-ingredient'


class CreateIngredient extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(ingredient) {
    this.props.saveIngredient(ingredient)
  }
  render() {
    const { ingredient, style } = this.props
    return (
      <CreateIngredientForm onSubmit={ this.handleSubmit } initialValues={ ingredient } style={style}/>
    )
  }
}

CreateIngredient.propTypes = {
  ingredient: PropTypes.object,
  addIngredient: PropTypes.func
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id
  if (!id) return {}
  return {
    ingredient: state.ingredients.list.find((e) => {return e.id == id})
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveIngredient }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateIngredient)
