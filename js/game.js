/*
	Subsea Tetris
	Clark Winkelmann
	clark.winkelmann@gmail.com
	http://sourceforge.net/p/subseatetris
	Version 4.1
*/

/* ################################################################################
	Variables et constantes
*/

// #### ENUMERATIONS ####
var NONE=0;
var DEFAULT=999999;
// Positions
var X=0;
var Y=1;
// Power actuel
var NORMAL=0;
var GHOST=1;
var AQUAPOWER=100;
var GHOSTPOWER=101;
//var BOMBPOWER=102; // Pas encore implémenté

// #### Constantes ####

// Tetriminos
var TAILLE_NEXTTETRIMINOS=30; // Largeur en pixel des aperçus des tetriminos
var TAILLE_NEXTTETRIMINOS_MOBILE=15; // Sur l'interface mobile
var MAX_X_NEXTTETRIMINOS=4; // Largeur max en X des tetriminos
var NBRE_NEXTTETRIMINOS=3; // Nombre de netxtetriminos à calculer
var NBRE_TETRIMINOS=7; // Nombre de tetriminos différents dans le jeu (sans compter les pièces spéciales)
var MARGETETRIMINOS = 2; // "Margin" des tetristones en px
var COLOR = { // Couleurs des tetriminos
	TETRIMINO0: '#00FDFF', // I
	TETRIMINO1: '#FFFF00', // O
	TETRIMINO2: '#FA15FA', // T
	TETRIMINO3: '#E0872E', // L
	TETRIMINO4: '#0000FF', // J
	TETRIMINO5: '#FF0000', // Z
	TETRIMINO6: '#00FF00', // S
	TETRIMINO100: '#2B1D79', // Ancre
	GHOST: 'rgba(255,255,255,0.4)' // Pièce fantôtme
};

var REFRESHFRAMES=5; // Rafraîchissement des déplacements latéraux et rotation toutes les x requestAnimFrames - défaut: 5
var LIGNES_PAR_NIVEAU=10; // défaut: 10
var TETRISFRAMES_START=30; // Vitesse du tetris au départ - défaut: 30
var AQUA_FRAMES=3000; // défaut: 3000
var AQUA_RISQUE=8; // défaut: 8
var GHOST_LEVEL_MIN=2; // Niveau minimum avant d'avoir des pièces fantômes - défaut: 2
var GHOST_RISQUE=100; // défaut: 100
var FACTEUR_VITESSE_LEVEL=0.95; // Facteur de modification des TetrisFrames à chaque changement de niveau
var CHANGE_SIZE_LEVELS=2; // Nombre de niveaux avant d'agandir la zone de jeu

// #### Constantes DOM ####
var BODY=document.getElementsByTagName('body')[0];
var GAMEZONE=document.getElementById('gamezone');
var SIDEBAR1=document.getElementById('sidebar1');
var SIDEBAR2=document.getElementById('sidebar2');
var TOPBAR=document.getElementById('topbar');
var QUARRES=document.getElementById('quarres');
var LOGODIV=document.getElementById('logo');
var AQUA=document.getElementById('aqua');
var TETRIMINOS=document.getElementById('tetriminos');
var TIMER=document.getElementById('timer');
var PROGRESS=document.getElementById('progress');
var SCORE=document.getElementById('score');
var LINES=document.getElementById('lines');
var LEVEL=document.getElementById('level');
var MESSAGE=document.getElementById('message');
var GAME=document.getElementById('game');
var HOME=document.getElementById('home');
var NEWGAME=document.getElementById('newgame');
var PAUSE=document.getElementById('pause');

// #### variables globales du programme ####

// Variables de gestion du jeu
var EnPause=false;
var WaitPause=false;

// Tables du jeu
var Tetris=new Array(); // Pièces de Tetris dans la zone de jeu
var TetrisFall=new Array(); // Pièces en cours de chute (En bloc)
var TetrisGravity=new Array(); // Pièces en cours de chute (Individuellement) - Pas utilisé mais implémenté
var TetrisFloat=new Array(); // Pièces flottantes (AquaTetris)
var NextTetriminos=new Array(); // Liste des prochains Tetriminos
var NextPowers=new Array(NONE,NONE,NONE); // Powers relatifs aux prochains tetriminos

// Zone de jeu (Valeurs définies au lancement de la partie)
var Ratio=1; // Ratio carré de la zone de jeu -> px
var GameWidth=1; // largeur de la zone de jeu
var GameHeight=1; // Hauteur de la zone de jeu
var TetriStoneTransition=0.3; // Durée de la transition CSS pour la chute

// Jeu
var TetrisFrames=TETRISFRAMES_START; // Nombre de frames avant le prochain mouvement (Change à chaque niveau)
var Frame=0; // Frame actuelle
var Niveau=1;
var Gravity=-1; // Sens de la gravité -1: ves le bas; 1: vers le haut
var Score=0;
var Lignes=0;
var TetriSpawn=true; // Met en pause l'ajout d'un tetrimino dans la grille
var PartieFinie=true; // État de la partie
var TetriFallDontMove=true; // True si le tetrimino n'a pas pu tomber
var PowerInAction=NONE; // Le power actuellement actif (Un seul en même temps)
var InRotation=false; // True si le dernier mouvement est une rotation
var InMoveX=false; // True si le dernier mouvement est un déplacement latéral
var StartPower=NONE; // Power à démarrer à la prochaine frame
var LastNbreLignes=0; // Dernière combo de lignes (Permet de repérer les doubles-tetris)
var DeleteTetriStonesTypeNextFrame=NONE; // Contient le type de tetristones à supprimer du jeu à la prochaine frame
var InstantDown=false; // Fait descendre instantanément le tetrmino à la prochaine frame

// Contrôles claviers et touch
var LEFT_PRESSED=false;
var RIGHT_PRESSED=false;
var UP_PRESSED=false;
var DOWN_PRESSED=false;

