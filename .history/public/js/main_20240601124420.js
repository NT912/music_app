let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let currentTrackIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const currentTrackInfo = document.getElementById("current-track-info");
const playButton = document.getElementById("play-button");
let tracks = JSON.parse(document.getElementById("tracks-data").textContent);

// Các nút Control
function togglePlay() {
  isPlaying = !isPlaying;
  playButton.className = isPlaying ? "fas fa-pause" : "fas fa-play";
  if (isPlaying) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
}

function nextTrack() {
  // Xử lý chuyển bài tiếp theo
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  playTrack(currentTrackIndex);
}

function previousTrack() {
  // Xử lý chuyển bài trước đó
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  playTrack(currentTrackIndex);
}

function toggleRandom() {
  isRandom = !isRandom;
  // Thay đổi trạng thái và thực hiện các hành động tương ứng
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  // Thay đổi trạng thái và thực hiện các hành động tương ứng
}

function playTrack(index) {
  currentTrackIndex = index;
  audioSource.src = tracks[index].tracks_path;
  audioPlayer.load();
  audioPlayer.play();
  currentTrackInfo.textContent = `${tracks[index].track_name} - ${tracks[index].singer}`;
  playButton.classList.remove("fa-play");
  playButton.classList.add("fa-pause");
  isPlaying = true;
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

function togglePlaylist() {
  const playlistModal = document.getElementById("playlist-modal");
  playlistModal.style.display =
    playlistModal.style.display === "block" ? "none" : "block";
}

// Chức năng play track khi nhấp vào icon play trong danh sách bài hát
document.querySelectorAll(".track-card").forEach((card, index) => {
  card.addEventListener("click", () => playTrack(index));
});
