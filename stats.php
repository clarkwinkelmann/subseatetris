<?php
	$page = "T_Stats";
	include("header.php");
?>
<script type="text/javascript" >
	var T_NoScore = "<?php echo $T_NoScore; ?>";
	var T_Player = "<?php echo $T_Player; ?>";
	var T_Score = "<?php echo $T_Score; ?>";
	var T_Date = "<?php echo $T_Date; ?>";
	var Mois = <?php echo $T_Months; ?>;
	var T_ChangeName = "<?php echo $T_ChangeName; ?>";
	var T_ChangeNameBulle = "<?php echo $T_ChangeNameBulle; ?>";
	var T_OK = "<?php echo $T_OK; ?>";
	var T_Me = "<?php echo $T_Me; ?>";
</script>
	<div id="content">
<?php include("menu.php"); ?>
		<p class="space"></p>
		<div class="tableauscores">
			<p><?php echo $T_HighScores; ?></p>
			<table id="highscores">	</table>
			<div class="btneffacescores" id="btneffacescores">
				<span id="btnefface-normal" title="<?php echo $T_ClearScores; ?>" onclick="effaceTableauHighScore()"><?php echo $T_ClearScores; ?></span>
				<span id="btnefface-confirm"><?php echo $T_ScoresConfirm; ?></span>
			</div>
		</div>
		<div class="corner"></div>
		<div class="bottom"></div>
	</div>
	<script type="text/javascript" src="./js/cookies.js"></script>
	<script type="text/javascript" src="./js/scores.js"></script>
<script type="text/javascript" >
buildTableauHighScores(getScores());
</script>
<?php include("footer.php"); ?>