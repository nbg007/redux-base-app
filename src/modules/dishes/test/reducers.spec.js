import expect from 'expect'
import reducer from '../index'
import * as actions from '../actions'

const initialState = {
  isFetching: false,
  list: []
}

describe('Dishes - reducers', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle REQUEST_DISHES_SUCCEEDED', () => {
    const state = {isFetching: true, list: []}
    const payload = [{id: '1', name: 'salad', price: 2}, {id: '2', name: 'steak tartar', price: 2} ]
    const nextState = reducer(state, {type: actions.REQUEST_DISHES_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toEqual(payload);
  })

  it('should handle REQUEST_DISHES_ATTEMPTED', () => {
    const state = {isFetching: false, list: []}
    const payload = [{id: '1', name: 'bacon', cost: 2, stock: 2}, {id: '2', name: 'rice', cost: 2, stock: 2} ]
    const nextState = reducer(state, {type: actions.REQUEST_DISHES_ATTEMPTED, payload })
    expect(nextState.isFetching).toEqual(true);
    expect(nextState.list).toEqual([]);
  })

  it('should handle ADD_DISH_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{id: '1', name: 'salad', price: 2}, {id: '2', name: 'steak tartar', price: 2} ]}
    const payload = {id: 3, name: 'spaguetti carbonara', price: 2}
    const nextState = reducer(state, {type: actions.ADD_DISH_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toContain(payload);
  })

  it('should handle EDIT_DISH_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{id: '1', name: 'salad', price: 2}, {id: '2', name: 'steak tartar', price: 2} ]}
    const payload = {id: '1', name: 'salad', price: 2}
    const nextState = reducer(state, {type: actions.EDIT_DISH_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toContain(payload);
  })

  it('should handle REMOVE_DISH_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{id: '1', name: 'salad', price: 2}, {id: '2', name: 'steak tartar', price: 2} ]}
    const payload = {id: '1', name: 'salad', price: 2}
    const nextState = reducer(state, {type: actions.REMOVE_DISH_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toNotContain(payload);
  })
})
