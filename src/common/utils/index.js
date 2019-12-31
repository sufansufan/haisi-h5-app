/* global uni */

// 设置缓存
export const setStorage = (key, data = '', sync = false) => {
  if (typeof key === 'object') {
    for (const i in key) {
      console.log(i, key[i])
    }
    return
  }
  uni[sync ? 'setStorageSync' : 'setStorage'](
    sync
      ? (key, data)
      : {
        key,
        data
      }
  )
}

// 获取缓存
export const getStorage = (key, sync = false) => {
  return uni[sync ? 'getStorageSync' : 'getStorage'](sync ? key : { key })
}

// 移出缓存
export const removeStorage = (key, sync = false) => {
  return uni[sync ? 'removeStorageSync' : 'removeStorage'](sync ? key : { key })
}

// 跳转路径
export const jump = url => {
  if (!url) return
  uni.navigateTo({
    url,
    animationType: 'pop-in'
    // animationDuration: 200
  })
}
//
export const closeCurrentJump = url => {
  if (!url) return
  uni.redirectTo({
    url,
    animationType: 'pop-in'
    // animationDuration: 200
  })
}

/**
 * @param {Number} index 层级
 */
export const goBack = index => {
  uni.navigateBack({
    delta: index || 1
  })
}

/**
 * @param {Number} index 层级
 */
export const windowBack = index => {
  window.history.back(index || -1)
}

// 处理url请求参数
export const handlerUrl = params => {
  if (typeof params !== 'object') {
    return
  }
  var url = '?'
  for (const key in params) {
    url += `${key}=${params[key]}&`
  }
  return url
}

// 提示信息
export const ToolTips = (title, icon = 'none') => {
  uni.showToast({
    title,
    icon,
    duration: 3000
  })
}
