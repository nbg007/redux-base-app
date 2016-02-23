import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeDish } from '../modules/dishes'
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

export class ListDishes extends Component {
  constructor(props){
    super(props)
    this.handleRemoveDish = this.handleRemoveDish.bind(this)
  }
  handleRemoveDish(dish){
    this.props.removeDish(dish)
  }
  render() {
    const { isFetching, list, removeDish, t } = this.props
    return (
      <div className='component' style={this.props.style}>
        <span>
          <h1>{t('listDishes.title')}</h1>
        </span>
        <ul>
          {isFetching && <p>{t('listDishes.loading')}</p>}
          {!isFetching && list.length == 0 && <p>{t('listDishes.empty')}</p>}
          {!isFetching && list.length > 0 && list.map((d, index) =>
            <li key={index}>
              <Link to={`/dishes/${d.id}/show`}>{d.name}</Link>
              {' '}
              <Link to={`/dishes/${d.id}/edit`}>{t('listDishes.editButton')}</Link>
              {' '}
              <button onClick={ this.handleRemoveDish }>{t('listDishes.removeButton')}</button>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

ListDishes.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  removeDish: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    isFetching: state.dishes.isFetching,
    list: state.dishes.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ListDishes))
