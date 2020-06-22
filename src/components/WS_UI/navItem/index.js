import NavItem from './src/main'

NavItem.install = function (Vue) {
  Vue.component(NavItem.name, NavItem)
}

export default NavItem
