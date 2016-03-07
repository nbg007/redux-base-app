import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import ElementsToAdd from '../common/elements-to-add'
import ElementsAdded from '../common/elements-added'
import { getIndice } from '../../utils/common'
import { translate } from 'react-i18next/lib'
import Autocomplete from 'react-autocomplete'
import { matchStateToTerm, sortItems, styles } from '../../utils/components/autocomplete'


class CreateOrderForm extends Component {
  addDishToOrder() {
    const {id,  name} = this.props.selectedAutocompleteItem
    const amount = parseInt(this.refs.amount.value, 10)
    const index = getIndice(id, this.props.values.dishes)
    if (index !== undefined) {this.props.removeDish('dishes', index)}
    this.props.addDish('dishes', {id, name, amount }, index == -1 ? undefined : index)
    this.refs.createOrderAutocomplete.state.value = ""
    this.refs.amount.value = ""
  }
  removeDishFromOrder(id) {
    const index = getIndice(id, this.props.values.dishes)
    this.props.removeDish('dishes', index)
  }
  render() {
    const {
      fields: {id, dishes},
      totalDishes,
      pvp,
      removeDishFromOrder,
      selectedAutocompleteItem,
      selectItemOnAutocomplete,
      handleSubmit,
      resetForm,
      submitting,
      error,
      t
    } = this.props
    return (
      <div className='component' style={this.props.style}>
        <p className='beta'>{t('createOrder.description')}</p>
        <p></p>
        <form onSubmit={handleSubmit} className="basic-form clearfix">
          <div className='add g'>
            <div className='field basic-input gi one-half gutter'>
              <label>{t('createOrder.dishes')}</label>
              <Autocomplete
                ref = "createOrderAutocomplete"
                initialValue={selectedAutocompleteItem ? selectedAutocompleteItem.name : ""}
                items={totalDishes}
                shouldItemRender={ matchStateToTerm }
                sortItems={sortItems}
                onSelect={(value, item) => {
                  //console.log('Autocomplete selected', value, item)
                  selectItemOnAutocomplete({ref: "create-order", item})
                }}
                getItemValue={(item) => item.name}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={isHighlighted ? styles.highlightedItem : styles.item}
                    key={item.id}
                  >{item.name}</div>
                )} />
            </div>
            <div className='field gi one-half'>
              <label>{t('createOrder.amountPlaceholder')}</label>
              <input className='one-whole' ref="amount" type="number" placeholder={t('createOrder.amountPlaceholder')} />
            </div>
            <div className='field button-add-field'>
              <input className='button button-secondary' type="button" value={t('createOrder.add')} onClick={this.addDishToOrder.bind(this)} />
            </div>
          </div>
          <div className='field'>
            <p>{t('createOrder.pvp')}: {pvp || 0}</p>
          </div>
          {error && <div>{error}</div>}
          <div className='button-group'>
            <button className='button button-error' disabled={submitting} onClick={resetForm}><span className='fa fa-trash'></span>
              {t('createOrder.clearForm')}
            </button>
            <button className='button button-primary' disabled={submitting} type='submit' onClick={handleSubmit}>
              <span className='fa fa-send'></span>{submitting ? <i/> : <i/>} {t('createOrder.submitButton')}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

CreateOrderForm.propTypes = {
  fields: PropTypes.object.isRequired,
  dishes: PropTypes.array,
  pvp: PropTypes.number,
  handleSubmit: PropTypes.func.isRequired,
  selectItemOnAutocomplete: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

CreateOrderForm = reduxForm({
  form: 'create-order',
  fields: ['id',
           'dishes[].name',
           'dishes[].id',
           'dishes[].amount'
  ]
})(CreateOrderForm)

export default translate(['common'])(CreateOrderForm)
