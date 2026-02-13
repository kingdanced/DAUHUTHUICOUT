import React, { useState, useEffect } from 'react';
import { ShoppingCart, Phone, MapPin, Facebook, Instagram, Trash2, Plus, Minus, X, Menu, Clock, Heart } from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const products = [
    // Menu Đậu Hủ (Nền hồng nhẹ)
    {
      id: 1,
      name: "Đậu hủ thúi",
      subName: "Stinky Tofu",
      price: 40,
      category: "Đậu hủ",
      description: "Đậu hủ chiên giòn tan, rưới sốt đen đậm đà theo công thức riêng của Cô Út.",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-pink-50"
    },
    {
      id: 2,
      name: "Đậu hủ lông",
      subName: "Moldy Tofu",
      price: 40,
      category: "Đậu hủ",
      description: "Đậu hủ lên men tự nhiên độc đáo, vị béo ngậy đặc trưng.",
      image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-pink-50"
    },
    // Menu Nước (Trà sữa Bin Bin - Nền vàng nhẹ)
    {
      id: 3,
      name: "Trà sữa",
      subName: "Bin Bin Milk Tea",
      price: 20,
      category: "Đồ uống",
      description: "Vị trà sữa truyền thống thơm béo, đậm đà khó quên.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 4,
      name: "Trà trái cây",
      subName: "Fresh Fruit Tea",
      price: 25,
      category: "Đồ uống",
      description: "Sự kết hợp hoàn hảo của trà và trái cây tươi mát.",
      image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 5,
      name: "Matcha Latte",
      subName: "Sữa yến mạch",
      price: 35,
      category: "Đồ uống",
      description: "Matcha thơm lừng hòa quyện cùng sữa yến mạch béo nhẹ.",
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 6,
      name: "Matcha sữa gấu",
      subName: "Bear Milk Matcha",
      price: 30,
      category: "Đồ uống",
      description: "Hương vị matcha độc đáo cùng sữa gấu thơm béo.",
      image: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 7,
      name: "Trà xoài chanh dây",
      subName: "Mango Passion",
      price: 20,
      category: "Đồ uống",
      description: "Vị chua ngọt bùng nổ, giải nhiệt cực tốt.",
      image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 8,
      name: "Trà đào / Trà vải",
      subName: "Peach / Lychee Tea",
      price: 20,
      category: "Đồ uống",
      description: "Hương thơm dịu dàng từ đào và vải tươi.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 9,
      name: "Trà ổi hồng",
      subName: "Pink Guava Tea",
      price: 20,
      category: "Đồ uống",
      description: "Thanh mát vị ổi hồng tự nhiên.",
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 10,
      name: "Trà dâu / Trà mận",
      subName: "Strawberry / Plum",
      price: 20,
      category: "Đồ uống",
      description: "Vị ngọt thanh từ dâu tây và mận đỏ.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 11,
      name: "Cam vắt / Cam sữa",
      subName: "Fresh Orange",
      price: 20,
      category: "Đồ uống",
      description: "Nước cam tươi nguyên chất bổ sung vitamin.",
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    },
    {
      id: 12,
      name: "Tắc xí muội",
      subName: "Salted Kumquat",
      price: 20,
      category: "Đồ uống",
      description: "Món giải khát truyền thống mặn ngọt hài hòa.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-yellow-50"
    }
  ];

  const categories = ['Tất cả', 'Đậu hủ', 'Đồ uống'];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity * 1000), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeCategory === 'Tất cả' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-stone-100 rounded-full">
              <Menu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-black text-amber-700 tracking-tighter uppercase italic">
              Đậu Hủ Thúi Cô Út
            </h1>
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#" className="hover:text-amber-600 transition">Trang chủ</a>
            <a href="#menu" className="hover:text-amber-600 transition">Thực đơn</a>
            <a href="#contact" className="hover:text-amber-600 transition">Liên hệ</a>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 bg-stone-900 text-white rounded-full hover:bg-amber-600 transition">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-16 px-4 text-center bg-gradient-to-b from-amber-50 to-stone-50">
        <h2 className="text-4xl md:text-6xl font-black text-stone-900 mb-4 uppercase leading-none">
          Mùi hương nồng nàn <br />
          <span className="text-amber-600 italic">Vị ngon khó cưỡng</span>
        </h2>
        <p className="text-stone-500 italic max-w-xl mx-auto mb-8 text-lg">"Hương vị truyền thống từ Cô Út hòa quyện cùng sự thanh mát từ Bin Bin"</p>
        <div className="flex justify-center gap-4">
          <a href="#menu" className="px-8 py-3 bg-amber-600 text-white rounded-full font-bold shadow-lg hover:bg-amber-700 transition">Gọi món ngay</a>
        </div>
      </header>

      {/* Menu Filter */}
      <section id="menu" className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-center gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all border-2 whitespace-nowrap ${
                activeCategory === cat ? 'bg-amber-600 border-amber-600 text-white' : 'bg-white border-stone-200 text-stone-500 hover:border-amber-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className={`${product.bgColor} rounded-[2rem] p-4 transition-all hover:scale-[1.02] shadow-sm border border-black/5 flex flex-col`}>
              {/* Image Frame */}
              <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl border-2 border-white shadow-inner bg-white">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-[#ffdd00] border-2 border-[#b8860b] text-[#8b0000] px-2 py-1 rounded-md font-black text-lg shadow-sm">
                  {product.price}K
                </div>
              </div>
              
              <div className="flex-1 flex flex-col items-center text-center">
                <h3 className="text-lg font-black text-[#d00000] uppercase tracking-tight leading-tight">{product.name}</h3>
                <span className="text-xs font-bold text-stone-400 uppercase italic mb-2">{product.subName}</span>
                <p className="text-xs text-stone-500 mb-4 line-clamp-2 px-2 leading-relaxed italic">"{product.description}"</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="mt-auto w-full py-2 bg-stone-900 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#f2f2f2] pt-16 pb-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-amber-700 uppercase italic leading-none">Đậu Hủ Thúi Cô Út</h2>
            <p className="text-stone-500 text-sm max-w-sm">Hệ thống Đậu Hủ Thúi & Trà Sữa Bin Bin chính gốc tại Quận 10.</p>
            <div className="flex justify-center md:justify-start gap-3">
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:text-amber-600"><Facebook size={20}/></a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:text-amber-600"><Instagram size={20}/></a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-stone-400">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-3 text-stone-600">
                <MapPin size={18} className="text-amber-600 shrink-0" />
                <span className="text-sm">438/42 Lê hồng phong, P.1, Q.10, HCM</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-stone-600">
                <Phone size={18} className="text-amber-600 shrink-0" />
                <span className="font-bold underline decoration-amber-500 underline-offset-4">0903 266 772</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-stone-400">Giờ mở cửa</h4>
            <div className="bg-amber-100/50 p-4 rounded-2xl border border-amber-200 inline-block w-full">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-800 mb-1">
                <Clock size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Phục vụ</span>
              </div>
              <p className="text-xs text-stone-500 font-bold mb-1">Thứ 2 — Chủ Nhật</p>
              <p className="text-2xl font-black text-stone-900 tracking-tighter">15:30 — 21:00</p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-stone-200 text-center text-stone-400 text-[10px] uppercase tracking-widest">
          © 2024 Đậu Hủ Thúi Cô Út x Trà Sữa Bin Bin. Made with <Heart size={10} className="inline text-red-500 mx-1" />
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-in">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic">Giỏ hàng</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-300 italic">Giỏ hàng đang trống...</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                      <p className="text-xs text-stone-400">{item.price}K</p>
                    </div>
                    <div className="flex items-center gap-2 border rounded-lg px-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus size={12}/></button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus size={12}/></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 bg-stone-50 border-t space-y-4">
                <div className="flex justify-between text-2xl font-black">
                  <span>TỔNG:</span>
                  <span className="text-amber-700">{cartTotal.toLocaleString()}đ</span>
                </div>
                <button className="w-full py-4 bg-amber-600 text-white font-black rounded-2xl shadow-lg hover:bg-amber-700 transition uppercase tracking-widest">Thanh toán ngay</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.2s linear; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default App;