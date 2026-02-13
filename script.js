// Hàm lọc danh mục món ăn
function filterMenu(category, btn) {
    // Đổi trạng thái active cho nút
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Lọc các card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Xử lý Modal hiển thị số điện thoại
const modal = document.getElementById("orderModal");
const closeBtn = document.getElementById("closeModal");
const addButtons = document.querySelectorAll(".btn-add");

// Mở modal khi nhấn bất kỳ nút "Thêm vào giỏ" nào
addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = "block";
    });
});

// Đóng modal khi nhấn nút Đóng
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Đóng modal khi nhấn ra ngoài vùng trắng
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}