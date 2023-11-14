<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="information-manage">
    <el-dialog title="提示" width="50%" :visible.sync="dialogVisible" :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form :model="form" label-width="150px" ref="form" :inline="true" :rules="rules">
        <el-form-item label="detail" prop="detail">
          <el-input v-model="form.detail" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="mediaOne" prop="mediaIdOne">
          <el-select v-model="form.mediaIdOne" placeholder="请选择">
            <el-option v-for="item in media" :key="item.id" :value="item.id"> {{ item.filename }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="mediaIdTwo" prop="mediaIdTwo">
          <el-select v-model="form.mediaIdTwo" placeholder="请选择">
            <el-option v-for="item in media" :key="item.id" :value="item.id"> {{ item.filename }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="mediaIdThree" prop="mediaIdThree">
          <el-select v-model="form.mediaIdThree" placeholder="请选择">
            <el-option v-for="item in media" :key="item.id" :value="item.id"> {{item.filename }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="suggedtion" prop="suggestion">
          <el-input v-model="form.suggestion" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="title" prop="title">
          <el-input v-model="form.title" placeholder="请输入"></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="case-header">
      <el-button type="primary" @click="addInfo">
        +新增
      </el-button>
      <el-form :model="search" :inline="true">
        <el-form-item>
          <el-input v-model="search.id" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="information-body">
      <el-table :data="informationData" style="width: 100%" height="95%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="Detail">
                <span>{{ props.row.detail }}</span>
              </el-form-item>
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="MediaOne">
                <span>{{ props.row.mediaIdOne }}</span>
              </el-form-item>
              <el-form-item label="MediaTwo">
                <span>{{ props.row.mediaIdTwo }}</span>
              </el-form-item>
              <el-form-item label="MediaThree">
                <span>{{ props.row.mediaIdThree }}</span>
              </el-form-item>
              <el-form-item label="Suggestion">
                <span>{{ props.row.suggestion }}</span>
              </el-form-item>
              <el-form-item label="Title">
                <span>{{ props.row.title }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="titlt" prop="title">
        </el-table-column>
        <el-table-column label="detail" prop="detail">
        </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
        </div> -->
    </div>
  </div>
</template>

<script>
import { getPage, addInformation, getInformationById, getFiles, deleteInformation, updateInformation } from '../api'
export default {
  data() {
    return {
      form: {
        detail: '',
        mediaIdOne: '',
        mediaIdThree: '',
        mediaIdTwo: '',
        suggestion: '',
        title: ''
      },
      media: [],
      rules: {
        detail: [
          { required: true, message: '请输入detail!' }
        ],
        mediaIdOne: [
          { required: true, message: '请输入mediaOne!' }
        ],
        mediaIdTwo: [
          { required: true, message: '请输入mediaTeo!' }
        ],
        mediaIdThree: [
          { required: true, message: '请输入mediaThree!' }
        ],
        suggestion: [
          { required: true, message: '请输入suggestion!' }
        ],
        title: [
          { required: true, message: '请输入title!' }
        ],
      },
      informationData: [],
      total: 0,
      pageData: {
        pageNo: 1,
        pageSize: 10
      },
      search: {
        id: ''
      },
      modelType: 0,
      dialogVisible: false,
    }
  },
  mounted() {
    this.getList()
    this.getMediaList()
  },
  methods: {
    getList() {
      var pageParams = {
        "pageNo": 1,
        "pageSize": 10
      }
      getPage(pageParams).then(res => {
        console.log(res.items);
        this.informationData = res.items
      })
    },
    getMediaList() {
      var msg = {
        "fileType": "",
        "filename": ""
      }
      getFiles(msg).then((res) => {
        this.media = res.items
      })
    },
    addInfo() {
      this.dialogVisible = true
    },
    cancel() {
      this.handleClose()
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            var msg = {
              "detail": this.form.detail,
              "mediaIdOne": this.form.mediaIdOne,
              "mediaIdThree": this.form.mediaIdTwo,
              "mediaIdTwo": this.form.mediaIdThree,
              "suggestion": this.form.suggestion,
              "title": this.form.title
            }
            addInformation(msg).then(res => {
              console.log(res)
              this.getList()
            })
          } else if (this.modelType === 1) {
            var msgs = {
              "id": this.form.id,
              "detail": this.form.detail,
              "mediaIdOne": this.form.mediaIdOne,
              "mediaIdThree": this.form.mediaIdTwo,
              "mediaIdTwo": this.form.mediaIdThree,
              "suggestion": this.form.suggestion,
              "title": this.form.title
            }
            updateInformation(msgs).then(res => {
              console.log(res);
              this.getList()
              this.modelType === 0
            })
          }
          this.$refs.form.resetFields()
          this.dialogVisible = false
        }
      })
    },
    onSearch() {
      getInformationById(this.search.id).then(res => {
        console.log(res);
        const data = res.data
        this.informationData = []
        this.informationData.push(data)
      })
    },
    back() {
      this.getList()
      this.search.id = ''
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    handlePage(val) {
      console.log(val);
      this.PageData.pageNo = val
    },
    handleEdit(row) {
      this.dialogVisible = true
      this.form = row
      this.modelType = 1
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteInformation(row.id).then(() => {
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

<style>
.information-manage {
  height: 90%
}

.information-body {
  height: 100%;
}
</style>