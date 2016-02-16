import React, { Component, PropTypes } from 'react'
import Edit from '../../components/ingredients/edit'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateIngredient } from '../../modules/ingredients'

class EditIngredient extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(ingredient){
    return this.props.updateIngredient(this.props.params.id, ingredient)
  }

  render(){
    return (
      <Edit
        mode='edit'
        initialValues={ this.props.initialValues }
        onSubmit={ this.handleSubmit } />
    )
  }
}

function mapStateToProps(state, props){
  let ingredient = state.ingredients.find(x => x.id === props.params.id)
  return {
    initialValues: {
      name: ingredient.name,
      cost: ingredient.cost,
      stock: ingredient.stock
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateIngredient }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditIngredient);