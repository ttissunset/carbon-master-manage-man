<template>
  <div class="caseMedia">
    <div class="caseMedia-body">
      <el-table :data="caseMedia" style="width: 100%" height="100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="绑定案例ID">
                <span>{{ props.row.caseId }}</span>
              </el-form-item>
              <el-form-item label="绑定媒资ID">
                <span>{{ props.row.mediaId }}</span>
              </el-form-item>
              <el-form-item label="媒资类型">
                <span>{{ props.row.mediaType }}</span>
              </el-form-item>
              <el-form-item label="操作者">
                <span>{{ props.row.tieAdmin }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteBind(scope.row)">删除绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCaseMedia, deleteCaseMedia } from '../api'
export default {
  data() {
    return {
      caseMedia: [],
    }
  },
  mounted() {
    this.getMedia()
  },
  methods: {
    getMedia() {
      var page = {
        "pageNo": 1,
        "pageSize": 100
      }
      getCaseMedia(page).then(res => {
        console.log(res);
        this.caseMedia = res.items
      })
    },
    deleteBind(row) {
      deleteCaseMedia(row.id).then(res => {
        console.log(res);
        this.getMedia()
      })
    }
  }
}
</script>

<style>
.caseMedia {
  height: 90%;
}

.caseMedia-body {
  height: 100%;
}
</style>