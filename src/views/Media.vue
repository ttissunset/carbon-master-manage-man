<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="media-manage">
    <el-dialog title="提示" width="50%" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form :model="formMsg" label-width="150px" :inline="true" :rules="rules">
        <el-form-item label="文件" prop="file">
          <el-input v-model="formMsg.filedata" type="file">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="media-header">
      <el-button type="primary" @click="upload">
        +上传
      </el-button>
      <el-form :model="form" :inline="true">
        <el-form-item>
          <el-input v-model="form.fileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.fileType" placeholder="请输入文件类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="media-commonbody">
      <el-table :data="mediaData" style="width: 100%" :stripe="true" height="90%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="bucket">
                <span>{{ props.row.bucket }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createDate }}</span>
              </el-form-item>
              <el-form-item label="文件路径">
                <span>{{ props.row.filePath }}</span>
              </el-form-item>
              <el-form-item label="文件大小">
                <span>{{ props.row.fileSize }}</span>
              </el-form-item>
              <el-form-item label="文件类型">
                <span>{{ props.row.fileType }}</span>
              </el-form-item>
              <el-form-item label="文件名称">
                <span>{{ props.row.fileName }}</span>
              </el-form-item>
              <el-form-item label="文件状态">
                <span>{{ props.row.status === '1' ? '启用' : '禁用' }}</span>
              </el-form-item>
              <el-form-item label="url">
                <span>{{ props.row.url }}</span>
              </el-form-item>
              <el-form-item label="文件备注">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="文件名称" prop="filename">
        </el-table-column>
        <el-table-column label="文件类型" prop="fileType">
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="seeThisMedia(scope.row.id)">预览</el-button>
            <el-button size="mini" type="danger" @click="banThisMedia(scope.row.id)">禁用</el-button>
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
import { getFiles, banMedia, courseFile, previewMedia } from '../api'
export default {
  data() {
    return {
      form: {
        fileType: '',
        fileName: ''
      },
      formMsg: {
        filedata: '',
      },
      rules: {
        file: [
          { required: true, message: '必须选择要上传的文件' }
        ]
      },
      dialogVisible: false,
      mediaData: [],
      total: 0, //总条数
      pageData: {
        page: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      var media = {
        "fileType": '',
        "filename": '',
        "pageNo": this.pageData.page,
        "pageSize": this.pageData.pageSize
      }
      getFiles(media).then(res => {
        console.log(res);
        this.total = res.items.length || 0
        this.mediaData = res.items
      })
    },
    onSubmit() {
      var msg = {
        "fileType": this.form.fileType,
        "filename": this.form.fileName
      }
      getFiles(msg).then((res) => {
        this.mediaData = res.items
      })
    },
    back() {
      this.getList()
    },
    upload() {
      this.dialogVisible = true
    },
    cancle() {
      this.handleClose()
    },
    confirm() {
      console.log(this.formMsg.filedata);
      courseFile(this.formMsg.filedata).then(res => {
        console.log(res)
        this.getList()
      })
      this.dialogVisible = false
    },
    handleClose() {
      this.dialogVisible = false
    },
    handlePage(val) {
      console.log(val);
      this.PageData.page = val
      this.getList()
    },
    banThisMedia(id) {
      banMedia(id).then(res => {
        this.$message({
          type: 'warning',
          message: '禁用成功',
        })
        this.getList()
        console.log(res);
      })
    },
    seeThisMedia(id) {
      previewMedia(id).then(res => {
        // console.log(res);
        this.$alert(res.data, '您要预览的文件地址:', {
          confirmButtonText: '确定',
          callback: () => {
            this.$message({
              type: 'info',
              message: '已关闭弹窗'
            });
          }
        });
      })
    }
  }
}
</script>

<style>
.media-manage {
  height: 90%;
}

.media-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.media-commonbody {
  position: relative;
  height: calc(100% - 62px);
}

.media-common-table .pager {
  position: absolute;
  bottom: 0;
  right: 50%;
}
</style>