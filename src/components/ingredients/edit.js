import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'

class Edit extends Component {
  render(){
    const {
      //ingredient: { name, cost, stock },
      fields: { name, cost, stock },
      mode,
      error,
      handleSubmit
    } = this.props

    let title = mode === 'edit' ? 'Editar' : 'Crear'
    return (
      <div>
        <h2>{title + ' ingrediente'}</h2>
        <form onSubmit={ handleSubmit }>
          Nombre
          <input type='text' name='name' {...name} />
          {name.touched && name.error && <span>{name.error}</span>}
          <br />
          Coste
          <input type='text' name='cost' {...cost}/>
          {cost.touched && cost.error && <span>{cost.error}</span>}
          <br />
          Stock
          <input type='text' name='stock'{...stock} />
          {stock.touched && stock.error && <span>{stock.error}</span>}
          <br />
          <hr />
          {error && <div>{error}</div>}
          <button>Guardar</button>
        </form>
      </div>
    )
  }
}

Edit.propTypes = {
  initialValues: PropTypes.object,
  fields: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
}

export default reduxForm({
  form: 'editIngredient',
  fields: ['name', 'cost', 'stock']
})(Edit)