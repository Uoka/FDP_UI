import wsCarousel from './carousel/index'
import wsCarouselItem from './carouselItem/index'
import wsCdTop from './cdTop/index'
import wsCol from './col/index'
import wsDisplay from './display/index'
import wsInput from './input/index'
import wsNavBar from './navBar/index'
import wsNavItem from './navItem/index'
import wsNavGroup from './navGroup/index'
import wsPlayer from './player/index'
import wsPopover from './popover/index'
import wsRow from './row/index'

const components = [
  wsCarousel,
  wsCarouselItem,
  wsCdTop,
  wsCol,
  wsDisplay,
  wsInput,
  wsNavBar,
  wsNavItem,
  wsNavGroup,
  wsPlayer,
  wsPopover,
  wsRow
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
