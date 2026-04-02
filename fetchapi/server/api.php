<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;

require_once '../../shared-db/db-config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM film ORDER BY fkod DESC");
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("INSERT INTO film (filmcim, mufaj, hossz, szines) VALUES (?, ?, ?, ?)");
        $szines = $data['szines'] ? 1 : 0;
        $stmt->bind_param("ssii", $data['filmcim'], $data['mufaj'], $data['hossz'], $szines);
        $stmt->execute();
        echo json_encode(["success" => true, "fkod" => $conn->insert_id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $conn->prepare("UPDATE film SET filmcim=?, mufaj=?, hossz=?, szines=? WHERE fkod=?");
        $szines = $data['szines'] ? 1 : 0;
        $stmt->bind_param("ssiii", $data['filmcim'], $data['mufaj'], $data['hossz'], $szines, $data['fkod']);
        $stmt->execute();
        echo json_encode(["success" => true]);
        break;

    case 'DELETE':
        if(isset($_GET['fkod'])) {
            $fkod = intval($_GET['fkod']);
            $stmt = $conn->prepare("DELETE FROM film WHERE fkod = ?");
            $stmt->bind_param("i", $fkod);
            $stmt->execute();
            echo json_encode(["success" => true]);
        }
        break;
}
$conn->close();