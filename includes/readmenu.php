<?php
include_once "DBConnect.php";

$sql = "select DishID, DishName, DishType, DishComposition, Price, Status, Bargain, Star, StarNum from dishlist";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$outp[$row["DishID"]] = $row;
	}
} else {
	echo "0 results";
}

/*
$sql = "select DishID, avg(Star) as Star, count(*) as Num from dishcomment group by DishID";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
	$star[$row["DishID"]] = $row;
}

foreach ($outp as $id => $value) {
	if ( isset($star[$id]) ) {
		$outp[$id] = array_merge($value, $star[$id]);
	} else {
		$outp[$id] = array_merge($value, array("Star"=>"0", "Num"=>"0"));
	}
}

*/

$conn->close();

echo(json_encode($outp));