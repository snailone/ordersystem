<?php

$order = $_POST["orderNum"];

include_once "DBConnect.php";

$sql = "select OrderNum, TableNum, DishID, Made from orderlist where Checked=0 and OrderNum<='" . $order . "'";
$result = $conn->query($sql);

if (!$result)
{
	echo "No one ordered any food";
} else if ($result->num_rows > 0) {
	$i = 0;
	while($row = $result->fetch_assoc()) {
		$dishID[$i]   = $row["DishID"];
		$orderNum[$i] = $row["OrderNum"];
		$tableNum[$i] = $row["TableNum"];
		$made[$i]     = $row["Made"];
		$i = $i+1;
	}
}

$i = 0;
$joinOrdered = "";
foreach ($dishID as $value) {
	$id = ($value-$value%100)/100;
	if ($i == 0) {
		$joinOrdered = $id;
	} else {
		$joinOrdered = $joinOrdered . ", ". $id;
	}
	$i = $i+1;
}

$sql = "select DishID, DishName, DishComposition, Price from dishlist where DishID in (" . $joinOrdered . ")";
$result = $conn->query($sql);

if (!$result)
{
	echo "No dish selected";
} else if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$DishName[$row["DishID"]]        = $row["DishName"];
		$DishComposition[$row["DishID"]] = $row["DishComposition"];
	}
}

$outp = "[";
$i = 0;
foreach($dishID as $value) {
	$id = ($value-$value%100)/100;
	if ($outp != "[") { $outp .= ","; }
	$outp .= '{"DishID":"'         . $value                . '",';
	$outp .= '"OrderNum":"'        . $orderNum[$i]         . '",';
	$outp .= '"DishName":"'        . $DishName[$id]        . '",';
	$outp .= '"Made":"'            . $made[$i]             . '",';
	$outp .= '"TableNum":"'        . $tableNum[$i]         . '",';
	$outp .= '"DishComposition":"' . $DishComposition[$id] . '"}';
	$i = $i+1;
}
$outp .= "]";
echo($outp);

$conn->close();