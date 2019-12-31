import { ToolTips } from './index'

export const phoneNumber = (data) => {
  if (!data) {
    ToolTips('请输入手机号')
    return false
  }
  if (!(/^1[23456789]\d{9}$/.test(data))) {
    ToolTips('手机号码有误，请重填')
    return false
  } else {
    return true
  }
}

export const idCard = (data) => {
  if (!data) {
    ToolTips('请输入身份证号')
    return false
  }
  const idCardPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
  if (!idCardPatter.test(data)) {
    ToolTips('身份证码有误，请重填')
    return false
  } else {
    return true
  }
}
