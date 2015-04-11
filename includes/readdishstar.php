<?php 
include_once "DBConnect.php";
$dishid = $_POST["DishID"];
//$dishid = 1;
$sql = "select avg(Star) from dishcomment where DishID=" . $dishid;
$result = $conn->query($sql);
$star = array_shift($result->fetch_assoc());
echo "$star";