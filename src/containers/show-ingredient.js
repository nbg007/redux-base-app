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
          <h1 className='beta'>{t('showIngredient.title')}</h1>
        </span>
        <ul className='element-list'>
          <li className='element-item'><p>{name}</p></li>
          <li className='element-item'><p>{cost}</p></li>
          <li className='element-item'><p>{stock}</p></li>
        </ul>
        <Link className='button button-primary' to={`/ingredients/${id}/edit/`}><span className='fa fa-pencil'></span>{t('showIngredient.editButton')}</Link>
        {' '}
        <button className='button button-error' onClick={removeIngredient.bind(ingredient)}><span className='fa fa-trash'></span>{t('showIngredient.removeButton')}</button>
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
