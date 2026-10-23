# Mô hình đám mây và thư viện Robotics

## Sử dụng

1. Mở `/assembly` và lắp mô hình ngay, không cần đăng nhập. App tạo không gian khách riêng cho trình duyệt và tự lưu vào TPS.
2. Trong Assembly, mỗi lần lưu bản lắp sẽ được đồng bộ nền sau khoảng 2,2 giây. Khi mất mạng, bản lắp vẫn lưu trên trình duyệt; khi có mạng app tự thử lại.
3. Giao diện người dùng chỉ hiện các dự án đang làm và công cụ lắp ráp. Mục dự án đám mây, thanh trạng thái đồng bộ, thông báo thu nhận và nội dung giới thiệu lưu lên hệ thống được ẩn. Các component vẫn chạy hiệu ứng lưu nền bằng chế độ `silent`; không gỡ chúng khỏi cây React.
4. Không cần người dùng bấm gửi hoặc đăng nhập để quản trị viên thu nhận mô hình. Mọi thao tác duyệt/công khai được thực hiện tại `/admin/library`. Database vẫn chặn xuất bản mô hình rỗng và chụp đúng phiên bản được duyệt.
5. Quản trị viên vào `/admin/library` → **Thu nhận tự động** để xem mô hình của mọi khách và tài khoản, không cần người dùng bấm gửi trước. Chọn **Xem và duyệt**, xoay mô hình 3D rồi duyệt hoặc yêu cầu chỉnh sửa. Các mục Chờ duyệt/Đã công khai/Cần chỉnh sửa giữ các bản chụp đã gửi hoặc đã duyệt; có thể gỡ bản công khai.
6. `/library` xem được khi chưa đăng nhập. Chỉ hiện bản đã duyệt. **Mở bản sao trong Assembly** tạo dự án độc lập trên máy; sửa bản sao không đổi bản công khai.

Khi hai máy sửa cùng một dự án, kiểm tra revision ngăn bản cũ ghi đè lên bản mới. Bản lắp cục bộ vẫn được giữ; chế độ nền không tự giải quyết xung đột bằng cách ghi đè. Nếu đổi tài khoản ở tab khác, editor đang mở dừng đồng bộ. Thùng rác là thao tác trên trình duyệt hiện tại, không xóa dữ liệu đám mây.

## Kết nối TPS

- Supabase project: `wrlfozuzdblljlxwvbst` (TPS).
- Schema API riêng: `robotics`; mọi bảng, hàm và policy mới có tiền tố `robotics_`.
- Bảng `robotics_projects`: bản nháp theo tài khoản hoặc visitor (đúng một chủ sở hữu), có revision chống ghi đè từ phiên bản cũ.
- Bảng `robotics_submissions`: bản chụp lúc gửi, độc lập với các lần sửa bản nháp sau đó.
- Bảng `robotics_private.robotics_reviewers`: danh sách tài khoản duyệt, không được truy cập hoặc tự ghi từ trình duyệt.
- Bảng `robotics_private.robotics_visitors`: UUID trình duyệt và SHA-256 của mã truy cập ngẫu nhiên 256 bit. Không lưu mã truy cập gốc trên database, không đặt mã vào URL hoặc log. Khách chỉ đọc/ghi qua các RPC kiểm tra mã này, không được đọc trực tiếp bảng hoặc tự duyệt.
- Tài khoản duyệt đã cấp: **baotc**. Đăng nhập tên này được ánh xạ tới `baotc@robotics.mindx.edu.vn`. Mật khẩu không lưu trong mã nguồn hoặc tài liệu. Alias này dùng để đăng nhập, không phải hộp thư nhận email khôi phục.
- Không đổi dữ liệu hay quyền schema `public` của các ứng dụng TPS khác.

Client chỉ dùng publishable key. Không đưa service-role key vào trình duyệt. Quyền được kiểm tra bằng RLS và danh sách reviewer trên database; tên hoặc metadata do người dùng sửa không cấp quyền duyệt.

## Cài trên môi trường khác

