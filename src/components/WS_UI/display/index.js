import Display from './src/main'

Display.install = function (Vue) {
  Vue.component(Display.name, Display)
}

export default Display
