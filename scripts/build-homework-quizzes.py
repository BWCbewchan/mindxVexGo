import json,re,random
from pathlib import Path
catalog=json.loads(Path('public/quiz/catalog.json').read_text(encoding='utf-8'))
for d in catalog: d['questions']=[]
texts={d['id']:d['text'] for d in json.loads(Path('artifacts/quiz/extracted.json').read_text(encoding='utf-8'))}
byid={d['id']:d for d in catalog}
def norm(s):return re.sub(r'\s+',' ',s).strip()
def q(id,prompt,correct,wrong,evidence,image=None,visual=False):
 options=[correct]+wrong;random.Random(id+prompt).shuffle(options)
 assert len(options)==4 and len(set(options))==4
 text=norm(texts[id]);needle=norm(evidence)
 if not visual:
  assert needle.casefold() in text.casefold(),(id,needle)
  at=text.casefold().index(needle.casefold());evidence=text[max(0,at-30):min(len(text),at+len(needle)+80)]
 item={'id':id+'-q'+str(len(byid[id]['questions'])+1),'prompt':prompt,'options':options,'answer':options.index(correct),'explanation':correct+' — '+('Đối chiếu khối lệnh/hình trong tài liệu.' if visual else 'Theo yêu cầu hoặc định nghĩa trong bài học.'),'evidence':evidence,'sourceNeedle':needle}
 if image:item['image']=image
 byid[id]['questions'].append(item)
