import React, { PropTypes, Component } from 'react'

const Ingredients = React.createClass({
  render() {
    return (
      <div className='main-content wrapper'>
        {this.props.children || "No children"}
      </div>
    )
  }
})

export default Ingredients
