import React, { Component, PropTypes } from 'react';
import IngredientList from '../components/ingredients/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loadAll, loadById } from '../modules/ingredients';


class Ingredients extends Component {
  componentDidMount(){
    this.props.loadAll();
  }

  handleItemClick(item){
    this.props.loadById(item.id);
  }

  render(){
    return (
      <IngredientList
        items={ this.props.ingredients }
        onIngredientClick={(item) => { this.handleItemClick(item); }} />
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ loadAll, loadById }, dispatch);
}

function mapStateToProps(state){
  return {
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);