# Hand-authored lesson-specific questions. Every text evidence fragment is checked against the supplied source.
rows='''
827779fb5d4e|Một vòng quay động cơ tương ứng với bao nhiêu độ?|360 độ|90 độ;180 độ;720 độ|360 degrees = 1 turn
827779fb5d4e|Trong nhiệm vụ 2, LED Bumper nháy xanh–đỏ bao nhiêu lần khi phát hiện vật?|3 lần|1 lần;2 lần;5 lần|liên tục 3 lần
14f8af675d07|Trong nhiệm vụ 2, gặp vật màu đỏ thì cánh tay nâng bao nhiêu độ?|90 độ|180 độ;45 độ;360 độ|nâng lên 90 độ
14f8af675d07|Trong nhiệm vụ 1, nâng cánh tay lên 180 độ rồi chờ bao lâu trước khi hạ?|3 giây|1 giây;5 giây;10 giây|sau 3s thì hạ xuống
 dce5221bd44b|Trong nhiệm vụ 1, báo gặp vật đỏ thì làm gì?|Chạy lùi rồi dừng sau 3 giây|Chạy tiến mãi mãi;Rẽ trái ngay;Bật nam châm|chạy lùi lại và sau 3s
 dce5221bd44b|Trong nhiệm vụ săn mồi, báo tăng tốc sau khi đi chậm bao lâu?|3 giây|1 giây;2 giây;10 giây|đi thật chậm sau 3s
c9a1abb6cc3d|Nhiệm vụ thứ hai của Cánh cổng thần kỳ là gì?|Lập trình cửa tự động|Phân loại đá;Chạy xe hình vuông;Điều khiển máy bay|Lập trình cửa tự động
6f05fe4e2a3b|Trong nhiệm vụ 2, hộp được lập trình chỉ chứa vật màu nào?|Đỏ|Xanh lá;Xanh dương;Vàng|chỉ chứa các vật màu đỏ
6f05fe4e2a3b|Nhiệm vụ 1 yêu cầu mở hộp khi nào?|Khi phát hiện có vật|Sau đúng 10 vòng quay;Khi pin hết;Khi không có vật|phát hiện có vật thì mở hộp
75296f55e3a1|Cách làm nào đúng với nhiệm vụ Công xưởng sáng tạo?|Phát triển mô hình từ các mô hình đã học|Chỉ chép tên thẻ lệnh;Bỏ hết mô hình đã học;Không lắp mô hình nào|Sáng tạo mô hình từ các mô hình đã học
42e9ca397789|Vòi voi trong nhiệm vụ được dùng để làm gì?|Nâng vật nặng và chuyển sang vị trí khác|Chỉ đo ánh sáng;Chỉ phát màu đỏ;Chỉ đếm vòng lặp|Dùng vòi để nâng các vật nặng
42e9ca397789|Mô hình voi điều khiển bao nhiêu motor riêng biệt?|2 motor|1 motor;3 motor;4 motor|2 Motor riêng biệt
172075c0b253|Trong nhiệm vụ 1, sói thấy vật đỏ thì làm gì?|Rẽ hướng và tiếp tục chạy|Dừng vĩnh viễn;Hút vật;Tắt não|sẽ rẽ hướng và tiếp tục chạy
172075c0b253|Trong nhiệm vụ 2, sau khi lùi 3 giây, sói làm gì?|Tăng tốc đi về phía trước|Tiếp tục lùi mãi;Chỉ bật đèn;Hạ cánh tay|sau 3s thì tăng tốc
38b14e5c3ee8|Linh kiện nào được dùng như nút ấn khẩn cấp trong bài?|LED Bumper|Nam châm điện;Pin;Motor|Led Bumper được sử dụng như một nút ấn khẩn cấp
2ecb9172efbb|Trong nhiệm vụ 2, chú ếch bị chạm vào thì làm gì?|Dừng lại|Tăng tốc;Quay liên tục;Hút vật|dừng lại khi bị chạm vào
2ecb9172efbb|Trong nhiệm vụ 2, chú ếch thấy vật cản phía trước thì làm gì?|Lùi lại|Chạy nhanh tới vật;Bật nam châm;Đứng yên mãi mãi|lùi khi thấy vật cản
7c9104a9a428|Trong nhiệm vụ 2, xe gặp vật đỏ thì rẽ hướng nào?|Trái|Phải;Quay tròn mãi;Không rẽ|vật cản màu đỏ thì xe rẽ trái
7c9104a9a428|Trong nhiệm vụ 1, xe chạy tiến 3 giây rồi lùi bao lâu?|5 giây|2 giây;3 giây;10 giây|đi lùi 5 giây
3985e8d1e105|Nhiệm vụ yêu cầu nhặt đĩa màu nào?|Xanh|Đỏ;Vàng;Tím|Nhặt đĩa màu xanh
3985e8d1e105|Sau khi nhặt đĩa, robot tăng tốc trong bao lâu trước khi thả?|5 giây|1 giây;2 giây;10 giây|tăng tốc 5s
 a8b76b8a25ac|Chuỗi Đỏ–Xanh–Tắt trong nhiệm vụ đầu lặp bao nhiêu lần?|10 lần|2 lần;3 lần;5 lần|10 lần
 a8b76b8a25ac|Khi mắt nhìn thấy vật trong nhiệm vụ thứ hai, LED Bumper hiển thị màu gì?|Đỏ|Vàng;Tím;Trắng|hiển thị màu đỏ khi cảm biến mắt nhìn thấy vật
fc2341c191a3|Trong đề 2, xe thấy xanh dương thì dừng bao lâu?|5 giây|1 giây;2 giây;3 giây|mô hình dừng lại trong 5 giây
fc2341c191a3|Trong đề 3, tốc độ ban đầu là bao nhiêu?|30%|50%;60%;80%|Thiết lập tốc độ mô hình là 30%
27c343aac605|Động cơ trong bài Dấu ấn sao Hỏa quay theo những chiều nào?|Cùng và ngược chiều kim đồng hồ|Chỉ cùng chiều;Chỉ ngược chiều;Không quay được|Động cơ quay theo 2 chiều
27c343aac605|Nhiệm vụ 2 yêu cầu lá cờ hoạt động thế nào?|Tự động lên cao và hạ xuống|Chỉ lên cao;Chỉ hạ xuống;Đứng yên|lá cờ tự động lên cao và hạ xuống
f46e0709eb70|Bài Phương tiện di chuyển trên sao Hỏa yêu cầu thay đổi gì theo thời gian?|Tốc độ di chuyển|Tên robot;Màu pin;Số cổng kết nối|di chuyển tăng tốc theo thời gian
35554e2e1460|Nhiệm vụ đầu thiết lập tốc độ ban đầu bao nhiêu?|50%|10%;30%;80%|tốc độ 50%
35554e2e1460|Trong nhiệm vụ thứ hai, robot tăng tốc tối đa sau bao lâu?|5 giây|1 giây;3 giây;10 giây|sau 5 giây tăng tốc
 e72e5d65b8c3|Sự kiện nào làm robot dừng khẩn cấp?|Ấn LED Bumper|Đặt vật xanh phía xa;Đổi tên robot;Tăng tốc|dừng khẩn cấp khi ấn vào LED Bumper
b06fdb443c11|Sau khi tăng tốc, robot dừng khi nào?|Khi LED Bumper được nhấn|Khi chọn tên lớp;Khi cảm biến thấy vàng;Khi xoay đúng 90 độ|Led-Bumper được nhấn thì mô hình dừng lại
 e318fdfea4d4|Sau khi nhả nam châm, xe lùi bao lâu rồi dừng?|3 giây|1 giây;5 giây;10 giây|đi lùi 3 giây rồi dừng lại
 e318fdfea4d4|Nhiệm vụ thu thập mẫu vật đặt tốc độ ban đầu bao nhiêu?|50%|20%;30%;80%|tốc độ di chuyển 50%
 e3b0da98d784|Xe trong nhiệm vụ 1 đi tiến bao lâu trước khi lùi?|3 giây|1 giây;5 giây;10 giây|phía trước trong 3 giây
90e8d8f1a16a|Trong nhiệm vụ 2, xe cần làm gì sau khi phát hiện kiện hàng?|Giao đến vị trí quy định trước|Chạy ngẫu nhiên;Bỏ kiện hàng tại chỗ;Chỉ nhấp nháy đèn|phát hiện kiện hàng và giao đến vị trí quy định trước
b89e608ea609|Mục tiêu lập trình trong Thông điệp sao Hỏa là gì?|Phân loại kiện hàng và giao đúng vị trí|Chạy hình tròn liên tục;Chỉ đo thời gian;Tắt mọi cảm biến|phân loại kiện hàng và giao đúng vị trí
 d1b39e4fdce3|Đề 3 bổ sung chức năng gì ngoài đi theo đường line?|Dừng khi gặp vật cản|Chạy xuyên vật cản;Tắt mắt;Bỏ qua đường line|dừng lại khi gặp vật cản
6cafb85fa961|Nhiệm vụ 1 cho cần trục quay trái bao nhiêu độ lúc đầu?|100 độ|60 độ;90 độ;150 độ|sang trái 100 độ
6cafb85fa961|Trong nhiệm vụ 2, nhấn LED Bumper thì cần trục quay trái bao nhiêu độ?|150 độ|60 độ;100 độ;180 độ|sang trái 150 độ
 a10e2ef0ae7b|Nhiệm vụ 2 yêu cầu kiện hàng được chuyển tới đâu?|Vị trí quy định trước|Vị trí ngẫu nhiên;Điểm gần nhất bất kỳ;Mọi vị trí cùng lúc|giao đến vị trí quy định trước
2071a0af2e33|Cả ba nhiệm vụ xe giao hàng yêu cầu kết quả nào?|Di chuyển đến nơi quy định|Chỉ xoay tại chỗ;Chỉ đo ánh sáng;Không cần đến đích|xe giao hàng di chuyển đến nơi quy định
7e9365a3565b|Theo cách lắp của bài, khi đi thẳng hai motor quay thế nào?|Phải cùng chiều, trái ngược chiều kim đồng hồ|Cả hai cùng chiều;Cả hai ngược chiều;Cả hai đều dừng|Khi đi thẳng, động cơ bên phải
7e9365a3565b|Nhiệm vụ 2 yêu cầu xe chạy theo hình nào?|Tam giác vuông|Hình tròn;Hình chữ nhật;Bát giác|theo hình tam giác vuông
ccf24297522a|Khi LED Bumper được nhấn hoặc giữ trong nhiệm vụ 1, đèn đổi sang trạng thái nào?|Đỏ với độ sáng nhạt hơn|Xanh sáng hơn;Xanh dương;Tắt vĩnh viễn|màu đỏ với độ sáng nhạt hơn
b87028842130|Trong nhiệm vụ 1, đèn cảm biến mắt bật khi nào?|Khi ánh sáng thấp|Khi đủ ánh sáng;Khi không có pin;Khi kết thúc chương trình|được bật khi điều kiện ánh sáng thấp
b87028842130|Vì sao nhiệm vụ 2 bật đèn mắt khi phát hiện vật?|Để nhận biết rõ màu của vật|Để tăng tốc motor;Để hút vật;Để đổi tên thiết bị|để nhận biết rõ màu
70cfdbeca12b|Bài tập xe đi thẳng đặt tốc độ bao nhiêu?|20%|10%;50%;100%|liên tục với tốc độ 20%
70cfdbeca12b|Theo đề bài, mắt thấy vật cản thì xe phải làm gì?|Dừng lại|Tăng tốc;Tiếp tục đi thẳng;Tắt LED rồi chạy|nếu như mắt thấy vật cản thì xe dừng lại
5b4e2977412b|Trong nhiệm vụ 1, thấy vật thì tốc độ giảm xuống mức nào?|10%|30%;50%;100%|giảm tốc độ xuống 10%
5b4e2977412b|Trong nhiệm vụ 2, mắt thấy xanh dương thì mô hình rẽ hướng nào?|Trái|Phải;Lùi mãi;Không rẽ|màu xanh dương thì mô hình rẽ trái
6325b82877b5|Mục tiêu cần đạt trong Giải thoát mê cung là gì?|Robot thoát khỏi mê cung|Robot chỉ xoay tại chỗ;Robot đứng yên ở đầu đường;Robot chỉ phát đèn|robot thoát khỏi mê cung
07b9773df48e|Linh kiện nào cung cấp năng lượng cho não?|Pin|Cảm biến mắt;LED Bumper;Nam châm điện|Pin dùng để cung cấp năng lượng cho não
07b9773df48e|Trong nhiệm vụ 4, cánh tay cần chuyển hàng thế nào?|Liên tục|Chỉ một lần;Không chuyển;Chỉ khi hết pin|vận hành chuyển hàng liên tục
 eccf57c23cb2|Repeat Until lặp khối bên trong đến khi điều kiện có giá trị nào?|Đúng|Sai;Luôn bằng 0;Luôn bằng 100|lặp lại cho đến khi điều kiện là ĐÚNG
 eccf57c23cb2|Toán tử AND cho kết quả đúng khi nào?|Cả hai biểu thức đều đúng|Chỉ một biểu thức đúng;Cả hai đều sai;Bất kể biểu thức|khi cả hai biểu thức đều ĐÚNG
54fcb2ff652d|Trong nhiệm vụ 3, đĩa đỏ phải được chuyển hướng nào?|Sang trái|Sang phải;Lên trên;Về kho ngẫu nhiên|Chuyển đĩa sang trái nếu là màu đỏ
54fcb2ff652d|Trong nhiệm vụ 2, vật xanh được chuyền theo chiều nào?|Từ phải sang trái|Từ trái sang phải;Chỉ xoay tại chỗ;Không chuyền|màu xanh và chuyền từ phải sang trái
0752a2d5427d|Nhiệm vụ sáng tạo yêu cầu dựa trên điều gì?|Các mô hình đã học|Chỉ màu của pin;Tên lớp;Mô hình chưa từng quan sát|Sáng tạo mô hình từ các mô hình đã học
2c00839c17ea|Theo bài học, 2 vòng quay động cơ tương ứng bao nhiêu độ?|720 độ|180 độ;360 độ;540 độ|1 turn = 360 degrees
2c00839c17ea|Đích của nhiệm vụ 2 có màu nào?|Xanh lá|Đỏ;Vàng;Tím|đích màu xanh lá
09037d7bf55b|Drivetrain trong bài được thiết lập cho bao nhiêu motor?|2 motor|1 motor;3 motor;4 motor|Drivetrain cho 2 motor
09037d7bf55b|Nhiệm vụ 1: thấy đỏ thì xe làm gì?|Báo đèn đỏ và dừng lại|Rẽ phải 3 giây;Tăng tốc tối đa;Hút vật và đi lùi|màu đỏ thì báo hiệu đèn đỏ và xe dừng lại
b0ffafbdb7fe|Trong nhánh còn lại của nhiệm vụ 1, cánh quạt quay bao lâu?|10 giây|2 giây;3 giây;5 giây|cánh quạt quay trong 10s
b0ffafbdb7fe|Nhiệm vụ 2: thấy xanh lá thì máy bay tăng tốc bao lâu trước khi dừng và thả vật?|5 giây|1 giây;3 giây;10 giây|tăng tốc trong 5s
23f1d04b0774|Nhiệm vụ 2 lặp di chuyển theo hình đến khi mắt thấy màu nào?|Đỏ|Vàng;Trắng;Tím|mắt nhìn thấy màu đỏ thì dừng lại
23f1d04b0774|Hình nào thuộc các hình được yêu cầu trong nhiệm vụ 1?|Lục giác đều|Hình elip;Hình thang;Hình bán nguyệt|lục giác đều
42b73d6dd73e|Mỗi buổi, phà được yêu cầu di chuyển bao nhiêu lần?|10 lần|2 lần;3 lần;5 lần|Mỗi buổi phà sẽ đi chuyển 10 lần
42b73d6dd73e|Nhiệm vụ 2: sà lan thấy vật cản thì tránh thế nào?|Lùi rồi vòng trái, quay lại lộ trình|Tăng tốc lao thẳng;Vòng phải rồi bỏ lộ trình;Đứng yên mãi|sà lan lùi lại rồi vòng sang trái
 e32d9f02e9ec|Nhiệm vụ 2: gặp vật cản thì xe lùi bao lâu?|3 giây|1 giây;2 giây;5 giây|mô hình lùi trong 3 giây
 e32d9f02e9ec|Nhiệm vụ 1: cần cẩu hạ xuống trong bao lâu trước khi nâng lên?|2 giây|1 giây;3 giây;10 giây|trong vòng 2 giây
cbb21d12b861|Nhiệm vụ 1: robot cua sang trái bao lâu?|3 giây|1 giây;5 giây;10 giây|sang trái 3 giây
cbb21d12b861|Theo lưu ý, lệnh đặt tốc độ nên nằm ở đâu?|Trước lệnh quay motor|Sau mọi lệnh dừng;Chỉ trong phần kết thúc;Không cần dùng|phía trên câu lệnh quay động cơ
25eafbe8b6e3|Nhiệm vụ 3 yêu cầu LED nhấp nháy đỏ–xanh bao nhiêu lần?|10 lần|2 lần;3 lần;5 lần|liên tục 10 lần
25eafbe8b6e3|Nhiệm vụ 1: nhấn LED Bumper thì đèn đổi màu gì?|Đỏ|Tím;Trắng;Vàng|Led-Bumper hiển thị màu đỏ
5505588008ea|Hai motor trong mô hình Hang động kỳ bí được khai báo như thế nào?|Riêng lẻ|Chung thành một cảm biến;Không khai báo;Là nam châm|2 động cơ khai báo/thiết lập riêng lẻ
5505588008ea|Nhiệm vụ 2 yêu cầu mô hình dừng khi nào?|Khi LED Bumper được nhấn|Sau khi đổi tên;Khi thấy xanh lá;Khi tháo mắt|dừng lại khi leb bumper được nhấn
 ad8a441fd98c|Nhiệm vụ 3: sau khi tiến 3 giây, mô hình rẽ hướng nào?|Trái|Phải;Quay ngược 180 độ;Không rẽ|Sau đó quay trái
 ad8a441fd98c|Nhiệm vụ 4 yêu cầu mô hình đi theo hình nào?|Hình vuông|Hình tròn;Hình tam giác;Hình elip|di chuyển theo hình vuông
cac391ef4c9a|Nhiệm vụ 2: thấy vật đỏ thì robot rẽ hướng nào?|Trái|Phải;Không rẽ;Quay 360 độ|màu đỏ thì rẽ trái
cac391ef4c9a|Nhiệm vụ 4: gặp vật đỏ thì thực hiện chuỗi nào?|Lùi rồi rẽ phải|Tiến rồi rẽ trái;Đứng yên;Chỉ đổi đèn|màu đỏ thì đi lùi sau đó rẽ phải
 da96a06c6c58|Nhiệm vụ 2: phát hiện tường thì robot lùi bao lâu?|3 giây|1 giây;2 giây;5 giây|lùi trong 3 giây
 da96a06c6c58|Nhiệm vụ 4: không có vật cản thì mô hình làm gì?|Tăng tốc tối đa|Dừng lại;Lùi 3 giây;Tắt motor|ngược lại mô hình tăng tốc tối đa
 d6c5cf5377de|Nhiệm vụ 3: thấy vật xanh thì tốc độ đặt bao nhiêu?|80%|20%;30%;50%|tăng tốc lên 80%
 d6c5cf5377de|Nhiệm vụ 4: nhấn nút khẩn cấp thì xe làm gì?|Dừng lại|Tăng tốc;Rẽ trái;Tiếp tục lùi|nút khẩn cấp được nhấn thì xe dừng lại
 a60c7a595cbd|Cổng thông minh trong nhiệm vụ mở khi nào?|Khi có người đến cổng|Chỉ khi trời tối;Sau 10 vòng motor;Khi pin hết|Khi có người đến cổng thì mở cổng ra
2ae99d256765|My Block giúp tổ chức chương trình như thế nào?|Gom nhiều lệnh nhỏ thành một tên gọi|Xóa toàn bộ lệnh;Thay pin cho não;Chỉ đổi màu nền|gom nhiều câu lệnh nhỏ
2ae99d256765|Nhiệm vụ 3 cần kết hợp hoạt động nào?|Kim đồng hồ quay và quả lắc hoạt động|Nam châm hút và thả đĩa;Xe đi line và dừng;Phà sang sông|Kết hợp kim đồng hồ quay và quả lắc hoạt động
486a372810a5|Trong nhiệm vụ 1, ánh sáng dưới 40% thì trạm làm gì?|Báo động|Hoạt động bình thường;Chỉ tăng tốc;Tắt mọi lệnh|chiếu sáng <40% thì trạm báo động
486a372810a5|Ánh sáng 80% thuộc nhánh nào của nhiệm vụ 1?|Hoạt động bình thường|Báo động dưới 40%;Nhánh từ 40% đến 75%;Không có nhánh phù hợp|chiếu sáng >75% thì trạm hoạt động bình thường
17a394134080|Nhiệm vụ Công xưởng sáng tạo dựa trên nguồn ý tưởng nào?|Các mô hình đã học|Chỉ tên phần mềm;Chỉ màu dây;Chỉ tên lớp|Sáng tạo mô hình từ các mô hình đã học
'''
for line in rows.strip().splitlines():
 id,prompt,correct,wrong,evidence=line.strip().split('|');q(id.strip(),prompt,correct,wrong.split(';'),evidence)
