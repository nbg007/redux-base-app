import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load } from '../modules/admin'

/* Components */

class Admin extends Component {
  componentDidMount() {
debugger
    this.props.load()  
  }
  render() {
    const { message, isFetching } = this.props
debugger
    return (
      <div>
        <p>{message}</p> 
        <p>This module was loaded via chunk </p>
        {isFetching && <p>Doing some fake loading ...</p>}
      </div>
    )  
  }  
}

Admin.propTypes = {
  message: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  load: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return state.admin 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ load }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
