import React, { PropTypes, Component } from 'react'

const devTools = __DEV__ ? React.createFactory(require('../common/dev-tools').default) : () => null

export default class Landing extends Component {
  render() {
    return (
      <div>
        <div style={{marginTop: '1.5em'}}>{this.props.children}</div>
        {devTools()}
      </div>
    )
  }
}

Landing.propTypes = {
  children: PropTypes.element
}

export default Landing