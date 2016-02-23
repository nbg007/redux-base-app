import expect from 'expect'
import reducer from '../index'
import * as actions from '../actions'

const initialState = {
  isFetching: false,
  list: []
}

describe('Orders - reducers', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should handle REQUEST_ORDERS_SUCCEEDED', () => {
    const state = {isFetching: true, list: []}
    const payload = [{id: '1', createdAt: '2016-02-19T13:00:12.000Z', createdBy: {id:"1",
    username:"admin"}}, {id: '2', createdAt: '2016-02-19T13:00:12.000Z', createdBy: {id:"1",
    username:"admin"}} ]
    const nextState = reducer(state, {type: actions.REQUEST_ORDERS_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toEqual(payload);
  })

  it('should handle REQUEST_ORDERS_ATTEMPTED', () => {
    const state = {isFetching: false, list: []}
    const payload = [{id: '1', createdAt: '2016-02-19T13:00:12.000Z', createdBy: {id:"1",
    username:"admin"}}, {id: '2', createdAt: '2016-02-19T13:00:12.000Z', createdBy: {id:"1",
    username:"admin"}} ]
    const nextState = reducer(state, {type: actions.REQUEST_ORDERS_ATTEMPTED, payload })
    expect(nextState.isFetching).toEqual(true);
    expect(nextState.list).toEqual([]);
  })

  it('should handle ADD_ORDER_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{
      id: '1', 
      createdAt: '2016-02-19T13:00:12.000Z', 
      createdBy: {
        id:"1",
        username:"admin"
      }}, {
      id: '2', 
      createdAt: '2016-02-19T13:00:12.000Z', 
      createdBy: {
        id:"1",
        username:"admin"
      }}
    ]}
    const payload = {id: 3, createdAt: '2016-02-19T13:00:12.000Z', createdBy: {id:"1", username:"admin"}} 
    const nextState = reducer(state, {type: actions.ADD_ORDER_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toContain(payload);
  })

  it('should handle EDIT_ORDER_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{
      id: '1', 
      createdAt: '2016-02-19T13:00:12.000Z', 
      createdBy: {
        id:"1",
        username:"admin"
      }}, {
      id: '2', 
      createdAt: '2016-02-19T13:00:12.000Z', 
      createdBy: {
        id:"1",
        username:"admin"
      }}
    ]}
    const payload = {
      id: '1', 
      createdAt: '2016-02-19T13:00:12.000Z', 
      createdBy: {
        id:"1",
        username:"user"
      }
    }
    const nextState = reducer(state, {type: actions.EDIT_ORDER_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toContain(payload);
  })

  it('should handle REMOVE_ORDER_SUCCEEDED', () => {
    const state = {isFetching: true, list: [{
      id: '1', 
      createdAt: '2016-02-19T13:00:12.000Z', 
      createdBy: {
        id:"1",
        username:"admin"
      }}, {
      id: '2', 
      createdAt: '2016-02-19T13:00:12.000Z', 
      createdBy: {
        id:"1",
        username:"admin"
      }}
    ]}
    const payload = {
      id: '1', 
      createdAt: '2016-02-19T13:00:12.000Z', 
      createdBy: {
        id:"1",
        username:"admin"
      }
    }
    const nextState = reducer(state, {type: actions.REMOVE_ORDER_SUCCEEDED, payload })
    expect(nextState.isFetching).toEqual(false);
    expect(nextState.list).toNotContain(payload);
  })
})
