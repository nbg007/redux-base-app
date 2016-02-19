/* Example with selectors */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeDish, fetchDish } from '../modules/dishes'
import { totalSelector } from '../modules/dishes/selectors'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

export class ShowDish extends Component {
  componentDidMount() {
    this.props.fetchDish(this.props.params.id)  
  }
  render() {
    const { dish, dish: {id, name, price }, removeDish, escandallo, t } = this.props
    return (
      <div className='component' style={this.props.style}>
        <span>
          <h1>{t('showDish.title')}</h1>
        </span>
        <ul>
          <li><p>{name}</p></li>
          <li><p>{price}</p></li>
          <li><p>{escandallo}</p></li>
        </ul>
        <Link to={`/dishes/${id}/edit/`}>{t('showDish.editButton')}</Link>
        {' '}
        <button onClick={removeDish.bind(this, dish)}>{t('showDish.removeButton')}</button>
      </div>
    )
  }  
}

ShowDish.propTypes = {
  dish: PropTypes.object,
  removeDish: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish, fetchDish }, dispatch)
}

export default connect(totalSelector, mapDispatchToProps)(translate(['common'])(ShowDish))
