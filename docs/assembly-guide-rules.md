# Quy tắc thứ tự bước lắp — rút ra từ hướng dẫn chính thức VEX IQ

Nguồn đã đọc từng trang (PDF chính thức VEX):

| Robot | Thế hệ | Số bước | Điểm đáng học |
|---|---|---|---|
| BaseBot (228-8899 rev12) | Gen 2 | 20 | Khung → truyền động → Brain → dây → nắp, dựng 2 nửa song song "2X" |
| Clawbot (rev2) | Gen 2 | 37 | Thêm tháp, trục quay, bánh răng, tay gắp làm cụm riêng |
| Kiwi Drive Bot (228-2500-760) | Gen 1 | 24 | Module motor lặp "Bước 1–4 ×3", ghép module vào khung |
| Armbot IQ | Gen 1 | 70+ | Đế → mâm xoay (cụm riêng) → vai → Brain → cánh tay |

---

## A. Thứ tự các miền (vĩ mô)

Mọi hướng dẫn đều đi theo cùng một trật tự. Miền trước là chỗ dựa vật lý cho miền sau, và **không miền nào được che đường lắp của miền trước nó**.

| # | Miền | Ví dụ trong tài liệu VEX | Vì sao đứng ở đây |
|---|---|---|---|
| 1 | **Khung đế** (thanh dài nhất nằm sát đất + góc nối) | BaseBot bước 1–3, Kiwi bước 5–8, Armbot đế | Là chuẩn đặt trên bàn; mọi thứ khác bám vào nó |
| 2 | **Gối đỡ trục** trên khung (thanh 2x2, lỗ đỡ) | BaseBot bước 4 | Phải có lỗ đỡ trước khi luồn trục |
| 3 | **Trục → motor → bánh/hub → vòng chặn** | BaseBot 5→6→8→11 | Trục luồn trước, motor đẩy vào trục sau; vòng chặn cuối cùng |
| 4 | **Ghép hai nửa / thanh ngang** đóng khung | BaseBot 12–13 | Chỉ đóng khung khi bên trong đã xong |
| 5 | **Kết cấu đứng** (tháp, cột) — một bên trước | Clawbot 5–10 | Bên thứ nhất là gối đỡ đầu tiên của trục quay |
| 6 | **Cơ cấu trên tháp**: trục quay, motor, bánh răng, cánh tay | Clawbot 11–19 | Lắp khi còn một bên mở để tay và trục còn đường vào |
| 7 | **Bên đóng** của tháp + giằng chéo | Clawbot 20–22, 27–29 | Gối đỡ thứ hai và giằng chỉ lắp sau khi cơ cấu đã nằm trong |
| 8 | **Cơ cấu chấp hành** (tay gắp, xẻng…) — làm cụm riêng rồi gắn | Clawbot 23–26 | Lắp trên bàn dễ hơn lắp trên robot |
| 9 | **Module Brain** (Brain + pin + góc nối + chốt) — cụm riêng, gắn muộn | BaseBot 15–18, Clawbot 30–34 | Brain nặng, hay che đường lắp, cần nằm trên cùng/sau cùng |
| 10 | **Dây cáp** (ghi số cổng) | BaseBot 19, Clawbot 35–36 | Chỉ cắm khi motor/Brain đã cố định |
| 11 | **Nắp, cản, tấm che cuối** | BaseBot 20, Clawbot 37 | Lắp sau cùng vì che dây và đường tay |

Quy tắc phụ của trật tự miền:

- **A1. Từ dưới lên, từ trong ra.** Thứ tự đi theo chiều trọng lực (đế → tháp → đỉnh). Trong mỗi miền thì đi từ tâm ra hai bên.
- **A2. Hai nửa đối xứng làm cùng lúc.** Khi trái/phải giống hệt hoặc đối xứng gương, mỗi bước vẽ một nửa kèm nhãn **"2X"**, rồi mới có một bước ghép hai nửa (BaseBot 1–12 → 13).
- **A3. Cụm lặp lại vẽ một lần.** Chuỗi bước tạo ra một module giống nhau N lần được gom thành **"Bước a–b ×N"** (Kiwi: 1–4 ×3, 5–8 ×3, 10–13 ×3).
- **A4. Cụm làm trên bàn rồi mới gắn.** Bánh xe (hub + chốt + lốp), thanh tay đòn có sẵn standoff, tay gắp, cụm bánh răng trên trục ngắn, module Brain đều được lắp riêng rồi gắn vào trong một bước. Bước gắn hiển thị cụm đó như một "chi tiết", kèm số bước đã tạo ra nó.
- **A5. Dọn đường khi cần.** Khi cần lắp thêm vào chỗ bị che, tài liệu cho tháo tạm hoặc nâng chi tiết lên (Clawbot bước 1: nhấc Brain ra; bước 33: nâng tay lên rồi mới đặt Brain).

## B. Thứ tự trong một miền (vi mô)

