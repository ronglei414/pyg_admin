<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索框 和 添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="reqParams.query"
                    placeholder="请输入内容">
            <el-button @click="search()"
                       slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="1">
          <el-button type="primary"
                     @click="showDialogForm()"
                     plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 列表区域 -->
      <template>
        <el-table :data="userList"
                  stripe
                  style="width: 100%">
          <el-table-column prop="username"
                           label="姓名">
          </el-table-column>
          <el-table-column prop="email"
                           label="邮箱">
          </el-table-column>
          <el-table-column prop="mobile"
                           label="电话">
          </el-table-column>
          <el-table-column prop="role_name"
                           label="角色">
          </el-table-column>
          <el-table-column prop="mg_state"
                           label="状态">
            <!-- 自定义内容 和数据传递 必须加 <template slot-scope="scope">-->
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state"
                         @change="updateState(scope.row.id,scope.row.mg_state)"
                         active-color="#13ce66"
                         inactive-color="#ccc">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button round
                           @click="showEditDialogFormVisible(scope.row.id)"
                           icon="el-icon-edit"></el-button>
                <el-button icon="el-icon-delete" @click="delUsers(scope.row.id)"></el-button>
                <el-button round
                           @click="showRoleDialogFormVisible(scope.row)"
                           icon="el-icon-setting"></el-button>
              </el-button-group>
            </template>

          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <div class="fenye">
        <!-- page-size 表示 每页显示条数的个数

         -->
        <el-pagination @current-change="changePager"
                       :page-size="reqParams.pagesize"
                       :current-page="reqParams.pagenum"
                       background
                       layout="prev, pager, next"
                       :total="total">
        </el-pagination>
      </div>

      <!-- 添加弹出框 -->
      <el-dialog title="添加用户"
                 :visible.sync="dialogFormVisible"
                 width="500px">
        <el-form :model="addForm"
                  ref="addForm"
                  :rules="addRules"
                 label-width="80px"
                 autocomplete="off">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addSubmit()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分配角色 -->
      <el-dialog width="400px" title="分配角色" :visible.sync="roleDialogFormVisible">
      <el-form label-width="100px" autocomplete="off">
        <el-form-item label="当前用户：">
          {{roleUserName}}
        </el-form-item>
        <el-form-item label="当前用户：">
          {{roleUserRoleName}}
        </el-form-item>
        <el-form-item label="分配角色：">
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
     <el-dialog width="400px" title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="80px" autocomplete="off">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
import usersMixin from './User-Mixin.js'

export default {
  mixins: [usersMixin]
}
</script>

<style  scoped>
</style>
