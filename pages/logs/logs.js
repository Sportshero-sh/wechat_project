//logs.js
var util = require('../../utils/util.js')
var DataModule = require('../../module/DataModule.js')
Page({
  data: {
    matchs: [],
    stepCount: 1,
    isFetching: false,
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://fhapi-dev1.cloudapp.net/api/games/upcomingNext?&sportId=1&number=25&step=' + that.data.stepCount, //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'Authorization': 'FH-Token 935b6dfb-e795-48a8-be9c-11bd9e8c89dc'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          matchs: (res.data).map(that.composeMatch),
          stepCount: that.data.stepCount + 1,
          isFetching: false,
        })
      },
      fail : function(res){
        console.log('fail');
        console.log(res);
      },
      complete : function(res){
        console.log('complete');
        console.log(res);
      }
    });
  },
  onPullDownRefresh: function () {
    var that = this;
    if (this.data.isFetching == true) {
      return;
    }

    this.setData({ isFetching: true });
    wx.request({
      url: 'https://fhapi-dev1.cloudapp.net/api/games/upcomingNext?sportId=1&number=25&step=' + 1,
      method: 'GET',
      header: {
        'Authorization': 'FH-Token 935b6dfb-e795-48a8-be9c-11bd9e8c89dc'
      },
      success: function (res) {
        console.log(res.data)

        var list = (res.data).map(that.composeMatch);


        that.setData({
          matchs: list,
          isFetching: false,
          stepCount: 2,
        })
      }
    });
  },
  onReachBottom: function () {
    console.log('onReachBottom');
    if (this.data.stepCount == 0)
      return;

    if (this.data.isFetching == true) {
      return;
    }
    this.setData({ isFetching: true });
    var that = this;
    wx.request({
      url: 'https://fhapi-dev1.cloudapp.net/api/games/upcomingNext?sportId=1&number=25&step=' + that.data.stepCount, //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'Authorization': 'FH-Token 935b6dfb-e795-48a8-be9c-11bd9e8c89dc'
      },
      success: function (res) {
        console.log(res.data);
        var list = (res.data).map(that.composeMatch);
        that.setData({
          matchs: that.data.matchs.concat(list),
          stepCount: that.data.stepCount + 1,
          isFetching: false,
        })
      }
    });
  },
  enterMatchCenter: function (event) {
    console.log(event);
    var p = event.currentTarget.id;

    wx.navigateTo({
      url: '../matchcenter/matchcenter?matchID=' + p
    });
  },
  onHomeTeamIconError: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    that.data.matchs[index].HomeTeamIcon = 'https://endpoint936063.azureedge.net/fhteamimages/default-home.png';
    that.setData({
      matchs: that.data.matchs,
      stepCount: that.data.stepCount,
      isFetching: that.data.isFetching,
    });
    console.log(e);
  },

  onAwayTeamIconError: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    that.data.matchs[index].AwayTeamIcon = 'https://endpoint936063.azureedge.net/fhteamimages/default-away.png';
    that.setData({
      matchs: that.data.matchs,
      stepCount: that.data.stepCount,
      isFetching: that.data.isFetching,
    });
    console.log(e);
  },

  composeMatch: function(match){
    match.HomeTeamIcon = 'https://endpoint936063.azureedge.net/fhteamimages/' + match.HomeTeamId + '.png';
    match.AwayTeamIcon = 'https://endpoint936063.azureedge.net/fhteamimages/' + match.AwayTeamId + '.png';
    match.StartTime = util.convertStringToTime(match.StartTime, 'dd MMMM yyyy, hh:mm');
    var totalPrediction = match.HomePredictions + match.DrawPredictions + match.AwayPredictions;
    if(totalPrediction == 0){
			match.HomePredictionsRate = 0;
			match.DrawPredictionsRate = 0;
			match.AwayPredictionsRate = 0;
		}else{
      match.HomePredictionsRate = (match.HomePredictions * 100 / totalPrediction).toFixed(0);
		  match.DrawPredictionsRate = (match.DrawPredictions * 100 / totalPrediction).toFixed(0);
		  match.AwayPredictionsRate = (match.AwayPredictions * 100 / totalPrediction).toFixed(0);
    }
    return match;
  },
  onPredictClicked:function(event){
    console.log(event);
    var that = this;
    var p = event.currentTarget.id;
    var index = event.currentTarget.dataset.index;
    var app = getApp();
    app.globalData.selectedMatch = that.data.matchs[index];
    wx.navigateTo({
      url: '../predict/predict?matchID=' + p
    });
  }
})
