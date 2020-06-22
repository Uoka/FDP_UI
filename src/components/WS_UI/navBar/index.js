import NavBar from './src/main'

NavBar.install = function (Vue) {
  Vue.component(NavBar.name, NavBar)
}

export default NavBar
