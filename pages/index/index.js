//index.js
//获取应用实例
import { SS_SERVER_URL } from '../../utils/constants.js'

let app = getApp()
Page({
  data: {
    username: '',
    passwd: '',
    msg: 'no msg',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.login({
      success: function (res) {
        // success
        console.log('WX Login Success')
        console.log(res)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  bindButtonTap: function () {
    console.log(this.data.username)
    console.log(this.data.passwd)
    wx.request({
      url: SS_SERVER_URL + '/user/_wxlogin.php',
      data: {
        username: this.data.username,
        passwd: this.data.passwd,
        remember_me: 'week'
      },
      method: 'GET',
      success:  (res) => {
        // success
        console.log('Login Success')
        console.log(res)
        this.setData({
          msg: res.data.msg
        })
        if (res.data.code == 1) {
          app.globalData.uid = res.data.uid
          wx.navigateTo({
            url: '../userInfo/userInfo'
          })
        }
      },
      fail: function (e) {
        console.log('Login fail')
        console.log(e)
        // fail
      },
      complete: function () {
        console.log('Login Complete')
        // complete
      }
    })
  },
  bindUserInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  bindPasswdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    })
  },
  onLoad: function () {
    console.log('onLoad')
    console.log(this.data.username)
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo) => {
      //更新数据
      this.setData({
        userInfo: userInfo
      })
    })
  }
})
