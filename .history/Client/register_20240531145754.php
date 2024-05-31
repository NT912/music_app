<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đăng Ký</title>
  <link rel="stylesheet" href="/Client/css/register.css">
</head>

<body>
  <header>
    <nav>
      <a href="index.php"><img src="/Client/images/logo.png" alt="Logo" class="logo"></a>
      <ul>
        <li><a href="index.php">Trang Chủ</a></li>
        <li><a href="login.php">Đăng Nhập</a></li>
        <li><a href="register.html">Đăng Ký</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <div class="form-container">
      <h2>Đăng Ký</h2>
      <form action="../server/register.php" method="POST">
        <label for="username">Tên đăng nhập:</label>
        <input type="text" id="username" name="username" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" name="password" required>
        <label for="confirm-password">Xác nhận mật khẩu:</label>
        <input type="password" id="confirm-password" name="confirm-password" required>
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  </main>
  <footer>
    <p>&copy; 2024 Music Player. All rights reserved.</p>
  </footer>
</body>

</html>