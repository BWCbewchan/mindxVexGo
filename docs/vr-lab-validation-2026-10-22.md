# VR Lab — kiểm chứng ngày 22/10/2026

## Kết quả và phạm vi

Sản phẩm ở `/simulation` hoàn thành luồng dùng trong lớp: chọn CAD xe GO/IQ hoặc robot mẫu → hiệu chỉnh dẫn động → chọn bài → lập trình Blockly → chạy, tạm dừng, tiến 0,1 s → xem tương tác và dữ liệu → lưu tiến độ, xuất kết quả. Có tám sa bàn, tám kịch bản STEM gốc và sổ tay giáo viên có bản in tại `/simulation/teacher.html`.

Đây là phiên bản có phạm vi rõ ràng của mindX VR Lab, không phải chứng nhận tương đương toàn bộ VEXcode VR. Không thể kiểm chứng mọi chương trình và mọi tổ hợp tham số. Các robot chuyên biệt, sân trả phí, Python/Switch, sự kiện đồng thời, broadcast, cơ cấu tay máy và vật lý tải/ma sát chưa được triển khai.

## Bằng chứng thực thi

| Kiểm tra | Kết quả |
| --- | --- |
| Blockly → generator → JS Interpreter → engine | **134/134 tình huống đạt** |
| Bao phủ registry công bố | **115/115 loại khối** có fixture thực thi hoặc vai trò cấu trúc trong chương trình hợp lệ |
| Bài mẫu hoàn thành | **16/16 lượt**: tám sân × bán kính 100 và 170 mm |
| Hình học sân | Tám sân × bốn bán kính 45/100/135/170 mm hợp lệ; chặn ra biên, đè tường, chồng vật, trùng ID và kích thước sai |
| Luồng lớp học trên Chrome | Kéo vật thật trong canvas, lưới 10 mm, lưu sân riêng, bảo vệ lời giải, khôi phục sân, giao hàng, Reset toàn bộ, vẽ độc lập vệt đường đi, lưu tiến độ, xuất JSON, mở lại chương trình đều đạt |
| Xe tự lắp | File `VEXGO-assembly (9).json` 63 chi tiết được nạp trong context test riêng; hai motor, thông số hiệu chỉnh, launcher Assembly và namespace chương trình đạt; dữ liệu nguồn không đổi |
| Điều kiện từ chối | Sự kiện bumper/timer/broadcast chưa hỗ trợ, nhiều when started và thiếu nam châm đều báo lỗi trước thực thi |
| Sổ tay và tham chiếu | Đủ tám bài render; nút gọi in và CSS print hoạt động; tham chiếu lấy trực tiếp từ registry, không lỗi JavaScript |
| Hồi quy Training | Cảm biến/range/màu/che khuất, va chạm/reverse, hàng mang chạm tường, đẩy hàng, kích thước hàng và giao sai/đúng vùng đều đạt |
| Thao tác trên tab app người dùng | Bài hình vuông hoàn tất: 4/4 mốc, 1800 mm nét, lưu tiến độ 1/8 |

134 tình huống gồm 117 chương trình kiểm tra, một helper số dương chỉ dùng làm shadow và 16 lượt bài mẫu. Khối cấu trúc như prototype, tham số, hàng danh sách 2D và shadow comment được kiểm tra trong XML hợp lệ thay vì ép chạy độc lập. Bao phủ loại khối không có nghĩa bao phủ mọi nhánh/toàn bộ tổ hợp chương trình.

Ảnh và kết quả: `artifacts/simulation/program-results.json`, `command-coverage.json`, `classroom-delivery.png`, `classroom-drawing.png`, `teacher-book.png`. `scripts/check-simulation-coverage.mjs` kiểm tra kết quả và fail nếu registry công bố thêm loại khối chưa có fixture.

Lần chạy lại classroom đầu tiên gặp timeout điều hướng 30 giây khi đồng thời chạy bộ lệnh; lần chạy tuần tự sau đó đạt toàn bộ. Không coi timeout hạ tầng đó là bằng chứng tính năng đạt; kết luận dựa trên lần chạy thành công đầy đủ.

## Những lỗi đã tìm và sửa

