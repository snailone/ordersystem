<?php
include_once "DBConnect.php";

$sql = "select DishID, DishName, DishType, DishComposition, Price, Status, Bargain from dishlist";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$outp[$row["DishID"]] = $row;
	}
} else {
	echo "0 results";
}

$sql = "select DishID, avg(Star) as Star, count(*) as Num from dishcomment group by DishID";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$star[$row["DishID"]] = $row;
	}
} else {
	echo "0 results";
}

foreach ($outp as $id => $value) {
	$outp[$id] = array_merge($value, $star[$id]);
}

$conn->close();

echo(json_encode($outp));