- **B1. Đỡ trước, luồn sau, chặn cuối.** Gối đỡ thứ nhất → trục → các chi tiết lồng trên trục, theo thứ tự trong ra ngoài → vòng chặn hoặc vòng đệm → gối đỡ thứ hai. Không có bước nào đòi luồn đầu có nắp/gờ của trục qua lỗ.
- **B2. Motor vào sau trục của nó.** Trục luồn qua khung, rồi motor được đẩy vào sao cho lỗ vuông khớp trục và các lỗ gá khớp chốt, trong cùng một bước (BaseBot 5→6, Clawbot 7→8).
- **B3. Chốt đi cùng chi tiết nhận chốt.** Chốt được cắm vào chi tiết mới (hoặc vào khung) trong **chính bước** gắn chi tiết đó. Không có trang nào chỉ để "cắm 12 chốt".
- **B4. Một bước = một chi tiết nền + mọi thứ gắn vào nó từ một phía.** Thường 1–4 loại chi tiết và không quá ~16 món. Khác phía hoặc khác hướng thì tách bước.
- **B5. Chi tiết mới được tô màu viền**, chi tiết cũ để xám. Mỗi bước có hộp liệt kê ×N; chốt và trục có thước 1:1.
- **B6. Biểu tượng xoay** khi góc nhìn đổi trên khoảng 90°.

## C. Đối chiếu với bộ sinh bước hiện tại (file "Cối xoay gió")

| Quy tắc VEX | Hiện tại | Chênh lệch |
|---|---|---|
| A: bắt đầu từ khung đế | Bắt đầu từ **tấm 4x8 gắn motor** (giữa mô hình), khung đế 2x20 ở tận bước 18–28 | ❌ Sai miền xuất phát: gốc được chọn theo diện tích, không theo chiều trọng lực |
| A2 "2X" hai nửa | Khung trái (bước 12–21) và khung phải (22–31) lặp lại y hệt | ❌ Không nhận ra đối xứng |
| A3/A4 cụm riêng | Mọi thứ lắp dần trên mô hình; Brain, chốt Brain, góc nối Brain tách thành bước "forced" | ❌ Chưa có khái niệm cụm trên bàn |
| 9 Brain muộn, 10 dây, 11 nắp | Brain ở giữa (bước 32), pin ở cuối dưới dạng "kiểm tra vị trí", không có bước dây | ❌ |
| B1/B2 trục–motor | Đúng: trục trước motor, luồn trục qua hub | ✅ |
| B3 chốt đi cùng chi tiết | Một phần (bước gộp kiểu VEX vừa thêm) | ⚠️ Vẫn còn bước "cắm 12 chốt vào 4x8 Plate" |
| B4 một phía một bước | Có kiểm tra cùng hướng lắp | ✅ |

**Kết luận:** lỗi chính không nằm ở từng bước mà ở **thứ tự miền**. Thuật toán hiện tại chọn chi tiết kế tiếp chỉ dựa trên "lắp được không" và độ ưu tiên loại chi tiết. Nó không có khái niệm **miền chức năng**, **chiều trọng lực**, **đối xứng** và **cụm làm trên bàn**.

## D. Thứ tự mong muốn cho Cối xoay gió (áp quy tắc)

1. **Đế (2X):** 2x20 Beam + 2x Wide 2x2 Corner Connector + Small Chassis Corner Connector, dựng 2 thanh đế song song.
2. **Tháp (2X):** 2x16 Beam đứng cắm vào đế bằng chốt. Bên motor là bên thứ nhất.
3. **Cụm motor (trên bàn):** 4x8 Plate + 4 chốt gá + 3x Motor Shaft + Smart Motor + 1x1 Beam + nhông 16T + 1x1 Beam → gắn cả cụm vào tháp.
4. **Cụm trục cánh quạt (trên bàn):** 6x Capped Shaft luồn qua 2x8 Beam, 1x1 Beam, nhông 24T, 1x1 Beam; gắn vào đỉnh tháp. Các 0.25x Standoff được đặt sẵn.
5. **Quấn xích** 16T ↔ 24T (cả hai nhông đã cố định).
6. **Cánh quạt (trên bàn):** 4x4 Plate + 1x3 Center Lock + 4x4 Offset Right Angle Beam + 1x10 Beam ×4 → gắn vào đầu trục.
7. **Bên đóng của tháp:** 2x8 Beam + 2x Pitch Standoff (giữ trục cánh từ phía sau).
8. **Giằng chéo (2X):** 1x6 / 1x10 Beam chéo + Small Chassis Corner Connector.
9. **Module Brain (trên bàn):** Brain + Battery + 2 góc nối 2x2 + chốt → đặt lên đế.
10. **Touch LED** + dây cáp, ghi số cổng.

So với 57 bước hiện tại, cách này dự kiến còn khoảng 25–30 bước, và không còn bước "forced" ở Brain.

## E. Đề xuất triển khai (theo thứ tự lợi ích)

