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

// Khi người dùng submit form, thực hiện gửi yêu cầu AJAX
addSongForm.onsubmit = function (event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form

  // Lấy dữ liệu từ form
  const trackName = document.getElementById("track-name").value;
  const singer = document.getElementById("singer").value;
  const trackFile = document.getElementById("track-file").files[0];

  // Tạo formData chứa dữ liệu để gửi đi
  const formData = new FormData();
  formData.append("track-name", trackName);
  formData.append("singer", singer);
  formData.append("track-file", trackFile);

  // Gửi yêu cầu AJAX tới endpoint /add-song
  fetch("/add-song", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi khi thêm bài hát");
      }
      return response.text(); // Trả về phản hồi từ server
    })
    .then((data) => {
      console.log(data); // Log phản hồi từ server
      modal.style.display = "none"; // Ẩn popup sau khi thêm bài hát thành công
      // Có thể thêm các xử lý khác tại đây nếu cần
    })
    .catch((error) => {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi thêm bài hát. Vui lòng thử lại sau.");
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
