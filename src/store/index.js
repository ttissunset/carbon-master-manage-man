import Vue from 'vue'

// 导入所需要用到的不同的模块化的vux
import Tab from './tab'

// 导入vuex并进行全局注册
import Vuex from 'vuex'
Vue.use(Vuex)

// 创建vuex实例并导出
export default new Vuex.Store({
  // modules-使用不同的模块化vuex
  modules: {
    Tab,
  },
})
