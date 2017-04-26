<?php
	require_once "scss.inc.php";

	use Leafo\ScssPhp\Server;

	$directory = "styles";

	Server::serveFrom($directory);
?>