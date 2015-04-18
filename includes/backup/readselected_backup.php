<?php

if ( session_id()=="" ) {
	session_start();
}
if ( !isset($_SESSION["selected"]) ) {
	settype($_SESSION["selected"], "array");
}

$selected = $_SESSION["selected"];
$keys = array_keys($selected);

function joinarray($v1, $v2) {
	return $v1 . ", " . $v2;
}
$firstKeys = array_shift($keys);
$joinKeys = array_reduce($keys, "joinarray", $firstKeys);

include_once "DBConnect.php";

$sql = "select DishID, DishName, DishComposition, Price from dishlist where DishID in (" . $joinKeys . ")";
$result = $conn->query($sql);

if (!$result)
{
	echo "No dish selected";
} else if ($result->num_rows > 0) {
	$outp = "[";
	while($row = $result->fetch_assoc()) {
		$id          = $row["DishID"];
		$name        = $row["DishName"];
		$composition = $row["DishComposition"];
		$price       = $row["Price"];
		if ($outp != "[") { $outp .= ","; }
		$outp .= '{"DishID":"'         . $id            . '",';
		$outp .= '"DishName":"'        . $name          . '",';
		$outp .= '"Price":"'           . $price         . '",';
		$outp .= '"DishNum":"'         . $selected[$id] . '",';
		$outp .= '"DishComposition":"' . $composition   . '"}';
	}
	$outp .= "]";
	echo($outp);
}

$conn->close();