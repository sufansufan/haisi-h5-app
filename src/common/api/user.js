import Http from '@/common/utils/http'
const http = new Http()

// 获取用户列表
export const getUserList = data => http.get('/maiun-hscommunity/doctor/user/list', data)

// h获取用户详情
export const getUserInfo = data => http.get('/maiun-hscommunity/hsuser/detail', data)

// 查询设置列表

export const healthList = data => http.get('/maiun-hscommunity/doctor/userwarn', data)

// 设置健康值详情
export const healthDetail = data => http.get('/maiun-hscommunity/doctor/userwarn/detail', data)

// 设置健康值
export const setHealth = data => http.post('/maiun-hscommunity/doctor/configwarn', data)

// 获取医生服务包
export const getDoctorServiceList = data => http.get('/maiun-hscommunity/doctor/service/list', data)
// 保存用户
export const saveUser = data => http.post('/maiun-hscommunity/hsuser/save', data)

// 查询累计数据
export const getGrand = data => http.get('/maiun-hscommunity/doctor/grand/data', data)

// 设置备注
export const nickName = data => http.post('/maiun-hscommunity/hsuser/update', data)

// 查看心率
export const heartRate = data => http.get('/maiun-watch/heartRate/list', data)

// 查看血压
export const bloodRate = data => http.get('/maiun-watch/bloodPressure/list', data)

// 查看睡眠
export const sleepRate = data => http.get('/maiun-watch/sleep/list', data)

// 查看运动
export const runRate = data => http.get('/maiun-watch/movement/list', data)

// 关心用户列表
export const careUser = data => http.get('/maiun-hscommunity/hsuser/relation/list', data)

// 正在使用的服务包接口
export const beingUseServicepack = data => http.get('/maiun-hscommunity/hsuser/using/servicePackage', data)

// 绑定服务包
export const bindServicepack = data => http.get('/maiun-hscommunity/hsuser/bind/service', data)

// 实时获取用户血压和心率值
export const realTimeHeartBlood = data => http.get('/maiun-watch/community/heartBlood', data)
