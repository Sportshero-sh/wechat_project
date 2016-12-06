//logs.js
var app = getApp()
Page({
    data: {
        sspass: '',
        ssport: '',
        sstime: '',
        transfer: 0,
        transfer_all: 0,
        transfer_unused: 0,
        checkin_msg: ''
    },
    bindCheckinTap: function () {
        wx.request({
            url: 'http://sportshero.mobi:8090/user/_wxcheckin.php',
            data: {
                uid: app.globalData.uid
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success:  (res)=>{
                // success
                console.log('CheckIn Success')
                console.log(res)
                this.setData({
                    checkin_msg: res.data.msg
               })

            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },

    onLoad: function () {
        wx.request({
            url: 'http://sportshero.mobi:8090/user/_wxuser.php',
            data: {
                uid: app.globalData.uid
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: (res) => {
                // success
                console.log('UserInfo Success')
                console.log(res)
                this.setData({
                    sspass: res.data.sspass,
                    ssport: res.data.ssport,
                    sstime: res.data.sstime,
                    transfer: res.data.transfer,
                    transfer_all: res.data.transfer_all,
                    transfer_unused: res.data.transfer_unused
                })
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
})
