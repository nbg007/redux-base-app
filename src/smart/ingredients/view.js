import React, { Component, PropTypes } from 'react'
import View from '../../components/ingredients/view'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

class ViewIngredient extends Component {
  handleEdit(id){
    this.props.push(`/ingredients/${id}/edit`)
  }

  render(){
    return (
      <View ingredient={ this.props.ingredient } onEdit={(id) => this.handleEdit(id)} />
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ push }, dispatch)
}

function mapStateToProps(state, props){
  return {
    ingredient: state.ingredients.find(x => x.id === props.params.id)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewIngredient)