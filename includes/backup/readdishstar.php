<?php 
include_once "DBConnect.php";

$sql = "select DishID, avg(Star) as Star, count(*) as Num from dishcomment group by DishID";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$i = 0;
	while($row = $result->fetch_assoc()) {
		$outp[$row["DishID"]] = $row;
		//print_r($row);
		$i = $i + 1;
	}
} else {
	echo "0 results";
}

$conn->close();

echo(json_encode($outp));