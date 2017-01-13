var util = require('../../utils/util.js');
var PlayerInfo = require('../../module/PlayerInfo.js');

Page({
	data: {
		GameInformation: null,
		Statistics: null,
		LastGamesAgainst: [],
		HomeTeamIcon: '',
		AwayTeamIcon: '',
		StartTime: '',
		HomeTeamForm: null,
		AwayTeamForm: null,
		IsInCurrentForm: false,
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
				that.onCurrentLeagueSwitch();
			}});
	},

	onCurrentLeagueSwitch:function()
	{
		if (this.data.IsInCurrentForm == true)
		{
			this.setData(
				{
					IsInCurrentForm: false,
					HomeTeamForm: [this.data.Statistics.LeagueTable[0].NumberOfGamesWonTotal, this.data.Statistics.LeagueTable[0].NumberOfGamesDrawnTotal, this.data.Statistics.LeagueTable[0].NumberOfGamesLostTotal],
					AwayTeamForm: [this.data.Statistics.LeagueTable[1].NumberOfGamesWonTotal, this.data.Statistics.LeagueTable[1].NumberOfGamesDrawnTotal, this.data.Statistics.LeagueTable[1].NumberOfGamesLostTotal],
				}
			);
		}
		else
		{
			this.setData(
				{
					IsInCurrentForm: true,
					HomeTeamForm: [this.data.Statistics.TeamForm[0].NumberOfGamesWon, this.data.Statistics.TeamForm[0].NumberOfGamesDrawn, this.data.Statistics.TeamForm[0].NumberOfGamesLost],
					AwayTeamForm: [this.data.Statistics.TeamForm[1].NumberOfGamesWon, this.data.Statistics.TeamForm[1].NumberOfGamesDrawn, this.data.Statistics.TeamForm[1].NumberOfGamesLost],
				}
			);
		}
	},
	switchTabsForForm:function(index)
	{
		switch (index.currentTarget.id)
		{
		case '0':
			{
				if (this.data.IsInCurrentForm == true)
				{
					this.setData(
						{
							HomeTeamForm: [this.data.Statistics.TeamForm[0].NumberOfHomeGamesWon, this.data.Statistics.TeamForm[0].NumberOfHomeGamesDrawn, this.data.Statistics.TeamForm[0].NumberOfHomeGamesLost],
							AwayTeamForm: [this.data.Statistics.TeamForm[1].NumberOfHomeGamesWon, this.data.Statistics.TeamForm[1].NumberOfHomeGamesDrawn, this.data.Statistics.TeamForm[1].NumberOfHomeGamesLost],
						}
					);
				}
				else
				{
					this.setData(
						{
							HomeTeamForm: [this.data.Statistics.LeagueTable[0].NumberOfGamesWonHome, this.data.Statistics.LeagueTable[0].NumberOfGamesDrawnHome, this.data.Statistics.LeagueTable[0].NumberOfGamesLostHome],
							AwayTeamForm: [this.data.Statistics.LeagueTable[1].NumberOfGamesWonHome, this.data.Statistics.LeagueTable[1].NumberOfGamesDrawnHome, this.data.Statistics.LeagueTable[1].NumberOfGamesLostHome],
						}
					);
				}
				break;
			}
		case '1':
			{
				if (this.data.IsInCurrentForm == true)
				{
					this.setData(
						{
							HomeTeamForm: [this.data.Statistics.TeamForm[0].NumberOfGamesWon, this.data.Statistics.TeamForm[0].NumberOfGamesDrawn, this.data.Statistics.TeamForm[0].NumberOfGamesLost],
							AwayTeamForm: [this.data.Statistics.TeamForm[1].NumberOfGamesWon, this.data.Statistics.TeamForm[1].NumberOfGamesDrawn, this.data.Statistics.TeamForm[1].NumberOfGamesLost],
						}
					);
				}
				else
				{
					this.setData(
						{
							HomeTeamForm: [this.data.Statistics.LeagueTable[0].NumberOfGamesWonTotal, this.data.Statistics.LeagueTable[0].NumberOfGamesDrawnTotal, this.data.Statistics.LeagueTable[0].NumberOfGamesLostTotal],
							AwayTeamForm: [this.data.Statistics.LeagueTable[1].NumberOfGamesWonTotal, this.data.Statistics.LeagueTable[1].NumberOfGamesDrawnTotal, this.data.Statistics.LeagueTable[1].NumberOfGamesLostTotal],
						}
					);
				}
				break;
			}
		case '2':
			{
				if (this.data.IsInCurrentForm == true)
				{
					this.setData(
						{
							HomeTeamForm: [this.data.Statistics.TeamForm[0].NumberOfAwayGamesWon, this.data.Statistics.TeamForm[0].NumberOfAwayGamesDrawn, this.data.Statistics.TeamForm[0].NumberOfAwayGamesLost],
							AwayTeamForm: [this.data.Statistics.TeamForm[1].NumberOfAwayGamesWon, this.data.Statistics.TeamForm[1].NumberOfAwayGamesDrawn, this.data.Statistics.TeamForm[1].NumberOfAwayGamesLost],
						}
					);
				}
				else
				{
					this.setData(
						{
							HomeTeamForm: [this.data.Statistics.LeagueTable[0].NumberOfGamesWonAway, this.data.Statistics.LeagueTable[0].NumberOfGamesDrawnAway, this.data.Statistics.LeagueTable[0].NumberOfGamesLostAway],
							AwayTeamForm: [this.data.Statistics.LeagueTable[1].NumberOfGamesWonAway, this.data.Statistics.LeagueTable[1].NumberOfGamesDrawnAway, this.data.Statistics.LeagueTable[1].NumberOfGamesLostAway],
						}
					);
				}
				break;
			}
		}
	}

});
