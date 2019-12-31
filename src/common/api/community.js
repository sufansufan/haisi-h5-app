import Http from '@/common/utils/http'
const http = new Http()

// 社区详情
export const detail = data => http.get('/maiun-hsyl/community/detail', data)
