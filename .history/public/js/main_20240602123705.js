let isPlaying = false;
let playlist = [];

function togglePlay() {
  const audioPlayer = document.getElementById("audio-player");
  const playButton = document.getElementById("play-button");

  if (isPlaying) {
    audioPlayer.pause();
    playButton.className = "fas fa-play";
  } else {
    audioPlayer.play();
    playButton.className = "fas fa-pause";
  }

  isPlaying = !isPlaying;
}

function changeTrack(step) {
  if (playlist.length === 0) return;

  const currentTrackInfo = document
    .getElementById("current-track-info")
    .innerText.split(" - ")[0];
  const currentIndex = playlist.findIndex(
    (track) => track.trackName === currentTrackInfo
  );
  const newIndex = (currentIndex + step + playlist.length) % playlist.length;

  playAudio(
    playlist[newIndex].trackName,
    playlist[newIndex].singer,
    playlist[newIndex].trackPath
  );
}

function nextTrack() {
  changeTrack(1);
}

function previousTrack() {
  changeTrack(-1);
}

function playAudio(trackName, singer, trackPath) {
  const audioPlayer = document.getElementById("audio-player");
  const currentTrackInfo = document.getElementById("current-track-info");
  const playButton = document.getElementById("play-button");

  audioPlayer.src = trackPath;
  audioPlayer.play();
  isPlaying = true;
  currentTrackInfo.textContent = `${trackName} - ${singer}`;
  playButton.className = "fas fa-pause";
}

function updatePlaylistUI() {
  const playlistElement = document.getElementById("playlist");
  playlistElement.innerHTML = "";
  playlist.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${track.trackName} - ${track.singer}`;
    li.addEventListener("click", () =>
      playAudio(track.trackName, track.singer, track.trackPath)
    );
    playlistElement.appendChild(li);
  });
}

function togglePlaylist() {
  const playlistModal = document.getElementById("playlist-modal");
  playlistModal.style.display =
    playlistModal.style.display === "block" ? "none" : "block";
}

function addToPlaylist(trackName, singer, trackPath) {
  const track = { trackName, singer, trackPath };
  if (!playlist.some((t) => t.trackPath === trackPath)) {
    playlist.push(track);
    updatePlaylistUI();
  }
}

document.addEventListener("click", function (event) {
  if (
    !event.target.classList.contains("options-icon") &&
    !event.target.closest(".options-menu")
  ) {
    document
      .querySelectorAll(".options-menu")
      .forEach((menu) => menu.classList.remove("open"));
  }

  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(event.target) &&
    event.target !== playlistIcon
  ) {
    sidebar.classList.remove("open");
  }
});

function toggleOptionsMenu(icon) {
  const optionsMenu = icon.parentElement.querySelector(".options-menu");
  optionsMenu.classList.toggle("open");
}

// Handle sidebar toggle
const playlistIcon = document.querySelector(".list-track i");
const sidebar = document.createElement("div");
sidebar.classList.add("sidebar");

const playlistUl = document.createElement("ul");
playlistUl.classList.add("playlist");
sidebar.appendChild(playlistUl);
document.body.appendChild(sidebar);

playlistIcon.onclick = function () {
  sidebar.classList.toggle("open");
  updatePlaylistUI();
};

// Handle modal toggle
const modal = document.getElementById("add-song-modal");
const closeButton = document.querySelector(".modal-content .close");
const addSongBtn = document.getElementById("add-song-btn");

addSongBtn.onclick = () => (modal.style.display = "block");
closeButton.onclick = () => (modal.style.display = "none");
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

document.getElementById("track-file").addEventListener("change", function () {
  const filePath = this.value;
  document.getElementById("track-path").value = filePath;
});

document.getElementById("add-song-form").onsubmit = function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  fetch("/tracks/add-song", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      alert("Bài hát đã được thêm thành công");
      window.location.href = "/home";
    })
    .catch((error) => console.error("Lỗi khi gửi yêu cầu:", error));
};
