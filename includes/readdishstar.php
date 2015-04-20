<?php 
include_once "DBConnect.php";
$dishid = $_POST["DishID"];
//$dishid = 1;
$sql = "select avg(Star) as Star, count(*) as Num from dishcomment where DishID=" . $dishid;
$result = $conn->query($sql);
$star = $result->fetch_assoc();
print_r(json_encode($star));