<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理权限</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <template>
        <el-table :data="listData"
                  height="500"
                  style="width: 100%">
          <el-table-column type="index">
          </el-table-column>
          <el-table-column prop="authName"
                           label="权限名称">
          </el-table-column>
          <el-table-column prop="path"
                           label="路径">
          </el-table-column>
          <el-table-column label="权限等级">
            <template slot-scope="scope">
              <el-tag  v-if="scope.row.level==='0'" type="info">标签一</el-tag>
              <el-tag v-if="scope.row.level==='1'" type="success">标签二</el-tag>
              <el-tag v-if="scope.row.level==='2'" type="danger">标签三</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </el-card>
  </div>
</template>
<script>
import RightsMixin from './Rights-Mixin.js'

export default {
  mixins: [RightsMixin]
}
</script>

<style scoped>
</style>
