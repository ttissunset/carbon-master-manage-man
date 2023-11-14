<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="case-manage">
    <el-dialog title="提示" width="50%" :visible.sync="dialogVisible" :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form :model="form" label-width="150px" ref="form" :inline="true" :rules="rules">
        <el-form-item label="案例名称">
          <el-input v-model="form.caseName" placeholder="请输入案例名称"></el-input>
        </el-form-item>
        
        <el-form-item label="[固定需要3个]CaseComment1" label-width="50%">
          <el-form-item label="评论者">
            <el-input v-model="form.caseComments[0].commentator" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="可用头像媒资">
            <el-select v-model="form.caseComments[0].commentatorAvatarMediaId" placeholder="请选择">
              <el-option v-for="item in caseMedia" :key="item.id" :value="item.id"> {{ item.url }}</el-option>
            </el-select>
            <el-button @click="bindMedia"> 绑定媒资</el-button>
          </el-form-item>
          <el-form-item label="案例描述">
            <el-input type="textarea" v-model="form.caseComments[0].comment" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="CaseComment2" label-width="50%">
          <el-form-item label="评论者">
            <el-input v-model="form.caseComments[1].commentator" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="可用头像媒资">
            <el-select v-model="form.caseComments[1].commentatorAvatarMediaId" placeholder="请选择">
              <el-option v-for="item in caseMedia" :key="item.id" :value="item.id"> {{ item.url }}</el-option>
            </el-select>
            <el-button @click="bindMedia"> 绑定媒资</el-button>
          </el-form-item>
          <el-form-item label="案例描述">
            <el-input type="textarea" v-model="form.caseComments[1].comment" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="CaseComment3" label-width="50%">
          <el-form-item label="评论者">
            <el-input v-model="form.caseComments[2].commentator" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="可用头像媒资">
            <el-select v-model="form.caseComments[2].commentatorAvatarMediaId" placeholder="请选择">
              <el-option v-for="item in caseMedia" :key="item.id" :value="item.id"> {{ item.url }}</el-option>
            </el-select>
            <el-button @click="bindMedia"> 绑定媒资</el-button>
          </el-form-item>
          <el-form-item label="案例描述">
            <el-input type="textarea" v-model="form.caseComments[2].comment" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>

        <el-form-item label="[固定需要4个]CaseRequirements1" label-width="50%">
          <el-form-item label="遇到的困难">
            <el-input v-model="form.caseRequirements[0].difficulty" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="需求">
            <el-input v-model="form.caseRequirements[0].requirement" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="CaseRequirements2" label-width="50%">
          <el-form-item label="遇到的困难">
            <el-input v-model="form.caseRequirements[1].difficulty" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="需求">
            <el-input v-model="form.caseRequirements[1].requirement" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="CaseRequirements3" label-width="50%">
          <el-form-item label="遇到的困难">
            <el-input v-model="form.caseRequirements[2].difficulty" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="需求">
            <el-input v-model="form.caseRequirements[2].requirement" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="CaseRequirements4" label-width="50%">
          <el-form-item label="遇到的困难">
            <el-input v-model="form.caseRequirements[3].difficulty" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="需求">
            <el-input v-model="form.caseRequirements[3].requirement" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>
        
        <el-form-item label="[固定需要2个]CaseTargets1" label-width="50%">
          <el-form-item label="提升">
            <el-input v-model="form.caseTargets[0].advance" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类别ID">
            <el-input v-model="form.caseTargets[0].caseId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标">
            <el-input v-model="form.caseTargets[0].target" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="CaseTargets2" label-width="50%">
          <el-form-item label="提升">
            <el-input v-model="form.caseTargets[1].advance" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类别ID">
            <el-input v-model="form.caseTargets[1].caseId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标">
            <el-input v-model="form.caseTargets[1].target" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form-item>
        
        <el-form-item label="企业名称">
          <el-input v-model="form.enterpriseName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="企业描述">
          <el-input v-model="form.enterpriseDescription" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="case-header">
      <el-button type="primary" @click="addCase">
        +新增
      </el-button>
      <el-form :model="caseId" :inline="true">
        <el-form-item>
          <el-input v-model="caseId.id" placeholder="请输入案例id" ref="ipt"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="cases" style="width: 100%" height="100%" :stripe="true">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="150px">
              <el-form-item label="案例名称">
                <span>{{ props.row.caseName }}</span>
              </el-form-item>
              <el-form-item label="所属组织">
                <span>{{ props.row.enterpriseName }}</span>
              </el-form-item>
              <el-form-item label="案例ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="企业名称">
                <span>{{ props.row.enterpriseName }}</span>
              </el-form-item>
              <el-form-item label="企业描述">
                <span>{{ props.row.enterpriseDescription }}</span>
              </el-form-item>
              <el-form-item label="caseComments" v-show="other === true" v-for="item in caseComments" :key="item.id"
                class="caseComments" label-width="100%">
                <el-form-item label="caseID">
                  <span>{{ item.caseId }}</span>
                </el-form-item>
                <el-form-item label="内容">
                  <span>{{ item.comment }}</span>
                </el-form-item>
                <el-form-item label="评论者">
                  <span>{{ item.commentator }}</span>
                </el-form-item>
                <el-form-item label="头像媒资">
                  <span>{{ item.commentatorAvatarMediaId }}</span>
                </el-form-item>
                <el-form-item label="id">
                  <span>{{ item.id }}</span>
                </el-form-item>
              </el-form-item>
              <el-form-item label="caseRequirements" v-show="other === true" v-for="item in caseRequirements"
                :key="item.id" class="caseComments" label-width="100%">
                <el-form-item label="caseID">
                  <span>{{ item.caseId }}</span>
                </el-form-item>
                <el-form-item label="困难">
                  <span>{{ item.difficulty }}</span>
                </el-form-item>
                <el-form-item label="需求">
                  <span>{{ item.requirement }}</span>
                </el-form-item>
                <el-form-item label="id">
                  <span>{{ item.id }}</span>
                </el-form-item>
              </el-form-item>
              <el-form-item label="caseTargets" v-show="other === true" v-for="item in caseTargets" :key="item.id"
                class="caseComments" label-width="100%">
                <el-form-item label="增长">
                  <span>{{ item.advance }}</span>
                </el-form-item>
                <el-form-item label="caseId">
                  <span>{{ item.caseId }}</span>
                </el-form-item>
                <el-form-item label="目标">
                  <span>{{ item.target }}</span>
                </el-form-item>
                <el-form-item label="id">
                  <span>{{ item.id }}</span>
                </el-form-item>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="案例ID" prop="id">
        </el-table-column>
        <el-table-column label="案例名称" prop="caseName">
        </el-table-column>
        <el-table-column label="所属组织" prop="enterpriseName">
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllCase, getCaseById, deleteCaseById, addCases, getFiles, caseMediaBind } from '@/api'
export default {
  data() {
    return {
      rules: {
        caseName: [
          { required: true, message: '请输入案例名称!' }
        ],
        enterpriseName: [
          { required: true, message: '请选择公司名称!' }
        ],
        enterpriseDescription: [
          { required: true, message: '请输入公司描述!' }
        ],
      },
      form: {
        caseComments: [
          {
            comment: '',
            commentator: '',
            commentatorAvatarMediaId: ''
          },{
            comment: '',
            commentator: '',
            commentatorAvatarMediaId: ''
          },{
            comment: '',
            commentator: '',
            commentatorAvatarMediaId: ''
          }
        ],
        caseName: '',
        caseRequirements: [
          {
            difficulty: '',
            id: '',
            requirement: ''
          },{
            difficulty: '',
            id: '',
            requirement: ''
          },{
            difficulty: '',
            id: '',
            requirement: ''
          },{
            difficulty: '',
            id: '',
            requirement: ''
          }
        ],
        caseTargets: [
          {
            advance: '',
            id: '',
            target: ''
          },{
            advance: '',
            id: '',
            target: ''
          }
        ],
        enterpriseName: '',
        enterpriseDescription: ''
      },
      caseId: {
        id: ''
      },
      dialogVisible: false,
      cases: [],
      caseMedia: [],
      other: false,
      caseComments: [],
      caseRequirements: [],
      caseTargets: []
    }
  },
  mounted() {
    this.getCase()
    this.getAllCaseMedia()
  },
  methods: {
    getCase() {
      getAllCase().then(res => {
        console.log(res);
        this.cases = res.items
      })
    },
    getAllCaseMedia() {
      var msg = {
        "fileType": "",
        "filename": ""
      }
      getFiles(msg).then((res) => {
        this.caseMedia = res.items
      })
    },
    bindMedia() {
      var bind = {
        "caseId": this.form.caseComments.caseId,
        "mediaId": this.form.caseComments.commentatorAvatarMediaId,
        "mediaType": "",
        "tieAdmin": ""
      }
      console.log(bind);
      caseMediaBind(bind).then(res => {
        console.log(res);
        this.$message({
          type: 'success',
          message: '绑定成功！'
        })
      })
    },
    confirm() {
      var msg = {
        "caseComments": this.form.caseComments,
        "caseName": this.form.caseName,
        "caseRequirements": this.form.caseRequirements,
        "caseTargets": this.form.caseTargets,
        "enterpriseDescription": this.form.enterpriseDescription,
        "enterpriseName": this.form.enterpriseName
      }
      console.log(msg);
      addCases(msg).then(res => {
        console.log(res);
        this.getCase()
      })
      this.handleClose()
    },
    cancel() {
      this.handleClose()
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    onSubmit() {
      this.getDetailCase()
    },
    addCase() {
      this.dialogVisible = true
    },
    getDetailCase() {
      this.other = true
      getCaseById(this.caseId.id).then(res => {
        console.log(res);
        var id = this.caseId.id
        var data = res.data
        var data1 = { ...data, id: id }
        this.cases = []
        this.cases.push(data1)
        this.caseComments = res.data.caseComments
        this.caseRequirements = res.data.caseRequirements
        this.caseTargets = res.data.caseTargets
      })
    },
    back() {
      this.getCase()
      this.caseId.id = ''
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该案例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCaseById(row.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.getCase()
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
.case-manage {
  height: 95%;
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-left: 0;
  margin-bottom: 0;
  width: 100%;
}


.common-table {
  position: relative;
  height: calc(100% - 62px);
}

.pager {
  position: absolute;
  bottom: 0;
  right: 50%;
}

.caseComments .el-form-item {
  margin-left: 20px;
}


.caseRequirements .el-form-item {
  margin-left: 20px;
}

</style>