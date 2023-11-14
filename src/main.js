import Vue from 'vue'
import App from './App.vue'

// 引入并全局注册Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入Router
import router from './router'

//引入store
import store from './store'

// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/home' || from.path === '/login') {
    const token = localStorage.getItem('token')
    if (token) {
      // 如果token存在
      next()
    } else {
      // 如果token不存在，则跳转至登录页面
      next('/login')
    }
  } else {
    next()
  }
})

new Vue({
  // 挂载router
  router,
  //挂载store
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  // 防止刷新页面时页面丢失，需要在创建vue实例对象时就调用addMenu方法添加路由
  created() {
    store.commit('addMenu', router)
  },
}).$mount('#app')
