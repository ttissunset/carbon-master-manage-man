<template>
  <div class="function-manage">
    <el-dialog title="提示" width="50%" :visible.sync="dialogVisible" :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form :model="funcform" label-width="150px" ref="funcform" :inline="true">
        <el-form-item label="功能名称" prop="functionName">
          <el-input v-model="funcform.functionName" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="功能ID" prop="baseId">
          <el-input v-model="funcform.baseId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="图片路径" prop="photoUrl">
          <el-input v-model="funcform.photoUrl" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="funcform.description" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="function-header">
      <el-button type="primary" @click="addFunc">
        +新增
      </el-button>
      <el-form :model="functionIds" :inline="true">
        <el-form-item>
          <el-input v-model="functionIds.sid" placeholder="请输入sid(可选)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="functionIds.id" placeholder="请输入id(可选)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="function-body">
      <el-table :data="functionData" style="width: 100%" :stripe="true" height="95%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="120px">
              <el-form-item label="功能名称">
                <span>{{ props.row.functionName }}</span>
              </el-form-item>
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="功能ID">
                <span>{{ props.row.baseId }}</span>
              </el-form-item>
              <el-form-item label="图片路径">
                <span>{{ props.row.photoUrl }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updataTime }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="function名称" prop="functionName">
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="类别ID" prop="baseId">
        </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="update(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="deleteThis(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { addFunction, updateFunction, deleteFunctionById, getFunctionById, getFunctionBySid, allFunction } from '../../api'
export default {
  data() {
    return {
      functionIds: {
        sid: '',
        id: ''
      },
      functionData: [],
      dialogVisible: false,
      modelType: 0,
      funcform: {
        baseId: "",
        createTime: "",
        description: "",
        functionName: "",
        id: "",
        photoUrl: "",
        updateTime: ""
      }
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      allFunction().then(res => {
        this.functionData = res.data
      })
    },
    back() {
      this.getAll()
      this.functionIds.id = ''
      this.functionIds.sid = ''
    },
    onSearch() {
      if (this.functionIds.id && !this.functionIds.sid) {
        getFunctionById(this.functionIds.id).then(res => {
          console.log(res)
          if (res.code === 'A0401') {
            this.$message({
              type: 'error',
              message: '该id不存在'
            })
          } else {
            this.functionData = []
            this.functionData.push(res.data)
          }
        })
      }
      if (!this.functionIds.id && this.functionIds.sid) {
        getFunctionBySid(this.functionIds.sid).then(res => {
          console.log(res);
          if (res.code == "A0401") {
            this.$message({
              type: 'error',
              message: '该sid不存在'
            })
          } else {
            this.functionData = res.data
          }
        })
      }
      if (this.functionIds.id && this.functionIds.sid) {
        this.$message({
          type: 'error',
          message: '暂不支持该方式'
        })
      }
    },
    handleClose() {
      this.$refs.funcform.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
    confirm() {
      this.$refs.funcform.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            var msg = {
              "baseId": this.funcform.baseId,
              "createTime": "",
              "description": this.funcform.description,
              "functionName": this.funcform.functionName,
              "id": "",
              "photoUrl": this.funcform.photoUrl,
              "updateTime": ""
            }
            addFunction(msg).then((res) => {
              console.log(res);
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getAll()
            })
          } else if (this.modelType === 1) {
            var msg1 = {
              "baseId": this.funcform.baseId,
              "createTime": "",
              "description": this.funcform.description,
              "functionName": this.funcform.functionName,
              "id": this.funcform.id,
              "photoUrl": this.funcform.photoUrl,
              "updateTime": ""
            }
            updateFunction(msg1).then((res) => {
              console.log(res);
              if (res.code === 'B0001') {
                this.$message({
                  type: 'error',
                  message: '更改失败！'
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '更改成功！'
                })
                this.getAll()
              }
            })
          }
          this.$refs.funcform.resetFields()
          this.dialogVisible = false
        }
      })
    },
    addFunc() {
      this.modelType = 0
      this.dialogVisible = true
      console.log(this.funcform);
    },
    update(row) {
      this.dialogVisible = true
      this.funcform = JSON.parse(JSON.stringify(row))
      this.modelType = 1
    },
    deleteThis(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFunctionById(row.id).then(() => {
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
.function-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.function-manage {
  height: 90%;
}

.function-body {
  height: 95%;
}
</style>