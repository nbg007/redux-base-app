import React, { PropTypes, Component } from 'react'


class View extends Component {
  constructor(props){
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit(e){
    e.preventDefault()
    this.props.onEdit(this.props.ingredient.id)
  }

  render(){
    const { ingredient: { id, name, cost, stock }, onEdit } = this.props
    return (
      <div>
        <h2>{name}</h2>
        <p>Coste: { cost }</p>
        <p>Stock: { stock}</p>
        <hr />
        <button onClick={ this.handleEdit }>Editar</button>
      </div>
    )
  }
}

View.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default View