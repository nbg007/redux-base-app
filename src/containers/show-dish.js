/* Example with selectors */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeDish, fetchDish } from '../modules/dishes'
import { totalSelector } from '../modules/dishes/selectors'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'
import DishIngredients from '../components/dishes/dish_ingredients'

export class ShowDish extends Component {
  componentDidMount() {
    this.props.fetchDish(this.props.params.id)
  }
  render() {
    const { isFetching } = this.props
    if(isFetching) return (<p>Loading...</p>)
    const { dish, removeDish, escandallo, t } = this.props
    const ingredients = dish.ingredients || []
    const totalCost = ingredients.reduce((acc,ingredient) => {
      return acc + ingredient.cost
    }, 0)
    return (
      <div className='component brick-bottom' style={this.props.style}>
        <span>
          <h1 className='gamma'>{t('showDish.title')}</h1>
        </span>
        <div className='element-list'>
          <ul>
            <li className='element-item'><p><span className='item-list'>Name:</span> {dish.name}</p></li>
            <li className='element-item'><p><span className='item-list'>Price:</span> {dish.price}</p></li>
            <li className='element-item'><p><span className='item-list'>Total cost:</span> {totalCost}</p></li>
          </ul>
          <div className='action-group'>
            <Link className='button button-primary' to={`/dishes/${dish.id}/edit/`}><span className='fa fa-pencil'></span>{t('showDish.editButton')}</Link>
            {' '}
            <button className='button button-error' onClick={removeDish.bind(this, dish)}><span className='fa fa-trash'></span>{t('showDish.removeButton')}</button>
          </div>
        </div>
        <DishIngredients ingredients={ dish.ingredients || [] } />
      </div>
    )
  }
}

ShowDish.propTypes = {
  dish: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removeDish: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish, fetchDish }, dispatch)
}

function mapStateToProps(state, ownProps){
  //console.log('show dish isfetching', state.dishes.isFetching)
  const emptyDish = { ingredients: [] }
  return {
    dish: state.dishes.isFetching ? emptyDish : state.dishes.list.find(d => d.id === ownProps.params.id) || emptyDish,
    isFetching: state.dishes.isFetching
  }
}

//export default connect(totalSelector, mapDispatchToProps)(translate(['common'])(ShowDish))
export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ShowDish))
