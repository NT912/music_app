<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Music Player</title>
  <link rel="stylesheet" href="/Client/css/index.css">
</head>

<body>
  <header>
    <nav>
      <a href="index.html"><img src="/Client/images/logo.png" alt="Logo" class="logo"></a>
      <ul>
        <li><a href="index.html">Trang Chủ</a></li>
      </ul>
      <div class="auth-buttons">
        <a href="login.php" class="btn">Đăng Nhập</a>
        <a href="register.php" class="btn">Đăng Ký</a>
      </div>
    </nav>
  </header>
  <main>
    <div class="player">
      <div class="track-info">
        <h2>Now Playing</h2>
        <p id="track-info">Track Name - Artist</p>
      </div>
      <div class="controls">
        <button class="btn" onclick="playTrack()">Play</button>
        <button class="btn" onclick="pauseTrack()">Pause</button>
        <button class="btn" onclick="nextTrack()">Next</button>
        <button class="btn" onclick="previousTrack()">Previous</button>
      </div>
    </div>
    <div id="track-list"></div>
  </main>
  <footer>
    <p>&copy; 2024 Music Player. All rights reserved.</p>
  </footer>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      fetch('../server/fetch_tracks.php')
        .then(response => response.json())
        .then(tracks => {
          const trackList = document.getElementById('track-list');
          tracks.forEach(track => {
            const trackItem = document.createElement('div');
            trackItem.textContent = `${track.track_name} - ${track.singer}`;
            trackList.appendChild(trackItem);
          });
        });
    });

    function playTrack() {
      // Implement play functionality
    }

    function pauseTrack() {
      // Implement pause functionality
    }

    function nextTrack() {
      // Implement next functionality
    }

    function previousTrack() {
      // Implement previous functionality
    }
  </script>
</body>

</html>