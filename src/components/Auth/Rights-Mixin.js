export default {
  name: 'Rights',
  data () {
    return {
      listData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const {
        data: {
          data,
          meta
        }
      } = await this.$http.get('rights/list')
      if (meta.status !== 200) return this.$message.console.error('获取列表失败')
      this.listData = data
      console.log(data)
    }
  }
}
