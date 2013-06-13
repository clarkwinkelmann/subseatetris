/*
	Gestion des scores
*/

function dynamicSort(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1, property.length - 1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

function HighScore(points,date){
	this.Points = points;
	this.DateScore = new Date(date);
}

function getScores(){
	var Table = new Array();
	for(i=0;i<10;i++){
		var LigneScore = getCookie('highscore'+i);
		if(LigneScore == '' || LigneScore == null){
			Table.push(new HighScore(-1,0));
		}else{
			var Separation = LigneScore.indexOf('_');
			Table.push(new HighScore(parseInt(LigneScore.substr(0,Separation)),LigneScore.substr(Separation+1,LigneScore.length)));
		}
	}
	Table.sort(dynamicSort('-Points'));
	return Table;
}

function setScores(Table){
	Table.sort(dynamicSort('-Points'));
	for(i=0;i<10;i++){
		setCookie('highscore'+i,Table[i].Points+'_'+Table[i].DateScore,360);
	}
}

function clearScores(){
	for(i=0;i<10;i++){
		delCookie('highscore'+i);
	}
}

function formatDate(date) {
	return date.getDate()+' '+Mois[date.getMonth()]+' '+date.getFullYear();
}

function buildTableauHighScores(Table,MonScore){
	var TableauHTML = '';
	var MonScoreDisplayed = false;
	if (MonScore == undefined){ MonScore = new HighScore(-1,0); }
	for(i=0;i<10;i++){
		if(Table[i].Points != -1){
			if(Table[i].Points == MonScore.Points && formatDate(Table[i].DateScore) == formatDate(MonScore.DateScore) && !MonScoreDisplayed){
				TableauHTML += '<tr class="myscore">';
				MonScoreDisplayed = true;
			}else{
				TableauHTML += '<tr>';
			}
			TableauHTML += '<td>'+(i+1)+'</td><td>'+Table[i].Points+'</td><td>'+formatDate(Table[i].DateScore)+'</td></tr>';
		}
	}
	if(TableauHTML == ''){
		TableauHTML = '<tr class="noscore"><td rowspan="3">'+T_NoScore+'</td></tr>';
		document.getElementById('btneffacescores').style.display = 'none';
	}else{
		TableauHTML = '<thead><tr><td></td><td>'+T_Score+'</td><td>'+T_Date+'</td></tr></thead>'+TableauHTML;
		document.getElementById('btneffacescores').style.display = 'block';
	}
	document.getElementById('highscores').innerHTML = TableauHTML;
}

function effaceTableauHighScore(){
	document.getElementById('btneffacescores').className = 'btneffacescores scoresconfirm';
	document.getElementById('btnefface-normal').style.display = 'none';
	document.getElementById('btnefface-confirm').style.display = 'inline-block';
}

function scoresConfirm(){
	scoresCancel();
	clearScores();
	buildTableauHighScores(getScores());
}

function scoresCancel(){
	document.getElementById('btneffacescores').className = 'btneffacescores';
	document.getElementById('btnefface-normal').style.display = 'inline-block';
	document.getElementById('btnefface-confirm').style.display = 'none';
}