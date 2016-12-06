//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    username: 'Rainbow',
    passwd: 'Idontknow',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.login({
      success: function(res){
        // success
        console.log('WX Login Success')
        console.log(res)
     },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  bindButtonTap: function() {
    console.log(this.data.username)
    console.log(this.data.passwd)
    wx.request({
      url: 'http://sportshero.mobi:8090/user/_wxlogin.php',
      data: {
        username: 'rainbow',
        passwd: 'Idontknow',
        remember_me: 'week'
      },
      method: 'GET', 
      success: function(res){
        // success
        console.log('Login Success')
        console.log(res.data.msg)
        console.log(res)
        if (res.data.code == 1){
          app.globalData.uid = res.data.uid
          wx.navigateTo({
            url: '../userInfo/userInfo'
          })
       }
        
      },
      fail: function() {
        console.log('Login fail')
       // fail
      },
      complete: function() {
         console.log('Login Complete')
        // complete
      }
    })
  },
  bindUserInput: function(e) {
    this.setData({
      username: e.default.value
    })
  },
  bindUserPasswd: function(e) {
    this.setData({
      passwd: e.default.value
    })
  },
  onLoad: function () {
    console.log('onLoad')
    console.log(this.data.username)
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
