const db = require("../config/db");

function searchTracks(keyword) {
  fetch(`/search?keyword=${keyword}`)
    .then((response) => response.json())
    .then((data) => {
      // Xóa nội dung cũ của danh sách đề xuất (nếu có)
      const suggestionList = document.getElementById("suggestion-list");
      suggestionList.innerHTML = "";

      // Hiển thị danh sách đề xuất mới
      data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name; // Đây là tên của bài hát hoặc ca sĩ
        suggestionList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Lỗi khi gửi yêu cầu tìm kiếm:", error);
    });
}
