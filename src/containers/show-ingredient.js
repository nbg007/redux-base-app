import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeIngredient } from '../modules/ingredients'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

export class ShowIngredient extends Component {
  render() {
    const { ingredient, ingredient: {id, name, cost, stock }, removeIngredient, t } = this.props
    return (
      <div className='component' style={this.props.style}>
        <span>
          <h1>{t('showIngredient.title')}</h1>
        </span>
        <ul>
          <li><p>{name}</p></li>
          <li><p>{cost}</p></li>
          <li><p>{stock}</p></li>
        </ul>
        <Link to={`/ingredients/${id}/edit/`}>{t('showIngredient.editButton')}</Link>
        {' '}
        <button onClick={removeIngredient.bind(ingredient)}>{t('showIngredient.removeButton')}</button>
      </div>
    )
  }  
}

ShowIngredient.propTypes = {
  ingredient: PropTypes.object,
  removeIngredient: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    ingredient: state.ingredients.list.find((e) => {return e.id == ownProps.params.id})
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeIngredient }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ShowIngredient))
