//app.js
var playerInfo = require('./module/PlayerInfo.js');

App({
	onLaunch: function () {
		var code = '';
		var that = this;
		wx.login({
			success: function (res) {
				that.globalData.hasLogin = true;
				code = res.code;
				wx.getUserInfo({
					success: function (res) {
						that.globalData.userInfo = res.userInfo;
						wx.request({
							url: 'http://10.85.5.200/api/user/SignupWithMP',
							data: {
								code: code,
								encryptData: res.encryptData,
								encryptedData: res.encryptedData,
								iv: res.iv,
								rawData: res.rawData,
								signature: res.signature,
							},
							method: 'POST',
							header: {
							},
							success: function(res) {
								playerInfo.accessToken = res.data.SessionToken;
							},
						});
					}
			});
		}
	});
			
	},
  
  globalData:{
    userInfo:null,
    hasLogin:false,
    selectedMatch:null,
  }
})
