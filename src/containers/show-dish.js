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

    return (
      <div className='component' style={this.props.style}>
        <span>
          <h1>{t('showDish.title')}</h1>
        </span>
        <ul>
          <li><p>Name: {dish.name}</p></li>
          <li><p>Price: {dish.price}</p></li>
          <li><p>{dish.escandallo}</p></li>
        </ul>
        <Link to={`/dishes/${dish.id}/edit/`}>{t('showDish.editButton')}</Link>
        {' '}
        <button onClick={removeDish.bind(this, dish)}>{t('showDish.removeButton')}</button>
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
  return {
    dish: state.dishes.isFetching ? {} : state.dishes.list.find(d => d.id === ownProps.params.id) || {},
    isFetching: state.dishes.isFetching
  }
}

export default connect(totalSelector, mapDispatchToProps)(translate(['common'])(ShowDish))
//export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ShowDish))
