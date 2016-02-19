import React, { PropTypes, Component } from 'react'

class Orders extends Component {
  render() {
    return (
      <div>
        {this.props.children || "No children"}
      </div>
    )
  }
}

export default Orders
