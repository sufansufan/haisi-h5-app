import { getStorage } from './index'
import store from '../../store/index'
import { jump } from '../utils/index'
/* global uni */
// 后端是否支持json格式
const contentType = 'application/x-www-form-urlencoded'
// const contentType = 'application/json'

// var basePath = ''

const basePath = 'http://139.9.164.207:28008' // 服务器开发
// const basePath = 'http://119.3.44.21:31135' // 服务器测试
// process.env.NODE_ENV === 'development' ? basePath = 'http://proapi.maiunsoft.com' : basePath = 'http://testapi.maiunsoft.com'

var params = {}

export default class Http {
  get(url, data) {
    return this.commonHttp('GET', basePath + url, data)
  }
  post(url, data) {
    if (data.Project) {
      params.project_id = getStorage('projectId', true)
      delete data.Project
    } else {
      params = {}
    }
    data = Object.assign({}, data, params)
    return this.commonHttp('POST', basePath + url, data)
  }
  getUrl(url) {
    return basePath + url
    // return 'http://139.196.104.14:28008' + url
  }
  async commonHttp(method, url, data) {
    return new Promise(async(resolve, reject) => {
      // uni.showNavigationBarLoading()
      try {
        const request = await uni.request({
          url,
          method,
          data,
          header: {
            'AuthorizAtion': 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
            'content-type': contentType,
            'Blade-Auth': 'bearer ' + getStorage('token', true)
          }
        })
        request.shift()
        const { data: resData, statusCode } = request[0]
        // uni.hideNavigationBarLoading()
        switch (statusCode) {
          case 200:
            switch (resData.code) {
              case 200:
              case 201:
                return resolve(resData)
              case 402:
                uni.showToast({
                  title: resData.msg,
                  icon: 'none',
                  duration: 3000
                })
                break
              case 400:
                uni.showToast({
                  title: resData.msg,
                  icon: 'none',
                  duration: 3000
                })
                break
              default:
                if (store.state.app.userInfo.isdecoter === 1) {
                  jump('/pages/login/index')
                } else if (store.state.app.userInfo.isdecoter === 0) {
                  jump('/pages/login/userIndex')
                }
                setTimeout(() => {
                  if (resData.msg) {
                    uni.showToast({
                      title: resData.msg,
                      icon: 'none',
                      duration: 3000
                    })
                  }
                }, 500)
                reject(new Error(resData.msg))
            }
            break
          default:
            uni.showToast({
              title: resData.msg,
              icon: 'none',
              duration: 3000
            })
            reject(new Error(resData.msg))
        }
      } catch (error) {
        // uni.hideNavigationBarLoading()
        reject(new Error('网络请求出错'))
      }
    })
  }
}
