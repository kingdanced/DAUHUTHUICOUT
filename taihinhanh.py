import os
import requests
import sys

# 1. Cau hinh duong dan luu file (Dung 'r' de tranh loi duong dan Windows)
save_path = r"D:\LEON - SAVE\3.LEN TO KHAI\GIAO TRINH\HTML\hinhanh"

# 2. Danh sach du lieu hinh anh
products = [
    {"name": "dau-hu-thui", "url": "https://images.unsplash.com/photo-1524350303351-764724859f51?q=80&w=800"},
    {"name": "dau-hu-long", "url": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800"},
    {"name": "tra-sua", "url": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800"},
    {"name": "tra-trai-cay", "url": "https://images.unsplash.com/photo-1544787210-2211d247156a?q=80&w=800"},
    {"name": "matcha-latte", "url": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=800"},
    {"name": "tra-xoai-chanh-day", "url": "https://images.unsplash.com/photo-1540265003004-768650a322c9?q=80&w=800"},
    {"name": "tra-dao-vai", "url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800"},
    {"name": "tra-oi-hong", "url": "https://images.unsplash.com/photo-1499638472904-ea5c6178a300?q=80&w=800"},
    {"name": "nuoc-cam", "url": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=800"}
]

def download_images():
    # Tao thu muc neu chua ton tai
    if not os.path.exists(save_path):
        try:
            os.makedirs(save_path)
            print(f"--- Da tao thu muc: {save_path} ---")
        except Exception as e:
            print(f"Loi khi tao thu muc: {e}")
            return

    print("Dang bat dau tai anh... Vui long cho trong giay lat.")
    
    count = 0
    for item in products:
        try:
            # Gui yeu cau tai anh
            response = requests.get(item['url'], stream=True, timeout=10)
            
            if response.status_code == 200:
                # Dat ten file theo mon an
                file_name = f"{item['name']}.jpg"
                full_file_path = os.path.join(save_path, file_name)
                
                # Ghi du lieu vao file
                with open(full_file_path, 'wb') as f:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
                
                count += 1
                print(f"[{count}] Tai thanh cong: {file_name}")
            else:
                print(f"Loi {response.status_code} khi tai: {item['name']}")
                
        except Exception as e:
            print(f"Loi khi tai {item['name']}: {e}")

    print("\n" + "="*30)
    print(f"HOAN TAT! Da tai {count}/{len(products)} anh vao thu muc.")
    print("="*30)

if __name__ == "__main__":
    download_images()