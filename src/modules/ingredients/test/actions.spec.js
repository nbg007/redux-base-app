import nock from 'nock'
import * as actions from '../actions'
import { getMockedAPIRequest, mockStore } from '../../../test/actions/utils' 

// TESTS

describe("Ingredients - actions: ", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  // FETCH INGREDIENTS
  it('fetchIngredients should create a request attempt and a fail action when it fails', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/ingredients')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.REQUEST_INGREDIENTS_ATTEMPTED, authenticated: true},
      {type: actions.REQUEST_INGREDIENTS_FAILED }
    ];
    const store = mockStore({auth: {logged: true, session: {username: "X"}}}, expectedActions, done)
    store.dispatch(actions.fetchIngredients())
  })
  it('fetchIngredients should create a request attempt and a success action when it goes ok', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .get('/ingredients')
      .reply(200, {
        type: 'ingredients',
        data: [{
          id:"c0505276-a012-43ae-8919-9ae1806b1436",
          name:"Bacon",
          cost: 0.4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.REQUEST_INGREDIENTS_ATTEMPTED, authenticated: true},
      {type: actions.REQUEST_INGREDIENTS_SUCCEEDED, 
       payload: [{id:"c0505276-a012-43ae-8919-9ae1806b1436",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}]
      }
    ];
    const store = mockStore({ingredients: {}},
                            expectedActions, done)
    store.dispatch(actions.fetchIngredients())
  })
  // ADD INGREDIENT
  it('should create add ingredient attempt and fail actions when addIngredient action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/ingredients')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.ADD_INGREDIENT_ATTEMPTED, authenticated: true},
      {type: actions.ADD_INGREDIENT_FAILED }
    ];
    const store = mockStore({ingredients: {}},
                            expectedActions, done)
    store.dispatch(actions.addIngredient({name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should create add ingredient attempt and success actions when addIngredient action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .post('/ingredients')
      .reply(200, {
        type: 'ingredients',
        data: [{
          id:"f0505276-a012-43ae-8919-9ae1806b1438",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.ADD_INGREDIENT_ATTEMPTED, authenticated: true},
      {type: actions.ADD_INGREDIENT_SUCCEEDED, authenticated: true, 
       payload: [{id:"f0505276-a012-43ae-8919-9ae1806b1438",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({ingredients: {}},
                            expectedActions, done)
    store.dispatch(actions.addIngredient({name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  // EDIT INGREDIENT
  it('should create edit ingredient attempt and fail actions when editIngredient action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .put('/ingredients')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.EDIT_INGREDIENT_ATTEMPTED, authenticated: true},
      {type: actions.EDIT_INGREDIENT_FAILED }
    ];
    const store = mockStore({ingredients: {}},
                            expectedActions, done)
    store.dispatch(actions.editIngredient({id: '1', name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should edit ingredient attempt and success actions when editIngredient action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .put('/ingredients/1')
      .reply(200, {
        type: 'ingredients',
        data: [{
          id:"1",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.EDIT_INGREDIENT_ATTEMPTED, authenticated: true},
      {type: actions.EDIT_INGREDIENT_SUCCEEDED, authenticated: true, 
       payload: [{id:"1",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({ingredients: {}},
                            expectedActions, done)
    store.dispatch(actions.editIngredient({id: "1",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  // DELETE INGREDIENT
  it('should create delete ingredient attempt and fail actions when removeIngredient action creator is called with wrong data', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .delete('/ingredients')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.REMOVE_INGREDIENT_ATTEMPTED, authenticated: true},
      {type: actions.REMOVE_INGREDIENT_FAILED }
    ];
    const store = mockStore({ingredients: {}},
                            expectedActions, done)
    store.dispatch(actions.removeIngredient({id: '1', name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
  it('should create delete ingredient attempt and success actions when removeIngredient action creator is called', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .delete('/ingredients/1')
      .reply(200, {
        type: 'ingredients',
        data: [{
          id:"1",
          name:"Bacon",
          cost: 4,
          stock: 200
        }]})
    const expectedActions = [
      {type: actions.REMOVE_INGREDIENT_ATTEMPTED, authenticated: true},
      {type: actions.REMOVE_INGREDIENT_SUCCEEDED, authenticated: true, 
       payload: [{id:"1",
                  name:"Bacon",
                  cost: 4,
                  stock:200}]
      }
    ];
    const store = mockStore({ingredients: {}},
                            expectedActions, done)
    store.dispatch(actions.removeIngredient({id: "1",
                  name:"Bacon",
                  cost:0.4,
                  stock:200}))
    
  })
});
