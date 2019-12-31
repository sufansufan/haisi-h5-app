import Http from '@/common/utils/http'
const http = new Http()

// 登录
export const login = data => http.post('/blade-auth/token', data)

// 登出
export const logout = data => http.post('/users/v1/session', data)

// 获取验证码
export const getCode = data => http.get('/maiun-hscommunity/hsuser/sendMsg', data)

// 注册
export const registered = data => http.get('/maiun-hscommunity/hsuser/registered', data)

// 修改密码
export const updatePassword = data => http.get('/maiun-hscommunity/hsuser/updatePassword', data)
