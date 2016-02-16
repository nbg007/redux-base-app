import React, { Component, PropTypes } from 'react'
import Edit from '../../components/ingredients/edit'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createIngredient } from '../../modules/ingredients'

class CreateIngredient extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(data){
    return this.props.createIngredient(data)
  }
  render(){
    return (
      <Edit
        mode='create'
        initialValues={ this.props.initialValues }
        onSubmit={ this.handleSubmit } />
    )
  }
}

function mapStateToProps(state, props){
  return {
    initialValues: {
      name: '',
      cost: 0,
      stock: 0
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createIngredient }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateIngredient)