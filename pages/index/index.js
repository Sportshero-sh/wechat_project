'use strict'
//index.js
//获取应用实例
var app = getApp()
var Constants = require('../../utils/Constants.js')
var DataModule = require('../../module/DataModule.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.request({
      url: 'https://fhapi-dev1.cloudapp.net/api/loginWithEmail',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      data: {
        Password: '12345678',
        UserDeviceToken: '82B15A8A-AC65-451F-A9A0-F830CCF9FF97',
        useDev: true,
        Version: '1.64',
        DeviceToken: '',
        Email: 'Spiritrain@gmail.com',
      },
      success: function(res) {
          console.log(res.data)
          that.checkCountryConfig();
      }
    });
  },
  checkCountryConfig: function() {
			let fileName = Constants.CDNFileNameList[0];
      var that = this;
      wx.request({
        url: Constants.CDNDevPath + fileName,
        method: 'GET',
        headers: {
        },
        success: function(res) {
            console.log(res.data)
            DataModule.initCountry(res.data);
            that.checkLeagueConfig();
        }
      });
  },
  checkLeagueConfig: function() {
			let fileName = Constants.CDNFileNameList[1];
      var that = this;
      wx.request({
        url: Constants.CDNDevPath + fileName,
        method: 'GET',
        headers: {
        },
        success: function(res) {
            console.log(res.data)
            DataModule.initLeague(res.data);
            that.checkTeamConfig();
        }
      });
  },
  checkTeamConfig: function() {
			let fileName = Constants.CDNFileNameList[2];
      var that = this;
      wx.request({
        url: Constants.CDNDevPath + fileName,
        method: 'GET',
        headers: {
        },
        success: function(res) {
            console.log(res.data)
            DataModule.initTeam(res.data);
            that.checkLeagueTeamConfig();
        }
      });
  },
  
  checkLeagueTeamConfig: function() {
			let fileName = Constants.CDNFileNameList[3];
      wx.request({
        url: Constants.CDNDevPath + fileName,
        method: 'GET',
        headers: {
        },
        success: function(res) {
            console.log(res.data)
            DataModule.initLeagueTeam(res.data);
        }
      });
  },
  
})