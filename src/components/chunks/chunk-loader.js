export default () => {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve({asyncComponent: require('../async-component')})
    })
  })
}
