<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- el-row  el-sol 是用来布局的 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="reqParams.query"
                    placeholder="请输入内容">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="search()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="toAdd()">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品分类"
                         width="300px"
                         prop="goods_name"></el-table-column>
        <el-table-column label="价格"
                         prop="goods_price"></el-table-column>
        <el-table-column label="重量"
                         prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{scope.row.add_time}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit"
                       circle></el-button>
            <el-button icon="el-icon-delete"
                       @click="delGoods(scope.row.goods_id)"
                       circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager_container">
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
import goodsMixin from './goods-Mixin.js'
export default {
  mixins: [goodsMixin]
}
</script>

<style scoped>
.pager_container {
  float: right;
  margin: 15px 0;
}
</style>
