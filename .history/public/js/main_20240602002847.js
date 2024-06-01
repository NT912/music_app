let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let playlist = []; // Thêm biến playlist để lưu trữ danh sách bài hát đang phát

function togglePlay() {
  const audioPlayer = document.getElementById("audio-player");
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  isPlaying = !isPlaying;
  let playButton = document.getElementById("play-button");
  playButton.className = isPlaying ? "fas fa-pause" : "fas fa-play";
  // Thực hiện các hành động khác khi bấm nút play/pause
}

function nextTrack() {
  if (playlist.length === 0) {
    return;
  }
  let currentIndex = playlist.findIndex(
    (track) =>
      track.track_name ===
      document.getElementById("current-track-info").innerText.split(" - ")[0]
  );
  let nextIndex = (currentIndex + 1) % playlist.length;
  document.getElementById(
    "current-track-info"
  ).innerText = `${playlist[nextIndex].track_name} - ${playlist[nextIndex].singer}`;
}

function previousTrack() {
  if (playlist.length === 0) {
    return;
  }
  let currentIndex = playlist.findIndex(
    (track) =>
      track.track_name ===
      document.getElementById("current-track-info").innerText.split(" - ")[0]
  );
  let previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  document.getElementById(
    "current-track-info"
  ).innerText = `${playlist[previousIndex].track_name} - ${playlist[previousIndex].singer}`;
}

function playAudio(trackName, singer, trackPath) {
  const audioPlayer = document.getElementById("audio-player");
  const currentTrackInfo = document.getElementById("current-track-info");

  audioPlayer.src = trackPath;
  audioPlayer.play();
  isPlaying = true;

  currentTrackInfo.textContent = `${trackName} - ${singer}`;

  let playButton = document.getElementById("play-button");
  playButton.className = "fas fa-pause";
}

// Thêm bài hát
// Lấy modal và nút đóng
var modal = document.getElementById("add-song-modal");
var closeButton = document.querySelector(".modal-content .close");

// Lấy nút thêm bài hát và nút submit trong form
var addSongBtn = document.getElementById("add-song-btn");
var addSongForm = document.getElementById("add-song-form");

// Khi người dùng nhấn nút "Thêm Bài Hát", hiển thị popup
addSongBtn.onclick = function () {
  modal.style.display = "block";
};

// Khi người dùng nhấn nút đóng, ẩn popup
closeButton.onclick = function () {
  modal.style.display = "none";
};

// Khi người dùng nhấn bất kỳ đâu ngoài popup, ẩn popup
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Khi người dùng submit form, ẩn popup
addSongForm.onsubmit = function () {
  modal.style.display = "none";
};

document.getElementById("track-file").addEventListener("change", function () {
  // Lấy đường dẫn của file
  var filePath = this.value;
  // Cập nhật giá trị của trường ẩn "track-path" với đường dẫn của file
  document.getElementById("track-path").value = filePath;
});
// Khi người dùng submit form, thực hiện gửi yêu cầu AJAX
document.getElementById("add-song-form").onsubmit = function (event) {
  event.preventDefault(); // Ngăn chặn form gửi thông qua trình duyệt

  // Lấy dữ liệu từ form
  var formData = new FormData(this);

  // Gửi yêu cầu AJAX
  fetch("/tracks/add-song", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      alert("Bài hát đã được thêm thành công");
      window.location.href = "/home";
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu:", error);
    });
};
// Lấy icon danh sách trong footer
var playlistIcon = document.querySelector(".open-playlist");

// Sự kiện click vào icon danh sách
playlistIcon.onclick = function () {
  // Lấy thanh sidebar và thêm hoặc loại bỏ class "open"
  var sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("open");
};
