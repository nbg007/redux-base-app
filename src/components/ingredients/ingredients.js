import React, { PropTypes, Component } from 'react'

const Ingredients = React.createClass({
  render() {
    return (
      <div>
        {this.props.children || "No children"}
      </div>
    )
  }
})

export default Ingredients