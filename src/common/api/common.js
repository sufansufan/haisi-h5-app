import Http from '@/common/utils/http'
const http = new Http()

// 消息列表
export const getListData = data => http.get('/maiun-hscommunity/msg/list', data)

// 消息详情
export const getDetail = data => http.post('/maiun-hscommunity/msg/info', data)
