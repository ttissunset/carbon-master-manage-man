<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="dialog">
      <el-dialog title="提示" width="50%" :visible.sync="dialogVisible" :before-close="handleClose">
        <!-- 用户的表单信息 -->
        <el-form :model="form" label-width="150px" ref="form" :inline="true">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-row>
      <el-col :span="8" style="padding-right:10px">
        <div class="grid-content bg-purple">
          <el-card class="box-card" style="height:280px">
            <div class="user">
              <img src="../assets/images/user.png" class="img">
              <div class="userinfo">
                <p class="name">{{ username }}</p>
                <p class="access">超级管理员</p>
              </div>
            </div>
            <div class="setting-tab">
              <span class="btns">
                <el-button type="primary" @click="addAdmin">
                  新增管理员用户
                </el-button>
              </span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="userlist">
          <el-card style="height:280px">
            <el-table :data="userList" style="width: 100%">
              <el-table-column prop="username" label="用户名" width="240">
              </el-table-column>
              <el-table-column prop="id" label="ID" width="180">
              </el-table-column>
              <el-table-column prop="status" label="用户状态" width="180">
                <template slot-scope="scope">
                  <span>{{ scope.row.status == 1 ? '启用中' : '停用中' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="320">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="startUser(scope.row)">启用</el-button>
                  <el-button size="mini" type="danger" @click="banUser(scope.row)">停用</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24" style="padding-top:10px">
        <el-card style="height:430px">
          <div ref="echarts2" style="height:360px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import tab from '@/store/tab'
import { getAllUser, banAdmin, startAdmin, addAnAdmin } from '../api'
import axios from 'axios'
// 引入echarts
import * as echarts from 'echarts'

export default {
  data() {
    return {
      dialogVisible: false,
      banDialogVisible: false,
      startDialogVisible: false,
      form: {
        name: '',
        id: '',
        password: '',
        status: 1,
      },
      btnForm: {
        id: ''
      },
      userList: [],
      tableData: [],
      username: ''
    }
  },
  mounted() {
    getAllUser().then(res => {
      this.userList = res.data
      console.log(this.userList);
    }),
      this.username = localStorage.getItem('username')
    this.tableDataList()
  },
  methods: {
    tableDataList() {
      axios.get('https://www.carbonict.com/api/carbonqc/carbontrading?key=vKqyFL9zhBeq1h6R7AvLAVxGjz').then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data
        const echarts2 = echarts.init(this.$refs.echarts2);
        const echarts2Option = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: ['全国成交总量(吨)', '成交总额(千元)', '最高成交价(元/吨)', '最低成交价(元/吨)', '成交均价(元/吨)'],
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9"],
          series: [
            {
              name: '今日全国碳价详情',
              data: [this.tableData.T1, this.tableData.T2 / 1000, this.tableData.T3, this.tableData.T4, this.tableData.T5],
              type: 'bar'
            }],
        }
        echarts2.setOption(echarts2Option)
      })
    },
    addAdmin() {
      this.dialogVisible = true
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
    confirm() {
      var msg = {
        "id": '',
        "password": this.form.password,
        "status": this.form.status,
        "username": this.form.name
      }
      addAnAdmin(msg).then(() => {
        getAllUser().then(res => {
          this.dialogVisible = false
          this.$refs.form.resetFields()
          this.userList = res.data
        })
      })
    },
    startUser(row) {
      this.$confirm('是否启用该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startAdmin(row.id).then(res => {
          console.log(res);
          getAllUser().then(res => {
            this.userList = res.data
            console.log(res.data);
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        })
      })
    },
    banUser(row) {
      this.$confirm('是否停用该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        banAdmin(row.id).then(res => {
          console.log(res);
          getAllUser().then(res => {
            this.userList = res.data
            console.log(res.data);
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }

    .status {
      display: flex;
      align-items: baseline;
      color: lightgreen;
      font-weight: 600;

      .el-icon-circle-check {
        font-weight: 600;
      }
    }
  }
}

.setting-tab {
  .btns {
    display: flex;
    justify-content: center;
  }
}

.userlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>