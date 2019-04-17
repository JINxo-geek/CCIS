import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(store.getters.token)
  if (store.getters.token) {
    console.log(store.getters.token)
    localStorage.token = store.getters.token
    console.log('localStorage的值', localStorage.token)
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle itif current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        console.log('此时roles数组长度为0去获取用户信息')
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          console.log('登入成功')
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            console.log('发送错误登出')
            console.log(store.getters.roles.length)
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
