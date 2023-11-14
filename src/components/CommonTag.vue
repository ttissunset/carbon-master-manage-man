<template>
  <div class="tabs">
    <el-tag v-for="(item, index) in tags" :key="item.path" :effect="$route.name === item.name ? 'dark' : 'plain'"
      :closable="item.name !== 'home'" @click="changePath(item)" @close="handleClose(item, index)" size="small">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'CommonTag',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: state => state.Tab.tabsList
    })
  },
  methods: {
    // 通过辅助函数将获取store中的closeTag事件
    ...mapMutations(['closeTag']),
    changePath(item) {
      // 点击tag标签时跳转到当前页面
      this.$router.push({ name: item.name })
    },
    // 点击删除事件
    handleClose(item, index) {
      const length = this.tags.length - 1;
      // 调用closeTag事件
      this.closeTag(item)
      // 删除之后的页面跳转
      // 如果点击的tag的name与当前路由的name不一致，则表示删除的不是当前页面，直接return出去
      if (item.name !== this.$route.name) {
        return
      }
      // 如果删除的是最后一项，向前一个tag的路由跳转
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name
        })
      } else {
        // 如果删除的是中间的tag则向后一个tag的路由跳转
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 10px 0 0 10px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>