1. Cấu hình hai biến từ `.env.example`: `NEXT_PUBLIC_ROBOTICS_SUPABASE_URL` và `NEXT_PUBLIC_ROBOTICS_SUPABASE_PUBLISHABLE_KEY`. Với Vercel, đặt cả hai trước khi build/deploy; đây là các biến được đóng gói vào frontend.
2. Cho database mới, chạy lần lượt hai migration `20261023024945_robotics_cloud_projects_and_library.sql` và `20261023040819_robotics_guest_collection.sql` trong `supabase/migrations/`. Hai file SQL tương đương để đọc/kiểm thử là `supabase/robotics-schema.sql` và `supabase/robotics-guest-collection.sql`. Không chạy lại vào TPS đã có cấu trúc này.
3. Trong cấu hình Data API, thêm schema `robotics` vào danh sách exposed schemas, giữ các schema cũ. TPS đã được cấu hình `public, graphql_public, robotics`; không cần cấp thêm quyền schema `public`.
4. Tạo tài khoản qua Supabase Auth. Quản trị viên database thêm UUID tài khoản vào `robotics_private.robotics_reviewers`; không lấy quyền từ `user_metadata`. Không dùng mật khẩu mặc định trong migration.

SQL hỗ trợ chuyển đổi từng bước trong đợt phát triển đã được áp dụng ở TPS. Migration khởi tạo lưu trong repository mô tả trạng thái cuối cho một database mới; không dùng `db reset` trên TPS hoặc áp dụng lại lịch sử đang có.

## Kiểm thử

Không dùng mô hình của người dùng làm dữ liệu công khai. Script tích hợp tạo mô hình tổng hợp có tên `QA Robotics ...` và xóa đúng dự án thử trong khối `finally`, kèm các bản gửi liên quan.

```text
node scripts/test-robotics-database.mjs
node scripts/test-robotics-signature.mjs
node --env-file=.env.local scripts/test-robotics-cloud.mjs
node --env-file=.env.local scripts/test-robotics-guests.mjs
npm run typecheck
npm run build
python scripts/check-encoding.py
```

Script cloud cần `ROBOTICS_TEST_PASSWORD` được cấp tại thời điểm chạy, không ghi trong file. Có thể đặt thêm `ROBOTICS_TEST_EMAIL` và `ROBOTICS_TEST_ORIGIN`. Tài khoản thử cần quyền reviewer. Script dùng Chrome headless và các browser context riêng, không đụng phiên đăng nhập trình duyệt của người dùng.

Kiểm tra database dùng PostgreSQL qua PGlite: quyền sở hữu, tài khoản thay đổi, revision cũ, bản gửi rỗng, chống tự duyệt, bảo vệ snapshot, công khai và gỡ duyệt. Kiểm tra live dùng Supabase Auth/Data API cùng giao diện thật: đăng nhập, duyệt 3D, tìm kiếm, mở bản sao, đồng bộ hai thiết bị, gửi từ editor, xử lý xung đột và giữ bản máy.

Script guests ghi UUID mô hình thử vào `artifacts/robotics-cloud/guest-test-cleanup.json`; host xóa đúng các visitor thử đó (cascade mô hình/snapshot) sau khi các browser context đã đóng. File không chứa mã truy cập khách. Mật khẩu quản trị chỉ cấp lúc chạy.

Advisor có thể báo INFO rằng bảng reviewer/visitor không có policy: đây là chủ ý từ chối toàn bộ truy cập trực tiếp; các hàm private kiểm tra quyền reviewer hoặc mã truy cập khách mới đọc/ghi được. Index reviewer mới chưa được dùng cũng là INFO và được giữ để hỗ trợ khóa ngoại. Các cảnh báo của ứng dụng TPS khác không bị thay đổi trong tính năng này.

Tài khoản vẫn dùng `/account`; các API lưu/đọc theo tài khoản được giữ. Giao diện hiện tại không có danh sách dự án đám mây. Dự án khách gắn với mã trong trình duyệt, không tự chuyển sang tài khoản khác. Nhân bản bản lắp nếu muốn lưu một bản riêng vào không gian khác. Không dùng fingerprint hay thu thập thông tin cá nhân để nhận diện khách.

Phạm vi đồng bộ hiện tại là mô hình Assembly và thông tin gửi duyệt; chương trình Blockly, sa bàn tự chỉnh và tiến độ VR vẫn lưu riêng trên trình duyệt. Xem 3D cần trình duyệt có WebGL.
