<?php
include_once "DBConnect.php";

$dishid = $_POST["dishid"];
$star = $_POST["star"];
$starnum = $_POST["starnum"];

$sql = "update dishlist set Star=".$star.", StarNum=".$starnum." where DishID=".$dishid;
$conn->query($sql);

$conn->close();