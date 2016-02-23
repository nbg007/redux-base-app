/**
 * Binds every function beginning with 'handle' to the target itself
 * Useful for using it in React.Component constructor (ES2015 style) to
 * automatically bind every event handler to the component itself
 * @param  {Object} target An **instance** of a class
 * @param  {String} prefix handler name prefix, defaults to 'handle'
 */
export function bindHandlers(target, prefix = 'handle'){
  Object.keys(target).forEach(prop => {
    if(typeof(target[prop]) === 'function' && prop.indexOf(prefix) === 0){
      //bind the function to the target
      target[prop] = target[prop].bind(target)
    }
  })
}