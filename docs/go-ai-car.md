# Xe mẫu VEX GO nạp bằng JSON / AI

Mô hình tham chiếu: 54 chi tiết, 2 Motor, 1 Brain, 1 Battery, 4 bánh (2 Gray Wheel với Tire, 2 Blue Wheel). Nằm trong giới hạn 1 bộ GO. JSON chứa mã CAD, tọa độ và các điểm nối thật; không phải mã minh họa.

## Cách nạp

Mở một dự án VEX GO → Help → AI / API & MCP → Điền JSON xe mẫu 2 motor → Lắp mô hình từ JSON / AI. Nút này thay mô hình đang mở; có thể Ctrl+Z. Nên dùng dự án mới khi muốn giữ một bản lắp khác.

Hoặc dùng API cùng origin:

```js
await window.assemblyAPI.ready;
const response = await fetch('/assembly/examples/go-car-two-motors.json');
if (!response.ok) throw new Error('Không tải được JSON xe');
await window.assemblyAPI.loadJSON(await response.json());
const state = await window.assemblyAPI.getState();
console.log(state.parts.length, state.buildGuide.ready);
```

## Các nhóm bước tương ứng với 31 bước app tạo

1. Bước 1–3: chuẩn bị Motor đầu tiên với Green Connector và Orange Standoff.
2. Bước 4–8: ghép cụm dầm, giá đỡ và hai Large White Plate; chuẩn bị chốt trong các cụm nhỏ trước khi ghép.
3. Bước 9–12: lắp chốt cố định Brain và Battery lên các tấm đỡ.
4. Bước 13–21: hoàn thiện khung, connector, Green Pin và giá đỡ Motor thứ hai.
5. Bước 22–27: gắn hai Green Shaft vào Motor; lắp hai Blue Wheel và hai Gray Wheel vào các trục/chốt tương ứng.
6. Bước 28–31: thêm Shaft Collar và Spacer để giữ các bánh.

## Kết quả kiểm tra và giới hạn

Đã kiểm tra mã linh kiện, liên kết CAD, tồn kho và va chạm có lấy mẫu; không phát hiện thân chi tiết xuyên nhau. Đã nạp thành công trên WebGL và khi WebGL bị tắt. Đây là xe tham chiếu có sẵn trong repo, chưa lắp thử bằng bộ kit thật; kiểm tra CAD không thay thế thử nghiệm vật lý.

Khi không có WebGL, app hiển thị danh sách chi tiết, tọa độ, liên kết và bước lắp. PDF trong chế độ này là hướng dẫn dữ liệu, không có ảnh 3D. Có WebGL thì giữ cách xuất ảnh/PDF 3D hiện có.
