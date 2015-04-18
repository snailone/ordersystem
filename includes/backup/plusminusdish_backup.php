<?php

if ( session_id()=="" ) {
	session_start();
}
if (!isset($_SESSION["selected"])) {
	settype($_SESSION["selected"], "array");
}

$id     = $_POST["DishID"];
$action = $_POST["action"];
$remove = $_POST["remove"];
$del    = $_POST["del"];

$selected = $_SESSION["selected"];

$dishNum = 0;
foreach ($selected as $key => $value) {
	if ($key == $id) {
		$dishNum = $value;
	}
} // no need to use a foreach, just need something like if isset($selected[$id])

if ($del == "yes") {
	$dishNum = 0;
	unset($selected[$id]);
} elseif ($action == "plus") {
	$dishNum = $dishNum + 1;
	$selected[$id] = $dishNum;
} elseif ($action == "minus" && $dishNum > 1) {
	$dishNum = $dishNum - 1;
	$selected[$id] = $dishNum;
} elseif ($dishNum <= 1 && $action == "minus") {
	if ($remove == "yes") {
		$dishNum = 0;
		unset($selected[$id]);
	} elseif ($remove == "no") {
		$dishNum = 0;
		$selected[$id] = 0;
	}
} else {
	echo("something wrong");
}

$_SESSION["selected"] = $selected;

echo $dishNum;