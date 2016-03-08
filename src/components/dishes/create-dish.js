import React, { PropTypes, Component } from 'react'
import {createValidator, required, maxLength, minLength, integer} from '../../utils/validation'
import ElementsToAdd from '../common/elements-to-add'
import ElementsAdded from '../common/elements-added'
import {reduxForm} from 'redux-form'
import { translate } from 'react-i18next/lib'

const validate = createValidator({
  name: [required, minLength(5), maxLength(10)],
  price: [required, integer]
});

class CreateDishForm extends Component {
  addIngredientToDish(id, name, amount) {
    const dishIngredient = {id, amount, name}
    const index = this.props.values.ingredients.reduce((acc, i, index) => {
      return i.id == id ? index : acc
    }, undefined)
    if (index !== undefined) {this.props.removeIngredient('ingredients', index)}
    this.props.addIngredient('ingredients', dishIngredient, index == -1 ? undefined : index)
  }
  removeIngredientFromDish(id) {
    const index = this.props.values.ingredients.reduce((acc, i, index) => {
      return i.id == id ? index : acc
    }, undefined)
    this.props.removeIngredient('ingredients', index)
  }
  render() {
    const {
          fields: {name, cost, price, id, ingredients  },
          totalIngredients,
          escandallo,
          removeIngredientFromDish,
          handleSubmit,
          resetForm,
          submitting,
          error,
          t
          } = this.props
    return (
      <div className='component short-wrap' style={this.props.style}>
        <p className='section-title'>{t('createDish.description')}</p>
        <form onSubmit={handleSubmit} className='basic-form g clearfix'>
          <div className='field gi one-half gutter'>
            <label>{t('createDish.nameLabel')}</label>
            <input type="text" placeholder={t('createDish.namePlaceholder')} {...name}/>
            {name.touched && name.error && <div>{name.error}</div>}
          </div>
          <div className='field gi one-half'>
            <label>{t('createDish.priceLabel')}</label>
            <input type="number" placeholder={t('createDish.pricePlaceholder')} {...price}/>
            {price.touched && price.error && <div>{price.error}</div>}
          </div>
          <div className='input-group half-width'>
            <ElementsToAdd subject='ingredient' elements={totalIngredients} remove={this.removeIngredientFromDish.bind(this)}/>
            <ElementsAdded subject='ingredient' elements= {ingredients} add={this.addIngredientToDish.bind(this)} totalElements={totalIngredients}/>
          </div>
          <div className='field'>
            <p>{t('createDish.escandallo')}: {escandallo || 0}</p>
          </div>
          {error && <div>{error}</div>}
          <div className='button-group g'>
            <button className='button button-error gi one-quarter' disabled={submitting} onClick={resetForm}>
              <span className='fa fa-trash'></span>{t('createDish.clearForm')}
            </button>
            <button className='button button-primary gi one-quarter' disabled={submitting }type='submit' onClick={handleSubmit}> <span className='fa fa-send'></span>
              {submitting ? <i/> : <i/>} {t('createDish.submitButton')}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

CreateDishForm.propTypes = {
    fields: PropTypes.object.isRequired,
    ingredients: PropTypes.array,
    escandallo: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

CreateDishForm = reduxForm({
  form: 'create-dish',
  validate,
  fields: ['name',
           'price',
           'id',
           'ingredients[].name',
           'ingredients[].id',
           'ingredients[].amount'
  ]
})(CreateDishForm)

export default translate(['common'])(CreateDishForm) 
