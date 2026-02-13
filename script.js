// 1. Hàm lọc món ăn (giữ nguyên để web hoạt động bình thường)
function filterMenu(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// 2. Xử lý hiện bảng số điện thoại
const modal = document.getElementById("orderModal");
const closeBtn = document.getElementById("closeModal");

// Tìm tất cả các nút có class btn-call-modal
const callButtons = document.querySelectorAll(".btn-call-modal");

callButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Chặn không cho tự gọi ngay lập tức
        e.preventDefault(); 
        // Hiện bảng số điện thoại lên
        modal.style.display = "block";
    });
});

// Bấm nút "Để sau" thì đóng bảng
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Bấm ra ngoài vùng tối cũng đóng bảng
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}