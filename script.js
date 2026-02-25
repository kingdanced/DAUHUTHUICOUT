/**
 * CẤU HÌNH SUPABASE
 */
const SUPABASE_URL = 'https://qqcmgrqjfvacajlhdbhb.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxY21ncnFqZnZhY2FqbGhkYmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTcxMzcsImV4cCI6MjA4NzQ5MzEzN30.InyPceZ1_6wUv7FKCHWSZ7biMEfBQhehldEKlAc6ewM';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentRotation = 0;
let isSpinning = false;
let hasCountedView = false; // Tránh đếm trùng lượt xem trong 1 phiên

document.addEventListener("DOMContentLoaded", () => {
    initBlossoms();    // Hiệu ứng hoa rơi
    loadSpinCount();   // Tải lượt quay
    initModal();       // Khởi tạo Modal (Đã sửa lỗi nhảy trái)
    loadInitialStats();// Tải tổng lượt xem
    
    // Giả lập số người online
    const onlineEl = document.getElementById('online-count');
    if (onlineEl) onlineEl.innerText = Math.floor(Math.random() * 10) + 5;
    
    // Theo dõi chân trang để đếm lượt xem
    const endPoint = document.querySelector('.footer-info'); 
    if (endPoint) footerObserver.observe(endPoint);
});

/**
 * XỬ LÝ MODAL - KHẮC PHỤC LỖI NHẢY CẠNH TRÁI
 */
function initModal() {
    const modal = document.getElementById("orderModal");
    const closeBtn = document.getElementById("closeModal");
    const triggerButtons = document.querySelectorAll(".btn-call-modal, .btn-quick.phone");

    // Hàm mở modal mượt mà
    const openModal = (e) => {
        e.preventDefault();
        modal.style.display = "flex"; // Hiện khung trùm màn hình
        setTimeout(() => {
            modal.classList.add("show"); // Kích hoạt transition (mờ dần + phóng to)
        }, 10);
    };

    // Hàm đóng modal (đợi hiệu ứng xong mới ẩn)
    const closeModal = (e) => {
        if (e) e.preventDefault();
        modal.classList.remove("show"); // Chạy hiệu ứng mờ dần + thu nhỏ
        
        // Đợi đúng 300ms (khớp với transition trong CSS) rồi mới ẩn display
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modal.style.display = "none";
            }
        }, 300);
    };

    triggerButtons.forEach(btn => btn.onclick = openModal);
    if (closeBtn) closeBtn.onclick = closeModal;

    // Đóng khi click ngoài vùng modal-content
    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };
}

/**
 * LỌC MENU
 */
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

/**
 * VÒNG QUAY MAY MẮN
 */
async function loadSpinCount() {
    try {
        const { data } = await supabaseClient.from('wheel_stats').select('total_spins').eq('id', 1).single();
        if (data) document.getElementById('spin-count').innerText = data.total_spins;
    } catch (err) { console.error("Lỗi tải lượt quay"); }
}

async function spinWheel() {
    if (isSpinning) return;
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    isSpinning = true;
    spinBtn.disabled = true;

    const randomDeg = Math.floor(Math.random() * 360);
    currentRotation += 1800 + randomDeg; // Quay ít nhất 5 vòng
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    try {
        const { data } = await supabaseClient.from('wheel_stats').select('total_spins').eq('id', 1).single();
        const newTotal = (data.total_spins || 0) + 1;
        await supabaseClient.from('wheel_stats').update({ total_spins: newTotal }).eq('id', 1);

        setTimeout(() => {
            document.getElementById('spin-count').innerText = newTotal;
            alert("🧧 Chúc mừng năm mới! Bạn nhận được một phần quà may mắn từ Cô Út.");
            isSpinning = false;
            spinBtn.disabled = false;
        }, 4000);
    } catch (err) {
        isSpinning = false;
        spinBtn.disabled = false;
    }
}

/**
 * THỐNG KÊ LƯỢT XEM (FOOTER)
 */
async function loadInitialStats() {
    try {
        const { data } = await supabaseClient.from('wheel_stats').select('total_views').eq('id', 1).single();
        if (data) document.getElementById('view-count').innerText = data.total_views;
    } catch (e) {}
}

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
        if (entry.isIntersecting && !hasCountedView) {
            hasCountedView = true;
            try {
                const { data } = await supabaseClient.from('wheel_stats').select('total_views').eq('id', 1).single();
                const newViews = (data.total_views || 0) + 1;
                await supabaseClient.from('wheel_stats').update({ total_views: newViews }).eq('id', 1);
                document.getElementById('view-count').innerText = newViews;
            } catch (e) {}
        }
    });
}, { threshold: 0.5 });

/**
 * HIỆU ỨNG HOA RƠI
 */
function initBlossoms() {
    const container = document.getElementById('tet-blossoms');
    const icons = ['🌸', '🌼', '🧧'];
    setInterval(() => {
        const blossom = document.createElement('div');
        blossom.className = 'blossom';
        blossom.innerText = icons[Math.floor(Math.random() * icons.length)];
        blossom.style.left = Math.random() * 100 + 'vw';
        blossom.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(blossom);
        blossom.addEventListener('animationend', () => blossom.remove());
    }, 400);
}