<template>
    <div>
        <!-- 
            面包屑导航
         -->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 
            表格组件
            :data="tableData"表格数据项【显示的数据】
            stripe启用斑马纹效果【隔行变色效果启用】

            el-table-column表格列组件
            prop="date"【对应列内容的字段名，也可以使用 property 属性】
            如果列没有直接显示数据源中的数据，就可以不用传递prop属性
            label="日期"【显示的标题】
            width="180"【对应列的宽度】
         -->
         <el-table :data="userList" stripe style="width: 100%" align="center">
            <el-table-column prop="username" label="姓名" width="100" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
            <el-table-column prop="mobile" label="电话" width="180" align="center"></el-table-column>
            <el-table-column label="用户状态" align="center"></el-table-column>
            <el-table-column label="操作" align="center"></el-table-column>
        </el-table>

        <!-- 
            分页组件
            layout="prev, pager, next"分页组件结构
             :total="1000"总条数
             :page-size='3'每页条数
             :current-page='1'当前页
         -->
         <el-pagination
            background
            layout="prev, pager, next"
            :total="total" :current-page='pagenum' :page-size='pagesize' @current-change='changePage'>
        </el-pagination>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    // 因为进入页面，发送请求，获取数据使用钩子函数created()
    created(){
        this.getUserList()
    },  
    data() {
      return {
        //   渲染
        // 用户列表数据
        userList:[],
        // 总条数
        total:1,
        // 当前页
        pagenum: 1,
        // 每页条数
        pagesize: 3,
      }
    },
    methods:{
        // 分页获取数据，获取当前页数据
        getUserList(pagenum=1){
            axios.get('http://localhost:8888/api/private/v1/users',{
                params:{
                    // 查询条件
                    query:'',
                    // 当前页
                    pagenum,
                    // 每页条数
                    pagesize: 3,
                },
                headers:{
                    // 通过请求头，传递token值，判断登录状态
                    Authorization:localStorage.getItem('token')
                }
            })
            .then(res=>{
                // console.log('用户列表条数:', res);
                if(res.data.meta.status === 200){
                    // 获取数据成功
                    // 将数据传递给userList渲染到页面中
                    this.userList = res.data.data.users
                    // 设置总条数
                    this.total = res.data.data.total
                    // 设置当前页
                    this.pagenum = res.data.data.pagenum
                }else{
                    // 获取数据失败
                    // token失效
                    // 1、此时跳转到登录页面重新登录
                    this.$router.push('/login')
                    // 2、移除localStorage中的token值
                    localStorage.removeItem('token')
                }
            })
        },
        // 切换分页,获取当前页数据
        changePage(currentPage){
            // console.log('切换分页了',currentPage);
            this.getUserList(currentPage)
            
        }
    }
  }
</script>
<style>
.el-breadcrumb{
    margin: 20px;
    margin-top: 10px;
}
.el-pagination{
    margin-top: 10px;
}
</style>
