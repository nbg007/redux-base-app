import { jsdom } from 'jsdom'
import expect from 'expect'

expect.extend({
  toHaveKeysWithExpectedValue(object) {
    expect.assert(
      Object.keys(object).every((key) => {
        return this.actual.hasOwnProperty(key) && expect(this.actual[key]).toEqual(object[key])
      }),
      "expected %s to include all properties in %s" ,
      this.actual,
      object
    )
  }
})

var document = jsdom('<!doctype html><html><body></body></html>')

global.document = document
global.window = document.defaultView
global.navigator = global.window.navigator
global.__DEV__ = false
global.localStorage = {
  removeItem: function() {
    return
  },
  getItem: function() {
    return 'madeUpToken'
  },
  setItem: function() {
    return
  }
}
