let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let playlist = [];
let currentIndex = -1;

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

function updatePlayButton() {
  let playButton = document.getElementById("play-button");
  playButton.className = isPlaying ? "fas fa-pause" : "fas fa-play";
}

function nextTrack() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex + 1) % playlist.length;
  playCurrentTrack();
}

function previousTrack() {
  if (playlist.length === 0) return;
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  playCurrentTrack();
}

function playCurrentTrack() {
  const track = playlist[currentIndex];
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

function addToPlaylist(trackName, singer, trackPath) {
  let track = { trackName, singer, trackPath };
  if (!playlist.some((t) => t.trackPath === trackPath)) {
    playlist.push(track);
    updatePlaylistUI();
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