# Shared concepts are added only when that exact definition exists in the document.
rules=[
 ('Pin dùng để cung cấp năng lượng cho não','Pin đảm nhiệm chức năng nào?','Cung cấp năng lượng cho não',['Phát hiện màu','Thực hiện vòng lặp','Hiển thị tín hiệu']),
 ('Não dùng để điều khiển các linh kiện điện tử','Não robot có vai trò gì?','Điều khiển các linh kiện điện tử',['Chỉ chứa vật mẫu','Chỉ hút vật','Chỉ làm bánh xe']),
 ('Thẻ lệnh điều kiện, nếu điều kiện đúng sẽ thực hiện câu lệnh, nếu không thì không thực hiện gì cả','Với if không có else, khi điều kiện sai thì khối bên trong thế nào?','Không được thực hiện',['Luôn chạy hai lần','Chạy mãi mãi','Đổi thành đúng']),
 ('Thẻ lệnh lặp lại mãi mãi, lặp lại các câu lệnh bên trong từ lúc bắt đầu tới lúc dừng chương trình','Forever thực hiện các lệnh bên trong đến khi nào?','Đến khi chương trình dừng',['Đúng một lần','Đúng hai lần','Chỉ khi đổi tên robot']),
 ('Thiết lập tốc độ của động cơ','Muốn thay đổi tốc độ motor, cần dùng loại lệnh nào?','Thiết lập tốc độ động cơ',['Đổi màu LED','Hút nam châm','Đổi tên My Block']),
 ('Chờ … giây','Khối chờ theo số giây dùng để làm gì?','Tạm chờ trong thời lượng đã đặt',['Tự xoay motor 360 độ','Tự đo màu của vật','Tự nhả nam châm']),
 ('Cảm biến mắt phát hiện vật cản','Muốn chờ đến lúc có vật cản, cần kiểm tra điều gì?','Cảm biến mắt phát hiện vật cản',['Tên lớp học','Màu của pin','Tên file chương trình']),
 ('Gửi lời cảm ơn với người xem','Khi kết thúc phần demo, nên làm gì?','Cảm ơn người xem',['Bỏ đi không nói gì','Xóa bài trình bày','Ngắt lời người xem']),
 ('Nhóm thẻ lệnh vòng lặp','Để thực hiện lại một chuỗi hành động, nên dùng nhóm thẻ nào?','Vòng lặp',['Chỉ điều khiển LED','Chỉ đặt tốc độ','Chỉ điều khiển mắt']),
]
for d in catalog:
 for needle,prompt,correct,wrong in rules:
  if norm(needle).casefold() in norm(texts[d['id']]).casefold() and len(d['questions'])<5:q(d['id'],prompt,correct,wrong,needle)
