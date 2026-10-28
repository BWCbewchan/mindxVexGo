# Kết quả kiểm thử AI / API & MCP

Ngày: 25/10/2026. Phiên bản API: **1.2**. Kiểm thử trên bản production local tại `http://localhost:3120`, sau khi `npm run build` thành công.

## Kết quả

| Phạm vi | Kết quả và bằng chứng |
|---|---|
| Đặc tả tham số | 206 trường hợp đạt: mọi ví dụ lệnh, trường thiếu/thừa, sai kiểu, giá trị rỗng, ID trùng, số không hữu hạn, giới hạn tọa độ, kit và object từ ngữ cảnh khác |
| API VEX GO | Đủ 31 lệnh, 86 kết quả gọi trong kịch bản; không có lỗi JavaScript |
| API VEX IQ | Đủ 31 lệnh, 86 kết quả gọi trong kịch bản; không có lỗi JavaScript |
| Demo từ trang cha qua iframe | Khung xe 11 chi tiết dựng bằng 23 lệnh; xe hai motor 54 chi tiết dựng từ đầu bằng 109 lệnh. Cả hai không phát hiện va chạm xuyên thân |
| Gắn chi tiết | Thêm thanh/pin, tìm cặp điểm nối, gắn, tháo, snap, từ chối chuỗi khớp vòng |
| Group / duplicate | Sao chép cụm giữ khớp nội bộ, ID mới, ánh xạ ID cũ/mới; tách group và xóa bản sao |
| Bảo vệ bản lắp | Khóa layer/group, vượt kit và va chạm được từ chối; dữ liệu mô hình trước/sau lỗi bằng nhau |
| Hàng đợi API | Các lệnh chạy tuần tự; sửa object đầu vào sau khi gửi không làm đổi lệnh đã xếp hàng |
| Guide / PDF | GO và IQ đều gọi xuất thành công, có trang hoàn chỉnh; lưu PDF thử từ cụm thanh + pin |
| MCP stdio thật | Đủ 8 tool; ghép nối, đọc, sửa, gắn, sao chép, xuất guide IQ và ngắt kết nối |
| Hủy từ MCP host | Gửi `notifications/cancelled` thật; hàng đợi nhận signal và gỡ yêu cầu chưa chuyển cho editor |
| Relay | Token/origin/Host, origin của phiên, quyền chỉ đọc, tranh chấp ghép nối, hủy trước/sau chuyển, timeout, kết quả muộn, kết quả trùng và lease |
| Help | Tìm hướng dẫn, phím tắt, tour, Escape/focus; kiểm tra API chỉ đọc, chọn lệnh, kiểm tra JSON, chạy lệnh và thông báo lỗi |
| Vòng đời phiên | Mở lại Help khi đang ghép nối không tạo phiên thứ hai; import mô hình khác ngắt quyền AI cũ |
| Giao diện | Rà ảnh desktop và màn hình 390×844; hộp Help không tràn ngang |
| Kiểm tra dự án | Build, TypeScript, kiểm thử API cũ và kit policy đều đạt |

Các số trên là phạm vi kiểm thử đã thực hiện, không phải xác suất không còn lỗi. Bộ test dùng trình duyệt và mô hình riêng, không sửa các dự án đang làm của người dùng. Các tình huống hủy sau khi chuyển và timeout được mô phỏng ở relay; tín hiệu hủy trước khi chuyển được kiểm thử xuyên qua SDK stdio thật.

Test dựng xe lớn chạy bằng GPU phần mềm cần nhiều thời gian hơn các cụm nhỏ; ngân sách chờ toàn kịch bản được tăng từ 90 lên 240 giây và kịch bản hoàn tất. Đây không phải số đo tốc độ trên máy học viên hoặc bản Vercel.

## Những lỗi/điểm yếu đã sửa

1. API từng bỏ qua tên tham số viết sai và tự đổi kiểu số sang chuỗi khi tìm linh kiện. Cả API và MCP nay dùng chung kiểm tra schema, trả đúng đường dẫn trường cần sửa.
2. Trình thử JSON từng biến `args: null` thành `{}`. Nay giữ nguyên đầu vào và từ chối đúng như API.
3. Đầu vào lệnh xếp hàng từng có thể bị caller sửa trước khi chạy. Nay sao chép giá trị ngay khi nhận yêu cầu.
4. Kết quả muộn sau timeout có thể làm bridge ngắt kết nối. Nay nhận biết yêu cầu đã hết hạn/hủy, xác nhận nhận kết quả rồi loại bỏ; không chạy lại lệnh ghi.
5. Tín hiệu hủy phải lấy từ `context.mcpReq.signal` của SDK hiện tại. Test stdio đã xác nhận signal đến hàng đợi.
6. Khi đóng/mở lại Help giữa lúc kết nối, nút kết nối trước đây có thể tạo yêu cầu cạnh tranh. Nay trạng thái đang kết nối được giữ và khóa nút đúng lúc.
7. Import file trong editor cũ có thể thay mô hình bên dưới phiên AI đang ghép nối. Nay thao tác import ngắt phiên trước khi thay dự án.
8. Kiểm tra prototype theo một cửa sổ từ chối object JSON của trang cha gọi API trong iframe. Nay nhận object JSON thường từ cửa sổ cùng origin, đồng thời vẫn từ chối instance Date/class. Demo bốn bánh đã dựng lại được bằng 23 lệnh API.

