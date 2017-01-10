//logs.js
var util = require('../../utils/util.js')
var DataModule = require('../../module/DataModule.js')
Page({
  data: {
    matchs: [],
    stepCount: 0,
    isFetching: false,
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://fhapi-dev1.cloudapp.net/api/games/popularUpcoming?sportId=1', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'Authorization': 'FH-Token 935b6dfb-e795-48a8-be9c-11bd9e8c89dc'
      },
      success: function(res) {
          console.log(res.data)
          that.setData({
            matchs: (res.data).map(function (match) {
               match.HomeTeamIcon = 'http://fhmainstorage.blob.core.windows.net/fhteamimages/' + match.HomeTeamId + '.png';
              match.AwayTeamIcon = 'http://fhmainstorage.blob.core.windows.net/fhteamimages/' + match.AwayTeamId + '.png';
              match.StartTime = util.convertStringToTime(match.StartTime, 'dd MMMM yyyy, hh:mm');

              return match;
          }),
            stepCount: that.data.stepCount + 1
        })
    }});
  },
  onPullDownRefresh: function() {
    var that = this;
    if (this.data.isFetching == true)
    {
      return;
    }

    this.setData({isFetching:true});
      wx.request({
        url: 'https://fhapi-dev1.cloudapp.net/api/games/popularUpcoming?sportId=1', //仅为示例，并非真实的接口地址
        method: 'GET',
        header: {
          'Authorization': 'FH-Token 935b6dfb-e795-48a8-be9c-11bd9e8c89dc'
        },
        success: function(res) {
            console.log(res.data)

            var list = (res.data).map(function (match) {
                 match.HomeTeamIcon = 'http://fhmainstorage.blob.core.windows.net/fhteamimages/' + match.HomeTeamId + '.png';
                  match.AwayTeamIcon = 'http://fhmainstorage.blob.core.windows.net/fhteamimages/' + match.AwayTeamId + '.png';
                  match.StartTime = util.convertStringToTime(match.StartTime, 'dd MMMM yyyy, hh:mm');

                  return match;
            });


            that.setData({
              matchs: that.data.matchs.concat(list),
              isFetching:false,
          })
    }});
  },
  onReachBottom: function() {
    if (this.data.stepCount == 0)
      return;

    if (this.data.isFetching == true)
    {
      return;
    }
    this.setData({isFetching:true});
    var that = this;
    wx.request({
        url: 'https://fhapi-dev1.cloudapp.net/api/games/upcomingNext?sportId=1&step=' + that.data.stepCount, //仅为示例，并非真实的接口地址
        method: 'GET',
        header: {
          'Authorization': 'FH-Token 935b6dfb-e795-48a8-be9c-11bd9e8c89dc'
        },
        success: function(res) {
            console.log(res.data);
            var list = (res.data).map(function (match) {
                match.HomeTeamName = DataModule.getTeamByID(match.HomeTeamId).teamName;
                match.AwayTeamName = DataModule.getTeamByID(match.AwayTeamId).teamName;
                return match;
            });
            that.setData({
              matchs: that.data.matchs.concat(list),
              stepCount: that.data.stepCount + 1,
              isFetching:false,
          })
    }});
  },
<<<<<<< HEAD

  enterMatchCenter: function(event) {
      console.log(event);
      var p = event.currentTarget.id;

    wx.navigateTo({
      url: '../matchcenter/matchcenter?matchID=' + p
    });
  },
=======
  onTeamIconError: function(e){
    console.log(e);
  }
>>>>>>> 964ec6bd58265225dc82d13ade9cdfa587297802
})
