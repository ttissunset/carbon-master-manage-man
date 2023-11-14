<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">
    <!-- 通过三元表达式来判断显示内容，如果侧边栏折叠，只显示'后台'，如果侧边栏展开则显示'后台管理系统' -->
    <h3>{{ isCollapse ? '碳进制' : '碳进制后台管理系统' }}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <!-- 通过模板字符串动态得到每一项的icon图标 -->
      <i :class="`el-icon-${item.icon}`"></i>
      <!-- 每一项的名称为item.label -->
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 通过v-for进行二级菜单子菜单的数据渲染 因为:key属性不能和父菜单的:key重复，所以这里不能使用item.label-->
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path"><i :class="`el-icon-${subItem.icon}`"></i>{{
          subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menuData: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/home'
        },
        {
          path: '/case',
          name: 'case',
          label: '案例管理',
          icon: 'setting',
          url: 'Case/Case'
        },
        {
          label: '媒资管理',
          icon: 'video-camera',
          children: [
            {
              path: '/media',
              name: 'media',
              label: '全局媒资管理',
              icon: 'video-camera',
              url: 'Media/Media'
            },
            {
              path: '/caseMedia',
              name: 'caseMedia',
              label: '案例媒资管理',
              icon: 'video-camera',
              url: 'caseMedia/caseMedia'
            },
            {
              path: '/serviceMedia',
              name: 'serviceMedia',
              label: '服务媒资管理',
              icon: 'video-camera',
              url: 'serviceMedia/serviceMedia'
            }
          ]
        },
        {
          path: '/information',
          name: 'information',
          label: '行业资讯',
          icon: 'setting',
          url: 'Information/Information'
        },
        {
          label: '服务管理',
          icon: 'service',
          children: [
            {
              path: '/servicebase',
              name: 'servicebase',
              label: '服务基础管理',
              icon: 'folder',
              url: 'ServiceBase/ServiceBase'
            },
            {
              path: '/serviceapplication',
              name: 'serviceapplication',
              label: '应用场景',
              icon: 'edit',
              url: 'ServiceApplication/ServiceApplication'
            }, {
              path: '/servicebook',
              name: 'servicebook',
              label: '服务套餐管理',
              icon: 'goods',
              url: 'ServiceBook/ServiceBook'
            }, {
              path: '/servicecompany',
              name: 'servicecompany',
              label: '历史交易管理',
              icon: 'office-building',
              url: 'ServiceCompany/ServicCompany'
            }, {
              path: '/servicefunction',
              name: 'servicefunction',
              label: '功能管理',
              icon: 'set-up',
              url: 'ServiceFunction/ServiceFuncton'
            },
          ]
        }
      ],
    };
  },
  methods: {
    // 当点击对应的选项时，跳转到对应的组件页面
    clickMenu(item) {
      // 当前页面地址和要跳转的页面的地址不相同时才进行页面的跳转
      // 由于进行了路由的重定向，所以需要判断是否从'/home'跳转到'/'地址
      if (this.$route.path !== item.path && !((this.$route.path) === '/home' && (item.path === '/'))) {
        this.$router.push(item.path)
      }
      //调用store中的方法
      this.$store.commit('selectMenu', item)
    },
  },
  // 通过计算属性，动态的得到分别要渲染的数据
  computed: {
    // 得到没有children属性的数据
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    // 得到有children属性的数据
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    // 通过计算属性，导入vuex中的state的isCollapse
    isCollapse() {
      return this.$store.state.Tab.isCollapse
    },
  }
}
</script>
