import Http from '@/common/utils/http'
const http = new Http()

export const getUnReadInfoDetail = data => http.post('/maiun-hscommunity/msg/unread/info', data)

// 获取未读消息列表
export const unreadMsgList = data => http.get('/maiun-hscommunity/msg/unread/list', data)

// 预警信息列表
export const messageList = data => http.get('/maiun-hscommunity/msg/warn/list', data)

// 预警信息详情
export const messageDetail = data => http.get('/maiun-hscommunity/msg/warn/detail', data)

// 预警处理
export const warningHandle = data => http.post('/maiun-hscommunity/msg/warn/handle', data)
