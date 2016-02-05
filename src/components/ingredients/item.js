import React, { PropTypes, Component } from 'react';

class Item extends Component {
  render(){
    const { id, name, cost, stock } = this.props.item;
    return (
      <li onClick={() => this.props.onClick(this.props.item) }>{ name }. Cost: { cost }. Stock: { stock }</li>
    )
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Item;