var PreviousPos={ x:0,y:0 };
var TOUCH_ERREUR=3; // Droit de glissement pour le simple toucher
var TOUCH_TOLERANCE=5; // Tolérance pour ne pas faire un mouvement parfaitement droit
var NextTouchFrame=0;
var TOUCH_FRAMES=2; // Tester la position du touch toutes les x frames
var TOUCH_SPACE_CENTER=50;
var ROTATE_LEFT=false;
var ROTATE_RIGHT=false;

// Zone de jeu
var WINDOW={ WIDTH:0,HEIGHT:0 }; // Dimensions de la fenêtre
var ZoneHeight=0;
var AquaTime=0;
var SIDEBAR={ WIDTH:200,HEIGHT:600 }; // Dimiensions des barres latérales en mode Desktop
var TOPBARHEIGHT=0; // Hauteur de la barre pour mobile (Hauteur par défaut)
var LOGO={ WIDTH:300,HEIGHT:300 }; // Dimensions du logo central
var RESIZEMARGE=50; // Marge pour éviter que la zone de jeu soit collée au bord de la fenêtre
var MARGEGAMEZONE=50; // Marge entre la zone de jeu et les barres latérales
var PADDINGGAMEZONE=10; // Marge à l'intérieur de jeu pour éloigner le quadrillage du bord
var TotalLigneBlank=new Array();

/* ################################################################################
	Fonctions globales ou importées
*/
// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

/*
	dynamicSort(Nom de la propriété)
	Fonction de tri par propriété d'objet
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

/* ################################################################################
	Notifications
*/

/*
	sendMessage(Message à afficher,cacher après l'affichage,animer ou non,énième lettre à animer)
	Affiche un message animé à l'écran
*/
var MessageTimeOut;
function sendMessage(texte,hide,anim,nombre){
	// Valeurs par défaut
	if(hide==undefined){ hide=true; }
	if(anim==undefined){ anim=true; }
	if(nombre == undefined){ nombre=-1; }
	clearTimeout(MessageTimeOut);
	if(nombre == -1){
		MessageDiv = '';
		for(i=0;i<texte.length;i++){
			MessageDiv += '<span id="messagelettre'+i+'">'+texte[i]+'</span>';
		}
		MESSAGE.innerHTML = MessageDiv;
		MESSAGE.style.bottom = '70%';
	}
	for(i in texte){
		if(anim){
			if(i == nombre){
				document.getElementById('messagelettre'+i).style.fontSize = '3em';
			}else if(i > nombre-2 && i < nombre+2){
				document.getElementById('messagelettre'+i).style.fontSize = '2em';
			}else{
				document.getElementById('messagelettre'+i).style.fontSize = '1em';
			}
		}
	}
	nombre++;
	if(nombre <= texte.length+1){
		if(texte.length <= 10){
			var TimeOut = 100;
		}else{
			var TimeOut = 80;
		}document.getElementById('home-start').style.display = 'none';
	document.getElementById('home-end').style.display = 'block';
		MessageTimeOut = setTimeout(function(){ sendMessage(texte,hide,anim,nombre); },TimeOut);
	}else if(hide){
		MessageTimeOut = setTimeout(function(){ MESSAGE.style.bottom = '100%'; },2000);
	}
}

/* ################################################################################
	Menu
*/

/*
	afficheMenu()
	Cache la zone de jeu et affiche le menu
*/
function afficheMenu(){
	HOME.style.top = '0';
	GAME.style.top = '100%';
	PartieFinie = true;
}

/*
	nouvellePartie()
	Réinitialise l'écran d'accueil avant d'afficher le menu
*/
function nouvellePartie(){
	document.getElementById('home-start').style.display = 'block';
	document.getElementById('home-end').style.display = 'none';
	afficheMenu();
}

/*
	afficheGame()
	Cache le menu et affiche la zone de jeu
*/
function afficheGame(){
	GAME.style.top = '0';
	HOME.style.top = '-100%';
}

/* ################################################################################
	Contrôles clavier
*/

/*
	setPause()
	Mettre ou enlever la pause au jeu
	Ne peut être appelé que lorsqu'une partie est en cours
*/
function setPause(){
	if(!PartieFinie && !WaitPause){
		if(EnPause){ start321(); NEWGAME.style.top = '0'; PAUSE.innerHTML = 'II';
		}else{ EnPause = true; sendMessage(T_Pause,false); NEWGAME.style.top = '100px'; PAUSE.innerHTML = '<div>&#9654;</div>';}
	}
}

/*
	start321()
	Affiche un décompte avant de désactiver la pause
*/
function start321(){
	WaitPause=true;
	setTimeout(function(){ sendMessage('3',false,false); },400);
	setTimeout(function(){ sendMessage('2',false,false); },800);
	setTimeout(function(){ sendMessage('1',false,false); },1200);
	setTimeout(function(){ sendMessage('Go !',true,false); EnPause = false; PartieFinie = false; WaitPause=false;},1600);
}

// Détection des touches pressées
document.onkeydown = function(e) {
	switch(e.keyCode){
		case 37: // LEFT
			LEFT_PRESSED = true;
			RIGHT_PRESSED = false;
			break;
		case 39: // RIGHT
			RIGHT_PRESSED = true;
			LEFT_PRESSED = false;
			break;
		case 38: // UP
			UP_PRESSED = true;
			return false; // Empêche le scroll au clavier dans Firefox
			break;
		case 40: // DOWN
			DOWN_PRESSED = true;
			return false; // Empêche le scroll au clavier dans Firefox
			break;
		case 32: // SPACE
			InstantDown = true;
			break;
		case 27: // ESC
			setPause();
			break;
	}
};
document.onkeyup = function(e) {
	switch(e.keyCode){
		case 37: // LEFT
			LEFT_PRESSED = false;
			break;
		case 39: // RIGHT
			RIGHT_PRESSED = false;
			break;
		case 38: // UP
			UP_PRESSED = false;
			break;
		case 40: // DOWN
			DOWN_PRESSED = false;
			break;
		case 13: // ENTER
			if(PartieFinie){
				startPartie();
			}
			break;
		case 78: // N
			if(!PartieFinie){
				nouvellePartie();
				EnPause = true;
			}
			break;
	}
};

