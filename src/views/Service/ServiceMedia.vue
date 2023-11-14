<template>
  <div class="serviceMedia">
    <div class="serviceMedia-body">
      <el-table :data="serviceMedia" style="width: 100%" height="95%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="绑定服务ID">
                <span>{{ props.row.serviceId }}</span>
              </el-form-item>
              <el-form-item label="服务名称">
                <span>{{ props.row.serviceName }}</span>
              </el-form-item>
              <el-form-item label="绑定媒资ID">
                <span>{{ props.row.mediaId }}</span>
              </el-form-item>
              <el-form-item label="文件名称">
                <span>{{ props.row.mediaFileName }}</span>
              </el-form-item>
              <el-form-item label="媒资类型">
                <span>{{ props.row.mediaType }}</span>
              </el-form-item>
              <el-form-item label="操作者">
                <span>{{ props.row.tieAdmin }}</span>
              </el-form-item>
              <el-form-item label="操作时间">
                <span>{{ props.row.tieTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="文件名称" prop="mediaFileName">
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
import { getServiceMedia, deleteServiceMedia } from '../../api'
export default {
  data() {
    return {
      serviceMedia: []
    }
  },
  mounted() {
    this.getMedia()
  },
  methods: {
    getMedia() {
      var page = {}
      getServiceMedia(page).then(res => {
        console.log(res);
        this.serviceMedia = res.items
      })
    },
    deleteBind(row) {
      deleteServiceMedia(row.id).then(() => {
        this.getMedia()
      })
    }
  }
}
</script>

<style>
.serviceMedia{
  height: 90%;
}

.serviceMedia-body{
  height:100%
}

</style>