# Studio 2.0 — khảo sát file cài đặt

Đọc trực tiếp ngày 2026-10-08, không chạy ứng dụng. Thư mục: `C:/Program Files/Studio 2.0`. File version ghi `2.26.7_1`, All-In-One `2.0.1.0`.

## Bằng chứng đã đọc

- `Manual/placing-and-moving-parts.html`: thêm bằng click hoặc kéo thả; xoay bằng phím; tìm bằng tên, mã, kích thước; compatible parts là quan hệ linh kiện được định nghĩa, không phải mọi vật gần nhau.
- `Manual/submodels.html`: gom linh kiện thành cụm, chỉnh cụm, bản sao liên kết, unlink để chỉnh riêng, release để tách cụm.
- `Manual/assigning-parts-to-steps.html`: gán linh kiện vào bước, kéo linh kiện sang bước khác, kéo đổi thứ tự bước.
- `Sample/Banana.io`: ZIP không mã hóa; `model.ldr` chứa dòng linh kiện với tọa độ và ma trận xoay, `0 STEP` phân bước, `0 FILE` / `0 NOFILE` phân cụm. Có `modelv2.ldr`, `model.lxfml`, thumbnail và metadata. Không sao chép hình học LEGO sang thư viện VEX GO.
- `data/CoupledItems.txt`: nhóm quan hệ linh kiện theo mã; `data/renderRotationInfo.txt`: góc trình bày theo mã linh kiện. Những bảng này không chứng minh thuật toán snap hoặc kiểm tra va chạm nội bộ.
- `Tutorial/Snail.io` và `Stage_0.io`: các entry ZIP có cờ mã hóa; chỉ đọc danh sách, không giải mã hoặc đoán mật khẩu.
- `Studio_Data/Managed`: 203 DLL, không có file `.cs`. Đây là bản cài đã biên dịch; chưa đọc được mã nguồn hay thuật toán nội bộ. Không được gọi khảo sát này là đọc toàn bộ source Studio.
- Trang local `Manual/connectivity-grid.html` chỉ ghi “Coming soon”; không có căn cứ lấy thuật toán connectivity từ trang này.

## Áp dụng vào VEX GO

1. Phân biệt tọa độ đặt, mối ghép tương thích và kiểm tra va chạm. Snap vào lưới không xác nhận đã lắp được.
2. Định nghĩa tính tương thích cho từng loại chốt/lỗ/trục, mặt tựa và giới hạn độ sâu từ CAD gốc. Không dùng bảng LEGO cho VEX.
3. Một linh kiện thuộc một bước thêm vào; thứ tự bước tạo các trạng thái tích lũy. Di chuyển bước phải cập nhật những trạng thái sau, tránh đảo ảnh chụp làm linh kiện tự biến mất.
4. Tách cụm khung, truyền động, điện tử; cho phép chỉnh từng chi tiết riêng dù đang thuộc cụm.
5. Hướng dẫn mỗi bước cần hình tổng thể, hình chi tiết mới + số lượng, góc nhìn lưu riêng và chỉ dẫn vị trí ghép. Cụm phụ có hướng dẫn riêng trước bước gá lên khung.
6. Chưa xác minh định dạng trang xuất Instruction Maker của phiên bản cài đặt. Không suy đoán nội dung nhị phân là bằng chứng cho PDF layout/callout/BOM.

## Xe hiện tại

Vẫn là bản bố trí chưa hoàn thiện. Cần xử lý cấn motor bằng kiểm tra hình học mặt gá và khung, không chỉ dời linh kiện cho đẹp. Cần gá motor, gối đỡ bánh trung gian, giữ Brain/pin và gia cố khung trước khi xuất hướng dẫn để học viên lắp thật. Khảo sát file Studio chưa sửa xe và chưa xác nhận xe chạy được.
