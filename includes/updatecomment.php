<?php
include_once "DBConnect.php";

$dishid = $_POST["dishid"];
$star = $_POST["star"];
$comment = $_POST["comment"];

$sql = "insert into dishcomment values (now(), ".$dishid.", ".$star.", '".$comment."')";
$conn->query($sql);

$conn->close();