/* ################################################################################
	Contrôles tactiles
*/

// Ajout des EventListener pour les contrôles tactiles
document.addEventListener("touchstart", touchDown, false);
document.addEventListener("touchmove", touchMove, true);
document.addEventListener("touchend", touchUp, false);
document.body.addEventListener("touchcancel", touchUp, false);

/*
	touchDown(event)
	Réagit aux apppuis sur l'écran --> rotation
*/
function touchDown(e){
	if(!LEFT_PRESSED && !RIGHT_PRESSED && !DOWN_PRESSED){
		if(e.targetTouches[0].pageX < WINDOW.WIDTH/2-TOUCH_SPACE_CENTER){
			ROTATE_LEFT = true;
			ROTATE_RIGHT = false;
		}else if(e.targetTouches[0].pageX > WINDOW.WIDTH/2+TOUCH_SPACE_CENTER){
			ROTATE_RIGHT = true;
			ROTATE_LEFT = false;
		}else{
			ROTATE_LEFT = false;
			ROTATE_RIGHT = false;
		}
	}
	return false;
}

/*
	touchMove(event)
	Réagit au swipe --> déplacements latéraux
*/
function touchMove(e){
	if(e.targetTouches[0].pageY < PreviousPos.y+TOUCH_TOLERANCE && e.targetTouches[0].pageY > PreviousPos.y-TOUCH_TOLERANCE){
		if(e.targetTouches[0].pageX > PreviousPos.x+TOUCH_ERREUR){ // Swipe vers la droite
			RIGHT_PRESSED = true;
			LEFT_PRESSED = false;
		}else if(e.targetTouches[0].pageX < PreviousPos.x-TOUCH_ERREUR){ // Swipe vers la gauche
			LEFT_PRESSED = true;
			RIGHT_PRESSED = false;
		}else{
			LEFT_PRESSED = false;
			RIGHT_PRESSED = false;
		}
	}else{
		LEFT_PRESSED = false;
		RIGHT_PRESSED = false;
	}
	if(e.targetTouches[0].pageX < PreviousPos.x+TOUCH_TOLERANCE && e.targetTouches[0].pageX > PreviousPos.x-TOUCH_TOLERANCE){
		if(e.targetTouches[0].pageY > PreviousPos.y+TOUCH_ERREUR){ // Swipe vers le bas
			DOWN_PRESSED = true;
		}else{
			DOWN_PRESSED = false;
		}
	}else{
		DOWN_PRESSED = false;
	}
	PreviousPos.x = e.targetTouches[0].pageX;
	PreviousPos.y = e.targetTouches[0].pageY;
}

/*
	touchUp()
	Annule tous les appuis
*/
function touchUp(){
	LEFT_PRESSED = false;
	RIGHT_PRESSED = false;
	DOWN_PRESSED = false;
	ROTATE_LEFT = false;
	ROTATE_RIGHT = false;
}

/* ################################################################################
	Traitement sur les tetriminos et TetriStones
*/

/*
	Objet TetriStone
	Pour créer un carré de tetrimino
*/
function TetriStone(Couleur,PosX,PosY,Type){
	if(Type == undefined){ Type=NORMAL; }
	if(Type == GHOST){ Couleur = COLOR.GHOST; }
	this.Couleur = Couleur;
	this.x = PosX;
	this.y = PosY;
	this.Type = Type;
}

/*
	createTetriDiv(Emplacement,ID,Couleur)
	Vérifie si une div "TetriStone" existe dans la DOM et la créé si nécessaire avec les paramètres donnés
*/
function createTetriDiv(emplacement,id,couleur){
	if(document.getElementById(id) == null){
		var newdiv = document.createElement('div');
		emplacement.appendChild(newdiv).setAttribute('id',id);
		var newdiv2 = document.createElement('div');
		document.getElementById(id).appendChild(newdiv2);
		document.getElementById(id).setAttribute('class', 'tetrimino');
		document.getElementById(id).style.webkitTransition = TetriStoneTransition+'s';
		document.getElementById(id).style.transition = TetriStoneTransition+'s';
		document.getElementById(id).style.background = couleur;
	}
}

/*
	drawTetriStone(ID du div,Couleur,Position X,Position Y)
	Modifie les propriétés de la TetriStone correspondant à ID
*/
function drawTetriStone(id,posX,posY){
	document.getElementById(id).style.left = posX*Ratio+(GameWidth/2-1)*Ratio+MARGETETRIMINOS+'px';
	document.getElementById(id).style.top = (GameHeight-posY-1)*Ratio+MARGETETRIMINOS+'px';
	document.getElementById(id).style.width = Ratio-MARGETETRIMINOS*2+'px';
	document.getElementById(id).style.height = Ratio-MARGETETRIMINOS*2+'px';
	document.getElementById(id).style.borderRadius = Ratio/10+'px';
}

/*
	drawNextTetriStone(ID du div,couleur,Position X,Position Y)
	Modifie les propriétés d'une NextTetrisStone correspondant à ID
*/
function drawNextTetriStone(id,Background,posX,posY){
	document.getElementById(id).style.left = posX*TAILLE_NEXTTETRIMINOS+'px';
	document.getElementById(id).style.top = (MAX_X_NEXTTETRIMINOS-posY)*TAILLE_NEXTTETRIMINOS+'px';
	document.getElementById(id).style.width = TAILLE_NEXTTETRIMINOS-MARGETETRIMINOS*2+'px';
	document.getElementById(id).style.height = TAILLE_NEXTTETRIMINOS-MARGETETRIMINOS*2+'px';
	document.getElementById(id).style.borderRadius = TAILLE_NEXTTETRIMINOS/10+'px';
}