# Visually reviewed original pages: transcribed evidence is explicitly labelled.
def v(id,page,prompt,correct,wrong,evidence):q(id,prompt,correct,wrong,'Đọc từ hình trang '+str(page)+': '+evidence,'/quiz/images/'+id+'-page-'+str(page)+'.webp',True)
v('e60f77c9ba8f',2,'Trong bài tập 1, khi mắt thấy vật, LED Bumper chuyển sang màu gì?','Đỏ',['Xanh lá','Xanh dương','Tắt'],'if eye found an object → stop Motor1, stop Motor2, set LEDBumper3 to red, wait 2 seconds.')
v('e60f77c9ba8f',3,'Trong bài tập 2, My Block Stop Bus làm gì?','Dừng cả Motor1 và Motor2',['Chỉ dừng Motor1','Quay cả hai motor','Đổi đèn xanh'],'define Stop Bus gồm stop Motor1 và stop Motor2.')
v('1c9d2658bb7e',2,'Trong bài tập 1, sau khi nhấn Bumper, đèn đỏ được giữ bao lâu trước khi chuyển xanh?','3 giây',['1 giây','2 giây','5 giây'],'set LEDBumper3 to red → wait 3 seconds → set LEDBumper3 to green.')
v('1c9d2658bb7e',3,'Điều kiện if trong bài tập 2 kiểm tra gì?','Mắt phát hiện vật thể',['Bumper được nhấn','Tốc độ bằng 50%','Motor quay 90 độ'],'if eye found an object? then stop Motor1, stop Motor2, set LEDBumper3 to red.')
v('3cdf3756bac6',1,'Thẻ set motor velocity to 50% thiết lập điều gì?','Tốc độ motor bằng 50%',['Góc quay 50 độ','Chờ 50 giây','Lặp 50 lần'],'Bảng có thẻ set motor velocity to 50%.')
v('3cdf3756bac6',1,'Trong bảng, repeat 10 thực hiện khối bên trong bao nhiêu lần?','10 lần',['1 lần','5 lần','Mãi mãi'],'Bảng có thẻ repeat 10 và thẻ forever riêng biệt.')
v('028ca18bbb49',2,'Đề số 4: đến vị trí số 1, LED Bumper báo màu nào?','Đỏ',['Xanh lá','Tắt','Xanh dương'],'Robot di chuyển với tốc độ 50% đến vị trí số 1. Sau đó LED Bumper báo tín hiệu Đỏ và dừng lại.')
v('028ca18bbb49',2,'Đề số 4: robot đến vị trí số 2 với tốc độ bao nhiêu?','30%',['50%','60%','100%'],'Robot lùi 1 bước và di chuyển sang vị trí số 2 với tốc độ 30% và báo tín hiệu Xanh lá.')
q('165f92ddbc7d','Nếu vị trí số 1 có màu đỏ, mô hình đi đến đâu tiếp theo?','Vị trí số 2',['Vị trí số 3','Đi thẳng về GO','Không di chuyển'],'thì mô hình đi đến vịtrí số2')
q('165f92ddbc7d','Nếu vị trí số 1 có màu xanh dương, mô hình đi đến đâu?','Vị trí số 3',['Vị trí số 2','Đi thẳng về GO','Vị trí số 4'],'thì mô hình đi đến vịtrí số3')
# Aggregated documents reuse only questions whose exact cited evidence appears in that aggregate.
for d in catalog:
 if 'Tổng hợp' in d['title'] or d['title']=='PreA - Homework':
  source=norm(texts[d['id']]).casefold()
  for other in catalog:
   if other['group']!=d['group'] or other['id']==d['id']:continue
   for item in other['questions']:
    if not item.get('image') and norm(item['evidence']).casefold() in source and len(d['questions'])<15:
     if not any(x['prompt']==item['prompt'] for x in d['questions']):d['questions'].append({**item,'id':d['id']+'-q'+str(len(d['questions'])+1)})
Path('public/quiz/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2),encoding='utf-8')
print('Questions',sum(len(d['questions']) for d in catalog));print('GAPS',[(d['id'],d['title']) for d in catalog if not d['questions']])

