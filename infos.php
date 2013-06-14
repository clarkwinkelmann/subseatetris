<?php
	$page = "T_MoreInfos";
	include("header.php");
?>
	<div id="content">
<?php include("menu.php"); ?>
		<div class="mibloccenter">
			<img src="./img/logo300.png" alt="Logo SubSea Tetris" class="biglogo"/>
			<p class="center">Version 4.1</p>
			<p class="center">&copy; Clark Winkelmann 2013</p>
			<p onclick="document.getElementById('changelog').style.display = 'block';" class="smallbutton desktop-only">Changelog</p>
			<a href="https://sourceforge.net/p/subseatetris/" target="blank" class="smallbutton desktop-only">Source code</a>
		</div>
		<div class="corner"></div>
		<div class="bottom"></div>
	</div>
	<div id="changelog">
		<a id="closebutton" title="Close" onclick="document.getElementById('changelog').style.display = 'none';">&times;</a>
		<h2>Changelog</h2>
		<div>
			<h4>4.1<span>14 juin 2013</span></h4>
			<p>+ Vous pouvez maintenant attribuer un nom à un score</p>
			<p>+ La touche espace fait descendre instantanément la pièce en bas</p>
			<p>- Modification de certaines traductions</p>
			<h4>4.0.2<span>13 juin 2013</span></h4>
			<p>- Optimisation du code</p>
			<p>+ Le code source est mainteant disponible sur sourceforge.net !</p>
			<h4>4.0.1<span>11 avril 2013</span></h4>
			<p>- Correction d'un bug lors du spam de la touch ESC</p>
			<p>+ Ajout d'une notif si l'utilisateur n'a pas javascript activé</p>
			<p>+ Ajout du lien correct pour le projet sur BugnPlay (fonctionnera une fois les votes ouverts)</p>
			<p>+ Ajout du changelog</p>
			<h4>4.0<span>31 mars 2013</span></h4>
			<p>- Première version du SubSea Tetris</p>
		</div>
	</div>
<?php include("footer.php"); ?>