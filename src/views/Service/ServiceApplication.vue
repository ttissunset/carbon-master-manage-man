<template>
  <div class="application">
    <el-dialog title="提示" width="50%" :visible.sync="dialogVisible" :before-close="close">
      <!-- 用户的表单信息 -->
      <el-form :model="appform" label-width="150px" ref="appform" :inline="true" :rules="rules">
        <el-form-item label="应用名称" prop="applicationName">
          <el-input v-model="appform.applicationName" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="类别ID" prop="baseId">
          <el-input v-model="appform.baseId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="图片路径" prop="photoUrl">
          <el-input v-model="appform.photoUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="appform.description" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="application-header">
      <el-button type="primary" @click="add">
        +添加
      </el-button>
      <el-form :model="select" :inline="true">
        <el-form-item>
          <el-input v-model="select.sid" placeholder="请输入sid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-input v-model="select.id" placeholder="请输入id"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="application-body">
      <el-table :data="applicationData" style="width: 100%" :stripe="true" height="100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="名称">
                <span>{{ props.row.applicationName }}</span>
              </el-form-item>
              <el-form-item label="类别ID">
                <span>{{ props.row.baseId }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="图片路径">
                <span>{{ props.row.photoUrl }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="名称" prop="applicationName">
        </el-table-column>
        <el-table-column label="类别ID" prop="baseId">
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="updateThisApplication(scope.row)">更新</el-button>
            <el-button size="mini" type="danger" @click="deleteThisApplication(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { idSelect, sidSelect, updateApplication, deleteApplication, addApplications, allApplication } from '../../api'
export default {
  data() {
    return {
      appform: {
        baseId: '',
        applicationName: '',
        photoUrl: '',
        createTime: "",
        description: '',
        id: '',
        updateTime: ""
      },
      select: {
        id: '',
        sid: ''
      },
      modelType: 0,
      applicationData: [],
      rules: {
        id: [
          { required: true, message: '请输入id' }
        ],
        baseId: [
          { required: true, message: '请输入类别Id!' }
        ],
        applicationName: [
          { required: true, message: '请输入名称!' }
        ],
        description: [
          { required: true, message: '请输入描述!' }
        ],
        photoUrl: [
          { required: true, message: '请输入图片路径!' }
        ],
      },
      dialogVisible: false,
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      allApplication().then(res => {
        console.log(res);
        this.applicationData = res.data
      })
    },
    onSearch() {
      if (this.select.id && !this.select.sid) {
        idSelect(this.select.id).then(res => {
          const data = res.data
          console.log(res)
          if (res.code === "A0401") {
            this.$message({
              type: 'error',
              message: '该id不存在'
            })
          } else {
            this.applicationData = []
            this.applicationData.push(data)
          }
        })
      }
      if (!this.select.id && this.select.sid) {
        sidSelect(this.select.sid).then(res => {
          console.log(res)
          if (res.code == "A0401") {
            this.$message({
              type: 'error',
              message: '该sid不存在'
            })
          } else {
            this.applicationData = res.data
          }
        })
      }
      if (this.select.id && this.select.sid) {
        this.$message({
          type: 'error',
          message: '暂不支持该方式'
        })
      }
    },
    close() {
      this.$refs.appform.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.close()
    },
    back(){
      this.getAll()
      this.select.id = ''
      this.select.sid = ''
    },
    confirm() {
      this.$refs.appform.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            var msg = {
              'id': '',
              'baseId': this.appform.baseId,
              'applicationName': this.appform.applicationName,
              'photoUrl': this.appform.photoUrl,
              'createTime': '',
              'description': this.appform.description,
              'updateTime': ''
            }
            addApplications(msg).then((res) => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getAll()
            })
          } else if (this.modelType === 1) {
            var msg1 = {
              'id': this.appform.id,
              'baseId': this.appform.baseId,
              'applicationName': this.appform.applicationName,
              'photoUrl': this.appform.photoUrl,
              'createTime': '',
              'description': this.appform.description,
              'updateTime': ''
            }
            updateApplication(msg1).then((res) => {
              console.log(res);
              this.getAll()
            })
          }
          this.$refs.appform.resetFields()
          this.dialogVisible = false
        }
      })
    },
    add() {
      this.modelType = 0
      this.dialogVisible = true
    },
    updateThisApplication(row) {
      this.dialogVisible = true
      this.appform = JSON.parse(JSON.stringify(row))
      this.modelType = 1
    },
    deleteThisApplication(row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApplication(row.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.getAll()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style>
.application {
  height: 90%;
}
.application-body{
  height: 100%;
}

.application-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>