//app.js
var playerInfo = require('./module/PlayerInfo.js');

App({
	onLaunch: function () {
		wx.login({
			success: function(res) {
				if (res.code) {
				//发起网络请求
				wx.request({
					url: 'https://test.com/onLogin',
					data: {
						code: res.code
					},
					method: 'POST',
					header: {
					},
					success: function(res) {
						playerInfo.accessToken = res.accessToken;
					},
				});
				} else {
					console.log('获取用户登录态失败！' + res.errMsg);
				}
			}
		});
	},
  
  globalData:{
    userInfo:null,
    hasLogin:false,
    selectedMatch:null,
  }
})
