import expect from 'expect'
import reducer from '../index'
import * as actions from '../actions'

const initialState = {
  isFetching: false,
  list: []
}

describe('Ingredients - reducers', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle EDIT_INGREDIENT_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{id: "1", name: 'bacon', cost: 1, stock: 1}]}
    const payload = {id: '1', name: 'bacon', cost: 2, stock: 2}
    const nextState = reducer(state, {type: actions.EDIT_INGREDIENT_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toContain(payload);
  })

  it('should handle REQUEST_INGREDIENTS_SUCCEEDED', () => {
    const state = {isFetching: true, list: []}
    const payload = [{id: '1', name: 'bacon', cost: 2, stock: 2}, {id: '2', name: 'rice', cost: 2, stock: 2} ]
    const nextState = reducer(state, {type: actions.REQUEST_INGREDIENTS_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toEqual(payload);
  })

  it('should handle REQUEST_INGREDIENTS_ATTEMPTED', () => {
    const state = {isFetching: false, list: []}
    const payload = [{id: '1', name: 'bacon', cost: 2, stock: 2}, {id: '2', name: 'rice', cost: 2, stock: 2} ]
    const nextState = reducer(state, {type: actions.REQUEST_INGREDIENTS_ATTEMPTED, payload })
    expect(nextState.isFetching).toEqual(true);
    expect(nextState.list).toEqual([]);
  })

  it('should handle ADD_INGREDIENT_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{id: '1', name: 'bacon', cost: 2, stock: 2}, {id: '2', name: 'rice', cost: 2, stock: 2} ]}
    const payload = {id: 3, name: 'water', cost: 2, stock: 2}
    const nextState = reducer(state, {type: actions.ADD_INGREDIENT_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toContain(payload);
  })

  it('should handle REMOVE_INGREDIENT_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{id: '1', name: 'bacon', cost: 2, stock: 2}, {id: '2', name: 'rice', cost: 2, stock: 2} ]}
    const payload = {id: 2, name: 'bacon', cost: 2, stock: 2}
    const nextState = reducer(state, {type: actions.REMOVE_INGREDIENT_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toNotContain(payload);
  })
})
