<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-container>
      <!-- 将width改为auto，让其自适应 -->
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
import CommonTag from '../components/CommonTag.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}

.el-menu {
  border-right: none;
}
</style>