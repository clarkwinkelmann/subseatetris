/*
	Gestion des scores
*/

// Tri dynamique d'un tableau selon une propriété des objets
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

// Objet highscore
function HighScore(points,date,player){
	this.Points = points;
	this.DateScore = new Date(date);
	this.Player = player;
}

// Récupère la liste des scores dans les cookies
function getScores(){
	var Table = new Array();
	for(i=0;i<10;i++){
		var LigneScore = getCookie('highscore'+i);
		if(LigneScore == '' || LigneScore == null){
			Table.push(new HighScore(-1,0,'Me'));
		}else{
			var elem = LigneScore.split('_');
			// Si le cookie d'origine ne contient pas le nom du joueur
			if(elem[2] == undefined){
				elem[2] = T_Me;
			}
			Table.push(new HighScore(elem[0],elem[1],elem[2]));
		}
	}
	Table.sort(dynamicSort('-Points'));
	return Table;
}

// Trie puis place les highscores dans les cookies
function setScores(){
	HighScores.sort(dynamicSort('-Points'));
	for(i=0;i<10;i++){
		setCookie('highscore'+i,HighScores[i].Points+'_'+HighScores[i].DateScore+'_'+HighScores[i].Player,360);
	}
}

// Supprime tous les cookies de score
function clearScores(){
	for(i=0;i<10;i++){
		delCookie('highscore'+i);
	}
	HighScores = getScores();
}

// Transforme la date javascript vers une chaîne de caractères en fonction de la langue
function formatDate(date) {
	return date.getDate()+' '+Mois[date.getMonth()]+' '+date.getFullYear();
}

// Construit le tableau html des scores et le place dans #highscores
function buildTableauHighScores(){
	var TableauHTML = '';
	var MonScoreDisplayed = false;
	MonScoreLine = 20;
	if (MonScore == undefined){ MonScore = new HighScore(-1,0,'Me'); }
	for(i=0;i<10;i++){
		if(HighScores[i].Points != -1){
			if(HighScores[i].Points == MonScore.Points && formatDate(HighScores[i].DateScore) == formatDate(MonScore.DateScore) && HighScores[i].Player == MonScore.Player && !MonScoreDisplayed){
				TableauHTML += '<tr class="myscore" onmousedown="editName()" title="'+T_ChangeName+'">';
				MonScoreDisplayed = true;
				MonScoreLine = i;
			}else{
				TableauHTML += '<tr>';
			}
			TableauHTML += '<td>'+(i+1)+'</td><td>';
			if(i == MonScoreLine){
				TableauHTML += '<span class="changename"><span id="playername">'+HighScores[i].Player+'</span><input type="text" id="player" value="'+HighScores[i].Player+'"/><span id="playerbulle">'+T_ChangeNameBulle+'<br/><a onclick="confirmName()" title="'+T_OK+'">'+T_OK+'</a></span></span>';
			}else{
				TableauHTML += HighScores[i].Player;
			}
			TableauHTML += '</td><td>'+HighScores[i].Points+'</td><td>'+formatDate(HighScores[i].DateScore)+'</td></tr>';
		}
	}
	if(TableauHTML == ''){
		TableauHTML = '<tr class="noscore"><td rowspan="3">'+T_NoScore+'</td></tr>';
		document.getElementById('btneffacescores').style.display = 'none';
	}else{
		TableauHTML = '<thead><tr><td></td><td>'+T_Player+'</td><td>'+T_Score+'</td><td>'+T_Date+'</td></tr></thead><tbody>'+TableauHTML+'</tbody>';
		document.getElementById('btneffacescores').style.display = 'block';
	}
	document.getElementById('highscores').innerHTML = TableauHTML;
}

// Affiche le bouton pour confirmer ou annuler la suppression des scores
function effaceTableauHighScore(){
	document.getElementById('btneffacescores').className = 'btneffacescores scoresconfirm';
	document.getElementById('btnefface-normal').style.display = 'none';
	document.getElementById('btnefface-confirm').style.display = 'inline-block';
}

// Confirme la suppression des scores
function scoresConfirm(){
	scoresCancel();
	clearScores();
	buildTableauHighScores(getScores());
}

// Annule la suppression des scores
function scoresCancel(){
	document.getElementById('btneffacescores').className = 'btneffacescores';
	document.getElementById('btnefface-normal').style.display = 'inline-block';
	document.getElementById('btnefface-confirm').style.display = 'none';
}

function editName(){
	document.getElementById('player').style.display = 'inline-block';
	document.getElementById('playerbulle').style.display = 'block';
	document.getElementById('playername').style.display = 'none';
}

function confirmName(){
	document.getElementById('player').style.display = 'none';
	document.getElementById('playerbulle').style.display = 'none';
	document.getElementById('playername').style.display = 'inline-block';
	PlayerName = document.getElementById('player').value;
	document.getElementById('playername').innerHTML = PlayerName;
	setCookie('player',PlayerName,360);
	if(MonScoreLine < 10){
		HighScores[MonScoreLine] = new HighScore(MonScore.Points,MonScore.DateScore,PlayerName);
	}
	setScores();
}

var PlayerName = getCookie('player');
if(PlayerName == ''){
	PlayerName = T_Me;
}

var MonScoreLine = 20;
var MonScore = new HighScore(-1,0,'Me');
var HighScores = getScores();