// 1. Hàm lọc món ăn
function filterMenu(category, btn) {
    // Đổi trạng thái nút
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Lọc card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// 2. Xử lý Modal
const modal = document.getElementById("orderModal");
const closeBtn = document.getElementById("closeModal");
const callButtons = document.querySelectorAll(".btn-call-modal");

// Mở modal với hiệu ứng
callButtons.forEach(btn => {
    btn.onclick = function(e) {
        e.preventDefault(); 
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
    };
});

// Đóng modal
function hideModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

closeBtn.onclick = hideModal;

window.onclick = function(event) {
    if (event.target == modal) {
        hideModal();
    }
}