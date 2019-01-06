<template>
<div class="login">
  <!-- 
    el-row:表示一行
    el-col：表示一列
    type="flex"：表示启动flex布局
    justify="center":表示主轴方向居中对齐
    el-col中的:span="6":表示栅格占据列数【总共24列】
    align="middle":表示 侧轴对齐方式
   -->
<el-row type="flex" justify="center" align="middle" class="login-row">
  <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <!-- 
          loginForm：表单数据对象
          label-width：表单域标签宽度
          prop：表单域 model 字段，在使用 validate(表单校验)、resetFields(重置表单) 方法的情况下，该属性是必填的
          el-input：文本框组件
          v-model：数据双向绑定 
        -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form" label-position='top'>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </el-col>
</el-row>
</div>
</template>
<script>
// 导入axios发送请求
 import axios from 'axios'
 export default { 
    data() {
      return {
        loginForm: {
          // 用户名
          username:'admin',
          // 密码
          password:'123456'
        },
         /*
        rules表单验证规则
        required表示必填项
        message表示表单校验信息
        trigger表示触发表单验证的时机
        min与max配合设置长度
        */
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 12, message: '用户名长度在 5 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    // 表单提交代码逻辑
    // validate：表单验证
    // this.$refs[formName]：访问对象ref中的属性
    // this.$refs[formName] = this.$refs.loginForm
    // $refs:是vue提供的一个对象。作用：用来获取页面中所有带有ref属性元素（DOM或者组件）。
    // 当前案例中就是通过$refs 获取表单组件，调用组件中的validate方法来进行表单验证
    methods: {
       // 代码优化
      async submitForm(formName) {
        /*validate()如果不传递回调函数，返回值依旧是一个promise对象
        如果表单验证成功，valid值为true
        如果表单验证失败，则会执行catch中代码，并且错误对象e返回false
        try{
          const valid = await this.$refs[formName].validate()
        如果表单验证失败，后面代码不会执行
          console.log('成功',valid);
        }catch(e){
          console.log('表单验证失败了',e);
        }*/
        try{
          await this.$refs[formName].validate()
          // 表单验证成功后发送请求，完成登录功能即可
          const url = 'http://localhost:8888/api/private/v1/login'
          const res = await axios.post(url,this.loginForm)
              if(res.data.meta.status === 200){
                localStorage.setItem('token',res.data.data.token)
                this.$router.push('/home')
              }else{
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error',
                  duriation:1000
                });
              }
        }catch(e){}
      },
      // submitForm(formName) {
      //   // 通过$refs获取具有ref属性的组件对象，并且调用组件validate方法进行表单校验
      //   this.$refs[formName].validate(valid => {
      //     // valid参数：表示表单校验是否成功
      //     // console.log(valid);结果为布尔值
      //     if (!valid) {
      //       // 验证失败代码不需要任何处理
      //       return false;
      //     }
      //     // 1-获取用户名密码
      //     // console.log(this.loginForm);
      //     // 2-调用登录接口，完成登录
      //     // 接口地址：http://localhost:8888/api/private/v1/login
      //     // 发送请求使用axios，需要先下载安装，再导入
      //     // axios.post('接口地址',表单对象).then((res)=>{})
          
      //     // this.loginForm = {username:this.loginForm.username;password:this.loginForm.password}
      //    axios.post('http://localhost:8888/api/private/v1/login',this.loginForm)
      //       .then(res=>{
      //           // console.log(res);
      //         if(res.data.meta.status === 200){
      //           // 将token存储到localStorage中【注意：先存储token再跳转路由】
      //           localStorage.setItem('token',res.data.data.token)
      //           // 登录成功
      //           // 3-登陆成功后，跳转页面   
      //           // $router访问路由实例
      //           // router.push方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
      //             this.$router.push('/home')
      //         }else{
      //           // 登录失败，给用户提示错误信息
      //           this.$message({
      //             message: res.data.meta.msg,
      //             type: 'error',
      //             duriation:1000
      //           })
      //         }
      //       })
      //   })
      // },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
.login{
  height:100%;
  background-color: #2d434c;
}
.login-row{
  height: 100%;
}
.login-form{
  min-width:340px;
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
}


</style>