/*
	drawTetriminos()
	Dessine dans la zone de jeu les TetriStones des tableaux de jeu
	Créé les pièces si elles n'existent pas et les modifie si elles existent
*/
function drawTetriminos(){
	for(i in Tetris){
		createTetriDiv(TETRIMINOS,'tetrimino-'+i,Tetris[i].Couleur);
		drawTetriStone('tetrimino-'+i,Tetris[i].x,Tetris[i].y);
	}
	for(i in TetrisFall){
		createTetriDiv(TETRIMINOS,'tetriminofall-'+i,TetrisFall[i].Couleur);
		drawTetriStone('tetriminofall-'+i,TetrisFall[i].x,TetrisFall[i].y);
	}
	for(i in TetrisGravity){
		createTetriDiv(TETRIMINOS,'tetriminogravity-'+i,TetrisGravity[i].Couleur);
		drawTetriStone('tetriminogravity-'+i,TetrisGravity[i].x,TetrisGravity[i].y);
	}
	for(i in TetrisFloat){
		createTetriDiv(TETRIMINOS,'tetriminofloat-'+i,TetrisFloat[i].Couleur);
		drawTetriStone('tetriminofloat-'+i,TetrisFloat[i].x,TetrisFloat[i].y);
	}
}

/*
	clearGameZone()
	Vide la zone de jeu, pour supprimer les tetrisones de la DOM et rétablir les ID
*/
function clearGameZone(){
	TETRIMINOS.innerHTML = '';
}

/*
	drawNextTetriminos()
	Actualise la liste des prochains tetriminos
*/
function drawNextTetriminos(){
	for(i=0;i<NBRE_NEXTTETRIMINOS;i++){
		document.getElementById('nexttetrimino-'+i).innerHTML = "";
		for(j=0;j<NextTetriminos[i].length;j++){
			createTetriDiv(document.getElementById('nexttetrimino-'+i),'nexttetrimino-'+i+'-'+j,NextTetriminos[i][j].Couleur);
			drawNextTetriStone('nexttetrimino-'+i+'-'+j,NextTetriminos[i][j].Couleur,NextTetriminos[i][j].x,NextTetriminos[i][j].y);
		}
	}
}

/*
	getTetrimino(ID du tetrimino, Type du tetrimino = NORMAL)
	Retourne un tableau contenant les TetriStones d'un tetrimino
*/
function getTetrimino(id,Type){
	if(Type == undefined){ Type=NORMAL; }
	New = new Array();
	switch(id){
		case 0: // I
		New.push(new TetriStone(COLOR.TETRIMINO0,0,2,Type));
		New.push(new TetriStone(COLOR.TETRIMINO0,0,1,Type));
		New.push(new TetriStone(COLOR.TETRIMINO0,0,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO0,0,-1,Type));
		break;
		case 1: // O
		New.push(new TetriStone(COLOR.TETRIMINO1,0,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO1,0,1,Type));
		New.push(new TetriStone(COLOR.TETRIMINO1,1,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO1,1,1,Type));
		break;
		case 2: // T
		New.push(new TetriStone(COLOR.TETRIMINO2,-1,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO2,0,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO2,1,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO2,0,1,Type));
		break;
		case 3: // L
		New.push(new TetriStone(COLOR.TETRIMINO3,0,1,Type));
		New.push(new TetriStone(COLOR.TETRIMINO3,0,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO3,0,-1,Type));
		New.push(new TetriStone(COLOR.TETRIMINO3,1,-1,Type));
		break; // J
		case 4:
		New.push(new TetriStone(COLOR.TETRIMINO4,0,1,Type));
		New.push(new TetriStone(COLOR.TETRIMINO4,0,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO4,0,-1,Type));
		New.push(new TetriStone(COLOR.TETRIMINO4,-1,-1,Type));
		break;
		case 5: // Z
		New.push(new TetriStone(COLOR.TETRIMINO5,0,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO5,0,-1,Type));
		New.push(new TetriStone(COLOR.TETRIMINO5,1,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO5,1,1,Type));
		break;
		case 6: // S
		New.push(new TetriStone(COLOR.TETRIMINO6,0,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO6,0,-1,Type));
		New.push(new TetriStone(COLOR.TETRIMINO6,-1,0,Type));
		New.push(new TetriStone(COLOR.TETRIMINO6,-1,1,Type));
		break;
		/*// Pièces spéciales, ne sont pas utilisées
		case 100: // Ancre
		New.push(new TetriStone(COLOR.TETRIMINO100,0,-1));
		New.push(new TetriStone(COLOR.TETRIMINO100,0,0));
		New.push(new TetriStone(COLOR.TETRIMINO100,0,1));
		New.push(new TetriStone(COLOR.TETRIMINO100,0,2));
		New.push(new TetriStone(COLOR.TETRIMINO100,-1,2));
		New.push(new TetriStone(COLOR.TETRIMINO100,-2,1));
		New.push(new TetriStone(COLOR.TETRIMINO100,1,2));
		New.push(new TetriStone(COLOR.TETRIMINO100,2,1));
		break;*/
	}
	return New;
}

/*
	getRandomTetrimino()
	Retourne un Tetrimino aléatoirement
*/
function getRandomTetrimino(){
	var NombreHasard;
	var Type = NORMAL;
	do{
		NombreHasard = Math.floor(Math.random()*NBRE_TETRIMINOS);
	}while(NombreHasard > NBRE_TETRIMINOS-1);
	if(PowerInAction == NONE && StartPower == NONE){
		if(Niveau >= GHOST_LEVEL_MIN && Math.floor(Math.random()*GHOST_RISQUE) == 0){
			Type = GHOST;
			NextPowers[NBRE_NEXTTETRIMINOS-1] = GHOSTPOWER;
		}
	}
	return getTetrimino(NombreHasard,Type);
}

