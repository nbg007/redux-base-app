import nock from 'nock'
import * as actions from '../actions'
import { getMockedAPIRequest, mockStore } from '../../../test/actions/utils' 

// TESTS

describe("Orders - actions: ", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  // FETCH ORDERS
  it('fetchOrders should create a request attempt and a fail action when it fails', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/orders')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.REQUEST_ORDERS_ATTEMPTED, authenticated: true},
      {type: actions.REQUEST_ORDERS_FAILED }
    ];
    const store = mockStore({auth: {logged: true, session: {username: "X"}}}, expectedActions, done)
    store.dispatch(actions.fetchOrders())
  })
  it('fetchOrders should create a request attempt and a success action when it goes ok', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .get('/orders')
      .reply(200, {
        type: 'orders',
        data: [{
          id:"c0505276-a012-43ae-8919-9ae1806b1436",
          name:"Bacon",
          cost: 0.4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.REQUEST_ORDERS_ATTEMPTED, authenticated: true},
      {type: actions.REQUEST_ORDERS_SUCCEEDED, 
       payload: [{id:"c0505276-a012-43ae-8919-9ae1806b1436",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}]
      }
    ];
    const store = mockStore({orders: {}},
                            expectedActions, done)
    store.dispatch(actions.fetchOrders())
  })
  // ADD ORDER
  it('should create add order attempt and fail actions when addOrder action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/orders')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.ADD_ORDER_ATTEMPTED, authenticated: true},
      {type: actions.ADD_ORDER_FAILED }
    ];
    const store = mockStore({orders: {}},
                            expectedActions, done)
    store.dispatch(actions.addOrder({name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should create add order attempt and success actions when addOrder action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/orders')
      .reply(200, {
        type: 'orders',
        data: [{
          id:"f0505276-a012-43ae-8919-9ae1806b1438",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.ADD_ORDER_ATTEMPTED, authenticated: true},
      {type: actions.ADD_ORDER_SUCCEEDED, authenticated: true, 
       payload: [{id:"f0505276-a012-43ae-8919-9ae1806b1438",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({orders: {}},
                            expectedActions, done)
    store.dispatch(actions.addOrder({name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  // EDIT ORDER
  it('should create edit order attempt and fail actions when editOrder action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .put('/orders')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.EDIT_ORDER_ATTEMPTED, authenticated: true},
      {type: actions.EDIT_ORDER_FAILED }
    ];
    const store = mockStore({orders: {}},
                            expectedActions, done)
    store.dispatch(actions.editOrder({id: '1', name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should edit order attempt and success actions when editOrder action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .put('/orders/1')
      .reply(200, {
        type: 'orders',
        data: [{
          id:"1",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.EDIT_ORDER_ATTEMPTED, authenticated: true},
      {type: actions.EDIT_ORDER_SUCCEEDED, authenticated: true, 
       payload: [{id:"1",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({orders: {}},
                            expectedActions, done)
    store.dispatch(actions.editOrder({id: "1",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  // DELETE ORDER
  it('should create delete order attempt and fail actions when removeOrder action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .delete('/orders')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.REMOVE_ORDER_ATTEMPTED, authenticated: true},
      {type: actions.REMOVE_ORDER_FAILED }
    ];
    const store = mockStore({orders: {}},
                            expectedActions, done)
    store.dispatch(actions.removeOrder({id: '1', name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should create delete order attempt and success actions when removeOrder action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .delete('/orders/1')
      .reply(200, {
        type: 'orders',
        data: [{
          id:"1",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.REMOVE_ORDER_ATTEMPTED, authenticated: true},
      {type: actions.REMOVE_ORDER_SUCCEEDED, authenticated: true, 
       payload: [{id:"1",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({orders: {}},
                            expectedActions, done)
    store.dispatch(actions.removeOrder({id: "1",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
});
