import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../common/header'
/* Actions */
import { logout, getSession } from '../../modules/auth'
import { toggleModal } from '../../modules/ui'

// TODO: Move to common and rething about loading
function Loading() {
  return (
    <span className="loading-message">Loading...</span>
  )
}

const devTools = __DEV__ ? React.createFactory(require('../common/dev-tools').default) : () => null

// Loading: Example of a general loading for the whole app. Not quite sure about it. Probably each app will have a different way to show the loading
class App extends Component {
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentDidMount() {
    this.props.getSession()
  }
  handleLogout(){
    this.props.logout()
  }
  render() {
    const {children, isFetching} = this.props
    return (
      <div>
        {/*isFetching && <Loading/>*/}
        <div>
          <Header title={"DAH"} onLogout={this.handleLogout} {...this.props}>
          </Header>
          <div style={{marginTop: '1.5em'}}>{children}</div>
        </div>
        {devTools()}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  username: PropTypes.string,
  notifications: PropTypes.array,
  modal: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {ingredients: {isFetching: ingredientsAreFetching}, dishes: {isFetching: dishesAreFetching}, orders: {isFetching: ordersAreFetching}} = state
  //Loading: Here on isFetching  we group all the possible cases where we should show the loading screen
  return {
    isFetching: ingredientsAreFetching || dishesAreFetching || ordersAreFetching,
    username: state.auth.session.username,
    notifications: state.notifications,
    modal: state.ui.modals.find((n) => n.id == "notifications"),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, getSession, toggleModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
