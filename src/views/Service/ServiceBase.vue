<template>
  <div class="base-controller">
    <el-dialog title="新增" width="50%" :visible.sync="dialogVisible" :before-close="close">
      <!-- 用户的表单信息 -->
      <el-form :model="form" label-width="80px" ref="form" :inline="true" :rules="rules">
        <el-form-item label="服务名" prop="serviceName">
          <el-input v-model="form.serviceName" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="应用名" prop="applicationName">
          <el-input v-model="form.applicationName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desperation">
          <el-input v-model="form.desperation" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="服务id" prop="coreId">
          <el-select v-model="coreId" placeholder="请选择对应的核心服务id">
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
    <el-dialog title="绑定媒资" width="50%" :visible.sync="see" :before-close="handleClose">
      <el-form :model="mediaForm" label-width="150px" ref="mediaForm" :inline="true">
        <el-form-item label="可用媒资" prop="mediaID ">
          <el-select v-model="mediaForm.mediaID" placeholder="请选择">
            <el-option v-for="item in serviceMedia" :key="item.id" :value="item.id"> {{ item.url }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="bindTheMedia"> 绑定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="base-header">
      <el-button type="primary" @click="addBase">
        +新增
      </el-button>
      <el-form :model="search" :inline="true">
        <el-form-item>
          <el-input v-model="search.id" placeholder="请输入ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-body">
      <el-table :data="baseData" style="width: 100%" height="100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="服务名">
                <span>{{ props.row.serviceName }}</span>
              </el-form-item>
              <el-form-item label="应用名">
                <span>{{ props.row.applicationName }}</span>
              </el-form-item>
              <el-form-item label="应用" v-for="item in listApplication" :key="item.id" class="list">
                <el-form-item label="应用名">
                  <span>{{ item.applicationName }}</span>
                </el-form-item>
                <el-form-item label="baseId">
                  <span>{{ item.baseId }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ item.createTime }}</span>
                </el-form-item>
                <el-form-item label="描述">
                  <span>{{ item.description }}</span>
                </el-form-item>
                <el-form-item label="id">
                  <span>{{ item.id }}</span>
                </el-form-item>
                <el-form-item label="路径">
                  <span>{{ item.photoUrl }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ item.updateTime }}</span>
                </el-form-item>
              </el-form-item>
              <el-form-item label="方法" v-for="item in listFunctions" :key="item.id" class="list">
                <el-form-item label="应用名">
                  <span>{{ item.applicationName }}</span>
                </el-form-item>
                <el-form-item label="baseId">
                  <span>{{ item.baseId }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ item.createTime }}</span>
                </el-form-item>
                <el-form-item label="描述">
                  <span>{{ item.description }}</span>
                </el-form-item>
                <el-form-item label="id">
                  <span>{{ item.id }}</span>
                </el-form-item>
                <el-form-item label="路径">
                  <span>{{ item.photoUrl }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ item.updateTime }}</span>
                </el-form-item>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.desperation }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="服务名" prop="serviceName">
        </el-table-column>
        <el-table-column label="应用名" prop="applicationName">
        </el-table-column>

        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="updateBase(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="bindMedia(scope.row)">绑定媒资</el-button>
            <el-button size="mini" type="danger" @click="deleteBase(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllBase, addBases, updateBases, deleteBaseId, getBaseId, getFiles, serviceMediaBind } from '../../api'
export default {
  data() {
    return {
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
      see: false,
      baseData: [],
      serviceMedia: [],
      id: '',
      coreId: "",
      search: {
        id: ''
      },
      dialogVisible: false,
      modelType: 0,
      form: {
        applicationName: '',
        desperation: '',
        serviceName: '',
      },
      rules: {
        applicationName: [
          { required: true, message: '请输入!' }
        ],
        desperation: [
          { required: true, message: '请输入!' }
        ],
        serviceName: [
          { required: true, message: '请输入!' }
        ],
      },
      mediaForm: {
        mediaID: ''
      },
      listApplication: [],
      listFunctions: [],
    }
  },
  created() {
    this.getBases()
    this.getMedia()
  },
  methods: {
    getBases() {
      getAllBase().then(res => {
        if (res.data !== null) {
          console.log(res.data);
          this.baseData = res.data
          this.listApplication = res.data.listApplication
          this.listFunctions = res.data.listFunctions
        }
      })
    },
    getMedia() {
      var msg = {
        "fileType": "",
        "filename": ""
      }
      getFiles(msg).then((res) => {
        this.serviceMedia = res.items
      })
    },
    bindMedia(row) {
      this.see = true
      this.id = row.id
    },
    bindTheMedia() {
      var media = {
        "mediaId": this.mediaForm.mediaID,
        "mediaType": "",
        "serviceId": this.id,
        "tieAdmin": ""
      }
      console.log(media);
      serviceMediaBind(media).then(res => {
        console.log(res);
      })
      this.see = false
    },
    handleClose() {
      this.see = false
      // this.$refs.medaiForm.resetFields()
    },
    close() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.close()
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            var msg = {
              "applicationName": this.form.applicationName,
              "createTime": '',
              "desperation": this.form.desperation,
              "id": this.coreId,
              "serviceName": this.form.serviceName,
              "updateTime": ''
            }
            console.log(msg);
            addBases(msg).then(res => {
              console.log(res)
              this.getBases()
            })
          } else if (this.modelType === 1) {
            var msgs = {
              "applicationName": this.form.applicationName,
              "createTime": "",
              "desperation": this.form.desperation,
              "id": this.id,
              "serviceName": this.form.serviceName,
              "updateTime": ""
            }
            updateBases(msgs).then((res) => {
              console.log(res);
              this.getBases()
              this.modelType === 0
            })
          }
          this.$refs.form.resetFields()
          this.dialogVisible = false
        }
      })
    },
    addBase() {
      this.dialogVisible = true
    },
    onSearch() {
      getBaseId(this.search.id).then(res => {
        console.log(res)
        const data = res.data
        console.log(data);
        const data1 = { ...data, id: this.search.id }
        this.baseData = []
        this.baseData.push(data1)
      })
    },
    back() {
      this.getBases()
      this.search.id = ''
    },
    updateBase(row) {
      this.dialogVisible = true
      this.form = row
      this.id = row.id
      this.modelType = 1
    },
    deleteBase(row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBaseId(row.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.getBases()
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
.base-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base-controller {
  height: 95%;
}

.base-body {
  position: relative;
  height: calc(100% - 62px);
}

.list .el-form-item {
  margin-left: 30px;
}
</style>