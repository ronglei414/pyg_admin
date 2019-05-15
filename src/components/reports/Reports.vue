<template>
  <div class="reports_contain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <div ref="box"
           class="box">
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  mounted () {
    // const dom = this.$refs.box
    // const myEcharts = echarts.init(dom)
    this.getData()
  },
  methods: {
    async getData () {
      const { data: { data, meta } } = await this.$http.get('reports/type/1')
      if (meta.status !== 200) return this.$message.error('获取报表数据失败')
      // 后台给的配置项  和 现在的options 进行合并 然后给图表使用
      const myEcharts = echarts.init(this.$refs.box)
      // Object.assign(o1,o2)  注意：如果有相同key 后面的生效
      const options = { ...this.options, ...data }
      myEcharts.setOption(options)
    }
  }
}
</script>

<style  scoped>
.box {
  width: 600px;
  height: 400px;
}
</style>
