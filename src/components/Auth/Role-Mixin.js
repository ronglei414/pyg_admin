export default {
  name: 'Role',
  data () {
    return {
      roleData: [],
      // 判断弹框是否关闭
      // 添加弹窗
      addDialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [
          {
            required: true,
            message: '角色名称必填',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          {
            required: true,
            message: '角色描述必填',
            trigger: 'blur'
          }
        ]
      },
      // 编辑弹框
      editDialogFormVisible: false,
      editForm: {},
      editRoles: {
        roleName: [
          {
            required: true,
            message: '角色名称必填',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          {
            required: true,
            message: '角色描述必填',
            trigger: 'blur'
          }
        ]
      },
      // 分配权限弹框
      rightDialogFormVisible: false,
      rightTree: [],
      // id列表
      rightCheckedList: [],
      // 分配角色id
      rightRoleId: null,
      defaultProps: {
        // 数据结构中 下一级数据的字段名称
        children: 'children',
        // 显示的文字  的数据字段的名称
        label: 'authName'
      }
    }
  },
  mounted () {
    // 渲染数据
    this.getData()
  },
  methods: {
    // 显示权限分配弹框
    async rightRole (row) {
      // 显示弹框的时候数据渲染上去
      const {
        data: { data, meta }
      } = await this.$http.get('rights/tree')
      if (meta.status !== 200) return this.$message.error('获取所有权限失败')
      this.rightTree = data
      // console.log(data)
      const arr = []
      row.child.forEach(item => {
        item.child.forEach(item => {
          item.child.forEach(item => {
            arr.push(item.id)
          })
        })
      })
      this.rightCheckedList = arr
      this.rightDialogFormVisible = true
      this.rightRoleId = row.id
    },
    async rightSubmit () {
      // 合并全选与半选
      const treeDom = this.$refs.tree
      const checkedArr = treeDom.getCheckedKeys()
      const halfCheckArr = treeDom.getHalfCheckedKeys()
      const arr = [...checkedArr, ...halfCheckArr]
      // 提交
      const {
        data: { meta }
      } = await this.$http.post(`roles/${this.rightRoleId}/rights`, {
        rids: arr.join(',')
      })
      if (meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      // 修改完后关闭弹框  刷新数据
      this.rightDialogFormVisible = false
      this.getData()
    },
    // 删除权限  给每一个 tag 标签 绑定删除点击事件 不是click 是 close事件
    delRights (row, rightId) {
      this.$confirm('是否删除该权限?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data, meta }
          } = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
          if (meta.status !== 200) return this.$message.error('删除失败')
          this.$message.success('删除成功')
          // 当删除成功后刷新列表数据 局部更新列表数据
          // 更新的事row.child 的数据
          // 当前修改后返回的数据是 以前 原始数据 需要处理成需要的数据格式 child
          // 处理成需要的数据结构
          data.forEach(item => {
            item.child = item.children
            delete item.children
            item.child.forEach(item => {
              item.child = item.children
              delete item.children
            })
          })
          row.child = data
        })
        .catch(() => {})
    },
    // 显示编辑弹窗
    editRole (role) {
      this.editDialogFormVisible = true
      // ？？？？？？？？？？
      // 每次取消弹框并且 重更新发送请求获取点击行的数据
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        const {
          data: { data, meta }
        } = await this.$http.get(`roles/${role.id}`)
        if (meta.status !== 200) return this.$message.error('获取角色失败')
        // 动态渲染
        this.editForm = data
        console.log(data)
      })
    },
    // 编辑确定事件
    editSubmit () {
      // 点击确定验证表单   并发请求修改数据
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          // 此时的id是从后台拿去的id
          const {
            data: { meta }
          } = await this.$http.put(`roles/${this.editForm.roleId}`, {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          })
          if (meta.status !== 200) return this.$message.error('编辑角色失败')
          this.$message.success('编辑角色成功')
          // 关闭编辑对话框  更新列表
          this.editDialogFormVisible = false
          this.getData()
        }
      })
    },
    // 显示对话框
    showDialog () {
      this.addDialogFormVisible = true
      // 每次打开重新验证
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 添加角色请求
    addSubmit () {
      // 整个表单验证
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 验证成功后发送请求
          // 提交添加请求
          const {
            data: { meta }
          } = await this.$http.post('roles', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加角色失败')
          this.$message.success('添加角色成功')
          // 关闭对话框  更新列表数据
          this.addDialogFormVisible = false
          this.getData()
        }
      })
    },
    // 发送请求拿去列表数据
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取列表失败')
      data.forEach(item => {
        item.child = item.children
        delete item.children
        item.child.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
      })
      this.roleData = data
    },
    // 删除角色
    delRole (id) {
      this.$confirm('是否删除该数据?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击了确认  发请求
          const {
            data: { meta }
          } = await this.$http.delete(`roles/${id}`)
          if (meta.status !== 200) return this.$message.error('删除失败')
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {
          this.$message.success('取消成功')
        })
    }
  }
}
