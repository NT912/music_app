let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let playlist = []; // Thêm biến playlist để lưu trữ danh sách bài hát đang phát

function togglePlay() {
  isPlaying = !isPlaying;
  let playButton = document.getElementById("play-button");
  playButton.className = isPlaying ? "fas fa-pause" : "fas fa-play";

  if (playlist.length === 0 && isPlaying) {
    playlist.push(tracks[0]);
    updatePlaylist();
    document.getElementById(
      "current-track-info"
    ).innerText = `${tracks[0].track_name} - ${tracks[0].singer}`;
  }
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

function updatePlaylist() {
  let playlistDiv = document.querySelector(".list-track");
  playlistDiv.innerHTML = "";

  if (playlist.length === 0) {
    playlistDiv.innerHTML = '<i class="fas fa-list"></i>';
  } else {
    playlist.forEach((track, index) => {
      let trackElement = document.createElement("div");
      trackElement.classList.add("track-item");
      trackElement.innerHTML = `<p>${index + 1}. ${track.track_name} - ${
        track.singer
      }</p>`;
      playlistDiv.appendChild(trackElement);
    });
  }
}

function addTrackToPlaylist(trackId) {
  let trackToAdd = tracks.find((track) => track.track_id === trackId);
  playlist.push(trackToAdd);
  updatePlaylist();
}

function showHidePlaylist() {
  let playlistContainer = document.getElementById("playlist-container");
  playlistContainer.classList.toggle("show"); // Thêm hoặc loại bỏ lớp "show" để hiển thị hoặc ẩn danh sách
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
