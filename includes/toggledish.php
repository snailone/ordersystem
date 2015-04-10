<?php

if ( session_id()=="" ) {
	session_start();
}
if (!isset($_SESSION["ordered"])) {
	settype($_SESSION["ordered"], "array");
}

$id = $_POST["DishID"];

$ordered = $_SESSION["ordered"];

$state = 0;
for ($i=0; $i<count($ordered); $i++) {
	if ($ordered[$i] == $id) {
		$state = $i+1;
	}
}

if ($state == 0) {
	array_push($ordered, $id);
	$state_id = $id;
} else {
	array_splice($ordered, $state-1, 1);
	$state_id = 0;
}

$_SESSION["ordered"] = $ordered;

echo $state_id;