<?php

//$tableNum = 3;
//$orderNum = '0001201503310006';
$tableNum = $_POST["tableNum"];
$orderNum = $_POST["orderNum"];
$ordered = array();
$dishid = 0;

include_once "DBConnect.php";

$sql = "select DishID from orderlist where TableNum='".$tableNum."' and OrderNum='".$orderNum."'";
$result = $conn->query($sql);

if (!$result)
{
	echo "Something wrong";
} else if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$dishid = (int)(substr($row["DishID"], 0, 4));
		if (!isset($ordered[$dishid])) {
			$ordered[$dishid] = 1;
		} else {
			$ordered[$dishid] = $ordered[$dishid] + 1;
		}
	}
}

$keys = array_keys($ordered);

function joinarray($v1, $v2) {
	return $v1 . ", " . $v2;
}
$firstKeys = array_shift($keys);
$joinKeys = array_reduce($keys, "joinarray", $firstKeys);

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
		$outp .= '"DishNum":"'         . $ordered[$id] . '",';
		$outp .= '"DishComposition":"' . $composition   . '"}';
	}
	$outp .= "]";
	echo($outp);
}

$conn->close();