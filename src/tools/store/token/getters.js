// getters可以帮我们从state中进一步过滤我们需要的一些状态条件
export default {
  // 是否登陆
  isLogin: (state) => {
    return state.isLogin && state.user && Object.keys(state.user).length !== 0
  },
  user: (stare) => {
    return stare.user
  }

}
