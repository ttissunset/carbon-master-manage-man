<template>
  <div class="bookManage">
    <el-dialog title="新增" width="50%" :visible.sync="dialogVisible" :before-close="close">
      <!-- 用户的表单信息 -->
      <el-form :model="msg" label-width="100px" ref="form" :inline="true">
        <el-form-item label="套餐名">
          <el-input v-model="msg.bookName" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="订阅时长">
          <el-input v-model="msg.bookTime" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="msg.price" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属服务id">
          <el-select v-model="msg.serviceBaseId" placeholder="请选择对应的核心服务id">
            <el-option v-for="(item, index) in coreService" :key="index" :label="item.label" :value="item.id">
              <span style="float: left">{{ item.id }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="book-header">
      <el-button style="height: 40px" @click="addBook" type="primary">新建+</el-button>
      <el-form :model="bookIds" :inline="true">
        <el-form-item>
          <el-input v-model="bookIds.sid" placeholder="请输入服务sid(可选)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="bookIds.id" placeholder="请输入套餐id(可选)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="book-common-body">
      <el-table :data="bookData" style="width: 100%" :stripe="true" height="100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="套餐名">
                <span>{{ props.row.bookName }}</span>
              </el-form-item>
              <el-form-item label="套餐 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="所属服务id">
                <span>{{ props.row.serviceBaseId }}</span>
              </el-form-item>
              <el-form-item label="设置的订阅时长">
                <span>{{ props.row.bookTime }}天</span>
              </el-form-item>
              <el-form-item label="设置的价格￥">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="订单创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="订单更新时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="套餐 ID" prop="id">
        </el-table-column>
        <el-table-column label="套餐名" prop="bookName">
        </el-table-column>
        <el-table-column label="所属服务id" prop="serviceBaseId">
        </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { selectBookById, selectBookBySid, selectBookByIds, getAllBook, deleteBookById, addNewBook, updateBook } from '../../api'
export default {
  data() {
    return {
      bookIds: {
        id: '',
        sid: '',
      },
      total: 0,
      bookData: [],
      msg: {
        bookName: "",
        bookTime: 0,
        createTime: "",
        id: 0,
        price: 0,
        serviceBaseId: '',
        updateTime: ""
      },
      coreService: [
        {
          id: 88888888,
          label: "碳足迹"
        },
        {
          id: 99999999,
          label: "碳减排"
        },
        {
          id: 66666666,
          label: "碳中和"
        },
      ],
      dialogVisible: false,
      modelType: 0
    }
  },
  // 页面创建时获取所有订单内容并渲染
  created() {
    this.getList()
  },
  methods: {
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 1) {
            // updateBook()
            var msg1 = {
              "bookName": this.msg.bookName,
              "bookTime": this.msg.bookTime,
              "createTime": this.msg.createTime,
              "id": this.msg.id,
              "price": this.msg.price,
              "serviceBaseId": this.msg.serviceBaseId,
              "updateTime": ""
            }
            updateBook(msg1).then(res => {
              console.log(res);
              this.getList()
            })
          } else if (this.modelType === 0) {
            addNewBook(this.msg).then(res => {
              console.log(res)
              this.getList()
            })
          }
          this.$refs.form.resetFields()
          this.dialogVisible = false
        }
      })
    },
    handleUpdate(row) {
      this.dialogVisible = true
      this.msg = row
      this.modelType = 1
    },
    addBook() {
      this.dialogVisible = true
      this.modelType = 0
    },
    close() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    getList() {
      getAllBook().then(res => {
        console.log(res);
        if (res.data !== null) {
          this.bookData = res.data
          console.log(res.data)
        }
      })
    },
    onSubmit() {
      if (this.bookIds.id && !this.bookIds.sid) { //通过id查询
        selectBookById(this.bookIds.id).then(res => {
          console.log(res.data)
          const data = res.data
          this.bookData = []
          this.bookData.push(data)
        })
      }
      if (!this.bookIds.id && this.bookIds.sid) { //通过sid查询
        selectBookBySid(this.bookIds.sid).then(res => {
          console.log(res.data);
          this.bookData = res.data
        })
      }
      if (this.bookIds.id && this.bookIds.sid) { //通过id和sid 联合查询
        var ids = {
          'id': this.bookIds.id,
          'ids': [0],
          'serviceId': this.bookIds.sid
        }
        selectBookByIds(ids).then(res => {
          console.log(res);
          const data = res.data
          this.bookData = []
          this.bookData.push(data)
        })
      }
    },
    back() {
      this.getList()
      this.bookIds.id = ''
      this.bookIds.sid = ''
    },
    handlePage() {
      this.getList()
    },
    cancel() {
      this.close()
    },
    handleDelete(params) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(params.id);
        deleteBookById(params.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.getList()
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

<style lang="less">
.bookManage {
  height: 90%;
}

.demo-table-expand {
  font-size: 0;
}

.book-header {
  display: flex;
  justify-content: space-between;
}

.book-common-body .demo-table-expand label {
  width: 150px;
  color: #99a9bf;
}

.book-common-body .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}

.book-common-body {
  position: relative;
  height: calc(100% - 62px);

  .pager {
    position: absolute;
    bottom: 20px;
    right: 50%;
  }
}
</style>