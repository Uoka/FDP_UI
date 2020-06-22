import Player from './src/main'

Player.install = function (Vue) {
  Vue.component(Player.name, Player)
}

export default Player
