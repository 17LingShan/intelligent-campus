import { getToken } from '@/utils/auth'

// 登录页面
const loginPage = '/pages/common/login/index'
// 页面白名单
const whiteList = ['/pages/common/login/index', '/pages/common/register/index']

// 检查地址白名单
function checkWhite(url: string) {
  console.log(url)
  const path = url.split('?')[0]
  return whiteList.includes(path)
}

// 页面跳转验证拦截器
const list = [
  'navigateTo',
  'redirectTo',
  'reLaunch',
  'switchTab',
  'navigateBack',
]

list.forEach((item) => {
  uni.addInterceptor(item, {
    invoke(to) {
      if (getToken()) {
        console.log('has token')
        if (to.url === loginPage) uni.reLaunch({ url: '/pages/tab/home/index' })
        return true
      } else {
        console.log(to.url)
        if (checkWhite(to.url)) return true
        console.log(123)
        uni.reLaunch({ url: loginPage })
        console.log(789)
        return false
      }
    },
    fail(err) {
      console.log(err)
    },
  })
})
