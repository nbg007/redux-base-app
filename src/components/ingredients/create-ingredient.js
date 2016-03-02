import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import {createValidator, required, maxLength, minLength, integer, float} from '../../utils/validation'
import { translate } from 'react-i18next/lib'

const validate = createValidator({
  name: [required, minLength(5), maxLength(10)],
  cost: [required, float],
  stock: [required, integer]
});

class CreateIngredientForm extends Component {
  render() {
    const {
      fields: { name, cost, stock },
      handleSubmit,
      resetForm,
      submitting,
      error,
      t
    } = this.props

    return (
      <div className='component' style={this.props.style}>
        <p>{t('createIngredient.description')}</p>
        <form onSubmit={handleSubmit} className='basic-form clearfix'>
          <div className='field'>
            <label>{t('createIngredient.nameLabel')}</label>
            <input type='text' placeholder={t('createIngredient.namePlaceholder')} {...name}/>
            {name.touched && name.error && <div>{name.error}</div>}
          </div>
          <div className='field'>
            <label>{t('createIngredient.costLabel')}</label>
            <input type='text' placeholder={t('createIngredient.costPlaceholder')} {...cost}/>
            {cost.touched && cost.error && <div>{cost.error}</div>}
          </div>
          <div className='field'>
            <label>{t('createIngredient.stockLabel')}</label>
            <input type='number' placeholder={t('createIngredient.stockPlaceholder')} {...stock}/>
            {stock.touched && stock.error && <div>{stock.error}</div>}
          </div>
          {error && <div>{error}</div>}
          <div className='button-field'>
            <button className='button button-error' disabled={submitting} onClick={resetForm}>
              {t('createIngredient.clearForm')}
            </button>
            <button className='button button-primary' disabled={submitting }type='submit' onClick={handleSubmit}>
              {submitting ? <i/> : <i/>} {t('createIngredient.submitButton')}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

CreateIngredientForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

//TODO: Parse params to manipulate them before sending (parseInt)
CreateIngredientForm = reduxForm({
  form: 'create-ingredient',
  fields: ['name', 'cost', 'stock', 'id']
})(CreateIngredientForm)

export default translate(['common'])(CreateIngredientForm)