/*
	MoveTetrimino(Déplacement X,Déplacement Y,Tableau de TetriStones)
	Retourne un tableau avec les TetriStones déplacées
*/
function moveTetriminos(posX,posY,table){
	var Table2 = new Array();
	for(i in table){
		Table2.push(new TetriStone(table[i].Couleur,table[i].x+posX,table[i].y+posY,table[i].Type));
	}
	return Table2;
}

/*
	getNbreTetriminosFromCentre(Comparer sur 'X' ou 'Y',Centre pour comparer,Tableau de TetriStones)
	Retourne le nombre de TetriStones par rapport au centre et à la dimension choisie (X ou Y)
*/
function getNbreTetriminosFromCentre(XouY,centre,table){
	var Nbre = 0;
	for(i in table){
		if(XouY == X){
			if(table[i].x > centre){
				Nbre++;
			}else{
				Nbre--;
			}
		}else{
			if(table[i].y > centre){
				Nbre++;
			}else{
				Nbre--;
			}
		}
	}
	return Nbre;
}

/*
	rotateTetriminos(Angle de rotation,Tableau de Tetriminos)
	Détermine le centre des tetriminos du tableau, fait tourner les pièces de 90deg et retourne le nouveau tableau
	Angle: 1 ou -1
*/
function rotateTetriminos(angle,table){
	var MaxX = DEFAULT;
	var MinX = DEFAULT;
	var MaxY = DEFAULT;
	var MinY = DEFAULT;
	for(i in table){
		if(table[i].x > MaxX || MaxX == DEFAULT){
			MaxX = table[i].x;
		}
		if(table[i].x < MinX || MinX == DEFAULT){
			MinX = table[i].x;
		}
		if(table[i].y > MaxY || MaxY == DEFAULT){
			MaxY = table[i].y;
		}
		if(table[i].y < MinY || MinY == DEFAULT){
			MinY = table[i].y;
		}
	}
	CenterX = (MinX+MaxX)/2;
	CenterY = (MinY+MaxY)/2;
	if(CenterX != Math.floor(CenterX)){
		if(getNbreTetriminosFromCentre(X,CenterX,table) > 0){
			CenterX = Math.ceil(CenterX);
		}else{
			CenterX = Math.floor(CenterX);
		}
	}
	if(CenterY != Math.floor(CenterY)){
		if(getNbreTetriminosFromCentre(Y,CenterY,table) > 0){
			CenterY = Math.ceil(CenterY);
		}else{
			CenterY = Math.floor(CenterY);
		}
	}
	var Table2 = new Array();
	for(i in table){
		var NewX = (table[i].y-CenterY)*angle+CenterX;
		var NewY = (table[i].x-CenterX)*angle*-1+CenterY;
		Table2.push(new TetriStone(table[i].Couleur,NewX,NewY,table[i].Type));
	}
	return Table2;
}

/* ################################################################################
	Gestion de l'interface et de la zone de jeu
*/

/*
	resizeWindow()
	Calcule la nouvelle taille de la fenêtre et appelle resizeGameZone()
*/
function resizeWindow(){
	WINDOW.WIDTH = window.innerWidth;
	WINDOW.HEIGHT = window.innerHeight;
	BODY.style.width = WINDOW.WIDTH+'px';
	BODY.style.height = WINDOW.HEIGHT+'px';
	// Si on est en mode mobile
	if(WINDOW.WIDTH <= 800){
		SIDEBAR = { WIDTH: 0, HEIGHT: 0 };
		RESIZEMARGE = 10;
		MARGEGAMEZONE = 0;
		TOPBARHEIGHT = 80;
		TAILLE_NEXTTETRIMINOS = TAILLE_NEXTTETRIMINOS_MOBILE;
	}
	resizeGameZone();
}

// On appelle resizeWindow() au redimensionnement manuel de la fenêtre
// Attention si on passe des dimensions mobiles à Desktop ou inversément un refresh de la page est nécessaire
window.onresize = resizeWindow;

