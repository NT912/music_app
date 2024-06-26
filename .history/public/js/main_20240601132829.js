let isPlaying = false;
let isRandom = false;
let isRepeat = false;

//Các nút Control
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

function playTrack() {
  isPlaying = !isPlaying;
  let playButton = document.getElementById("play-button");

  if (isPlaying) {
    // Thực hiện thay đổi cho icon play khi đang phát
    playButton.className = "fas fa-pause";
    // Gọi hàm togglePlay() để thay đổi trạng thái phát nhạc
    togglePlay();
    // Thực hiện các hành động khác khi bắt đầu phát nhạc
    // Ví dụ: Hiển thị thông tin bài hát ở footer
  } else {
    // Thực hiện thay đổi cho icon play khi tạm dừng
    playButton.className = "fas fa-play";
    // Gọi hàm togglePlay() để tạm dừng phát nhạc
    togglePlay();
    // Thực hiện các hành động khác khi tạm dừng nhạc
  }
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

// Xử lý AJAX request khi người dùng nhấn nút play
function playTrack() {
  // Gửi yêu cầu AJAX để phát bài hát
  // Ví dụ:
  // $.ajax({
  //     url: '/play',
  //     type: 'POST',
  //     success: function(data) {
  //         // Xử lý phản hồi từ máy chủ nếu cần
  //     }
  // });
}

// Xử lý AJAX request khi người dùng nhấn nút pause
function pauseTrack() {
  // Gửi yêu cầu AJAX để tạm dừng bài hát
  // Ví dụ:
  // $.ajax({
  //     url: '/pause',
  //     type: 'POST',
  //     success: function(data) {
  //         // Xử lý phản hồi từ máy chủ nếu cần
  //     }
  // });
}

// Xử lý AJAX request khi người dùng nhấn nút next
function nextTrack() {
  // Gửi yêu cầu AJAX để chuyển đến bài hát tiếp theo
  // Ví dụ:
  // $.ajax({
  //     url: '/next',
  //     type: 'POST',
  //     success: function(data) {
  //         // Xử lý phản hồi từ máy chủ nếu cần
  //     }
  // });
}

// Xử lý AJAX request khi người dùng nhấn nút previous
function previousTrack() {
  // Gửi yêu cầu AJAX để chuyển đến bài hát trước đó
  // Ví dụ:
  // $.ajax({
  //     url: '/previous',
  //     type: 'POST',
  //     success: function(data) {
  //         // Xử lý phản hồi từ máy chủ nếu cần
  //     }
  // });
}

// Xử lý AJAX request khi người dùng thêm bài hát vào danh sách phát
function saveTrack(trackId) {
  // Gửi yêu cầu AJAX để lưu bài hát vào danh sách phát của người dùng
  // Ví dụ:
  // $.ajax({
  //     url: '/save-track',
  //     type: 'POST',
  //     data: { trackId: trackId },
  //     success: function(data) {
  //         // Xử lý phản hồi từ máy chủ nếu cần
  //     }
  // });
}
