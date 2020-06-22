import * as types from './mutation_type'//引入变量

export default {
  //types.* 代表接受哪个actions的commit 也就是上面引入变量的作用
  [types.SET_TOKEN](state, token = {isLogin: false, user: {}, permissions: []}) {
    state.isLogin = token.isLogin
    state.user = token.user
    state.permissions = token.permissions
  }
}
