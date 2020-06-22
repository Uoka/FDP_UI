import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import state from './state';


export default {
  namespaced: true, //命名空间,自动根据模块注册的路径调整命名
  state,
  getters,
  actions,
  mutations
}
