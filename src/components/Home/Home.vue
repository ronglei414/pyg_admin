<template>
  <el-container class="home">
    <!-- 头部导航 -->
    <el-header class="Home_header">
      <el-button icon="iconfont icon-shouqianniuicon"
                 @click="toggleMenu()"
                 size="mini"
                 circle></el-button>
      <span class="Home_span">品优购后台管理系统</span>
      <el-button class="Home_quit"
                 round
                 type="danger"
                 @click="logout()">退出</el-button>
    </el-header>
    <!-- 内容 -->
    <el-container>
      <!-- 左边 -->
      <el-aside class="Home_aside"
                :width="collapse?'65px':'180px'">

        <!--动态绑定 collapse 改变来改变宽-->
        <el-menu :default-active="$route.name"
                 :unique-opened="true"
                 :collapse="collapse"
                 router
                 :collapse-transition="false"
                 style="border: none; margin-top: 5px;"
                 background-color="#333744"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id.toString()"
                      v-for="(item,i) in menus"
                      :key="item.id">
            <template slot="title">
              <i :class="['iconfont',icons[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+lastItem.path"
                          v-for="lastItem in item.children"
                          :key="lastItem.id">
              <i class="iconfont icon-guanli"></i>
              {{lastItem.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边区域 -->
      <el-main class="Home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // 动态属性当为false 展开  饿了么
      collapse: false,
      // 提前声明数据 拿数据要提前声明
      menus: [],
      icons: [
        'icon-quanxianguankong',
        'icon-dingdan',
        'icon-guanli',
        'icon-shuju',
        'icon-mima'
      ]
    }
  },
  mounted () {
    // 菜单数据渲染页面
    this.getData()
  },
  methods: {
    // 给汉堡按钮设置点击事件 当点击后改变 collapse的 true 和false 来改变 列表的宽度
    // 所以动态绑定collapse 和 宽  当collapse改变后 改变宽
    toggleMenu () {
      this.collapse = !this.collapse
    },
    // 发请求获取数据 在axios文件下配置
    async getData () {
      const { data: { data, meta } } = await this.$http.get('menus')
      // 判断是否获取成功
      if (meta.status !== 200) return this.$message.error('获取列表失败')
      // 成功修改列表中的数据
      this.menus = data
    },
    // 退出功能
    logout () {
      // 清除 token   并且 跳转到登陆页面
      sessionStorage.removeItem('token')
      // 跳转路由
      this.$router.push('/login')
    }
  }
}
</script>
<style  scoped>
.home {
  width: 100%;
  height: 100%;
}
.Home_header {
  background: #373741;
  line-height: 60px;
}
.Home_span {
  color: #909399;
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;
}
.Home_quit {
  float: right;
  margin-top: 15px;
}
.Home_aside {
  height: 100%;
  background: #333744;
}
.Home_main {
  width: 100%;

  background-color: #eaedf1;
}
</style>
