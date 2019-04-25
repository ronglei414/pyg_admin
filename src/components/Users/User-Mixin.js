export default {
  data () {
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
      }
    }
  },
  mounted () {
    // 获取列表数据
    this.getData()
  },
  methods: {
    // 发送请求拿去数据
    async getData () {
      const { data: { data, meta } } = await this.$http.get('users', { params: this.reqParams })
      console.log(data.users)
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
