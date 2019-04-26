<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 警告 -->
      <el-alert title="注意：第三级分类才可设置参数。"
                type="warning"
                show-icon>
      </el-alert>

      <el-cascader expand-trigger="hover"
                   :options="options"
                   v-model="selectedOptions2"
                   @change="handleChange">
      </el-cascader>

    </el-card>
  </div>
</template>

<script>
import paramsMixin from './Params-Mixin.js'
export default {
  mixins: [paramsMixin]
}
</script>

<style scoped>
</style>
