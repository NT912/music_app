let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let isRepeatOne = false;
let playlist = [];
let currentIndex = -1;
const seekBar = document.getElementById("seek-bar");
const audioPlayer = document.getElementById("audio-player");
const currentTimeElement = document.getElementById("current-time");
const totalTimeElement = document.getElementById("total-time");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");

// Trong file main.js

// Hàm xử lý tìm kiếm
function performSearch() {
  const keyword = searchInput.value;
  if (keyword.trim() !== "") {
    fetch(`/search?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        // Xóa các kết quả cũ
        searchResults.innerHTML = "";
        // Hiển thị kết quả mới
        data.forEach((result) => {
          const listItem = document.createElement("li");
          listItem.textContent = result.track_name || result.singer;
          searchResults.appendChild(listItem);
        });
      })
      .catch((error) => console.error("Lỗi khi gửi yêu cầu tìm kiếm:", error));
  } else {
    // Nếu trường tìm kiếm trống, xóa kết quả và ẩn vùng hiển thị
    searchResults.innerHTML = "";
  }
}

// Xử lý sự kiện khi người dùng nhập vào ô tìm kiếm
searchInput.addEventListener("input", performSearch);

// Xử lý sự kiện khi người dùng nhập vào trường tìm kiếm và nhấn phím Enter
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

// Hủy sự kiện mặc định của nút tìm kiếm (nếu có)
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
});

function togglePlay() {
  const audioPlayer = document.getElementById("audio-player");
  if (isPlaying) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
  isPlaying = !isPlaying;
  updatePlayButton();
}

// Hàm bật tắt phát ngẫu nhiên
function toggleRandom() {
  isRandom = !isRandom;
  document.querySelector(".fa-random").classList.toggle("active", isRandom);
}

// Hàm bật tắt phát lặp lại
function toggleRepeat() {
  isRepeat = !isRepeat;
  updateRepeatIcon();
}

function updateRepeatIcon() {
  const repeatIcon = document.querySelector(".fa-redo");
  repeatIcon.classList.remove("repeat-one");
  if (isRepeat) {
    repeatIcon.classList.add("repeat-one");
  }
}

function updatePlayButton() {
  let playButton = document.getElementById("play-button");
  playButton.className = isPlaying ? "fas fa-pause" : "fas fa-play";
}

function nextTrack() {
  if (playlist.length === 0) return;
  if (isRandom) {
    playRandomTrack();
  } else {
    currentIndex = (currentIndex + 1) % playlist.length;
    playCurrentTrack();
  }
}

document.getElementById("audio-player").addEventListener("ended", function () {
  playNextTrackIfNeeded();
});

function playNextTrackIfNeeded() {
  if (isRepeat) {
    playCurrentTrack();
  } else {
    nextTrack();
  }
}

function playRandomTrack() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * playlist.length);
  } while (randomIndex === currentIndex);
  currentIndex = randomIndex;
  playCurrentTrack();
}

function playCurrentTrack() {
  const track = playlist[currentIndex];

  if (!track) {
    currentIndex = 0;
    playCurrentTrack();
    return;
  }

  playAudio(track.trackName, track.singer, track.trackPath);
}

function previousTrack() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  playCurrentTrack();
}

function playCurrentTrack() {
  const track = playlist[currentIndex];
  if (!track) {
    currentIndex = 0;
    playCurrentTrack();
    return;
  }
  playAudio(track.trackName, track.singer, track.trackPath);
}

function playAudio(trackName, singer, trackPath) {
  const audioPlayer = document.getElementById("audio-player");
  const currentTrackInfo = document.getElementById("current-track-info");

  audioPlayer.src = trackPath;
  audioPlayer.play();
  isPlaying = true;

  currentTrackInfo.textContent = `${trackName} - ${singer}`;
  updatePlayButton();
}

// Xử lý sự kiện khi người dùng kéo thanh range
seekBar.addEventListener("input", function () {
  const seekTime = audioPlayer.duration * (seekBar.value / 100);
  audioPlayer.currentTime = seekTime;
});

// Cập nhật thanh range và thời gian khi audio player thay đổi thời gian phát
audioPlayer.addEventListener("timeupdate", function () {
  const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
  const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
  const totalMinutes = Math.floor(audioPlayer.duration / 60);
  const totalSeconds = Math.floor(audioPlayer.duration % 60);

  currentTimeElement.textContent = `${currentMinutes}:${
    currentSeconds < 10 ? "0" : ""
  }${currentSeconds}`;
  totalTimeElement.textContent = `${totalMinutes}:${
    totalSeconds < 10 ? "0" : ""
  }${totalSeconds}`;

  const progressPercent =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;
  seekBar.value = progressPercent;
});

// Cập nhật tổng thời gian của bài hát khi metadata được tải
audioPlayer.addEventListener("loadedmetadata", function () {
  const totalMinutes = Math.floor(audioPlayer.duration / 60);
  const totalSeconds = Math.floor(audioPlayer.duration % 60);

  totalTimeElement.textContent = `${totalMinutes}:${
    totalSeconds < 10 ? "0" : ""
  }${totalSeconds}`;
});

function updatePlaylistUI() {
  let playlistElement = document.getElementById("playlist");
  playlistElement.innerHTML = "";
  playlist.forEach((track, index) => {
    let li = document.createElement("li");
    li.textContent = `${index + 1}. ${track.trackName} - ${track.singer}`;
    playlistElement.appendChild(li);
    li.addEventListener("click", function () {
      currentIndex = index;
      playCurrentTrack();
    });
  });
}

function togglePlaylist() {
  let playlistModal = document.getElementById("playlist-modal");
  playlistModal.style.display =
    playlistModal.style.display === "block" ? "none" : "block";
}

function addToPlaylistAndPlay(trackName, singer, trackPath) {
  let track = { trackName, singer, trackPath };
  if (playlist.length === 0) {
    playlist.push(track);
    playAudio(trackName, singer, trackPath);
  } else {
    playlist = [track];
    currentIndex = 0;
    playCurrentTrack();
  }
  updatePlaylistUI();
}

function addToPlaylist(trackName, singer, trackPath) {
  let track = { trackName, singer, trackPath };
  if (!playlist.some((t) => t.trackPath === trackPath)) {
    playlist.push(track);
    updatePlaylistUI();

    // Gửi dữ liệu bài hát mới vào cơ sở dữ liệu
    fetch("/tracks/add-to-playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }
}

// Khi người dùng đăng nhập, lấy danh sách phát từ cơ sở dữ liệu
function fetchPlaylist() {
  fetch("/user/playlist")
    .then((response) => response.json())
    .then((data) => {
      playlist = data.playlist;
      updatePlaylistUI();
    })
    .catch((error) => {
      console.error("Lỗi khi lấy danh sách phát:", error);
    });
}

// Event listener để đóng menu tùy chọn khi nhấp bên ngoài
document.addEventListener("click", function (event) {
  if (
    !event.target.classList.contains("options-icon") &&
    !event.target.closest(".options-menu")
  ) {
    document.querySelectorAll(".options-menu").forEach((menu) => {
      menu.classList.remove("open");
    });
  }
});

function toggleOptionsMenu(icon) {
  const optionsMenu = icon.nextElementSibling;
  document.querySelectorAll(".options-menu").forEach((menu) => {
    if (menu !== optionsMenu) {
      menu.classList.remove("open");
    }
  });
  optionsMenu.classList.toggle("open");
}

// Xử lý modal thêm bài hát
var modal = document.getElementById("add-song-modal");
var closeButton = document.querySelector(".modal-content .close");
var addSongBtn = document.getElementById("add-song-btn");
var addSongForm = document.getElementById("add-song-form");

addSongBtn.onclick = function () {
  modal.style.display = "block";
};

closeButton.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

addSongForm.onsubmit = function (event) {
  event.preventDefault();
  modal.style.display = "none";

  var formData = new FormData(this);

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

document.getElementById("track-file").addEventListener("change", function () {
  var filePath = this.value;
  document.getElementById("track-path").value = filePath;
});

var playlistIcon = document.querySelector(".list-track i");
var sidebar = document.createElement("div");
sidebar.classList.add("sidebar");

var playlistUl = document.createElement("ul");
playlistUl.classList.add("playlist");

sidebar.appendChild(playlistUl);
document.body.appendChild(sidebar);

playlistIcon.onclick = function () {
  sidebar.classList.toggle("open");

  if (sidebar.classList.contains("open")) {
    playlistUl.innerHTML = "";
    if (playlist.length > 0) {
      playlist.forEach(function (track, index) {
        var li = document.createElement("li");
        li.textContent = `${index + 1}. ${track.trackName} - ${track.singer}`;
        playlistUl.appendChild(li);

        // Add event listener for each li to play the track
        li.addEventListener("click", function () {
          currentIndex = index;
          playCurrentTrack();
        });
      });
    } else {
      var li = document.createElement("li");
      li.textContent = "Chưa có bài hát nào trong danh sách";
      playlistUl.appendChild(li);
    }
  }
};

document.addEventListener("click", function (event) {
  if (
    !sidebar.contains(event.target) &&
    event.target !== playlistIcon &&
    sidebar.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
  }
});
