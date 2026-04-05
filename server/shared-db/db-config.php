<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "webprog_fetchapi_mozi_db";

$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) die(json_encode(["error" => "Hiba"]));

$conn->query("CREATE DATABASE IF NOT EXISTS `$db` CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci");
$conn->select_db($db);
$conn->set_charset("utf8mb4");

$conn->query("CREATE TABLE IF NOT EXISTS film (
    fkod INT PRIMARY KEY,
    filmcim VARCHAR(255) NOT NULL,
    szines TINYINT(1),
    szinkron VARCHAR(50),
    szarmazas VARCHAR(100),
    mufaj VARCHAR(100),
    hossz INT
) ENGINE=InnoDB");

$conn->query("CREATE TABLE IF NOT EXISTS mozi (
    moziazon INT PRIMARY KEY,
    mozinev VARCHAR(255) NOT NULL,
    irszam INT,
    cim VARCHAR(255),
    telefon VARCHAR(50)
) ENGINE=InnoDB");

$conn->query("CREATE TABLE IF NOT EXISTS hely (
    fkod INT NOT NULL,
    moziazon INT NOT NULL,
    PRIMARY KEY (fkod, moziazon)
) ENGINE=InnoDB");

$check = $conn->query("SELECT fkod FROM film LIMIT 1");
if ($check->num_rows == 0) {
    if (file_exists(__DIR__ . '/film.txt')) {
        $lines = file(__DIR__ . '/film.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $stmt = $conn->prepare("INSERT INTO film (fkod, filmcim, szines, szinkron, szarmazas, mufaj, hossz) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $first = true;
        foreach ($lines as $line) {
            if ($first) { 
                $first = false; 
                continue; 
            }

            $data = explode("\t", $line);

            if (isset($data[1])) {
                $fkod      = intval(trim($data[0])); 
                $filmcim   = trim($data[1]);        
                $szines    = intval(trim($data[2])); 
                $szinkron  = trim($data[3]);      
                $szarmazas = trim($data[4]);         
                $mufaj     = trim($data[5]);       
                $hossz     = intval(trim($data[6])); 
                
                $stmt->bind_param("isisssi", $fkod, $filmcim, $szines, $szinkron, $szarmazas, $mufaj, $hossz);
                $stmt->execute();
            }
        }
        $stmt->close();
    }
}

$checkHely = $conn->query("SELECT fkod FROM hely LIMIT 1");
if ($checkHely->num_rows == 0 && file_exists(__DIR__ . '/hely.txt')) {
    $lines = file(__DIR__ . '/hely.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $stmt = $conn->prepare("INSERT INTO hely (fkod, moziazon) VALUES (?, ?)");
    $first = true;
    foreach ($lines as $line) {
        if ($first) { 
            $first = false;
            continue;
        }

        $data = explode("\t", $line);

        if (isset($data[1])) {
            $stmt->bind_param("ii", $data[0], $data[1]);
            $stmt->execute();
        }
    }
    $stmt->close();
}

$checkMozi = $conn->query("SELECT moziazon FROM mozi LIMIT 1");
if ($checkMozi->num_rows == 0) {
    $path = __DIR__ . '/mozi.txt';
    
    if (file_exists($path)) {
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $first = true;
        
        $stmt = $conn->prepare("INSERT INTO mozi (moziazon, mozinev, irszam, cim, telefon) VALUES (?, ?, ?, ?, ?)");
        
        foreach ($lines as $line) {
            if ($first) { $first = false; continue; }
            
            $data = explode("\t", $line);
            
            if (isset($data[0]) && isset($data[1])) {
                $moziazon = intval(trim($data[0]));
                $mozinev  = trim($data[1]);
                $irszam   = isset($data[2]) ? intval(trim($data[2])) : 0;
                $cim      = isset($data[3]) ? trim($data[3]) : '';
                $telefon  = isset($data[4]) ? trim($data[4]) : '';
                
                $stmt->bind_param("isiss", $moziazon, $mozinev, $irszam, $cim, $telefon);
                $stmt->execute();
            }
        }
        $stmt->close();
    }
}
?>