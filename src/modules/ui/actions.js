const MODULE_NAME = "base-app/ui/"

export const SELECTED_ITEM_ON_AUTOCOMPLETE = MODULE_NAME.concat("UI:SELECTED_ITEM_ON_AUTOCOMPLETE")
export const TOGGLE_MODAL = MODULE_NAME.concat('UI:TOGGLE_MODAL')

export function selectItemOnAutocomplete(payload) {
  return {
    type: SELECTED_ITEM_ON_AUTOCOMPLETE,
    payload
  }
}

export function toggleModal(id) {
  return {
    type: TOGGLE_MODAL,
    payload: {id}
  }  
}

