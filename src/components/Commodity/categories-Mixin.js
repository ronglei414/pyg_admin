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
        cat_level: '',
        cat_name: '',
        cat_pid: ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 显示弹框
    showaddDialog () {
      this.addDialogFormVisible = true
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
