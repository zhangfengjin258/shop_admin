// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入Login组件
import Login from '@/components/login/Login'
// 导入Home组件
import Home from '@/components/home/Home.vue'
// 安装插件
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
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