## Dùng ngay trong app

Mở một dự án GO/IQ → **Help → AI / API & MCP**.

- **Kiểm tra API (chỉ đọc)**: kiểm tra phiên bản, mô hình, catalog và bộ kit; không thêm chi tiết.
- **Chọn lệnh API**: có ví dụ và schema từng lệnh. `Điền ID từ lựa chọn` lấy ID chi tiết đang chọn; với `setGroup` lấy ID group của chi tiết.
- **Kiểm tra JSON**: tìm lỗi tham số trước khi chạy. Chỉ khi bấm **Chạy lệnh API** thì lệnh sửa mới thay mô hình.
- **Kết quả / chẩn đoán**: xem mã lỗi, gợi ý, request ID, thời gian và 60 kết quả gần nhất. Có thể tải JSON đầy đủ khi bản xem trước đã rút gọn.

### Kết nối AI qua MCP

Cần Node 20+ và repo có đủ dependency (`npm install`) trên cùng máy với trình duyệt. Thêm vào cấu hình MCP của ứng dụng AI. Ví dụ JSON:

```json
{"mcpServers":{"mindx-assembly":{"command":"node","args":["D:/mindXLeader/VEXGO_HANDLE_MINDX/scripts/assembly-mcp.mjs"]}}}
```

Với Codex, cấu hình tương đương:

```toml
[mcp_servers.mindx_assembly]
command = "node"
args = ["D:/mindXLeader/VEXGO_HANDLE_MINDX/scripts/assembly-mcp.mjs"]
```

Nạp lại kết nối MCP trong host; gọi `assembly_pairing_info`, dán link trả về vào Help rồi kết nối. Mặc định chỉ đọc; chọn quyền sửa trước khi kết nối nếu muốn AI lắp. Cấu hình host không được tự cài/thay đổi bởi lần nâng cấp này.

Ví dụ yêu cầu AI: “Đọc trạng thái và kit của mô hình đang ghép nối. Tìm các điểm nối tương thích của hai chi tiết đang chọn. Báo cặp lỗ và độ sâu phù hợp, rồi thực hiện attach bằng API; kiểm tra fit và giải thích kết quả.”

Tám tool: `assembly_pairing_info`, `assembly_status`, `assembly_diagnostics`, `assembly_disconnect`, `assembly_api_reference`, `assembly_command_help`, `assembly_read`, `assembly_edit`.

## Giới hạn cần hiểu đúng

- `getConnectionOptions` xét loại điểm nối; kết quả chưa chứng minh đường đưa chi tiết vào hoặc độ chắc cơ khí. `attach` vẫn phải qua kiểm tra của editor.
- CAD fit có lấy mẫu. Các bài test này không bao phủ mọi tổ hợp linh kiện hoặc mọi mô hình thi đấu.
- Sau timeout/hủy khi đang chạy, lệnh có thể đã hoàn tất. Đọc `getState` trước khi gửi lại lệnh ghi; không tự retry.
- MCP vẫn cần companion local và ghép nối chủ động; đây chưa phải chat AI tích hợp hoặc remote MCP chạy trên Vercel.

## Chạy lại và xem bằng chứng

```text
node scripts/test-assembly-api-contract.mjs
node scripts/test-assembly-ai-workflows.mjs
node scripts/test-assembly-ai-demos.mjs
node scripts/test-assembly-mcp-relay.mjs
node scripts/test-assembly-help-mcp.mjs
node scripts/test-assembly-ai-api.mjs
node scripts/test-kit-policy.mjs
npm run build
npm run typecheck
python scripts/check-encoding.py
```

Dữ liệu từng lần gọi: `artifacts/assembly-tests/ai-workflow-results.json`.
PDF: `artifacts/assembly-tests/ai-vexgo-guide.pdf`, `artifacts/assembly-tests/ai-vexiq-guide.pdf`.
Ảnh giao diện: `artifacts/assembly-tests/ai-workbench-desktop.png`, `artifacts/assembly-tests/ai-workbench-mobile.png`.
Tài liệu kỹ thuật đầy đủ: `docs/assembly-ai.md`; đặc tả dùng trực tiếp: `api.describe()`.
