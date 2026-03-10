/* ==========================================================================
   1. CẤU HÌNH & BIẾN TOÀN CỤC (CONFIG & GLOBALS)
   ========================================================================== */
const SUPABASE_URL = 'https://qqcmgrqjfvacajlhdbhb.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxY21ncnFqZnZhY2FqbGhkYmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTcxMzcsImV4cCI6MjA4NzQ5MzEzN30.InyPceZ1_6wUv7FKCHWSZ7biMEfBQhehldEKlAc6ewM';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentRotation = 0; // Lưu góc xoay của vòng quay
let isSpinning = false;  // Trạng thái đang xoay hay không

/* ==========================================================================
   2. KHỞI TẠO HỆ THỐNG (INITIALIZATION)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Render các vùng nội dung động
    renderHeader();
    renderNavbar();
    renderFooter();

    // Khởi tạo các tính năng logic
    loadSpinCount();   
    loadInitialStats();
    enableMouseWheelScroll();
    initModal();
    initModalEvents();
    enableMouseWheelScroll();
    
    // Giả lập số người online (tạo sự sống động cho web)
    const onlineEl = document.getElementById('online-count');
    if (onlineEl) onlineEl.innerText = Math.floor(Math.random() * 10) + 5;
});

/* ==========================================================================
   3. QUẢN LÝ GIAO DIỆN & RENDER (UI RENDERING)
   ========================================================================== */

// --- Render Header & Hiệu ứng Tết ---
function renderHeader() {
    const headerContainer = document.getElementById('header-dynamic-container');
    if (!headerContainer) return;

    headerContainer.innerHTML = `
        <div id="tet-blossoms"></div>
        <div class="lantern-container left"><div class="lantern">🏮<span>An Khang </span></div></div>
        <div class="lantern-container right"><div class="lantern">🏮<span> Thịnh Vượng </span></div></div>
        <div class="header">
            <div class="tet-badge">🧧 Chúc Mừng Năm Mới 🧧</div>
            <h1 class="logo">ĐẬU HỦ THÚI CÔ ÚT</h1>
            <p class="sub-logo">Món ăn đường phố - Hương vị khó quên</p>
        </div>
    `;
}

function renderNavbar() {
    const navElement = document.querySelector('.navbar');
    if (!navElement) return;

    const menuItems = [
        { 
            name: "TRANG CHỦ", 
            link: "index.html",
            submenu: [
                { name: "🍢 Đậu Hủ Thúi", link: "dau-hu-thui.html" },
                { name: "🎋 Đậu Hủ Lông", link: "dau-hu-long.html" },
                { name: "🎋 Đậu Hủ Trường Sa", link: "dau-hu-truong-sa.html" },
                { name: "🎋 Tải Xuống", link: "download.html" },
                { name: "📞 Liên Hệ", link: "lien-he.html" }
            ]
        },
        { name: "ĐẬU HỦ THÚI", link: "dau-hu-thui.html" },
        { name: "ĐẬU HỦ LÔNG", link: "dau-hu-long.html" },
        { name: "ĐẬU HỦ TRƯỜNG SA", link: "dau-hu-truong-sa.html" },
        { name: "TẢI XUỐNG", link: "download.html" },
        { name: "LIÊN HỆ", link: "lien-he.html" }
    ];

    let html = '<ul>';
    menuItems.forEach(item => {
        if (item.submenu) {
            html += `
                <li class="has-submenu">
                    <a href="${item.link}">${item.name} ▾</a>
                    <ul class="submenu">
                        ${item.submenu.map(sub => `<li><a href="${sub.link}">${sub.name}</a></li>`).join('')}
                    </ul>
                </li>`;
        } else {
            html += `<li><a href="${item.link}">${item.name}</a></li>`;
        }
    });
    html += '</ul>';
    navElement.innerHTML = html;
}





