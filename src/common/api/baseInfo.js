import Http from '@/common/utils/http'
const http = new Http()

// 修改医生信息
export const updateDoctorInfo = data => http.post('/maiun-hscommunity/doctor/updateForm', data)
// 修改密码
export const updateDoctorPwd = data => http.post('/maiun-hscommunity/doctor/update/password', data)
