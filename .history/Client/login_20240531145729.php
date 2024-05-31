<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đăng Nhập</title>
  <link rel="stylesheet" href="/Client/css/login.css">
</head>

<body>
  <header>
    <nav>
      <a href="index.php"><img src="/Client/images/logo.png" alt="Logo" class="logo"></a>
      <ul>
        <li><a href="index.php">Trang Chủ</a></li>
        <li><a href="login.php">Đăng Nhập</a></li>
        <li><a href="register.php">Đăng Ký</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <div class="form-container">
      <h2>Đăng Nhập</h2>
      <form action="../server/login.php" method="POST">
        <label for="username">Tên đăng nhập:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  </main>
  <footer>
    <p>&copy; 2024 Music Player. All rights reserved.</p>
  </footer>
</body>

</html>