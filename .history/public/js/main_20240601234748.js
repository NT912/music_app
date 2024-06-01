let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let currentTrack = null;
let playlist = [];

// Các nút Control
function togglePlay() {
  isPlaying = !isPlaying;
  let playButton = document.getElementById("play-button");
  playButton.className = isPlaying ? "fas fa-pause" : "fas fa-play";
  // Thực hiện các hành động khác khi bấm nút play/pause
}

function nextTrack() {
  // Xử lý chuyển bài tiếp theo
}

function previousTrack() {
  // Xử lý chuyển bài trước đó
}

function toggleRandom() {
  isRandom = !isRandom;
  // Thay đổi trạng thái và thực hiện các hành động tương ứng
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  // Thay đổi trạng thái và thực hiện các hành động tương ứng
}

function playTrack(trackName, singer, trackPath) {
  currentTrack = { trackName, singer, trackPath };
  document.getElementById(
    "current-track-info"
  ).innerText = `${trackName} - ${singer}`;
  // Phát bài hát bằng cách tạo đối tượng audio mới hoặc cập nhật src của đối tượng hiện tại
  let audio = new Audio(trackPath);
  audio.play();
  isPlaying = true;
  document.getElementById("play-button").className = "fas fa-pause";

  // Cập nhật danh sách phát
  if (!playlist.some((track) => track.trackPath === trackPath)) {
    playlist.push(currentTrack);
    updatePlaylistUI();
  }
}

function updatePlaylistUI() {
  let playlistElement = document.getElementById("playlist");
  playlistElement.innerHTML = "";
  playlist.forEach((track) => {
    let li = document.createElement("li");
    li.innerText = `${track.trackName} - ${track.singer}`;
    playlistElement.appendChild(li);
  });
}

function togglePlaylist() {
  let sidebar = document.getElementById("playlist-sidebar");
  if (sidebar.style.width === "0px" || sidebar.style.width === "") {
    sidebar.style.width = "250px";
  } else {
    sidebar.style.width = "0px";
  }
}

function addToPlaylist(trackName, singer, trackPath) {
  let track = { trackName, singer, trackPath };
  if (!playlist.some((t) => t.trackPath === trackPath)) {
    playlist.push(track);
    updatePlaylistUI();
  }
}

function toggleOptionsMenu(element) {
  let optionsMenu = element.nextElementSibling;
  optionsMenu.style.display =
    optionsMenu.style.display === "block" ? "none" : "block";
}

// Đóng menu 3 chấm khi click ra ngoài
window.onclick = function (event) {
  let menus = document.querySelectorAll(".options-menu");
  menus.forEach((menu) => {
    if (
      menu.style.display === "block" &&
      !menu.contains(event.target) &&
      !event.target.classList.contains("options-icon")
    ) {
      menu.style.display = "none";
    }
  });
};

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
      // Làm mới trang hoặc cập nhật danh sách bài hát trên giao diện người dùng
      location.reload();
    })
    .catch((error) => {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi thêm bài hát");
    });
};
