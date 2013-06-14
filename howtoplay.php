<?php
	$page = "T_HowToPlay";
	include("header.php");
?>
	<div id="content">
<?php include("menu.php"); ?>
		<div class="mibloc">
			<h2 class="center"><?php echo $T_Goal; ?></h2>
			<?php echo $T_Text_HowToPlay; ?>
		</div>
		<div class="mibloc desktop-only">
			<h2 class="center"><?php echo $T_Keys; ?></h2>
			<table class="howtoplay">
				<tr><td><span class="key" id="enter">ENTER</span></td><td><?php echo $T_HowToPlay_Enter; ?></td></tr>
				<tr><td><span class="key" id="esc">ESC</span></td><td><?php echo $T_HowToPlay_Esc; ?></td></tr>
				<tr><td><span class="key" id="n">N</span></td><td><?php echo $T_HowToPlay_N; ?></td></tr>
				<tr><td><span class="key" id="up">&#9650;</span></td><td><?php echo $T_HowToPlay_Up; ?></td></tr>
				<tr><td><span class="key" id="left">&#9664;</span><span class="key" id="right">&#9654;</span></td><td><?php echo $T_HowToPlay_LeftRight; ?></td></tr>
				<tr><td><span class="key" id="down">&#9660;</span></td><td><?php echo $T_HowToPlay_Down; ?></td></tr>
				<tr><td><span class="key" id="space">SPACE</span></td><td><?php echo $T_HowToPlay_Space; ?></td></tr>
			</table>
			<div class="onmobile">
				<p><?php echo $T_OnMobile; ?></p>
			</div>
		</div>
		<div class="mibloc mobile-only">
			<h2 class="center"><?php echo $T_TouchCommands; ?></h2>
			<div class="touch-capture">
				<p class="touch-pause"><?php echo $T_Touch_Pause; ?></p>
				<p class="touch-rotate"><?php echo $T_Touch_Rotate; ?></p>
				<p class="touch-swipe"><?php echo $T_Touch_Swipe; ?></p>
				<p class="touch-swipedown"><?php echo $T_Touch_SwipeDown; ?></p>
			</div>
		</div>
	</div>
<script type="text/javascript" >

function ActivateKey(nom){
	document.getElementById(nom).className = 'key keypressed';
}

function DesactivateKey(nom){
	document.getElementById(nom).className = 'key';
}

document.onkeydown = function(e) {
	switch(e.keyCode){
		case 13: // ENTER
			ActivateKey('enter');
			break;
		case 27: // ESC
			ActivateKey('esc');
			break;
		case 78: // N
			ActivateKey('n');
			break;
		case 37: // LEFT
			ActivateKey('left');
			break;
		case 39: // RIGHT
			ActivateKey('right');
			break;
		case 38: // UP
			ActivateKey('up');
			break;
		case 40: // DOWN
			ActivateKey('down');
			break;
		case 32: // SPACE
			ActivateKey('space');
			break;
	}
}

document.onkeyup = function(e) {
	switch(e.keyCode){
		case 13: // ENTER
			DesactivateKey('enter');
			break;
		case 27: // ESC
			DesactivateKey('esc');
			break;
		case 78: // N
			DesactivateKey('n');
			break;
		case 37: // LEFT
			DesactivateKey('left');
			break;
		case 39: // RIGHT
			DesactivateKey('right');
			break;
		case 38: // UP
			DesactivateKey('up');
			break;
		case 40: // DOWN
			DesactivateKey('down');
			break;
		case 32: // SPACE
			DesactivateKey('space');
			break;
	}
}

</script>
<?php include("footer.php"); ?>