/*
	resizegameZone()
	Adapte les éléments de la zone de jeu à l'écran et force le dessin des tetriminos avec les nouvelles dimensions
*/
function resizeGameZone(){
	// Définit si la fenêtre est plus large que haute selon les dimensions de la zone jeu ainsi que les barres latérales
	if((WINDOW.WIDTH-RESIZEMARGE*4-SIDEBAR.WIDTH*2)/GameWidth < (WINDOW.HEIGHT-RESIZEMARGE*3-TOPBARHEIGHT)/GameHeight){
		Ratio = (WINDOW.WIDTH-RESIZEMARGE*4-SIDEBAR.WIDTH*2)/GameWidth;
	}else{
		Ratio = (WINDOW.HEIGHT-RESIZEMARGE*3-TOPBARHEIGHT)/GameHeight;
	}
	GAMEZONE.style.width = GameWidth*Ratio+PADDINGGAMEZONE*2+'px';
	GAMEZONE.style.height = GameHeight*Ratio+PADDINGGAMEZONE*2+'px';
	if(TOPBARHEIGHT > 0){
		TOPBAR.style.width = GameWidth*Ratio+PADDINGGAMEZONE*2+'px';
	}
	
	TETRIMINOS.style.top = PADDINGGAMEZONE+'px';
	TETRIMINOS.style.left = PADDINGGAMEZONE+'px';
	
	QUARRES.style.width = (GameWidth-1)*Ratio+'px';
	QUARRES.style.height = (GameHeight-1)*Ratio+'px';
	QUARRES.style.backgroundSize = Ratio+'px';
	
	QUARRES.style.top = PADDINGGAMEZONE+Ratio/2+'px';
	QUARRES.style.left = PADDINGGAMEZONE+Ratio/2+'px';
	
	LOGODIV.style.top = (GameHeight*Ratio+PADDINGGAMEZONE*2-LOGO.HEIGHT)/2+'px';
	LOGODIV.style.left = (GameWidth*Ratio+PADDINGGAMEZONE*2-LOGO.WIDTH)/2+'px';
	
	if(TOPBARHEIGHT == 0){
		SIDEBAR1.style.top = MARGEGAMEZONE+TOPBARHEIGHT+'px';
		SIDEBAR2.style.top = MARGEGAMEZONE+TOPBARHEIGHT+'px';
		SIDEBAR1.style.left = (WINDOW.WIDTH-GameWidth*Ratio-PADDINGGAMEZONE*2)/2-(SIDEBAR.WIDTH+MARGEGAMEZONE)+'px';
		SIDEBAR2.style.left = (WINDOW.WIDTH-GameWidth*Ratio-PADDINGGAMEZONE*2)/2+GameWidth*Ratio+PADDINGGAMEZONE*2+MARGEGAMEZONE+'px';
	}
	GAMEZONE.style.top = MARGEGAMEZONE+TOPBARHEIGHT+'px';
	GAMEZONE.style.left = (WINDOW.WIDTH-GameWidth*Ratio-PADDINGGAMEZONE*2)/2+'px';
	if(TOPBARHEIGHT > 0){
		TOPBAR.style.left = (WINDOW.WIDTH-GameWidth*Ratio-PADDINGGAMEZONE*2)/2+'px';
	}
	
	drawTetriminos();
	
	AQUA.style.width = (GameWidth*Ratio+PADDINGGAMEZONE*2)*2+'px';
	AQUA.style.height = (GameHeight*Ratio+PADDINGGAMEZONE*2)*2+'px';
	ZoneHeight = GameHeight*Ratio+PADDINGGAMEZONE*2;
	if(AquaTime != 0){
		AQUA.style.top = ZoneHeight+'px';
	}
}

/*
	changeGameSize(Largeur,Hauteur)
	Modifie la taille de la grille de jeu puis force le redimensionnement des éléments
*/
function changeGameSize(Width, Height){
	GameWidth = Width;
	GameHeight = Height;
	resizeGameZone();
	drawTetriminos();
	// Recréé le tableau modèle TotalLigneBlank[] avec le nouveau nombre de lignes
	TotalLigneBlank = new Array();
	for(i=0;i<GameHeight;i++){
		TotalLigneBlank.push(0);
	}
}

/* ################################################################################
	Méchanismes de jeu
*/

/*
	startPartie()
	(Ré-)Initilise toutes les variables puis démarre une partie
*/
function startPartie(){
	Tetris = new Array();
	TetrisFall = new Array();
	TetrisGravity = new Array();
	TetrisFloat = new Array();
	NextTetriminos = new Array();
	NextPowers[0] = NONE;
	NextPowers[1] = NONE;
	NextPowers[2] = NONE;

	TetrisFrames=TETRISFRAMES_START;
	Frame=0;
	Niveau=1;
	Gravity=-1;
	Score=0;
	Lignes=0;
	TetriSpawn=true;
	PartieFinie=true;
	WaitPause=false;
	PowerInAction=NONE;
	StartPower=NONE;
	
	TETRIMINOS.innerHTML = '';
	document.getElementById('nexttetrimino-0').innerHTML = '';
	document.getElementById('nexttetrimino-1').innerHTML = '';
	document.getElementById('nexttetrimino-2').innerHTML = '';
	NEWGAME.style.top = '0';
	MESSAGE.style.bottom = '100%';
	SCORE.innerHTML = '0';
	LINES.innerHTML = '0';
	LEVEL.innerHTML = '1';
	
	changeGameSize(8,10); // 8 - 10
	tirerNextTetriminos();
	drawNextTetriminos();
	
	setTimeout(function(){ afficheGame(); },500);
	setTimeout(function(){ start321(); },1500);
}

/*
	finPartie()
	Met fin à la partie. Est appelée par Game()
*/
function finPartie(){
	PartieFinie = true;
	sendMessage(T_GameOver,false);
	document.getElementById('home-start').style.display = 'none';
	document.getElementById('home-end').style.display = 'block';
	document.getElementById('scorefinal').innerHTML = Score;
	document.getElementById('linesfinal').innerHTML = Lignes;
	document.getElementById('levelfinal').innerHTML = Niveau;
	
	HighScores = getScores();
	MonScore = new HighScore(Score,new Date(),PlayerName);
	
	if(Score > HighScores[9].Points){
		HighScores.push(MonScore);
		setScores();
		HighScores = getScores();
	}
	
	buildTableauHighScores();
	
	setTimeout(function(){ afficheMenu(); },3000);
}

/*
	startAqua()
	Démarre le mode innondation
*/
function startAqua(){
	TetriSpawn = false;
	TetriSpawnWait = GameHeight-Tetris[Tetris.length-1].y;
	AQUA.style.top = '0';
	Gravity = 1;
	AquaTime = Frame+AQUA_FRAMES;
	TetrisFloat = Tetris;
	Tetris = new Array();
	clearGameZone();
	PowerInAction = AQUAPOWER;
}

/*
	sortGravity(Tableau de TetriStones)
	Classe un tableau selon la propriété y des objets et selon la gravité actuelle
	Utilisé pour le tableau TetrisGravity
	Retourne un tableau de TetriStones
*/
function sortGravity(Table){
	var Table2 = new Array();
	if(Gravity < 0){
		Table2 = Table.sort(dynamicSort('y'));
	}else{
		Table2 = Table.sort(dynamicSort('-y'));
	}
	return Table2;
}

