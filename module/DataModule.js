'use strict';

export var m_TeamMap = new Map();
export function initTeam(data){
		for (let i = 0; i < data.length; i++) {
			m_TeamMap.set(data[i].Id, data[i]);
		}
}

export function getTeamByID(id){
	return m_TeamMap.get(id);
}

var m_CountryMap = new Map();
export function initCountry(data){
		for (let i = 0; i < data.length; i++) {
			m_CountryMap.set(data[i].Id, data[i]);
		}
}

var m_LeagueMap = new Map();
export function initLeague(data){
		for (let i = 0; i < data.length; i++) {
			m_LeagueMap.set(data[i].Id, data[i]);
		}
}

var m_LeagueTeamMap = new Map();
export function initLeagueTeam(data){
		for (let i = 0; i < data.length; i++) {
			m_LeagueTeamMap.set(data[i].Id, data[i]);
		}

		m_LeagueTeamMap = new Map();
		let leagueId = 0;
		let teamSet = null;
		m_TeamMap.forEach(function (item, index, input) {
			if (leagueId != item.leagueId) {
				leagueId = item.leagueId;
				teamSet = m_LeagueTeamMap.get( leagueId )
				if (typeof(teamSet) == "undefined") {
					// console.log("new set")
					teamSet = new Set();
					m_LeagueTeamMap.set(leagueId, teamSet);
				}
			}
			teamSet.add( item.teamId )
		})
}