export default {
  name: 'categories',
  data () {
    return {
      // 列表数据
      reqParams: {
        pagenum: 1,
        pagesize: 5
      },
      categories: [],
      // 分页
      total: 0,
      addDialogFormVisible: false,
      addForm: {
        cat_level: '0',
        cat_name: '',
        cat_pid: '0'
      },
      // 验证表单
      addRules: {
        cat_name: [{
          required: true,
          message: '分类名称必填',
          trigger: 'blur'
        }]
      },
      // 级联相关数据
      categoryList: [],
      // 选择级联控件后的值
      categoryValues: [],
      // 显示编辑框
      editDialogFormVisible: false,
      editForm: {},
      // 验证编辑框
      editRules: {
        cat_name: [{
          required: true,
          message: '分类名称必填',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 编辑确认
    editSubmit () {
      // console.log(this.editForm)
      //  点击确认后验证表单当验证表单确认后 发送请求
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {
            data: {
              meta
            }
          } = await this.$http.put(`categories/${this.editForm.cat_id}`, {
            cat_name: this.editForm.cat_name
          })
          if (meta.status !== 200) return this.$message.error('修改失败')
          this.$message.success('修改成功')
          // 修改成功后刷新数据
          this.getData()
          // 关闭弹框
          this.editDialogFormVisible = false
        }
      })
    },
    // 显示编辑按钮
    showeditDialog (id) {
      // 显示弹框
      this.editDialogFormVisible = true
      // 重置表单
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        // 获取数据
        const {
          data: {
            data,
            meta
          }
        } = await this.$http.get(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error('获取分类失败')
        // 数据填充
        this.editForm = data
      })
    },
    // 删除按钮
    delCategory (id) {
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发请求去删除
        const {
          data: {
            meta
          }
        } = await this.$http.delete(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error('删除分类失败')
        this.$message.success('删除分类成功')
        this.getData()
      }).catch(() => {})
    },
    // 点击确认后触发
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const len = this.categoryValues.length
          if (len) {
            this.addForm.cat_pid = this.categoryValues[len - 1]
          } else {
            this.addForm.cat_pid = 0
          }
          this.addForm.cat_level = len
          // 提交
          const {
            data: {
              meta
            }
          } = await this.$http.post('categories', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加分类失败')
          this.$message.success('添加分类成功')
          this.getData()
          this.addDialogFormVisible = false
        }
      })
    },
    // 显示弹框
    async showaddDialog () {
      // 获取数据 渲染级联
      const {
        data: {
          data,
          meta
        }
      } = await this.$http.get('categories', {
        params: {
          type: 2
        }
      })
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categoryList = data
      // 重置级联添加后的值
      this.categoryValues = []
      this.addDialogFormVisible = true
      // 关闭后重置表单
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 分页
    changePager (newPage) {
      // 改变页码
      this.reqParams.pagenum = newPage
      // 获取数据
      this.getData()
    },
    // 拿去数据
    async getData () {
      const {
        data: {
          data,
          meta
        }
      } = await this.$http.get('categories', {
        params: this.reqParams
      })
      if (meta.status !== 200) return this.$message.console.error('获取分类数据失败')
      this.categories = data.result
      this.total = data.total
    }
  }
}
