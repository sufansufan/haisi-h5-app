import Http from '@/common/utils/http'
const http = new Http()

// 获取医生服务包
export const servicePackDetail = data => http.get('/maiun-hscommunity/doctor/service/list', data)

// 获取服务包详情
export const oneServiceDetail = data => http.get('/maiun-hscommunity/community/servicepackage/detail', data)
