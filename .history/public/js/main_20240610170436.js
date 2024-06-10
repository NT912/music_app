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

function confirmDeleteTrack(trackId) {
  var modal = document.getElementById("delete-confirm-modal");
  modal.style.display = "block";

  var confirmDeleteBtn = document.getElementById("confirm-delete-btn");
  var cancelDeleteBtn = document.getElementById("cancel-delete-btn");

  confirmDeleteBtn.onclick = function () {
    deleteTrack(trackId);
    modal.style.display = "none";
  };

  cancelDeleteBtn.onclick = function () {
    modal.style.display = "none";
  };
}

function deleteTrack(trackId) {
  fetch(`/tracks/delete-song/${trackId}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      alert("Bài hát đã được xóa thành công");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu:", error);
    });
}

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length > 0) {
    fetch(`/tracks/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        displaySearchResults(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm:", error);
      });
  } else {
    clearSearchResults();
  }
});

searchInput.addEventListener("blur", function () {
  const inputValue = searchInput.value.trim();
  if (inputValue === "") {
    window.location.href = "/home";
  }
});

function displaySearchResults(results) {
  const trackList = document.getElementById("track-list");
  trackList.innerHTML = "";

  results.forEach((result) => {
    const trackCard = document.createElement("div");
    trackCard.classList.add("track-card");

    const trackName = document.createElement("h2");
    trackName.textContent = result.track_name;

    const singer = document.createElement("p");
    singer.textContent = result.singer;

    const playIcon = document.createElement("i");
    playIcon.classList.add("fas", "fa-play-circle", "play-icon");
    playIcon.onclick = function () {
      addToPlaylistAndPlay(
        result.track_name,
        result.singer,
        result.tracks_path
      );
    };

    const optionsIcon = document.createElement("i");
    optionsIcon.classList.add("fas", "fa-ellipsis-v", "options-icon");
    optionsIcon.onclick = function () {
      toggleOptionsMenu(this);
    };

    const optionsMenu = document.createElement("div");
    optionsMenu.classList.add("options-menu");
    optionsMenu.innerHTML = `
      <a href="#" onclick="addToPlaylist('${result.track_name}', '${result.singer}', '${result.tracks_path}')">Thêm vào danh sách phát</a>
      <a href="#" onclick="confirmDeleteTrack('${result.id}')">Xóa bài hát</a>
    `;

    trackCard.appendChild(trackName);
    trackCard.appendChild(singer);
    trackCard.appendChild(playIcon);
    trackCard.appendChild(optionsIcon);
    trackCard.appendChild(optionsMenu);

    trackList.appendChild(trackCard);
  });
}

function clearSearchResults() {
  const trackList = document.getElementById("track-list");
  trackList.innerHTML = ""; // Xóa bỏ các kết quả tìm kiếm trên giao diện
}

function handleSearchInputBlur() {
  const searchInput = document.getElementById("search-input");
  if (searchInput.value.trim() === "") {
    clearSearchResults();
    fetchInitialTracks();
  }
}

document
  .getElementById("search-input")
  .addEventListener("blur", handleSearchInputBlur);

function fetchInitialTracks() {
  // Gửi yêu cầu đến máy chủ để lấy danh sách các bài hát ban
  fetch("/tracks/initial")
    .then((response) => response.json())
    .then((data) => {
      // Xử lý dữ liệu trả về từ máy chủ và hiển thị danh sách bài hát lên giao diện người dùng
      const trackList = data.tracks;
      displayTrackList(trackList); // Giả sử bạn đã có một hàm displayTrackList để hiển thị danh sách bài hát
    })
    .catch((error) => {
      console.error("Lỗi khi lấy danh sách bài hát ban đầu:", error);
    });
}
