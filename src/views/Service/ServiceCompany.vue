<template>
  <div class="a">
    <div class="company-header">
      <el-form :model="companyIds" :inline="true">
        <el-form-item>
          <el-input v-model="companyIds.id" placeholder="请输入id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="company-body">
      <el-table :data="companyData" style="width: 100%" :stripe="true" height="95%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" label-width="120px">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="公司名称">
                <span>{{ props.row.companyName }}</span>
              </el-form-item>
              <el-form-item label="公司ID">
                <span>{{ props.row.companyId }}</span>
              </el-form-item>
              <el-form-item label="服务名称">
                <span>{{ props.row.serviceName }}</span>
              </el-form-item>
              <el-form-item label="服务ID">
                <span>{{ props.row.serviceId }}</span>
              </el-form-item>
              <el-form-item label="开始时间">
                <span>{{ props.row.beginTime }}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{ props.row.overTime }}</span>
              </el-form-item>
              <el-form-item label="租借时间">
                <span>{{ props.row.rentTime }}</span>
              </el-form-item>
              <el-form-item label="当前状态">
                <span>{{ props.row.status === 0 ? '订阅中' : '已过期' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="公司名称" prop="companyName">
        </el-table-column>
        <el-table-column label="id" prop="id">
        </el-table-column>
        <el-table-column label="公司ID" prop="companyId">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCompanyById, allCompany } from '../../api'
export default {
  data() {
    return {
      companyIds: {
        cid: '',
        id: '',
        sid: ''
      },
      companyData: []
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      allCompany().then(res => {
        console.log(res);
        this.companyData = res.data
      })
    },
    back() {
      this.getAll()
      this.companyIds.id = ''
    },
    onSearch() {
      if (this.companyIds.id) {
        getCompanyById(this.companyIds.id).then(res => {
          console.log(res.data);
          this.companyData = []
          this.companyData.push(res.data)
        })
      }
    },
  }
}
</script>

<style>
.a{
  height: 90%;
}

.company-body{
  height: 100%;
}

.company-header {
  display: flex;
  justify-content: end;
}
</style>