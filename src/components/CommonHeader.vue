<template>
  <div class="header-container">
    <div class="l-content">
      <el-button icon="el-icon-menu" size="mini" @click="handleMenu" style="margin-right:20px"></el-button>
      <!-- 面包屑   -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{
          item.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="logoutThisAdmin">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// 引入辅助函数
import { mapState } from 'vuex';
import { logoutAdmin } from '@/api';

export default {
  data() {
    return {

    }
  },
  computed: {
    // 通过扩展运算符，赋予tags值
    ...mapState({
      tags: state => state.Tab.tabsList
    }),
  },
  methods: {
    // 通过this.$store.commit接收vuex中 mutations中的collapseMenu方法
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    // 登出账号
    logoutThisAdmin() {
      localStorage.removeItem('token')
      logoutAdmin().then(res => { console.log(res); })
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
    ;
  }

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;

        //&.is-link表示同时存在 .el-breadcrumb__inner 和 .is-link 两个类名时才生效
        &.is-link {
          color: #666
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: #fff
        }
      }
    }
  }
}
</style>