<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-button type="primary"
                 @click="showDialog()"
                 plain>添加角色</el-button>
      <!-- 添加对话框 -->
      <el-dialog title="添加角色"
                 :visible.sync="addDialogFormVisible"
                 width="400px">
        <!-- ref????       :model?????   :rules????? -->
        <el-form ref="addForm"
                 :model="addForm"
                 :rules="addRules"
                 label-width="80px">
          <el-form-item label="角色名称"
                        prop="roleName">
            <el-input v-model="addForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述"
                        prop="roleDesc">
            <el-input v-model="addForm.roleDesc"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addSubmit()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 表格 -->
      <el-table :data="roleData">
        <!-- 箭头内容更 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 判断当当前行的child没有长度的时候显示暂无数据 -->
            <span v-if="!scope.row.child.length"
                  style="color:red"> 暂无权限</span>
            <!--一级权限-->
            <el-row style="border-bottom:1px solid #eee"
                    :style="{'border-top':i === 0?'1px solid #ccc':'none'}"
                    v-for="(item, i) in scope.row.child"
                    :key="item.id">
              <el-col :span="4">
                <!-- 标签组件 -->
                <el-tag @close="delRights(scope.row,item.id)"
                        closable>{{item.authName}}</el-tag>
                <span class="el-icon-caret-right"></span>
              </el-col>
              <el-col :span="20">
                <!--二级权限-->
                <el-row :style="{'border-top':i ===0? 'none':'1px solid #eee'}"
                        v-for="(toitem,i) in item.child"
                        :key="toitem.id">
                  <el-col :span="8">
                    <el-tag closable
                            @close="delRights(scope.row,toitem.id)"
                            type="success">{{toitem.authName}}</el-tag>
                    <span class="el-icon-caret-right"></span>
                  </el-col>
                  <el-col :span="16">
                    <!--三级权限-->
                    <el-tag closable
                            @close="delRights(scope.row,lastitem.id)"
                            v-for="lastitem in toitem.child"
                            :key="lastitem.id"
                            type="warning">{{lastitem.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 箭头右边内容 -->
        <el-table-column type="index"
                         width="100px">
        </el-table-column>
        <el-table-column prop="roleName"
                         label="角色名称">
        </el-table-column>
        <el-table-column prop="roleDesc"
                         label="角色描述">
        </el-table-column>
        <!-- 编辑删除设置操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <!-- 点击编辑按钮的时候显示当前行的数据  发送请求获取 -->
              <el-button icon="el-icon-edit"
                         round
                         @click="editRole(scope.row)"></el-button>
              <el-button icon="el-icon-delete"
                         round
                         @click="delRole(scope.row.id)"></el-button>
              <el-button icon="el-icon-setting"
                         @click="rightRole(scope.row)"
                         round></el-button>
            </el-button-group>
          </template>
        </el-table-column>

      </el-table>

      <!-- 编辑弹框 -->
      <el-dialog title="编辑角色"
                 :visible.sync="editDialogFormVisible"
                 width="400px">
        <el-form ref="editForm"
                 :model="editForm"
                 :rules="editRoles"
                 label-width="80px">
          <el-form-item label="角色名称"
                        prop="roleName">
            <el-input v-model="editForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述"
                        prop="roleDesc">
            <el-input v-model="editForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="editSubmit( )">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分配权限弹框 -->
      <el-dialog title="权限分配"
                 :visible.sync="rightDialogFormVisible"
                 width="400px">
        <!-- 树形控件 -->
        <el-tree :data="rightTree"
                 show-checkbox
                 ref="tree"
                 node-key="id"
                 :default-expand-all="true"
                 :default-checked-keys="rightCheckedList"
                 :props="defaultProps">
        </el-tree>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="rightDialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="rightSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import roleMixin from './Role-Mixin.js'
export default {
  mixins: [roleMixin]
}
</script>

<style scoped>
.el-row {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 8px;
}
</style>
