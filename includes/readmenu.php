<?php
include_once "DBConnect.php";

$outp = [];

$sql = "select DishID, DishName, DishType, DishComposition, Price, Status, Bargain from dishlist";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$i = 0;
	while($row = $result->fetch_assoc()) {
		$outp[$i] = $row;
		$i = $i + 1;
	}
} else {
	echo "0 results";
}

$conn->close();

echo(json_encode($outp));