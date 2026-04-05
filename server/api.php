<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;

require_once 'shared-db\db-config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['type']) && $_GET['type'] == 'mozi') {
            $result = $conn->query("SELECT * FROM mozi ORDER BY mozinev");
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        }
        else if (isset($_GET['kereses'])) {
            $s = "%" . $conn->real_escape_string($_GET['kereses']) . "%";
            
            $sql = "SELECT 
                        f.filmcim, 
                        f.mufaj, 
                        IFNULL(m.mozinev, 'Nincs adat') AS mozinev, 
                        IFNULL(m.cim, 'Nincs adat') AS mozi_cim,
                        h.moziazon
                    FROM film f
                    LEFT JOIN hely h ON f.fkod = h.fkod
                    LEFT JOIN mozi m ON h.moziazon = m.moziazon
                    WHERE f.filmcim LIKE ?";
                    
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $s);
            $stmt->execute();
            echo json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
        } else {
            $sql = "SELECT f.*, GROUP_CONCAT(h.moziazon) AS moziazonok 
            FROM film f 
            LEFT JOIN hely h ON f.fkod = h.fkod 
            GROUP BY f.fkod
            ORDER BY f.fkod DESC";
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        }
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