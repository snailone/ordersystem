<?php

include_once "DBConnect.php";

$lastState = $_POST["laststate"];

//$sql = "select change_ord from changes";
//$result = $conn->query($sql);
//$row = $result->fetch_assoc();
//$curState = $row["change_ord"];

//while ($lastState == $curState) {
//	usleep(10000);
	$sql = "select change_ord from changes";
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$curState = $row["change_ord"];
//}

echo($curState);

$conn->close();