/*
	deleteTetriStonesType(Tableau de tetristones, Type à supprimer)
	Supprime tous les tetriminos du type donné et retourne le tableau nettoyé
*/
function deleteTetriStonesType(table,typ){
	var Table2 = new Array();
	for(i in table){
		if(table[i].Type != typ){
			Table2.push(new TetriStone(table[i].Couleur,table[i].x,table[i].y,table[i].Type));
		}
	}
	return Table2;
}

/*
	isTetriminoInZone(Tableau de TetriStones)
	Vérifie si les tetriminos de la liste sont dans les limites de la zone de jeu
	Retourne vrai ou faux
*/
function isTetriminoInZone(Table){
	var Valide = true;
	var MinY, MaxY;
	if(Gravity < 0){
		MinY = 0;
		MaxY = GameHeight+4;
	}else{
		MinY = -5;
		MaxY = GameHeight-1;
	}
	for(i in Table){
		if(Table[i].x > Math.floor(GameWidth/2) || Table[i].x < -Math.floor(GameWidth/2)+1 || Table[i].y < MinY || Table[i].y > MaxY){
			Valide = false;
			break;
		}
	}
	return Valide;
}

/*
	isTetriminoFree(Tableau de TetriStones,Tester avec le tableau Gravity)
	Teste si les tetriminos du tableau ne sont pas aux positions des tetriminos des tableaux Tetris[] (et TetrisGravity[] si activé)
	Retourne vrai si possible ou faux si impossible
*/
function isTetriminoFree(Table){
	var Peut = true;
	if(isTetriminoInZone(Table)){
		if(PowerInAction == GHOSTPOWER){
			Peut = true;
		}else{
			for(i in Table){
				for(j in Tetris){
					if(Tetris[j].x == Table[i].x && Tetris[j].y == Table[i].y){
						Peut = false;
						break;
					}
				}
				for(j in TetrisGravity){
					if(TetrisGravity[j].x == Table[i].x && TetrisGravity[j].y == Table[i].y){
						Peut = false;
						break;
					}
				}
			}
		}
	}else{
		Peut = false;
	}
	return Peut;
}

/*
	supprimeLigne(Numéro de ligne,Tableau de TetriStones,Sens de gravité)
	Supprime une ligne de Tetristones et descend les lignes supérieurs d'une unité selon la gravité indiquée
	Retourne un tableau de TetriStones
*/
function supprimeLigne(Ligne,Table,Gravity){
	Table2 = new Array();
	for(i in Table){
		if(Table[i].y > Ligne){
			if(Gravity < 0){
				Table2.push(new TetriStone(Table[i].Couleur,Table[i].x,Table[i].y-1,Table[i].Type));
			}else{
				Table2.push(new TetriStone(Table[i].Couleur,Table[i].x,Table[i].y,Table[i].Type));
			}
		}else if(Table[i].y < Ligne){
			if(Gravity < 0){
				Table2.push(new TetriStone(Table[i].Couleur,Table[i].x,Table[i].y,Table[i].Type));
			}else{
				Table2.push(new TetriStone(Table[i].Couleur,Table[i].x,Table[i].y+1,Table[i].Type));
			}
		}
	}
	return Table2;
}

/*
	tirerNextTetriminos()
	Ajoute des NextTetriminos au hasard si il y a moins de 3 prochains tetriminos
*/
function tirerNextTetriminos(){
	while(NextTetriminos.length <= NBRE_NEXTTETRIMINOS){
		NextTetriminos.push(getRandomTetrimino(Niveau));
	}
}

