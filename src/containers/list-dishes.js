import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchDishes, removeDish } from '../modules/dishes'
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import DishItem from '../components/dishes/item'
import { translate } from 'react-i18next/lib'

export class ListDishes extends Component {
  constructor(props){
    super(props)
    this.handleRemoveDish = this.handleRemoveDish.bind(this)
  }

  componentDidMount(){
    this.props.fetchDishes()
  }

  handleRemoveDish(dish){
    this.props.removeDish(dish)
  }
  render() {
    const { isFetching, list, removeDish, t } = this.props
    return (
      <div className='component short-wrap' style={this.props.style}>
        <span>
          <h1 className='gamma'>{t('listDishes.title')}</h1>
        </span>
        <ul className='element-list'>
          {isFetching && <p>{t('listDishes.loading')}</p>}
          {!isFetching && list.length == 0 && <p>{t('listDishes.empty')}</p>}
          {!isFetching && list.length > 0 && list.map((d, index) =>
            <DishItem key={d.id}
              dish={d}
              onRemove={ this.handleRemoveDish }
              editText={t('listDishes.editButton')}
              removeText={t('listDishes.removeButton')} />
            )
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
  return bindActionCreators({ removeDish, fetchDishes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(translate(['common'])(ListDishes))
