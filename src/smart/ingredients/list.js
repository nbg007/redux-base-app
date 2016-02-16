import React, { Component, PropTypes } from 'react'
import IngredientList from '../../components/ingredients/list'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { loadAll, loadById } from '../../modules/ingredients'


class ListIngredients extends Component {
  componentDidMount(){
    this.props.loadAll()
  }

  handleItemClick(item){
    this.props.loadById(item.id)
  }

  render(){
    return (
      <div>
      <p><Link to="/ingredients/create">Crear</Link></p>
      <IngredientList
        items={ this.props.ingredients }
        onIngredientClick={(item) => { this.handleItemClick(item) }} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ loadAll, loadById }, dispatch)
}

function mapStateToProps(state){
  return {
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListIngredients)