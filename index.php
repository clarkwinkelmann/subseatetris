<?php
	$home = true;
	include("header.php");
?>
<script type="text/javascript" >
	var T_Pause = "<?php echo $T_Pause; ?>";
	var T_Level = "<?php echo $T_Level; ?>";
	var T_GameOver = "<?php echo $T_GameOver; ?>";
	var T_Ghost = "<?php echo $T_Ghost; ?>";
	var T_AquaTetris = "<?php echo $T_AquaTetris; ?>";
	var Mois = <?php echo $T_Months; ?>;
	var T_NoScore = "<?php echo $T_NoScore; ?>";
	var T_Player = "<?php echo $T_Player; ?>";
	var T_Score = "<?php echo $T_Score; ?>";
	var T_Date = "<?php echo $T_Date; ?>";
	var T_ChangeName = "<?php echo $T_ChangeName; ?>";
	var T_ChangeNameBulle = "<?php echo $T_ChangeNameBulle; ?>";
	var T_OK = "<?php echo $T_OK; ?>";
	var T_Me = "<?php echo $T_Me; ?>";
</script>
	<div id="game">
		<div id="gamezone">
			<div id="logo"></div>
			<div id="quarres"></div>
			<div id="tetriminos"></div>
			<div id="aqua"></div>
			<div id="timer">
				<div id="progress"></div>
			</div>
		</div>
		<div id="topbar">
			<div id="pause" onclick="setPause()">II</div>
			<div id="sidebar1">
				<p id="pscore"><?php echo $T_Score; ?>: <span id="score">0</span></p>
				<p id="plines"><?php echo $T_Lines; ?>: <span id="lines">0</span></p>
				<p id="plevel" class="desktop-only"><?php echo $T_Level; ?>: <span id="level">1</span></p>
			</div>
			<div id="sidebar2">
				<div id="nextzone"></div>
				<div id="nexttetrimino-0"></div>
				<div id="nexttetrimino-1"></div>
				<div id="nexttetrimino-2"></div>
			</div>
		</div>
		<div id="message"></div>
		<div id="newgame">
			<p onclick="nouvellePartie()" class="bigbutton desktop-only"><?php echo $T_NewGame; ?></p>
		</div>
	</div>
	<div id="home">
		<div id="content">
<?php include("menu.php"); ?>
			<div id="home-start"> 
				<div class="mibloc paddingtop desktop-only">
					<img src="./img/logo400.png" alt="Logo SubSea Tetris" class="biglogo"/>
				</div>
				<div class="mibloc paddingtop">
					<?php echo $T_Text_Home_Start; ?>

					<div class="bigbutton" onclick="startPartie()"><?php echo $T_Play; ?></div>
				</div>
			</div>
			<div id="home-end">
				<div class="mibloc paddingtop">
					<?php echo $T_Text_Home_End; ?>

					<p class="center"><?php echo $T_Score; ?>: <span id="scorefinal"></span></p>
					<p class="center"><?php echo $T_Lines; ?>: <span id="linesfinal"></span></p>
					<p class="center"><?php echo $T_Level; ?>: <span id="levelfinal"></span></p>
					<div class="bigbutton" onclick="startPartie()"><?php echo $T_RePlay; ?></div>
				</div>
				<div class="mibloc paddingtop desktop-only">
					<div class="tableauscores">
						<p><?php echo $T_HighScores; ?></p>
						<table id="highscores">	</table>
						<div class="btneffacescores" id="btneffacescores">
							<span id="btnefface-normal" title="<?php echo $T_ClearScores; ?>" onclick="effaceTableauHighScore()"><?php echo $T_ClearScores; ?></span>
							<span id="btnefface-confirm"><?php echo $T_ScoresConfirm; ?></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="./js/cookies.js"></script>
	<script type="text/javascript" src="./js/scores.js"></script> 
	<script type="text/javascript" src="./js/game.min.js"></script>
<?php include("footer.php"); ?>