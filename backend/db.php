<?php
// 开头不要有空格、空行、BOM
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 请根据你的实际数据库信息填写如下变量
$servername = "localhost";
$username = "你的数据库用户名";
$password = "你的数据库密码";
$dbname = "你的数据库名";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    echo json_encode(['error' => '数据库连接失败: ' . mysqli_connect_error()]);
    exit;
}
?>
