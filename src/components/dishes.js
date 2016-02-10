import React, { PropTypes, Component } from 'react'

class Dishes extends Component {
  render() {
    return (
      <div>
        {this.props.children || "No children"}
      </div>
    )
  }
}

export default Dishes
