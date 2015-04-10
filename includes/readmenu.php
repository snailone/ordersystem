<?php
include_once "DBConnect.php";

$sql = "select DishID, DishName, DishType, DishComposition, Price from dishlist";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$outp = "[";
	while($row = $result->fetch_assoc()) {
		if ($outp != "[") { $outp .= ","; }
		$outp .= '{"DishID":"'         . $row["DishID"]          . '",';
		$outp .= '"DishName":"'        . $row["DishName"]        . '",';
		$outp .= '"DishType":"'        . $row["DishType"]        . '",';
		$outp .= '"Price":"'           . $row["Price"]           . '",';
		$outp .= '"DishComposition":"' . $row["DishComposition"] . '"}';
	}
	$outp .= "]";
} else {
	echo "0 results";
}

$conn->close();

echo($outp);