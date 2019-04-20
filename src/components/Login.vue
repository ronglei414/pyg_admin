<template>
<div class="login-container">
    <div class="box">
    <img src="../assets/images/logo.png" alt="">
    <el-form  :model="form" :rules="rules">
        <el-form-item prop="username">
            <el-input  prefix-icon="iconfont icon-account" placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input prefix-icon="iconfont icon-eye-slash" type="password"  placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submit()">登陆</el-button>
        <el-button>重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</div>
</template>

<script>
    export default {
        name:'Login',
        data() {
            return {
                form:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        {required: true,message:'请输入正确的用户名',trigger: 'blur'}
                    ],
                    password:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '密码长度6-18个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            
        }
    }
</script>

<style scoped>
    .login-container {
       height: 100%;
       background:linear-gradient(45deg,  #fff, #000);
   }
    .login-container .box{
       width: 400px;
       height: 250px;
       box-shadow: 0 0 10px 0 #fff;
       position: absolute;
       left:0;
       top:-100px;
       right: 0;
       bottom: 0;
       margin: auto;
       padding: 0 15px;
       box-sizing: border-box;
       background:linear-gradient(45deg,#000, pink )
   }
    .login-container .box img{
      display: block;
      margin: 20px auto;
   }
</style>