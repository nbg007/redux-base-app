import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd';
import bindActionData from 'redux-form/lib/bindActionData'
import HTML5Backend from 'react-dnd-html5-backend'

/* Selectors */
import { totalSelector } from '../modules/dishes/selectors'

/* Actions */
import { addDish, editDish, fetchDish } from '../modules/dishes'
import { fetchIngredientsIfNeeded } from '../modules/ingredients'
import {addArrayValue, removeArrayValue } from 'redux-form/lib/actions'

/* Components */
import CreateDishForm from '../components/dishes/create-dish'


class CreateDish extends Component {
  componentDidMount() {
    this.props.fetchIngredientsIfNeeded()
    //this.props.fetchDish(this.props.params.id)
  }
  onSubmit(dish) {
    if (this.props.location.pathname.includes("edit")) {
      return this.props.editDish(dish)
    } else {
      return this.props.addDish(dish)
    }
  }
  render() {
    const { dish, ingredients, escandallo,  addArrayValue, removeArrayValue, style } = this.props
    return (
      <CreateDishForm onSubmit={this.onSubmit.bind(this)} initialValues={ dish } totalIngredients={ingredients}  removeIngredient={removeArrayValue} escandallo={escandallo} addIngredient={addArrayValue} style={style}/>
    )
  }
}

CreateDish.propTypes = {
  dish: PropTypes.object,
  ingredients: PropTypes.array,
  escandallo: PropTypes.number,
  addDish: PropTypes.func,
  editDish: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  const data = {form: "create-dish", key: ""}
  const bindedAddArrayValue = bindActionData(addArrayValue, data)
  const bindedRemoveArrayValue = bindActionData(removeArrayValue, data)
  return bindActionCreators({ fetchIngredientsIfNeeded, fetchDish, addDish, editDish, addArrayValue: bindedAddArrayValue, removeArrayValue: bindedRemoveArrayValue }, dispatch)
}

export default connect(
  totalSelector,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(CreateDish))