> **Đã triển khai E1–E2** (`iq-guide-sequence.js`, `guide-editing.js`):
> - Gốc là thân dài nhất nằm trong dải 6,35 mm tính từ điểm thấp nhất của mô hình.
> - Mỗi chi tiết được gán một "miền" bằng `floor((tâm Y − sàn) / 25,4 mm)`. Brain, pin và cảm biến luôn thuộc miền 90 (lắp muộn).
> - Thứ tự ưu tiên: không chặn đường lắp của chi tiết khác > miền > loại chi tiết. Khi editor sắp xếp lại, module Brain chỉ được chọn khi không còn bước nào thông thoáng ở miền thấp hơn.
>
> Kết quả với cối xoay gió (trong app): đế 2x20 → tháp 1 → cụm motor → giằng / tháp 2 → đế 2 → trục cánh trên đỉnh → cánh quạt → module Brain → xích → Touch LED → pin.
>
> **Đã triển khai E3–E4** (lập kế hoạch theo giai đoạn trong `generateIQGuide`):
> - **Hai bên giống nhau ("2X"):** tìm mặt phẳng giữa theo X hoặc Z. Hai chi tiết là cặp đôi khi cùng mã, cùng vị trí trên mặt cắt ngang và nằm ở hai phía mặt phẳng; cách này nhận được cả ảnh gương lẫn bản sao tịnh tiến. Từ khung đế mọc ra một nửa (từ 4 chi tiết đến 45% mô hình), nửa đó được lập kế hoạch riêng, và mỗi bước thêm luôn cả chi tiết đôi của nó ("· làm 2 bên", nhãn **2X** trên PDF).
> - **Module Brain trên bàn:** gồm Brain, các chốt cắm vào Brain và các góc nối nhỏ trên những chốt đó. Module được lập kế hoạch riêng với Brain làm gốc, xếp cuối hướng dẫn. Các bước chuẩn bị chỉ vẽ riêng module (khung nét đứt "Cụm lắp riêng trên bàn"); bước cuối vẽ module đã nằm trên robot ("Gắn cụm vào robot").
> - Giai đoạn: 0 = hai bên → 1 = phần chính (bắt đầu từ hai bên đã dựng) → 2 = module Brain → 3 = thiết bị điện tử chưa có khớp gá. Khi editor sắp xếp lại, giai đoạn trước luôn đứng trước giai đoạn sau. Các bước đã kiểm tra đường lắp trên bàn không bị kiểm tra lại trong mô hình đầy đủ.
> - PDF có huy hiệu số bước hình ngôi sao, nhãn "2X", nhãn "Lắp đồng thời".
>
> **PDF kiểu VEX (B4–B5):**
> - **2 bước nhỏ một trang.** Bước được ghép khi: là bước lắp, không quá 6 chi tiết và 3 loại, chưa chỉnh khung riêng, không bị đánh dấu. Mỗi nửa trang có hộp chi tiết, huy hiệu số bước, hình tách lớn và ảnh nhỏ "sau khi lắp" ở góc. Có thể tắt bằng "Gộp 2 bước nhỏ / trang" trong khung xem trước PDF (lưu ở `guidePreferences.layout`).
> - **Thước 1:1** (theo mm thật khi in 100%) cạnh chốt và trục trong hộp chi tiết, vạch chia mỗi 12,7 mm. Trục dài hơn 120 mm thì ghi số mm.
> - **Pin nằm cạnh Brain** được lắp ngay trong bước đầu của module Brain, không còn trang "kiểm tra vị trí" rời.
>
> Cối xoay gió: **43 bước trên 30 trang PDF** (trước đây 44 trang).
>
> Cối xoay gió (trước khi gộp trang): **44 bước**, gồm 6 bước "2X", 4 bước module Brain và 3 bước còn bị đánh dấu chạm chi tiết, tất cả do mô hình chồng lấn.

1. **Chọn gốc theo trọng lực.** Gốc là cụm chạm đất, tức thấp nhất theo trục Y: thanh dài nhất cùng các góc nối của nó. Không chọn theo diện tích.
2. **Gán miền cho từng chi tiết** dựa trên hình học và loại chi tiết: đế, gối đỡ, trục và truyền động, tháp, cơ cấu, Brain, cảm biến, nắp. Sắp xếp theo thứ tự miền ở mục A; bên trong mỗi miền vẫn dùng kiểm tra đường lắp 3D như hiện nay.
3. **Cụm trên bàn.** Tách thành cụm riêng những nhóm chi tiết có liên kết nội bộ chặt nhưng chỉ chạm phần còn lại qua ít điểm: bánh xe, cụm motor, tay đòn, module Brain. Mỗi cụm được lắp riêng (kiểm tra đường lắp trong phạm vi cụm), sau đó có một bước "gắn cụm".
4. **Phát hiện đối xứng/lặp.** Hai chuỗi bước có cùng SKU và vị trí đối xứng qua một mặt phẳng được gộp thành một bước "2X". N module giống nhau được gộp thành "×N".
5. **Bước dây cáp** sau Brain, ghi số cổng, lấy từ dữ liệu dây hiện có.
6. **Nắp/cản cuối:** chi tiết che dây hoặc che đường tay được đẩy xuống sau bước dây.
