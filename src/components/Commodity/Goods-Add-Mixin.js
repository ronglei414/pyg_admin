export default {
  name: 'Goods-Add',
  data () {
    return {
      active: 0,
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [{
          required: true,
          message: '商品名称必填',
          trigger: 'blur'
        }],
        goods_cat: [{
          required: true,
          message: '商品分类必须是第三级',
          trigger: 'change'
        }],
        goods_price: [{
          required: true,
          message: '商品价格必填',
          trigger: 'blur'
        }],
        goods_number: [{
          required: true,
          message: '商品数量必填',
          trigger: 'blur'
        }],
        goods_weight: [{
          required: true,
          message: '商品重量必填',
          trigger: 'blur'
        }]
      },
      // 级联相关数据
      categoryList: [],
      categoryValues: [],
      // 参数列表数据
      manyAttrs: [],
      onlyAttrs: [],
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      action: this.$http.defaults.baseURL + '/upload/',
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
    }
  },
  // 通过监听器watch 来监听是否为第三级
  watch: {
    categoryValues (now, old) {
      if (now.length === 3) {
        // 如果等于三要用逗号隔开
        this.form.goods_cat = now.join(',')
      } else {
        this.form.goods_cat = ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 上传成功后需要给  form.pics 数组追加图片
    handleSuccess (res) {
      // 图片地址？  在上传成功后获取响应数据   才有图片地址
      this.form.pics.push({
        pic: res.data.tmp_path
      })
    },
    handleRemove (file, fileList) {
      // 删除图片后台触发的事件
      // console.log(file, fileList)
      // 移除 form.pics 中对应的图片对象
      // 根据索引删除一条即可
      // 在file中可以获取当前删除图片的临时路径
      // 根据路径去 form.pics 获取对应的索引
      const tmpPath = file.response.data.tmp_path
      const index = this.form.pics.findIndex(item => item.pic === tmpPath)
      this.form.pics.splice(index, 1)
    },
    handlePictureCardPreview (file) {
      // 预览图片
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange () {},
    async getData () {
      const {
        data: {
          data,
          meta
        }
      } = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categoryList = data
    },
    changeTabBrefore (activeName, oldActiveName) {
      if (oldActiveName === '0') {
        // 对整个表单进行校验
        return new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            if (valid) {
              this.active = +activeName
              // 获取静态动态参数
              this.getParams('many')
              this.getParams('only')
              resolve()
            } else {
              reject(new Error('表单验证失败'))
            }
          })
        })
      } else {
        this.active = +activeName
      }
    },
    // 发强求拿去参数数据
    async getParams (type) {
      const id = this.categoryValues[2]
      const {
        data: {
          data,
          meta
        }
      } = await this.$http.get(`categories/${id}/attributes`, {
        params: {
          sel: type
        }
      })
      if (meta.status !== 200) return this.$message.error('获取参数数据失败')
      this[type + 'Attrs'] = data
      //   console.log(data)
    },
    async addSubmit () {
      this.form.attrs = [...this.manyAttrs, ...this.onlyAttrs]
      const {data: {meta}} = await this.$http.post('goods', this.form)
      if (meta.status !== 201) return this.$message.error('商品录入失败')
      this.$message.success('商品录入成功')
      this.$router.push('/goods')
    }
  }
}
