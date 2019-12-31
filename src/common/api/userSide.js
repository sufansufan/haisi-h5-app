import Http from '@/common/utils/http'
const http = new Http()

// 获取用户列表
export const getMyDoctor = data => http.get('/maiun-hscommunity/doctor/detail', data)

// 用户服务包
export const userServicePackDetail = data => http.get('/maiun-hscommunity/hsuser/service/package/list', data)
// 获取 用户端 我的关心列表
export const getMyCareList = data => http.get('/maiun-hscommunity/hsuser/relation/list', data)
// 上传图片
export const uploadImg = http.getUrl('/blade-system/common/upload')
// 获取用户信息
export const getMyUser = data => http.get('/maiun-hscommunity/hsuser/detail', data)
// 修改用户信息
export const updateUser = data => http.post('/maiun-hscommunity/hsuser/update', data)

// 根据账号 查询 名字 我的关心需要的接口
export const nameByaccount = data => http.get('/maiun-hscommunity/hsuser/username', data)

// 绑定我的关心
export const bindCareUser = data => http.get('/maiun-hscommunity/hsuser/relation/save', data)

// 取消绑定 我的关心
export const unbindCareUser = data => http.get('/maiun-hscommunity/hsuser/cancel/relation', data)
