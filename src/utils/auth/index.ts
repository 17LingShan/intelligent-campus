const TokenKey = 'admin-token'
const TokenPrefix = 'Bearer '
function isLogin() {
  return !!uni.getStorageSync(TokenKey)
}

function getToken() {
  return uni.getStorageSync(TokenKey)
}

function setToken(token: string) {
  uni.setStorageSync(TokenKey, token)
}

function clearToken() {
  uni.removeStorageSync(TokenKey)
}

function getStudentTabs(): TabsStore.TabsList {
  return [
    { text: '首页', icon: 'home', path: '/pages/student/home/index' },
    { text: '课程表', icon: 'calendar', path: '/pages/student/calendar/index' },
    { text: '我的', icon: 'account', path: '/pages/student/mine/index' },
  ]
}

function getManagerTabs(): TabsStore.TabsList {
  return [
    { text: '管理', icon: 'grid', path: '/pages/manager/manage/index' },
    { text: '审批', icon: 'order', path: '/pages/manager/approval/index' },
    { text: '账号', icon: 'account', path: '/pages/manager/account/index' },
  ]
}

const dayOrder = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  日: 7,
}

export {
  TokenPrefix,
  isLogin,
  getToken,
  setToken,
  clearToken,
  getStudentTabs,
  getManagerTabs,
  dayOrder,
}
