//logs.js
var util = require('../../utils/util.js')
var DataModule = require('../../module/DataModule.js')
Page({
  data: {
    odds:[],
    currentPage: 0,
    match:{},
    hasOdds : false,
    showIndicator : false,
    autoPlay : false,
    predict : [ -1 , -1 , -1],
  },
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    // console.log(app.globalData.selectedMatch);
    // this.setData({
    //     match : app.globalData.selectedMatch
    // });
    wx.request({
      url: 'https://fhapi-dev1.cloudapp.net/api/markets/getMarketsForGame?gameId=' + options.matchID, //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'Authorization': 'FH-Token 935b6dfb-e795-48a8-be9c-11bd9e8c89dc'
      },
      success: function (res) {
        console.log(res.data)
        if(res.data instanceof Array){
          that.setData({
            match : app.globalData.selectedMatch,
            hasOdds : true,
            odds:res.data,
            showIndicator : false,
            autoPlay : false,
            currentPage : 0,
            predict : [-1 , -1 , -1],
          });
          console.log(that.data.odds);
        }
      },
      fail : function(res){
        console.log('fail');
        console.log(res);
      },
      complete : function(res){
      }
    });
  },
  onPredictClicked: function(e){
    var index = e.currentTarget.dataset.index;
    var select = e.currentTarget.dataset.select;
    var data = this.data;
    data.predict[index] = select;
    console.log(data.predict);
    if(index < data.odds.length - 1){
      this.setData({
        odds:data.odds,
        currentPage: index + 1,
        match:data.match,
        hasOdds : data.hasOdds,
        showIndicator : false,
        autoPlay : false,
        predict : data.predict,
      });
    }else{
      var allSelected = true;
      for(var i = 0 ; i < data.odds.length ; i++){
        allSelected = allSelected && (data.predict[i] != -1);
        if(!allSelected)
          break;
      }
      if(allSelected){
        wx.showToast({
          title: '预测成功',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '还有预测没有选择',
          success: function(res) {
          }
        });
      }
    }
    
  },
  onPageChanged: function(e){
    console.log(e);
  }
})
