# mindX VR Lab — hướng dẫn sử dụng

Mở [VR Lab](http://localhost:3120/simulation), hoặc chọn **Lập trình ảo** trong dự án Assembly. Hỗ trợ robot mẫu và xe tự lắp từ VEX GO/VEX IQ. CAD, cấu hình dẫn động, chương trình và tiến độ được lưu riêng theo từng robot trên trình duyệt hiện tại.

## Bắt đầu một buổi học

1. Chọn robot mẫu để thử ngay, chọn dự án Assembly đã lưu hoặc nhập JSON Assembly. Xe tự lắp cần ít nhất hai motor, hai bánh, một Brain và một Battery. App báo rõ thiết bị thiếu. Mô hình chưa được kiểm chứng toàn bộ khả năng lắp ngoài đời.
2. Mở **Cấu hình robot**: chọn hai motor trái/phải, đường kính bánh, khoảng cách hai bánh, RPM và hướng tiến CAD. Hiệu chỉnh theo xe thật. Robot mẫu dùng bánh 76 mm và khoảng cách hai bánh 184 mm, khớp hình hiển thị.
3. Chọn một trong tám bài. Mở **Kịch bản STEM** để đọc mục tiêu, hoạt động, gợi ý, ba mức vận dụng và câu hỏi phản tư. Giáo viên có [sổ tay tám bài](http://localhost:3120/simulation/teacher.html), kèm nút in/lưu PDF và thang đánh giá 10 điểm.
4. Kéo khối dưới `when started`. **Nạp mẫu bài này** thay chương trình sau khi xác nhận; dùng làm lời giải tham khảo sau khi học sinh tự thử. File trong Blockly lưu/mở chương trình. **Mẫu: đi 700 mm** là ví dụ di chuyển cơ bản, không phải lời giải cho mọi sân.
5. Nhấn **Chạy**. Dùng **Tạm dừng**, **Tiếp tục**, **Dừng**, **Đặt lại**, **0,1 s** để quan sát. Bước 0,1 s là thời gian mô phỏng, không phải một khối lệnh. Tạm dừng đóng băng chuyển động, lệnh chờ và timer. Reset phục hồi robot, hàng hóa, nam châm, điểm mốc, nét bút và thời gian; giữ code.
6. Theo dõi vị trí, hướng, quãng đường, cảm biến, va chạm và nhật ký Print. Chọn góc theo robot, phối cảnh hoặc từ trên xuống. Bút ảo của chương trình độc lập với công tắc vệt đường đi.
7. Bài gốc hoàn thành sẽ lưu tiến độ. **Xuất kết quả JSON** chứa thời gian, quãng đường, thời điểm hoàn thành và việc có dùng mẫu hay không. Đây là ghi nhận mục tiêu sa bàn, không tự chấm kiến thức STEM. Sân đã chỉnh được đánh dấu riêng và không tính vào tiến độ bài gốc.

## Căn hướng xe CAD

Nếu thân xe nằm ngang so với mũi tên xanh, bấm **Chỉnh mũi xe** ngay trên sân. Mỗi lần xoay thân CAD 90°; chỉnh đến khi mũi thật của xe trùng mũi tên xanh. Đây là hiệu chỉnh thân mô hình, không thay đổi quy ước heading hoặc hướng Drive. Góc được lưu riêng theo dự án, kể cả xe chưa đủ Brain/Battery; việc chạy vẫn yêu cầu đủ phần cứng. Trong Cấu hình robot có thể chọn mũi CAD theo −Z, +X, +Z hoặc −X.

## Tám kịch bản

| Bài | Hoạt động | Minh chứng quan sát |
| --- | --- | --- |
| Xe giao thư | Đi 700 mm, đổi tốc độ và đơn vị | Đúng điểm cuối, so sánh thời gian |
| Robot cứu hộ | Vòng qua chướng ngại | Không xuyên tường, có khoảng hở |
| Nhà máy thông minh | Đường chữ U và My Blocks | Tuyến nhiều đoạn, heading/rotation |
| Xe buýt tự hành | Ba điểm mốc theo thứ tự | Đủ 3/3 mốc, không đi tắt |
| Trạm tái chế | Khoảng cách, nhận màu, If/Else | Dừng trước vật, giải thích nhật ký |
| Kho tự động | Đẩy kiện xanh vào kho xanh | Hàng nằm trọn trong vùng, 1/1 |
| Robot giao hàng | Magnet boost → vận chuyển → drop | Thả đúng kho, 1/1; cầm trên kho chưa tính |
| Robot họa sĩ | Vòng lặp hình vuông cạnh 450 mm | 4/4 mốc, 1800 mm nét, trở về đầu |

Robot mẫu có cảm biến và nam châm ảo. Robot CAD chỉ chạy lệnh cảm biến/cơ cấu khi có thiết bị tương ứng; cảm biến màu và khoảng cách IQ được phân biệt.

## Chỉnh sa bàn

Bật **Chỉnh sa bàn** khi đã dừng; app chuyển góc nhìn trên xuống. Kéo robot, đích, tường, kiện/đĩa, kho hoặc điểm mốc. Tọa độ bám lưới 10 mm. App kiểm tra biên sân, vùng bao xe, tường và chồng lấn vật; vị trí không hợp lệ được trả lại và có thông báo. Không thêm/xóa hoặc đổi kích thước vật trong phiên bản này. **Khôi phục sân** bỏ bố cục riêng và trả về bài gốc. Mẫu bài chỉ dùng cho sân gốc để tránh chạy lời giải sai tọa độ.

## Lệnh và giới hạn vật lý

[Danh mục lệnh](http://localhost:3120/simulation/support.html) được tạo từ cùng registry với toolbox và bộ kiểm tra chương trình. Khối chưa hỗ trợ bị từ chối có thông báo; không âm thầm bỏ qua stack sự kiện. Chỉ một `when started`; My Blocks, tham số số/Boolean/text, biến, danh sách và danh sách 2D được hỗ trợ. Gọi trực tiếp My Block trong Controls cũng khởi tạo biến giống khi chạy chương trình chính.

- Xe là một vật thể cứng chuyển động trên mặt phẳng. Drive/Turn điều khiển cặp motor đã cấu hình như drivetrain. Chưa mô phỏng motor độc lập, tay máy hoặc bánh răng chuyển động.
- Tốc độ lý tưởng ở 100% là `π × đường kính bánh × RPM / 60` mm/s; tốc độ quay tại chỗ là `2 × tốc độ bánh / khoảng cách hai bánh` rad/s. Set heading/rotation đổi mốc đọc, không xoay CAD tức thời. Timeout dừng chuyển động rồi tiếp tục chương trình.
- Va chạm dùng đường tròn bảo thủ bao toàn bộ CAD từ trên xuống, kể cả chi tiết ẩn trong Layers. Dây điện tử được bỏ khỏi hiển thị và vùng bao. Chuyển động chia nhỏ để tránh xuyên tường; khe hẹp có thể bị chặn sớm do vùng bao tròn.
- Cảm biến lý tưởng ở trước xe, chưa lấy vị trí/góc lắp thực tế trong CAD. Bút và tọa độ là công cụ ảo, không phải thiết bị đã lắp vào robot thật.
- Chưa có ma sát, trượt bánh, trọng lực, lật xe, torque, tải, dây điện, xác nhận tính hợp lệ thi đấu, Python/Switch hay toàn bộ các robot/sa bàn thương mại VEX VR. Kết quả phải được kiểm tra lại trên robot thật.
- CAD quá lớn hoặc cụm rời cách xa nhau báo lỗi thay vì tự thu nhỏ kích thước vật lý.

## Dữ liệu và tích hợp

Mô phỏng chỉ đọc Assembly. Cấu hình/bố cục lưu ở `mindx-vr-config:<source>`, tiến độ ở `mindx-vr-progress:<source>`, robot gần nhất ở `mindx-vr-last-source`. Blockly dùng namespace riêng `training:assembly-<platform>-<projectId>:`. Chưa có đăng nhập, nộp bài LMS hoặc đồng bộ tài khoản; đổi máy cần xuất chương trình, mô hình và kết quả.

`app/simulation/page.tsx` điều phối editor Blockly và viewer Three.js cùng origin; message kiểm tra cả origin lẫn cửa sổ gửi. Runtime dùng JS Interpreter sandbox, không chạy code học sinh bằng eval trong trang. Registry `public/simulation/commands.js` định nghĩa các block được nhận. Sa bàn và kịch bản nằm trong `fields.js` và `lessons.js`. Mở rộng mới chỉ bật khi editor có `mode=training&simulation=assembly`; Training cũ giữ hành vi cũ.

## Kiểm tra tái lập

Khởi động server cổng 3120; browser test dùng Chrome context riêng, không đọc/sửa profile người dùng.

```text
node scripts/test-simulation-core.mjs
node scripts/test-simulation-interactions.mjs
node scripts/test-simulation-field-editing.mjs
node scripts/test-simulation-programs.mjs
node scripts/test-simulation-classroom.mjs
node scripts/test-simulation-browser.mjs "đường dẫn mô hình GO.json"
node scripts/test-training-sensors.mjs
node scripts/test-training-pushing.mjs
node scripts/test-training-cargo-size.mjs
node node_modules/typescript/bin/tsc --noEmit
node node_modules/next/dist/bin/next build
python scripts/check-encoding.py
```

Báo cáo kết quả và phạm vi đối chiếu ở `docs/vr-lab-validation-2026-10-22.md`. Bằng chứng máy đọc được ở `artifacts/simulation/`; ảnh browser ở thư mục này và `artifacts/assembly-tests/vr-*.png`.
