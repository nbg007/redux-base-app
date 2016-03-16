import React, { PropTypes, Component } from 'react'
import ChunkLoader from './chunks/chunk-loader'

export default class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}  
  }
  componentDidMount() {
    ChunkLoader().then(({asyncComponent}) => {
      this.setState({asyncComponent: asyncComponent.default})  
    })
  }
  render() {
    return (
      <div>
       {!('asyncComponent' in this.state) && <p>Loading, please wait</p>}
       {'asyncComponent' in this.state && <this.state.asyncComponent/>}
      </div>
    )  
  }
}
