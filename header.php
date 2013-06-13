<?php
	session_start();
	
	if(isset($_GET['lang'])){
		switch($_GET['lang']){
			case 'fr': $_SESSION['lang'] = 'fr'; break;
			case 'de': $_SESSION['lang'] = 'de'; break;
			case 'it': $_SESSION['lang'] = 'it'; break;
			case 'en': $_SESSION['lang'] = 'en'; break;
		}
	}
	
	if(!isset($_SESSION['lang'])){
		switch(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2)){
			case 'fr': $_SESSION['lang'] = 'fr'; break;
			case 'de': $_SESSION['lang'] = 'de'; break;
			case 'it': $_SESSION['lang'] = 'it'; break;
			default: $_SESSION['lang'] = 'en'; break;
		}
	}
	
	include('./lang/fr.php');
	switch($_SESSION['lang']){
		case 'de': include('./lang/de.php'); break;
		case 'it': include('./lang/it.php'); break;
		case 'en': include('./lang/en.php'); break;
	}
?>
<!doctype html>
<html>
<head>
	<!--
		Subsea Tetris
		© Clark Winkelmann 2013
	-->
	<meta charset="utf-8" />
	<title>SubSea Tetris<?php
		if(isset($page)){
			echo " | ".${$page};
		}
	?></title>
	<link rel="icon" type="image/png" href="./img/favicon.png"/>
	<!-- Styles -->
	<link rel="stylesheet" type="text/css" href="css/style.css"/>
	<link rel="stylesheet" type="text/css" href="css/mobile.css" media="only screen and (max-width: 800px)"/>
	<?php if(isset($home)){ echo "<!-- Mobile styles -->
	<link rel=\"stylesheet\" type=\"text/css\" href=\"css/game.css\"/>
	<link rel=\"stylesheet\" type=\"text/css\" href=\"css/gamemobile.css\" media=\"only screen and (max-width: 800px)\"/>"; } ?>

	<!-- Prevent zoom on mobile browsers-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
</head>
<body>
	<noscript>
		<div id="nojs"><?php echo $T_NoJS; ?></div>
	</noscript>
	<a href="http://projects.bugnplay.ch/bugnplay/library/project.php?project=2013038" target="blank" title="<?php echo $T_BugnPlay; ?>" class="signet"><?php echo $T_BugnPlay; ?><img src="./img/logo_bugnplay.png" alt="BugnPlay"/></a>
	<div id="desktop"></div>
	<div id="ground">
		<div id="plantes"></div>
	</div>
	<div id="water"></div>
