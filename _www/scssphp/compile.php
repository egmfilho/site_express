<?php
	require_once "scss.inc.php";
	use Leafo\ScssPhp\Compiler;

	$scss = new Compiler();
	$scss->setImportPaths('../../app/styles');

	$scss->setVariables(array(
		'main-color' => "#{$_GET['color']}"
	));

    header("Content-type: text/css; charset: UTF-8");
	echo $scss->compile("@import 'main.scss'");
?>