/*
	Game()
	Boucle principale du jeu
	Automatiquement rappelée avec requestAnimFrame()
*/
function Game(){
	if(!EnPause && !PartieFinie){
		Frame++;
		// Déplacement du tetrimino
		if(Frame % REFRESHFRAMES == 0){
			// Suppression des pièces spéciales sur demande
			if(DeleteTetriStonesTypeNextFrame != NONE){
				Tetris = deleteTetriStonesType(Tetris,DeleteTetriStonesTypeNextFrame);
				DeleteTetriStonesTypeNextFrame = NONE;
				clearGameZone();
			}
			// Rotation
			if(UP_PRESSED || ROTATE_LEFT || ROTATE_RIGHT){
				var Angle = 1;
				if(ROTATE_LEFT){
					Angle = -1;
				}
				if(isTetriminoFree(rotateTetriminos(Angle,TetrisFall))){
					TetrisFall = rotateTetriminos(Angle,TetrisFall);
					TetriFallDontMove = false;
					InRotation = true;
					UP_PRESSED = false;
					ROTATE_LEFT = false;
					ROTATE_RIGHT = false;
				}
			}
			// Gauche-Droite
			NextPositionX = 0;
			var MoveX = false;
			if(LEFT_PRESSED){
				NextPositionX = -1;
				MoveX = true;
			}
			if(RIGHT_PRESSED){
				NextPositionX = 1;
				MoveX = true;
			}
			if(MoveX){
				if(isTetriminoFree(moveTetriminos(NextPositionX,0,TetrisFall))){
					TetrisFall = moveTetriminos(NextPositionX,0,TetrisFall);
					TetriFallDontMove = false;
					InMoveX = true;
				}
			}
		}
		// Chute des tetriminos et tests
		if(Frame % Math.floor(TetrisFrames) == 0 || (DOWN_PRESSED && Frame % Math.floor(TetrisFrames/5) == 0)){
			// Création d'une nouvelle pièce
			if(TetrisFall.length<1 && TetriSpawn){
				if(NextPowers[0] == GHOSTPOWER){
					sendMessage(T_Ghost);
					PowerInAction = GHOSTPOWER;
				}
				NextPowers[0] = NextPowers[1];
				NextPowers[1] = NextPowers[2];
				NextPowers[2] = NONE;
				tirerNextTetriminos();
				var PositionDepart;
				if(Gravity < 0){
					PositionDepart = GameHeight+1;
				}else{
					PositionDepart = -2;
				}
				TetrisFall = moveTetriminos(0,PositionDepart,NextTetriminos[0]);
				TetriFallDontMove = true;
				NextTetriminos.shift();
				drawNextTetriminos();
			}
			// Gravity
			if(TetrisGravity.length > 0){
				var i=0;
				while(i<TetrisGravity.length){
					var TetriTable = new Array();
					TetriTable.push(new TetriStone(TetrisGravity[i].Couleur,TetrisGravity[i].x,TetrisGravity[i].y+Gravity,TetrisGravity[i].Type));
					if(isTetriminoFree(TetriTable)){
						TetrisGravity[i].y += Gravity;
						i++;
					}else{
						Tetris.push(new TetriStone(TetrisGravity[i].Couleur,TetrisGravity[i].x,TetrisGravity[i].y,TetrisGravity[i].Type));
						TetrisGravity.splice(i,1);
						clearGameZone();
					}
				}
			}
			// Float
			if(TetrisFloat.length > 0){
				if(isTetriminoInZone(moveTetriminos(0,Gravity,TetrisFloat))){
					TetrisFloat = moveTetriminos(0,Gravity,TetrisFloat);
				}else{
					Tetris = Tetris.concat(TetrisFloat);
					TetrisFloat = new Array();
					TetriSpawn = true;
				}
			}
			// Chute instantanée
			if(InstantDown){
				InstantDown = false;
				while(isTetriminoFree(moveTetriminos(0,Gravity,TetrisFall))){
					TetrisFall = moveTetriminos(0,Gravity,TetrisFall);
					TetriFallDontMove = false;
					Score += Niveau;
					InMoveX = false;
					InRotation = false;
				}
			}
			// Chute
			if(isTetriminoFree(moveTetriminos(0,Gravity,TetrisFall))){
				TetrisFall = moveTetriminos(0,Gravity,TetrisFall);
				TetriFallDontMove = false;
				if(DOWN_PRESSED){
					Score += Niveau;
				}
			}else if(!InMoveX && !InRotation){
				if(TetriFallDontMove){
					finPartie();
				}
				if(PowerInAction == GHOSTPOWER){
					PowerInAction = NONE;
					for(i in TetrisFall){
						var PieceSolitaire = new Array();
						PieceSolitaire.push(TetrisFall[i]);
						if(isTetriminoFree(PieceSolitaire)){
							Tetris.push(TetrisFall[i]);
						}
					}
					DeleteTetriStonesTypeNextFrame = GHOST;
				}else{
					Tetris = Tetris.concat(TetrisFall);
				}
				TetrisFall = new Array();
				clearGameZone();
			}
			// Réinitialisation des variables de test
			InRotation = false;
			InMoveX = false;
			// Vérif des lignes
			var TotalLigne = TotalLigneBlank.slice(0);
			for(i in Tetris){
				TotalLigne[Tetris[i].y] += 1;
			}
			var NbreLignes = 0;
			for(i=TotalLigne.length-1;i>=0;i--){
				if(TotalLigne[i] >= GameWidth){
					Tetris = supprimeLigne(i,Tetris,Gravity);
					NbreLignes++;
					clearGameZone();
				}
			}
			if(NbreLignes > 0){
				Lignes += NbreLignes;
				var LignesToScore = NbreLignes;
				if(LastNbreLignes == 4 && NbreLignes == 4){
					LignesToScore = 8;
				}
				LastNbreLignes = NbreLignes;
				switch(LignesToScore){
					case 1: Score+=40*Niveau; break;
					case 2: Score+=100*Niveau; break;
					case 3: Score+=300*Niveau; break;
					case 4: Score+=1200*Niveau; sendMessage('Tetris !'); break;
					case 8: Score+=4000*Niveau; sendMessage('Mega-Tetris !'); break;
				}
				if(Lignes / LIGNES_PAR_NIVEAU >= Niveau){
					Niveau++;
					TetrisFrames*=FACTEUR_VITESSE_LEVEL;
					// Si on a atteint un niveau où la taille de jeu doit changer
					if(Niveau%CHANGE_SIZE_LEVELS==1){
						changeGameSize(GameWidth+2,GameHeight+1);
					}
					// Si l'AquaPower est choisi
					if(Math.floor(Math.random()*AQUA_RISQUE) == 0){
						startAqua();
					}
					sendMessage(T_Level+' '+Niveau+' !');
					// Nouveau temps de transition CSS
					TetriStoneTransition = Math.round(10/11*TetrisFrames)/100;
				}
			}
			// Si on a dépassé la durée de l'AquaPower et que plus aucun Tetrimino ne tombe,
			// on fait retomber les tetriminos en les plaçant dans le tableau TetrisFloat
			if(Frame >= AquaTime && AquaTime != 0 && TetrisFall.length < 1){
				TetriSpawn = false;
				AquaTime = 0;
				AQUA.style.top = ZoneHeight+'px';
				Gravity = -1;
				TetrisFloat = Tetris;
				Tetris = new Array();
				clearGameZone();
				PowerInAction = NONE;
			}
			// Si l'AquaPower est en cours, on affiche la barre de temps
			if(PowerInAction == AQUAPOWER){
				TIMER.style.bottom = '0';
				if(AquaTime >= Frame){
					PROGRESS.style.width = ((AquaTime-Frame)/AQUA_FRAMES)*100+'%';
				}
			}else{
				TIMER.style.bottom = '-30px';
				PROGRESS.style.width = '100%';
			}
			// Affichage du score
			SCORE.innerHTML = Score;
			LINES.innerHTML = Lignes;
			LEVEL.innerHTML = Niveau;
		} // End of frame
		drawTetriminos();
	}
	requestAnimFrame(Game);
}

/* ################################################################################
	Inititialisation des fonctions
*/
resizeWindow();
Game();

// THE END
