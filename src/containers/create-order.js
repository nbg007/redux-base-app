import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import bindActionData from 'redux-form/lib/bindActionData'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

/* Selectors */
import { totalSelector } from '../modules/orders/selectors'

/* Actions */
import { addOrder, editOrder, fetchOrder } from '../modules/orders'
import { fetchDishesIfNeeded } from '../modules/dishes'
import { checkAvailability } from '../modules/ingredients'
import { selectItemOnAutocomplete} from '../modules/ui'
import { addArrayValue, removeArrayValue } from 'redux-form/lib/actions'

/* Components */
import CreateOrderForm from '../components/orders/create-order'

class CreateOrder extends Component {
  componentDidMount() {
    const orderId = this.props.params.id
    if (orderId) {
      this.props.fetchOrder(this.props.params.id)
    }
    this.props.fetchDishesIfNeeded()
  }
  onSubmit(order) {
    //Miguel: UGLY!!!!! This should be a `mode` prop on the component itself
    //or should be handled in the action creator (has id? update, otherwise create)
    //this creates a coupling between the component behaviour and route definitions
    if (this.props.location.pathname.includes("edit")) {
      return this.props.editOrder(order)
    } else {
      return this.props.addOrder(order)
    }
  }
  render() {
    const {
      order,
      dishes,
      pvp,
      addArrayValue,
      removeArrayValue,
      selectedAutocompleteItem,
      selectItemOnAutocomplete,
      style
    } = this.props
    return (
      <CreateOrderForm
        onSubmit={this.onSubmit.bind(this)}
        initialValues={ order }
        totalDishes={dishes}
        removeDish={removeArrayValue}
        pvp={pvp}
        addDish={addArrayValue}
        selectedAutocompleteItem={selectedAutocompleteItem}
        selectItemOnAutocomplete={selectItemOnAutocomplete}
        style={style} />
    )
  }
}

CreateOrder.propTypes = {
  order: PropTypes.object,
  dishes: PropTypes.array,
  pvp: PropTypes.number,
  addOrder: PropTypes.func,
  editOrder: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  const data = {form: "create-order", key: ""}
  const bindedAddArrayValue = bindActionData(addArrayValue, data)
  const bindedRemoveArrayValue = bindActionData(removeArrayValue, data)
  return bindActionCreators({ fetchOrder, fetchDishesIfNeeded, selectItemOnAutocomplete, addOrder, editOrder, addArrayValue: bindedAddArrayValue, removeArrayValue: bindedRemoveArrayValue, checkAvailability }, dispatch)
}

export default connect(
  totalSelector,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(CreateOrder))