- Set heading/rotation từng làm sai ý nghĩa mốc cảm biến. Giờ đổi số đọc và giữ nguyên hướng CAD vật lý.
- Turn to heading/rotation chưa tôn trọng “and don't wait”; timeout, tốc độ 0 và thay tốc độ khi đang chạy đã có kiểm tra hành vi.
- Danh sách/2D list chưa được khởi tạo nên thay phần tử gây undefined. Khởi tạo chung cho chương trình chính và gọi My Block trực tiếp. Số bắt đầu 0, Boolean false, phần tử danh sách 0; kiểm tra giới hạn kích thước.
- Khối Comment thực có shadow `comment_text`; allowlist thiếu shadow khiến chương trình bị chặn. Đã sửa registry và fixture đúng hình dạng toolbox.
- Tổng của danh sách rỗng từng lỗi Reduce. Bộ xử lý danh sách trong sandbox đã sửa và có kiểm tra SUM/MIN/MAX/AVERAGE/MEDIAN/STD_DEV/RANDOM/MODE.
- Bộ lọc trước đây có thể bỏ stack sự kiện chưa hỗ trợ; nay kiểm tra toàn workspace trước khi biên dịch.
- Vật thể và vùng kho từng không hiển thị đầy đủ dù engine có trạng thái; viewer nay render từ cùng trạng thái engine. Reset phục hồi cả vật, nam châm, mốc và bút.
- Xóa bút sau khi đạt mục tiêu vẽ từng giữ goal cũ tới tick sau; giờ cập nhật mục tiêu ngay.
- Lựa chọn robot/sân và cấu hình có rủi ro bị dữ liệu khởi tạo ghi đè khi reload; đã có kiểm tra lưu/mở lại thực tế.

Hai lỗi Comment và gọi My Block trực tiếp được một lượt review độc lập tái hiện; bản sửa đều có tình huống runtime đạt trong bộ 134.

## Đối chiếu nguồn giáo dục

Đã đọc tài liệu chính thức về nhóm lệnh, sa bàn và catalog hoạt động, khảo sát UI miễn phí trên VEX VR và quan sát sân Disk Mover. Không khẳng định đã chạy mọi bài, mọi lệnh hay nội dung cần giấy phép trên VEX VR. Không truy cập vượt giới hạn trả phí.

- [VEX VR Blocks API](https://api.vex.com/vr/home/blocks/index.html) và [Drivetrain](https://api.vex.com/vr/home/blocks/drivetrain.html): đối chiếu chuyển động, heading/rotation, timeout và lệnh không chờ.
- [Drawing](https://api.vex.com/vr/home/blocks/drawing.html), [Logic](https://api.vex.com/vr/home/blocks/Logic/index.html): đối chiếu công cụ vẽ và các cấu trúc chương trình.
- [Playgrounds](https://api.vex.com/vr/home/playgrounds/index.html), [VR Activities](https://education.vex.com/stemlabs/vr/activities), [VR app](https://vr.vex.com/): định hướng nhiệm vụ đi đường, vẽ, nhận màu, đẩy và giao vật. Tám kịch bản trong app được viết riêng.
- [MakeCode courses](https://makecode.microbit.org/courses/) và [micro:bit first lessons](https://www.microbit.org/teach/lessons/first-lessons-with-makecode-and-the-microbit/): tham khảo cách tiến từ dự đoán, thử nghiệm đến giải thích và vận dụng.
- [Open Roberta](https://roberta-home.de/en/lab): tham khảo kết nối lập trình khối, cảm biến và robot mô phỏng/thật; không tuyên bố test toàn nền tảng.
- [Tinkercad Circuits](https://www.tinkercad.com/learn/circuits): chỉ khảo sát trang giới thiệu; không chạy toàn bộ công cụ hoặc bài học mạch điện.

Những nền tảng này giúp xác định cấu trúc hoạt động và phản hồi học tập. Tính năng chỉ được công bố khi có triển khai và bằng chứng trong app này.

## Giới hạn cần biết khi dùng

Xe rigid differential-drive trên mặt phẳng; vùng va chạm tròn bảo thủ theo toàn CAD, dây được loại khỏi vùng bao. Cảm biến đặt lý tưởng trước xe, chưa theo vị trí lắp chi tiết. Chưa mô phỏng lực/ma sát/tải/trượt/lật/điện. Robot mẫu có cảm biến và nam châm ảo; CAD cần đúng thiết bị. Bài sa bàn hoàn thành không tự xác nhận câu trả lời STEM đúng. Tiến độ/chương trình chỉ lưu theo thiết bị và trình duyệt, chưa đồng bộ LMS/tài khoản.

Hướng dẫn và lệnh tái lập đầy đủ ở `docs/assembly-virtual-programming.md`. Không có thao tác commit, push hay deploy trong lượt hoàn thiện này.
