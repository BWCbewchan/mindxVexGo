# Snap LEGO, guide cards, camera and portable files

## Using the controls

- LEGO → Options → Lưới LEGO: stud 8 mm, half stud 4 mm, plate 3.2 mm or 1 mm. Stud presets use 3.2 mm vertically. Snapping quantizes drag increments from the starting pose, preserving axes that were not moved. Precision numeric edits remain precise; magnetic attachment still uses actual ports. Preset is saved in `editorSettings.snapPreset` and follows Undo/JSON/reload.
- Inspector → Guide shows lazy rendered cards. Changing parts/connections regenerates the sequence and cards; students do not save steps manually.
- Open a step, orbit the scene and click **Dùng góc nhìn này**. `guidePreferences.steps[stepKey].camera` stores normalized direction/up; the renderer refits the whole step for that angle. Preview, PDF and ZIP share this camera. Selecting an automatic/preset view replaces it.
- LEGO → File → Nhập LDraw (.ldr / .mpd) / Xuất LDraw (.ldr). Import validates the whole model before replacing anything and remains undoable. Embedded MPD submodels, colors and rigid transforms are supported. Unknown CAD, cycles, custom drawn primitives, nonrigid/reflected matrices, excessive size or kit/collision violations reject the operation. LDR carries geometry/colors; native JSON retains groups, mates and camera settings.
- File or Guide → Xuất bộ ảnh hướng dẫn (ZIP). Extract the entire archive, then open `index.html`. `images/step-001.png` etc contain cumulative assembled views, with separate close-ups and `images/completed.png`. `project.json` preserves the full app document; LEGO includes `model.ldr`. `manifest.json` lists steps, saved cameras and every archived file. HTML uses relative bundled images, no scripts/CDN/fonts, and can be printed offline.

## Implementation and format

The app's millimetre/Y-up frame uses a baked X-axis half-turn for LEGO CAD. LDraw import/export therefore uses `positionMM = 0.4 * H * positionLDU` and `rotationApp = H * rotationLDraw * H`, where H is a 180° X rotation. Three.js Euler XYZ is reconstructed from the complete rotation matrix, not from guessed angles. Source: https://www.ldraw.org/article/218.html (type-1 records and units).

LEGO now uses the existing connected-contact planner and sampled CAD insertion-path audit used for IQ, including support and retainer constraints. It refuses an unplanned/blocked sequence rather than drawing parts passing through an existing frame. This is a sampled geometric check, not physical kit certification; test complex assemblies in real kits before distributing student guides.

Preview images have one lazy queue, bounded image cache and generation cancellation so stale edits cannot replace current cards. They use a separate print renderer and never move the editor camera or parts. PDF/ZIP temporarily suspend preview jobs and restore the editing camera afterward.

ZIP uses standard stored entries, UTF-8 names and CRC32. PNGs are already compressed. No executable user code or new runtime package is needed. Without WebGL, data views/PDF remain available; image previews, camera capture and PNG ZIP require WebGL and explain that limitation.

## AI / MCP

```js
await window.mindxAssembly.execute('exportGuide', {format: 'zip'});
// or {format: 'pdf'}; omitted format retains the existing PDF behavior.
```

The existing 31-command contract validates the optional enum. This also flows through the local MCP relay; writes still require the existing pairing permission.

## Verification

- `node scripts/test-assembly-guide-tools.mjs`: all 329 actual LEGO SKU matrix/color round trips, nested MPD, rejected malformed/unknown/reflected inputs, snap/camera validation, and ZIP read by Python.
- `node scripts/test-assembly-guide-tools-ui.mjs`: actual two-beam/pin assembly with multiple steps, rendered custom angle changes, persistence, ZIP/LDR import/export, invalid import rollback, and offline HTML with no network requests.
- `node scripts/test-guide-package-car.mjs`: 54-part GO car, all 31 step images, completed image, manifest and unchanged model.
- Existing headless, native API and IQ sampled-path tests, typecheck, encoding check and production build.

UI test scripts accept BASE_URL, default http://localhost:3131.

## Căn chỉnh bản xuất trực tiếp

Tab **Guide** hiển thị thẻ bước ngay trong Inspector, bên cạnh vùng lắp ráp vẫn thao tác được. Dải ảnh nhỏ chọn bước, toolbar icon Lucide, thẻ trắng, số lượng/ảnh linh kiện mới và ghi chú theo bố cục của trang tham khảo. Không mở hộp thoại lớn. Nút PDF/ZIP nằm phía trên; phần thứ tự/ghi chú nâng cao thu gọn bên dưới. Nút mở rộng tăng bề ngang thẻ trên máy tính.

