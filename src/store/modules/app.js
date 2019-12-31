
import { login, logout } from '@/common/api/login'
import { getUserList } from '@/common/api/user'
import { setStorage, removeStorage, ToolTips, jump } from '../../common/utils/index'
/* global uni */
const app = {
  state: {
    userInfo: {},
    signOut: false
  },
  mutations: {
    SEt_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_SIGNOUT(state, data) {
      state.signOut = data
    },
    USER_LIST(state, userList) {
      state.userList = userList
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const userInfoDeep = JSON.parse(JSON.stringify(userInfo))
      const { type } = userInfoDeep
      if (!type) userInfoDeep.checkCode = ''
      delete userInfoDeep.type
      return new Promise((resolve, reject) => {
        login(userInfoDeep).then(({ data }) => {
          setStorage('token', data.accessToken)
          commit('SEt_USERINFO', data)
          ToolTips('登录成功', 'success')
          setTimeout(() => {
            const { isdecoter } = data
            isdecoter ? jump('/pages/index/index') : jump('/pages/userSide/index')
          }, 500)
          resolve()
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          uni.showToast({
            title: '注销成功',
            icon: 'success',
            duration: 3000
          })
          setTimeout(() => {
            uni.reLaunch({
              url: '../../pages/login/index',
              animationType: 'pop-in',
              animationDuration: 200
            })
            commit('SEt_USERINFO', {})
            removeStorage('token', '')
            removeStorage('projectId', '')
          }, 1000)
        })
      })
    },
    getUserList({ commit }, userInfo) {
      const userInfoDeep = JSON.parse(JSON.stringify(userInfo))
      const { userId } = userInfoDeep
      const params = {
        doctorId: userId
      }
      getUserList(params).then(({ data }) => {
        if (data['#']) {
          data['#'].map(item => {
            item.spell = '#'
          })
          const ss = data['#']
          delete data['#']
          data['#'] = ss
        }
        commit('USER_LIST', data)
      })
    }
  }
}

export default app
