import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeIngredient, fetchIngredients } from '../modules/ingredients'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

//TODO: move this item component to separate file!
class IngredientItem extends Component {
  constructor(props){
    super(props)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }
  handleRemoveClick(){
    this.props.onDelete(this.props.ingredient)
  }
  render(){
    const i = this.props.ingredient,
          t = this.props.t

    return (
      <li>
        <Link to={`/ingredients/${i.id}/show`}>{i.name}</Link>
        {' '}
        <Link to={`/ingredients/${i.id}/edit`}>{t('listIngredients.editButton')}</Link>
        {' '}
        <button onClick={ this.handleRemoveClick }>{t('listIngredients.removeButton')}</button>
      </li>
    )
  }
}

IngredientItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}


export class ListIngredients extends Component {
  constructor(props){
    super(props)
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this)
  }
  componentDidMount(){
    this.props.fetchIngredients()
  }
  handleRemoveIngredient(ing){
    /** NASTY !!!!!

    Create a IngredientItem view and handle deleting from there, passing the ingredient
    to this parent view

    */
    this.props.removeIngredient(ing)
  }
  render() {
    const { isFetching, list, removeIngredient, t } = this.props
    return (
      <div className='component' style={this.props.style}>
        <span>
          <h1>{t('listIngredients.title')}</h1>
        </span>
        <ul>
          {isFetching && <p>{t('listIngredients.loading')}</p>}
          {!isFetching && list.length == 0 && <p>{t('listIngredients.empty')}</p>}
          {!isFetching && list.length > 0 && list.map((i, index) =>
            <IngredientItem key={i.id} t={t} ingredient={i} onDelete={this.handleRemoveIngredient } />)
          }
        </ul>
      </div>
    )
  }
}

ListIngredients.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    isFetching: state.ingredients.isFetching,
    list: state.ingredients.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeIngredient, fetchIngredients }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ListIngredients))