Kéo ảnh để xoay 3D trực tiếp; toolbar xoay 15°, nâng/hạ 10°, thu/phóng 50–100% vừa khung, lấy góc hiện tại hoặc về góc tự động. Mỗi thao tác kéo chỉ lưu một lần khi thả, có thể Undo. **Áp dụng tất cả** giữ nguyên tiêu đề, ghi chú, thứ tự và đặt góc mặc định cho bước mới. Mỗi bước tự căn theo kích thước cụm riêng.

Khung WebGL giữ nguyên cảnh, mesh, cạnh và dấu vị trí lắp trong lúc kéo. Chỉ đổi camera qua requestAnimationFrame; không dựng PNG hoặc chạy lại bộ lập kế hoạch ở mỗi pointermove. Thumbnail được dựng nhỏ khi rảnh, ưu tiên các bước đang thấy; ảnh xuất chất lượng cao được dựng riêng. Thay đổi góc không dịch chuyển chi tiết hay camera của vùng CAD chính.

**Tự cập nhật** chỉ điều khiển ảnh; bộ lập kế hoạch vẫn chạy. Tạm dừng giữ ảnh cũ, hiện trạng thái chờ khi mô hình thay đổi và khóa chỉnh góc cho tới khi bấm làm mới. PDF/ZIP luôn dùng kế hoạch hiện tại. Schema: `camera.zoom` (0.5–1), `guidePreferences.defaultCamera`, `editorSettings.liveGuidePreview`.

Kiểm thử: `test-guide-workbench.mjs` (camera), `test-guide-workbench-ui.mjs` (pixel/zoom, Undo/Redo, reset, tạm dừng, lưu lại, ZIP), `test-guide-live-performance.mjs` (xe 54 chi tiết/31 bước, số frame khi kéo, không đọc PNG hay ghi tài liệu trong lúc kéo, một Undo, desktop/mobile). Phép đo baseline: 25 pointermove nhưng 0 lần đổi ảnh. Khung mới: 24 frame trong 24 lần kéo và 0 PNG; đây là phép đo tương tác trên máy kiểm thử, không phải cam kết FPS mọi thiết bị.

Preview input and readout mutations are filtered from the main CAD scheduler. The GO wiring button now changes DOM only when its state changes, instead of rewriting identical text every 500 ms. The large-car test verifies zero main-viewport clears during the drag.

## Preview PDF giống trang in

Nút PDF trong Guide/File hoặc Ctrl+P mở trình căn trang 16:9 trước khi in. Trang chuẩn bị và hoàn thành cũng nằm trong danh sách. `guide-paper.js` và `guide-paper.css` tạo chung DOM/kích thước vật lý cho preview, PDF và HTML offline.

- **Kéo ảnh**: pan/zoom trong khung; góc 3D đặt riêng cho Hướng lắp/Tổng thể.
- **Chỉnh khung**: kéo vị trí, kéo góc dưới phải để đổi kích thước trong vùng nội dung.
- **Chấm tím**: thêm, kéo, xóa từng chấm/all, đổi độ lớn hoặc khôi phục điểm tự động.
- **Trang**: phóng phần xem trước để chỉnh chính xác; không làm thay đổi PDF.
- Undo/Redo chỉ đi qua các chỉnh sửa của phiên preview, không lùi vào thao tác CAD trước đó. Một gesture tạo một checkpoint. Đóng/mở lại hoặc JSON giữ định dạng.

`guidePreferences.steps[stepKey].page.frames.{assembled,detail}` nhận `image:{x,y,zoom}`, `layout:{x,y,width,height}`, `camera:{direction,up,zoom}`, `markers:[{x,y,r}]`. Pan/markers dùng tọa độ ảnh chuẩn hóa, layout dùng vùng nội dung trang; markers thiếu nghĩa là tự động, `[]` nghĩa là ẩn hết. Bộ kiểm tra giới hạn số hữu hạn và khung nằm trong trang. Thay đổi góc 3D không tự xóa các chấm đã chỉnh thủ công.

Khi kéo, chỉ cập nhật SVG/CSS, không tạo PNG hoặc gọi WebGL. SVG/dots vector in trực tiếp; ZIP mới raster hóa illustration thành PNG. Trình render trả tọa độ điểm tự động và camera độc lập cho hai khung. Các write API bên ngoài bị khóa trong lúc preview đang chỉnh. API export trực tiếp vẫn giữ tương thích cho automation.

Kiểm thử `test-guide-page-settings.mjs`, `test-guide-pdf-preview-ui.mjs`: kéo ảnh/khung, resize, camera riêng, thêm/kéo/xóa/khôi phục chấm, một Undo, cấm Undo vào CAD, không GPU/PNG khi kéo, giữ poses, lưu/reload, so tọa độ mọi chấm giữa preview/print, PDF 16×9 inch và ZIP PNG. Mẫu PDF được render ra PNG để kiểm tra hình/nhãn/logo đầy đủ.
