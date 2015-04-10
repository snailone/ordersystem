<?php 
include_once "DBConnect.php";
$dishid = $_POST["DishID"];
//$dishid = 1;
$sql = "select DishID, Time, Comment from dishcomment where DishID=" . $dishid;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$outp = "[";
	while($row = $result->fetch_assoc()) {
		if ($outp != "[") { $outp .= ","; }
		$outp .= '{"DishID":"' . $row["DishID"]  . '",';
		$outp .= '"Time":"'    . $row["Time"]    . '",';
		$outp .= '"Comment":"' . $row["Comment"] . '"}';
	}
	$outp .= "]";
} else {
	echo "no comment";
}

$conn->close();

echo($outp);