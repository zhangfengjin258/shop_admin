<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header class="home-header">
            <el-row type="flex" align="middle">
                <el-col :span="6">
                    <img src="@/assets/imgs/logo.png" alt="">
                </el-col>
                <el-col>
                    <h1>电商后台管理系统</h1>
                </el-col>
                <el-col :span="8">
                    <div>
                        欢迎上海前端31期星耀会员
                        <a href="javascript:;" class="logout">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <!-- 内容区 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px" class="home-aside">
                <!-- 
                    el-menu:菜单组件
                    default-active：设置默认菜单高亮，值是el-menu-item的index值【当前激活菜单的 index】
                    @open="handleOpen" 【菜单展开事件】@close="handleClose" 【自定义菜单收起事件，展开，关闭菜单处理事件】
                    background-color="#545c64" 【菜单背景色】
                    text-color="#fff"【菜单文字颜色】
                    active-text-color="#ffd04b"【激活（高亮）菜单文字颜色】
                    el-submenu：二级菜单
                    index="1"【唯一标识，用来设置菜单高亮】
                    el-menu-item：可点击的菜单
                 -->
                 <el-menu default-active="" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#f90f90" :router="true">
                     <!-- 一级菜单 -->
                    <el-submenu index="1">
                     <!-- 一级菜单图标和名称 -->
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                        </template>
                        <!-- 二级菜单 -->
                        <!-- index中不添加/，存在bug -->
                        <el-menu-item index="/user">
                            <!-- 二级菜单图标和名称 -->
                            <i class="el-icon-menu"></i>
                            <span>用户列表</span>
                        </el-menu-item>
                        <!-- <el-menu-item index="1-2">
                            <i class="el-icon-menu"></i>
                            <span>用户列表</span>
                        </el-menu-item> -->
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主内容 -->
            <el-main class="home-main">
                <!-- 子路由出口  -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
  export default {
    methods: {
    // // 展开菜单
    //   handleOpen(key, keyPath) {
    //     console.log('open:',key, keyPath);
    //   },
    // // 收起菜单
    //   handleClose(key, keyPath) {
    //     console.log('close',key, keyPath);
    //   }
    }
  }
</script>
<style>
.home-container{
    height: 100%;
    background-color: #eaeef1;
}
.home-header{
    background-color: #B1BFCB;
}
.home-header img{
    width: 200px;
    /* margin-top: 2px; */
}
.home-header h1{
    margin: 0;
    color: #fff;
    font-size: 28px;
    text-align:center;  
    font-weight: 700;
}
.home-header div{
    min-width: 250px;
    font-size: 16px;
    font-weight: 700;
}
.home-header .logout{
    color: #09d;
    margin-left: 10px;
}
.home-aside{
    background-color: #545c64;
}
.el-header{
    padding-left: 0;
}
el-col h1{
    margin: 0;
    padding: 0;
}
</style>

