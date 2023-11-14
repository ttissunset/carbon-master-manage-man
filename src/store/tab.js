import Cookie from 'js-cookie'
export default {
  // state-用来存储数据
  state: {
    // 控制菜单是收起还是展开
    isCollapse: false,
    // 存放面包屑的数据
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/home',
      },
    ],
    menu: [],
  },
  // mutations-同步修改state的方法
  mutations: {
    // 修改菜单收起还是展开的方法
    collapseMenu(state) {
      //这里的方法必须把state传入，负责不能修改state数据
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑
    selectMenu(state, val) {
      // 如果要跳转的页面为首页
      if (val.name !== 'home') {
        // findIndex函数，如果数组中存在相同的则返回该元素的index序号，如果不存在相同的则返回-1
        const index = state.tabsList.findIndex((item) => item.name === val.name)
        // 如果哟跳转的页面不存在，则在面包屑中添加该页面的名称
        if (index === -1) {
          state.tabsList.push(val)
        }
      }
    },
    // 删除tag
    closeTag(state, item) {
      const index = state.tabsList.findIndex((val) => val.name === item.name)
      // 调用splice方法进行删除tag
      state.tabsList.splice(index, 1)
    },
    setMenu(state, val) {
      state.menu = val
      // state中的数据在刷新后将不存在，所以需要将要长久显示的menu进行缓存
      Cookie.set('menu', JSON.stringify(val))
    },
    // 动态注册路由
    addMenu(state, router) {
      //判断有没有数据
      if (!Cookie.get('menu')) return
      const menu = JSON.parse(Cookie.get('menu'))
      // 覆盖state中的menu
      state.menu = menu
      console.log(menu);
      // 组装动态的路由
      const menuArray = []
      menu.forEach((item) => {
        // 如果menu中的数据有子菜单
        if (item.children) {
          // 有子菜单则继续遍历children
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      // 路由的动态添加
      menuArray.forEach((item) => {
        router.addRoute('Main', item)
      })
    },
  },
}
