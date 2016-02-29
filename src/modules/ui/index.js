import * as actions from './actions'
export * from './actions'

export default function reducer(state={
    autocomplete: {},
    modals: [
      {
        id: 'notifications',
        isOpen: false
      }
    ]
  }, action) {
  switch (action.type) {
    case actions.TOGGLE_MODAL:
      return Object.assign({}, state, {
        modals: state.modals.map((modal) =>
          modal.id == action.payload.id ?
            Object.assign({}, modal, {isOpen: !modal.isOpen}) :
            modal
        )
      })
    case actions.SELECTED_ITEM_ON_AUTOCOMPLETE:
      return Object.assign({}, state, {
        autocomplete: {
          [action.payload.ref]: action.payload.item
        }
      })
    default:
      return state
  }
}
