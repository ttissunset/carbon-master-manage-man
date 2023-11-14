// 引入Vue
import Vue from 'vue'

// 引入并全局注册VueRouter
import VueRouter from 'vue-router'

// 1. 导入所需要用到的组件
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Case from '../views/Case.vue'
import Media from '../views/Media.vue'
import Login from '../views/login.vue'
import ServiceBook from '@/views/Service/ServiceBook.vue'
import ServiceBase from '@/views/Service/ServiceBase.vue'
import ServiceFunction from '@/views/Service/ServiceFunction.vue'
import ServiceCompany from '@/views/Service/ServiceCompany.vue'
import ServiceApplication from '@/views/Service/ServiceApplication.vue'
import Information from '@/views/Information.vue'
import CaseMedia from '@/views/CaseMedia.vue'
import ServiceMedia from '@/views/Service/ServiceMedia.vue'

Vue.use(VueRouter)

// 2. 定义路由
const routes = [
  {
    path: '/',
    component: Main,
    name: 'Main',
    // 路由重定向，当哈希地址为/时，自动跳转到哈希地址为/home的页面
    redirect: '/home',
    // 子路由
    children: [
      { path: '/home', component: Home, name: 'home' }, //首页
      { path: '/case', component: Case, name: 'case' }, //案例管理
      { path: '/media', component: Media, name: 'media' }, //media管理
      { path: '/information', component: Information, name: 'information' },
      {
        path: '/serviceapplication',
        component: ServiceApplication,
        name: 'ServiceApplication',
      },
      { path: '/servicebase', component: ServiceBase, name: 'servicebase' },
      { path: '/servicebook', component: ServiceBook, name: 'servicebook' },
      {
        path: '/servicecompany',
        component: ServiceCompany,
        name: 'servicecompany',
      },
      {
        path: '/servicefunction',
        component: ServiceFunction,
        name: 'servicefunction',
      },
      {
        path: '/caseMedia',
        component: CaseMedia,
        name: 'caseMedia',
      },
      { path: '/servicemedia', component: ServiceMedia, name: 'serviceMedia' },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

// 3. 创建 router 实例
const router = new VueRouter({
  routes,
})

// 4. 将router导出
export default router
