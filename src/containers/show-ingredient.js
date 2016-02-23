import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeIngredient, fetchSingleIngredient } from '../modules/ingredients'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

export class ShowIngredient extends Component {
  componentDidMount(){
    this.props.fetchSingleIngredient(this.props.params.id)
  }
  render() {
    const { ingredient, removeIngredient, t, isFetching } = this.props
    if(isFetching) return (<p>Loading...</p>)

    const { id, name, cost, stock } = ingredient
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
  removeIngredient: PropTypes.func.isRequired,
  fetchSingleIngredient: PropTypes.func.isRequired
}

const loadingIngredient = {
  id: 0,
  name: 'Loading',
  cost: 0,
  stock: 0
}

function mapStateToProps(state, ownProps) {
  return {
    isFetching: state.ingredients.isFetching,
    ingredient: state.ingredients.list.find((e) => {return e.id == ownProps.params.id}) || loadingIngredient
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeIngredient , fetchSingleIngredient}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ShowIngredient))
