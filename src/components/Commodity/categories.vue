<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 添加分类按钮 -->
      <el-button type="primary"
                 @click="showaddDialog()"
                 plain>添加分类</el-button>
      <!-- 点击添加分类显示对话框 -->
      <el-dialog title="添加分类"
                 width="400px"
                 :visible.sync="addDialogFormVisible">
        <el-form :model="addForm"
                 label-width="100px"
                 autocomplete="off">
          <el-form-item label="分类名称">
            <el-input v-model="addForm.cat_name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类等级">
            <el-input v-model="addForm.cat_level"
                      autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
      <el-table :data="categories"
                style="width: 100%;margin-bottom: 20px;"
                row-key="cat_id">
        <el-table-column prop="cat_name"
                         label="分类名称">
        </el-table-column>
        <el-table-column label="是否有效">
          <!-- 加字体图标判断 -->
          <template slot-scope="scope">
            <span v-if="!scope.row.cat_deleted"
                  class="el-icon-success"
                  style="color:green"></span>
            <span v-else
                  class="el-icon-error"
                  style="color:red"></span>
          </template>
        </el-table-column>
        <el-table-column label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level==0">一级分类</el-tag>
            <el-tag type="warning"
                    v-if="scope.row.cat_level==1">二级分类</el-tag>
            <el-tag type="danger"
                    v-if="scope.row.cat_level==2">三级分类</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button round
                         icon="el-icon-edit"></el-button>
              <el-button round
                         icon="el-icon-delete"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="fenye">
        <el-pagination @current-change="changePager"
                       :page-size="reqParams.pagesize"
                       :current-page="reqParams.pagenum"
                       background
                       layout="prev, pager, next"
                       :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入
import categoriesMixin from './categories-Mixin.js'
export default {
  mixins: [categoriesMixin]
}
</script>

<style  scoped>
</style>
