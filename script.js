/**
 * CẤU HÌNH SUPABASE
 * Thay thế URL và KEY bằng thông tin của bạn
 */
const SUPABASE_URL = 'https://qqcmgrqjfvacajlhdbhb.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxY21ncnFqZnZhY2FqbGhkYmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTcxMzcsImV4cCI6MjA4NzQ5MzEzN30.InyPceZ1_6wUv7FKCHWSZ7biMEfBQhehldEKlAc6ewM';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Biến điều khiển trạng thái
let currentRotation = 0;
let isSpinning = false;

/**
 * 1. KHỞI TẠO KHI TRANG TẢI XONG
 */
document.addEventListener("DOMContentLoaded", () => {
    initBlossoms(); // Tạo hoa rơi
    loadSpinCount(); // Tải số lượt quay từ DB
    initModal(); // Khởi tạo liên hệ
    
    // Giả lập số người online cho sinh động
    const onlineEl = document.getElementById('online-count');
    if (onlineEl) onlineEl.innerText = Math.floor(Math.random() * 10) + 5;
    filterMenu('all', document.querySelector('.filter-btn'))
});

/**
 * 2. HÀM TẢI SỐ LƯỢT QUAY TỪ DATABASE
 */
async function loadSpinCount() {
    const spinCountElement = document.getElementById('spin-count');
    try {
        const { data, error } = await supabaseClient
            .from('wheel_stats')
            .select('total_spins')
            .eq('id', 1)
            .single();
        
        if (data) {
            spinCountElement.innerText = data.total_spins;
        }
    } catch (err) {
        console.warn("Chưa tải được dữ liệu Supabase - Kiểm tra bảng wheel_stats");
    }
}

/**
 * 3. HÀM XOAY VÀ CỘNG DỒN (QUAN TRỌNG NHẤT)
 */
async function spinWheel() {
    if (isSpinning) return;

    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const spinCountElement = document.getElementById('spin-count');

    isSpinning = true;
    spinBtn.disabled = true;

    // 1. Hiệu ứng xoay (chạy ngay lập tức cho mượt)
    const randomDeg = Math.floor(Math.random() * 360);
    currentRotation += 1800 + randomDeg;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    try {
        // 2. LẤY SỐ MỚI NHẤT TỪ DATABASE (Tránh sai lệch)
        const { data, error: fetchError } = await supabaseClient
            .from('wheel_stats')
            .select('total_spins')
            .eq('id', 1)
            .single();

        if (fetchError) throw fetchError;

        // 3. CỘNG DỒN
        const newTotal = (data.total_spins || 0) + 1;

        // 4. GỬI LẠI LÊN DATABASE
        const { error: updateError } = await supabaseClient
            .from('wheel_stats')
            .update({ total_spins: newTotal })
            .eq('id', 1);

        if (updateError) throw updateError;

        // 5. HIỂN THỊ KẾT QUẢ SAU KHI DỪNG XOAY (4 giây)
        setTimeout(() => {
            spinCountElement.innerText = newTotal;
            alert("🧧 Chúc mừng năm mới! Bạn đã nhận được quà may mắn.");
            isSpinning = false;
            spinBtn.disabled = false;
        }, 4000);

    } catch (err) {
        console.error("Lỗi:", err.message);
        // Nếu lỗi, vẫn mở lại nút để khách quay tiếp
        setTimeout(() => {
            isSpinning = false;
            spinBtn.disabled = false;
        }, 4000);
    }
}

/**
 * 4. LỌC MENU MÓN ĂN
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
 * 5. XỬ LÝ MODAL LIÊN HỆ
 */
function initModal() {
    const modal = document.getElementById("orderModal");
    const closeBtn = document.getElementById("closeModal");
    const triggerButtons = document.querySelectorAll(".btn-call-modal, .btn-quick.phone");

    triggerButtons.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "block";
            setTimeout(() => modal.classList.add("show"), 10);
        };
    });

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.classList.remove("show");
            setTimeout(() => modal.style.display = "none", 300);
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.classList.remove("show");
            setTimeout(() => modal.style.display = "none", 300);
        }
    };
}

/**
 * 6. HIỆU ỨNG HOA RƠI
 */
function initBlossoms() {
    const container = document.getElementById('tet-blossoms');
    if (!container) return;
    const icons = ['🌸', '🌼', '🧧'];

    function createPiece() {
        const blossom = document.createElement('div');
        blossom.className = 'blossom';
        blossom.innerText = icons[Math.floor(Math.random() * icons.length)];
        blossom.style.left = Math.random() * 100 + 'vw';
        blossom.style.animationDuration = (Math.random() * 3 + 2) + 's';
        blossom.style.fontSize = (Math.random() * 10 + 15) + 'px';
        container.appendChild(blossom);
        blossom.addEventListener('animationend', () => blossom.remove());
    }

    setInterval(createPiece, 400); // Cứ 0.4s tạo 1 bông mới
}

let hasCountedView = false; // Đảm bảo 1 lần vào web chỉ tính 1 lượt xem

/**
 * Hàm tăng lượt xem lên Supabase
 */
async function incrementViewCount() {
    if (hasCountedView) return; 

    try {
        // 1. Lấy số lượt xem hiện tại
        const { data, error } = await supabaseClient
            .from('wheel_stats')
            .select('total_views')
            .eq('id', 1)
            .single();

        if (error) throw error;

        const newViews = (data.total_views || 0) + 1;

        // 2. Cập nhật số mới lên DB
        await supabaseClient
            .from('wheel_stats')
            .update({ total_views: newViews })
            .eq('id', 1);

        // 3. Hiển thị lên màn hình (thẻ có id="view-count")
        const viewEl = document.getElementById('view-count');
        if (viewEl) viewEl.innerText = newViews;

        hasCountedView = true; // Đánh dấu đã đếm xong cho phiên này
        console.log("Đã tăng lượt xem thành công!");
    } catch (err) {
        console.error("Lỗi ghi lượt xem:", err.message);
    }
}

/**
 * Theo dõi khi người dùng kéo xuống cuối trang
 */
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Nếu phần tử cuối cùng hiện ra quá 50%
        if (entry.isIntersecting) {
            incrementViewCount();
        }
    });
}, { threshold: 0.5 });

// Bắt đầu theo dõi khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {
    // Tìm phần tử nằm cuối cùng của web (thường là footer hoặc thẻ div cuối)
    const endPoint = document.querySelector('.footer-info'); 
    if (endPoint) {
        footerObserver.observe(endPoint);
    }
    
    // Đừng quên tải số lượt xem cũ khi vừa mở trang
    loadInitialStats();
});

async function loadInitialStats() {
    try {
        const { data } = await supabaseClient.from('wheel_stats').select('total_views').eq('id', 1).single();
        if (data) document.getElementById('view-count').innerText = data.total_views;
    } catch (e) {}
}

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