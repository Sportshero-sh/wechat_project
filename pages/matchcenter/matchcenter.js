var util = require('../../utils/util.js');

Page({
	data: {
		GameInformation: null,
		Statistics: null,
		LastGamesAgainst: [],
		HomeTeamIcon: '',
		AwayTeamIcon: '',
		StartTime: '',
	},
	onLoad:function(options){ 
		var that = this;
		wx.request({
			url: 'https://fhapi-dev1.cloudapp.net/api/games/matchCenter?gameId=' + options.matchID + '&includeStatistics=true',
			method: 'GET',
			header: {
				'Authorization': 'FH-Token 935b6dfb-e795-48a8-be9c-11bd9e8c89dc'
			},
			success: function(res) {
				console.log(res.data);
				that.setData({
					GameInformation: res.data.GameInformation,
					Statistics: res.data.Statistics,
				});
				that.setData({
					HomeTeamIcon: 'http://fhmainstorage.blob.core.windows.net/fhteamimages/' + that.data.GameInformation.HomeTeamId + '.png',
					AwayTeamIcon: 'http://fhmainstorage.blob.core.windows.net/fhteamimages/' + that.data.GameInformation.AwayTeamId + '.png',
					StartTime: util.convertStringToTime(that.data.GameInformation.StartTime, 'dd MMMM yyyy, hh:mm'),
					LastGamesAgainst: (res.data.Statistics.LastGamesAgainst).map(function (match) {
						match.HomeTeamIcon = 'http://fhmainstorage.blob.core.windows.net/fhteamimages/' + match.HomeTeamId + '.png';
						match.AwayTeamIcon = 'http://fhmainstorage.blob.core.windows.net/fhteamimages/' + match.AwayTeamId + '.png';
						match.StartTime = util.convertStringToTime(match.StartTime, 'dd MMMM yyyy');
						let scores = match.ScoreString.split('-');
						match.homeTeamScore = scores[0];
						match.awayTeamScore = scores[1];

						return match;
					}),
				});
			}});
	},
});