function renderFooter() {
    const container = document.getElementById('footer-contact-container');
    if (!container) return;

    container.innerHTML = `
        <div class="footer-info">
            <h3>THÔNG TIN LIÊN HỆ</h3>
            <p>📍 <strong>Địa chỉ:</strong> 438/42 Lê Hồng Phong, P.1, Q.10, TP.HCM</p>
            <p style="margin-bottom: 15px;">📞 <strong>Số điện thoại:</strong></p>
            <div style="display: flex; flex-direction: column; gap: 15px; max-width: 280px; margin: 0 auto 20px auto;">
                <a href="tel:0903266772" class="btn-quick phone" style="text-decoration: none; height: 45px; font-size: 1.2rem; padding: 10px 60px;">📞 0903 266 772</a>
                <a href="tel:0707021719" class="btn-quick phone" style="text-decoration: none; height: 45px; font-size: 1.2rem; padding: 10px 60px; background: #ae9611;">📞 070 702 1719</a>
            </div>
            <p>⏰ <strong>Giờ mở cửa:</strong> 15h30 - 21h00 (Thứ 2 - CN)</p>
            <p style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">🏮 Chúc quý khách năm mới Vạn Sự Như Ý! 🏮</p>
            <p style="font-size: 0.8rem; color: var(--text-brown); margin-top: 5px;">🟢 <span id="online-count">1</span> khách đang xem menu</p>
            <p style="margin-top: 10px; font-size: 0.8rem; color: var(--text-brown);">👀 Đã có <span id="view-count">0</span> lượt ghé thăm tiệm</p>
        </div>

        <div id="orderModal" class="modal">
            <div class="modal-content">
                <h2 style="color: #d0021b;">🧧 Liên hệ đặt hàng</h2>
                <div style="margin: 20px 0; display: flex; flex-direction: column; gap: 12px;">
                    <a href="tel:0903266772" class="btn-delivery" style="background: #d0021b; color:white; text-decoration:none; display:flex; align-items:center; justify-content:center; height:50px; border-radius:10px;">0903 266 772</a>
                    <a href="tel:0707021719" class="btn-delivery" style="background: #f59e0b; color:white; text-decoration:none; display:flex; align-items:center; justify-content:center; height:50px; border-radius:10px;">070 702 1719</a>
                </div>
                <button class="close-btn" id="closeModal">Để sau</button>
            </div>
        </div>
    `;
    
    // Khởi tạo lại sự kiện đóng/mở Modal sau khi đã render
    initModalEvents();
}

function initModalEvents() {
    const modal = document.getElementById("orderModal");
    const closeBtn = document.getElementById("closeModal");
    
    // Tìm tất cả các nút có class 'phone' (nút Gọi ngay)
    // Những nút này sẽ mở Modal thay vì gọi điện trực tiếp ngay lập tức
    document.querySelectorAll('.btn-quick.phone').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault(); // chặn hành động mặc định nếu có
            modal.classList.add('show');
        };
    });

    // Nút đóng modal
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('show');
    }

    // Đóng khi click ra ngoài vùng content của modal
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.classList.remove("show");
        }
    };
}

// --- Hỗ trợ kéo chuột để trượt menu trên PC ---
function enableMouseWheelScroll() {
    const slider = document.querySelector('.navbar ul');
    if (!slider) return;
    let isDown = false, startX, scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        slider.scrollLeft = scrollLeft - (x - startX) * 2;
    });
}

// --- Bộ lọc món ăn ---
function filterMenu(category, btn) {
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ==========================================================================
   5. TÍNH NĂNG ĐẶC BIỆT & DATABASE (FEATURES & STATS)
   ========================================================================== */

// --- Vòng xoay tài lộc ---
async function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    
    const wheel = document.getElementById('wheel');
    const randomDegree = Math.floor(Math.random() * 360) + 1800; // Xoay ít nhất 5 vòng
    currentRotation += randomDegree;
    
    if (wheel) wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(async () => {
        isSpinning = false;
        alert("🧧 Chúc mừng bạn đã nhận được một bao lì xì may mắn!");
        // Cập nhật số lượt xoay lên Supabase
        try {
            const { data: cur } = await supabaseClient.from('stats').select('spins').eq('id', 1).single();
            const newSpins = (cur?.spins || 0) + 1;
            await supabaseClient.from('stats').update({ spins: newSpins }).eq('id', 1);
            document.getElementById('spin-count').innerText = newSpins;
        } catch(e) {}
    }, 4000);
}

// --- Tải số liệu thống kê ---
async function loadSpinCount() {
    try {
        const { data } = await supabaseClient.from('stats').select('spins').eq('id', 1).single();
        if (data && document.getElementById('spin-count')) document.getElementById('spin-count').innerText = data.spins;
    } catch (e) {}
}

async function loadInitialStats() {
    try {
        const { data: cur } = await supabaseClient.from('stats').select('views').eq('id', 1).single();
        const newViews = (cur?.views || 0) + 1;
        await supabaseClient.from('stats').update({ views: newViews }).eq('id', 1);
        document.getElementById('view-count').innerText = newViews;
    } catch (e) { console.error("Lỗi tải stats:", e); }
}

function enableMouseWheelScroll() {
    const slider = document.querySelector('.navbar ul');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // 1. Xử lý cuộn bằng bánh xe chuột (Wheel scroll)
    slider.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        slider.scrollLeft += evt.deltaY;
    });

    // 2. Xử lý kéo chuột để trượt (Drag to scroll)
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'pointer';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'pointer';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Tốc độ trượt
        slider.scrollLeft = scrollLeft - walk;
    });
}