<?php

$selected = json_decode($_POST["Dishes"], true);
$tablenum = $_POST["table"];
date_default_timezone_set("Europe/London");

include_once "DBConnect.php";

// need to check if the table is empty or not
$sql = "select max(OrderNum) from orderlist";
$result = $conn->query($sql);
$ordernum = array_shift($result->fetch_assoc());
if (strlen($ordernum) == 16) {
	$resid = substr($ordernum, 0, 4);
	$date = substr($ordernum, 4, 8);
	$ordered = (int)(substr($ordernum, 12));
} else {
	$resid = "0001";
	$date = date("Ymd");
	$ordered = 0;
}

// needs to decide which date to use, in php, or in mysql
if ($date == date("Ymd")) {
	$ordered = $ordered + 1;
} else {
	$ordered = 1;
}

$ordered = (string)$ordered;

if (strlen($ordered) != 4){
	$ordered = str_repeat('0', (4-strlen($ordered))) . $ordered;
}

$ordernum = $resid . date("Ymd") . $ordered;

//here maybe we can use prepare, since there are so many commands to execute in mysql
foreach ($selected as $key => $value) {
	$dishid = (string)$key;
	if (strlen($dishid) != 4){
		$dishid = str_repeat('0', (4-strlen($dishid))) . $dishid;
	}
	for ($i=0; $i<$value; $i++) {
		$dishorder = (string)$i;
		if (strlen($dishid) != 2){
			$dishorder = '0' . $dishorder;
		}
		$sql = "insert into orderlist values (curdate(), '".$ordernum."', ".$tablenum.", '".$dishid.$dishorder."', 0, 0)";
		$conn->query($sql);
	}
}

echo($ordernum);