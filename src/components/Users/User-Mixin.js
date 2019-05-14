export default {
  data () {
    // 定义 手机号验证规则
    const checkMobile = (rule, value, callback) => {
      // rule  规则信息  value 验证的输入框的值 callback 回掉函数 （成功或者失败）
      if (!/^1[3456789]\d{9}$/.test(value)) return callback(new Error('手机号不对'))
      callback()
    }
    return {
      userList: [],
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 总条数
      total: 0,
      dialogFormVisible: false,
      // addForm 数据声明
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [
          {required: true, message: '用户必填', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码必填', trigger: 'blur'},
          {min: 6, max: 18, message: '密码6-18个字符串', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱必填', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号必填', trigger: 'blur'},
          // 手机号必须自定义校验规则  通过自己的函数来校验 （rule,value,callback）
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      // 控制分配角色对话框的显示隐藏
      roleDialogFormVisible: false,
      // 选中角色的值
      roleValue: '',
      // 当前用户的 用户名
      roleUserName: '',
      // 当前用户的 角色
      roleUserRoleName: '',
      // 用户的ID
      roleUserId: '',
      // 角色下拉所有选项
      options: [],
      // 编辑相关
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        email: [
          {required: true, message: '邮箱必填', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号必填', trigger: 'blur'},
          // 手机号必须自定义校验规则  通过自己的函数来校验 （rule,value,callback）
          {validator: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    // 获取列表数据
    this.getData()
  },
  methods: {
    // 编辑对话框
    async showEditDialogFormVisible (id) {
      // 显示编辑对话框
      this.editDialogFormVisible = true
      // 可能需要重置表单
      // 填充数据
      // 发请求需要用户的ID
      const {data: {data, meta}} = await this.$http.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('获取用户数据失败')
      // 把数据展示表单内
      this.editForm = data
    },
    editSubmit () {
      // 编辑的提交
      // 整个表单的校验
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          // 校验成功
          const {data: {meta}} = await this.$http.put(`users/${this.editForm.id}`, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('修改失败')
          this.$message.success('修改成功')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
    },
    // 分配角色
    async changeRole () {
      const {data: {meta}} = await this.$http.put(`users/${this.roleUserId}/role`, {
        rid: this.roleValue
      })
      if (meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.roleDialogFormVisible = false
      this.getData()
    },
    // 获取角色
    async showRoleDialogFormVisible (row) {
      // 打开对话框
      this.roleDialogFormVisible = true
      // 渲染下拉菜单
      const {data: {data, meta}} = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色失败')
      this.options = data
      // 当前用户的信息  获取用户信息
      // const {data: {data: ud, meta: um}} = await this.$http.get(`users/${id}`)
      // if (um.status !== 200) return this.$message.error('获取用户失败')
      // console.log(ud)
      this.roleUserId = row.id
      this.roleUserName = row.username
      this.roleUserRoleName = row.role_name
    },
    // 修改状态
    async updateState (id, newState) {
      // id 用户的ID newState 已改变的状态
      // console.log(id, newState)
      const {data: {meta}} = await this.$http.put(`users/${id}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改状态成功')
      this.getData()
    },
    // 点击确定发送添加请求
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 请求后台
          const {data: {meta}} = await this.$http.post('users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加失败')
          this.$message.success('添加成功')
          // 添加成功后
          this.dialogFormVisible = false
          // 更新列表
          this.getData()
        }
      })
    },
    // 跳出添加弹框
    showDialogForm () {
      this.dialogFormVisible = true
      // 重置表单
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.$refs.addForm.resetFields()
      })
    },
    // 删除操作
    delUsers (id) {
      // 弹框提示
      this.$confirm('是否删除该数据？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认  发请求
        const {
          data: {
            meta
          }
        } = await this.$http.delete(`users/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {})
    },
    // 发送请求拿去数据
    async getData () {
      const {
        data: {
          data,
          meta
        }
      } = await this.$http.get('users', {
        params: this.reqParams
      })
      // console.log(data.users)
      // 判断是否获取成功
      if (meta.status !== 200) return this.$message.error('获取列表失败')
      //  获取的列表数据
      this.userList = data.users
      // 获取真实的total
      this.total = data.total
    },
    changePager (newPage) {
      // 进行分页查询  需求：当前页码
      // 获取数据 前 要使用当前页码
      this.reqParams.pagenum = newPage
      this.getData()
    },
    // 搜索功能
    search () {
      // 根据当前搜索关键字 去查询第一页的数据
      this.reqParams.pagenum = 1
      this.getData()
    }

  }
}
