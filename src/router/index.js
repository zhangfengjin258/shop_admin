// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入Login组件
import Login from '@/components/login/Login'
// 导入Home组件
import Home from '@/components/home/Home.vue'
// 引入User组件
import User from '@/components/User/user.vue'
// 安装插件
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    // 如果子路由中路径带有/，那么哈希值就是/user
    // 如果子路由路径中不带有/，那么哈希值就是/home/user
    { path: '/home', component: Home, children: [ { path: '/user', component: User } ] }
  ]
})
router.beforeEach((to, from, next) => {
  // 登录访问控制思路
  // 1、判断访问是不是登录页面
  // 2、如果是，直接next()放行
  // 3、如果不是，就判断有没有登录
  // 4、如果没有登录，就跳转到登录页面，让用户登录
  // 5、如果用户登录了就 next()放行
  if (to.path === '/login') {
    next()
    return
  }
  const token = localStorage.getItem('token')
  // 判断token是否存在
  if (token) {
    // 登录
    next()
  } else {
    // 没有登录
    next('/login')
  }
})
// 创建路由实例并导出
export default router
