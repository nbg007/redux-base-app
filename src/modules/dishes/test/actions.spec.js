import nock from 'nock'
import * as actions from '../actions'
import { getMockedAPIRequest, mockStore } from '../../../test/actions/utils' 

// TESTS

describe("Dishes - actions: ", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  // FETCH DISHES
  it('fetchDishes should create a request attempt and a fail action when it fails', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/dishes')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.REQUEST_DISHES_ATTEMPTED, authenticated: true},
      {type: actions.REQUEST_DISHES_FAILED }
    ];
    const store = mockStore({auth: {logged: true, session: {username: "X"}}}, expectedActions, done)
    store.dispatch(actions.fetchDishes())
  })
  it('fetchDishes should create a request attempt and a success action when it goes ok', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .get('/dishes')
      .reply(200, {
        type: 'dishes',
        data: [{
          id:"c0505276-a012-43ae-8919-9ae1806b1436",
          name:"Bacon",
          cost: 0.4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.REQUEST_DISHES_ATTEMPTED, authenticated: true},
      {type: actions.REQUEST_DISHES_SUCCEEDED, 
       payload: [{id:"c0505276-a012-43ae-8919-9ae1806b1436",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}]
      }
    ];
    const store = mockStore({dishes: {}},
                            expectedActions, done)
    store.dispatch(actions.fetchDishes())
  })
  // ADD DISH
  it('should create add dish attempt and fail actions when addDish action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/dishes')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.ADD_DISH_ATTEMPTED, authenticated: true},
      {type: actions.ADD_DISH_FAILED }
    ];
    const store = mockStore({dishes: {}},
                            expectedActions, done)
    store.dispatch(actions.addDish({name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should create add dish attempt and success actions when addDish action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/dishes')
      .reply(200, {
        type: 'dishes',
        data: [{
          id:"f0505276-a012-43ae-8919-9ae1806b1438",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.ADD_DISH_ATTEMPTED, authenticated: true},
      {type: actions.ADD_DISH_SUCCEEDED, authenticated: true, 
       payload: [{id:"f0505276-a012-43ae-8919-9ae1806b1438",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({dishes: {}},
                            expectedActions, done)
    store.dispatch(actions.addDish({name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  // EDIT DISH
  it('should create edit dish attempt and fail actions when editDish action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .put('/dishes')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.EDIT_DISH_ATTEMPTED, authenticated: true},
      {type: actions.EDIT_DISH_FAILED }
    ];
    const store = mockStore({dishes: {}},
                            expectedActions, done)
    store.dispatch(actions.editDish({id: '1', name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should edit dish attempt and success actions when editDish action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .put('/dishes/1')
      .reply(200, {
        type: 'dishes',
        data: [{
          id:"1",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.EDIT_DISH_ATTEMPTED, authenticated: true},
      {type: actions.EDIT_DISH_SUCCEEDED, authenticated: true, 
       payload: [{id:"1",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({dishes: {}},
                            expectedActions, done)
    store.dispatch(actions.editDish({id: "1",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  // DELETE DISH
  it('should create delete dish attempt and fail actions when removeDish action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .delete('/dishes')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.REMOVE_DISH_ATTEMPTED, authenticated: true},
      {type: actions.REMOVE_DISH_FAILED }
    ];
    const store = mockStore({dishes: {}},
                            expectedActions, done)
    store.dispatch(actions.removeDish({id: '1', name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should create delete dish attempt and success actions when removeDish action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .delete('/dishes/1')
      .reply(200, {
        type: 'dishes',
        data: [{
          id:"1",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.REMOVE_DISH_ATTEMPTED, authenticated: true},
      {type: actions.REMOVE_DISH_SUCCEEDED, authenticated: true, 
       payload: [{id:"1",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({dishes: {}},
                            expectedActions, done)
    store.dispatch(actions.removeDish({id: "1",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
});
