<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Настройки БД
$host = 'localhost';
$dbname = 'romantic_invite';
$username = 'root';  // Измените на свои данные
$password = '1234';      // Измените на свои данные

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Получаем данные
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Нет данных']);
        exit;
    }
    
    // Подготавливаем данные
    $place = $data['place'] ?? '';
    $date = $data['date'] ?? '';
    $time = $data['time'] ?? '';
    $outfit = $data['outfit'] ?? '';
    $message = $data['message'] ?? '';
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    
    // Сохраняем в БД
    $stmt = $pdo->prepare("
        INSERT INTO responses (place, date, time, outfit, message, ip_address) 
        VALUES (:place, :date, :time, :outfit, :message, :ip)
    ");
    
    $stmt->execute([
        'place' => $place,
        'date' => $date,
        'time' => $time,
        'outfit' => $outfit,
        'message' => $message,
        'ip' => $ip
    ]);
    
    echo json_encode(['success' => true, 'message' => 'Данные сохранены!']);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка БД: ' . $e->getMessage()]);
}
?>