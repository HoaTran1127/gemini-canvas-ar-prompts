# FY-11 — Đập Chuột Ghép Cụm

> Tiếng Anh lớp 5 · Band Cambridge **A2 Flyers** (A2) · Điều khiển: Đập / vụt bằng vật cầm tay (Swat) · Cụm kiến thức: xay-cum-tu
> Prompt độc lập: copy nguyên khối `text` bên dưới dán vào **Google Gemini (bật chế độ Canvas)**. Không cần repo này.

```text
Tạo game giáo dục web "ĐẬP CHUỘT GHÉP CỤM" cho học sinh Việt Nam lớp 5, môn Tiếng Anh, chuẩn A2 Flyers (A2) của Cambridge.

ƯU TIÊN theo đúng thứ tự: (1) học sinh đạt mục tiêu học tập ở mục 2; (2) điều khiển AR ở mục 1 nhận diện được thật và fallback chuột chơi đủ 100%; (3) phần còn lại. File chật thì làm đơn giản chi tiết trang trí, không cắt mục 2 và mục 3.

1. Ý TƯỞNG
- Bối cảnh: Bến cảng, đàn chuột thò đầu mang từng mảnh của một cụm từ.
- Việc của học sinh mỗi lượt: Vụt tay đập trúng con chuột mang mảnh từ đúng để ghép kín cụm từ trong câu.
- Điều khiển: Đập / vụt bằng vật cầm tay (Swat). HandLandmarker; cổ tay (landmark 0) và đầu ngón giữa (landmark 12) để tính hướng và tốc độ vụt của đầu vật. Biên độ động tác: Vụt từ vai xuống bằng cả cánh tay, tay cầm cuộn báo/vợt đập ruồi hoặc tay không; đầu vật đi quãng dài tới mục tiêu và đổi hướng vụt giữa các lượt, không phải cú hất cổ tay ngay trước mặt.
- Không có camera thì click nhanh vào mục tiêu để mô phỏng cú đập.
- Luật nhiều đích: 12 lỗ đánh số 1–12, lưới 4 cột × 3 hàng, hai lỗ kề cách nhau >= 18% bề rộng khung, vùng chạm mỗi lỗ >= 11%. Mỗi lượt thò đồng thời 3–5 con, ĐÚNG MỘT con mang đáp án đúng, con khác mang đáp án nhiễu từ một lỗi thật. Con thò giữ thẻ cao >= 2,5 giây mới rụt, con đúng ở lại >= 4 giây (nút "Chơi chậm lại" nhân đôi). >= 3 lỗ ngang đầu trở lên, >= 3 lỗ dưới đầu gối, >= 2 lỗ sát mỗi mép — mỗi lượt là một lần với tay hoặc khuỵu chân. Đáp án đúng rải ở >= 5 lỗ khác nhau/phiên, không lặp cùng lỗ quá 2 lượt liên tiếp. Đập hụt KHÔNG trừ tim, vẫn tính vào bộ đếm "<n> động tác", mascot nhắc "hụt rồi, ngắm lại nào"; trúng con sai trừ 1 tim, dừng 2 giây hiện lời giải rồi cả đàn rụt.
- Mascot **Cánh Buồm** (chắc tay, ghim từng mảnh câu) — khen "Ghép đúng cụm rồi!", hô mở đầu "Giương buồm, một hai vụt!". Bảng màu: `--miti-1: #FF7B00` (vật thể AR), `--miti-2: #FFBF7F` (particle, viền hit), `--miti-3: #048A81` (HUD).
- Không khí giờ chơi (trang trí, được phép làm đơn giản): thể thao **Cầu lông** (hạ nhiệt "Duỗi vai và cánh tay") · dân gian **Đánh khăng** (đồ dùng AR "gậy tre") · khoảnh khắc chữ ký cả đàn chuột sáng đèn theo hàng và cụm từ vừa ghép xong hiện nguyên văn trên cánh buồm · đạo cụ AR neo vào người chơi "mảnh từ neon gắn sau vai phải, gắn thêm một mảnh mỗi khi em vụt đúng".
- Vòng đầu tiên phải dễ để hiểu luật trong vài giây, không cần đọc hướng dẫn dài.

2. MỤC TIÊU HỌC TẬP
- Mục tiêu: ghép từ thành cụm a pair of a glass of how many và đặt câu với cụm.
- Band Cambridge: **A2 Flyers** (A2)
- Trần từ vựng: chỉ dùng 1431 từ thuộc Flyers trở xuống, ưu tiên 78 từ của chủ đề sở thích, hoạt động: badminton, baseball, basketball, board game, drawing, …. Cấm mọi từ lần đầu xuất hiện ở band cao hơn; từ SGK Việt Nam ngoài danh sách trên chỉ được dùng nếu đã học ở Tiếng Anh lớp 5.
- Trần ngữ pháp: chỉ dùng 8 cấu trúc của Flyers — Hiện tại hoàn thành với already / yet / just / ever · Câu bị động · Mệnh đề quan hệ who / which / where · Câu điều kiện loại 1 và loại 2 · should / shouldn’t, might / could · Danh động từ và động từ nguyên thể · Câu hỏi đuôi, liên từ when / while / so that · Tường thuật (reported speech).
- Mạch kiến thức: **Kiến thức ngôn ngữ** — nhãn HUD "Ghép cụm từ" · **Tuần 6–15 · Học kì I**. In nguyên văn mạch và nhãn tuần ở màn khởi động và màn tổng kết, nằm trong khối nút "Copy tờ rời".
- Yêu cầu cần đạt (in NGUYÊN VĂN một dòng "Yêu cầu cần đạt: ..." ở màn khởi động và màn tổng kết, cấm viết lại hoặc tóm tắt): "Ghép được các cụm từ thường dùng và đặt câu với cụm từ; không dịch word-by-word từ tiếng Việt."
- Mẹo nhớ (bật ở cú đúng đầu cụm và sau câu sai cùng lỗi, mascot đọc to + làm mẫu 3 giây): "Cụm từ đi liền mạch, không tách từng chữ."
- Báo trước "Dễ nhầm" ở câu đầu tiên của cụm (≤16 từ, tắt sau 6 giây, không che đề): "cụm từ thiếu danh từ chính".
- Lỗi học sinh thường mắc (mỗi câu sai ghi đúng một lỗi này): cụm từ thiếu danh từ chính; đặt lượng từ sai trước danh từ; dịch word-by-word từ tiếng Việt.
- Phạm vi: chỉ dùng nội dung Tiếng Anh lớp 5 đã học và trong đúng band Flyers; cấm số hoặc từ vựng ngoài phạm vi trên.
- Từ và câu tiếng Anh là học liệu, giữ nguyên tiếng Anh; mọi hướng dẫn, nút bấm, lời giải thích bằng tiếng Việt. Dùng window.speechSynthesis (en-US hoặc en-GB) đọc to từ/câu khi trả lời đúng, có nút phát lại.
- Điều kiện: hết 5 tim (mỗi đáp án sai trừ 1 tim) là thua, đủ 12 lượt là thắng và hiện tổng kết. Chống ăn may: phương án nhiễu phải là kết quả của một lỗi có thật trong danh sách lỗi trên, không phải số ngẫu nhiên; đáp án đúng không nằm cố định một vị trí.
- Màn tổng kết: ba thẻ "Làm tốt / Cần luyện / Động tác lần sau", nhóm câu sai theo errorTag kèm số lượt, không chỉ báo điểm; khối "Gửi bố mẹ" bốn dòng điền số thật: "<n> động tác môn Cầu lông" · "Ghép cụm từ: <k>/<tổng> câu đúng" · "Mẹo con mang về: Cụm từ đi liền mạch, không tách từng chữ." · "Việc 3 phút ở nhà: cả nhà cùng Vụt vợt đập cầu".
- Bộ sưu tập: mỗi màn thắng mở khóa 1 thẻ theo chủ đề Đập Chuột Ghép Cụm, lưu localStorage key "miti-collection", có màn "Sưu tập của em".

3. RÀNG BUỘC CỐT LÕI (thiếu bất kỳ dòng nào là hỏng)
- 1 file HTML duy nhất: `<style>`/`<script>` nội tuyến; không Tailwind Play CDN, không .css/.js/.json/mp3 ngoài; đồ hoạ VẼ BẰNG SVG INLINE / CSS / CANVAS 2D do code tự sinh (mascot, nền, đạo cụ là hình vector chi tiết đúng bảng màu, không dùng file ảnh ngoài); cấm bịa URL ảnh, cấm base64, cấm emoji thay ảnh; chỉ tải MediaPipe (CDN + model) và font có dự phòng.
- Camera mặc định TẮT, có nút bật/tắt không cần tải lại trang; chỉ xin quyền camera SAU khi học sinh bấm BẮT ĐẦU; trạng thái bằng tiếng Việt (Đang tải → Xin quyền camera → Camera sẵn sàng → Đang nhận diện → Lỗi + nút Thử lại). Không upload ảnh/video, chỉ giữ landmark trong bộ nhớ, không thu thập dữ liệu cá nhân.
- MediaPipe Tasks Vision, import từ `@mediapipe/tasks-vision@1.0.1`; cấu hình `getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } } })`, lật gương ngang cả khi hiển thị lẫn khi tính tọa độ; trình duyệt chặn camera thì báo một dòng tiếng Việt rồi vào thẳng chế độ không camera.
- Mọi tọa độ đi qua `toScreen(lx, ly)`; nền AR là chính khung hình camera với lớp phủ tối không vượt 0.45; vật thể có `z`, có bóng dưới chân và có ít nhất một vật ảo neo vào landmark cơ thể.
- Cử chỉ fire ở lượt chuyển trạng thái, có hysteresis hai ngưỡng + cooldown + ngưỡng tin cậy; hover không tính là đã chọn; giữ nguyên tư thế không được spam event và không bị trừ tim; confidence thấp thì không chốt đáp án.
- FALLBACK bắt buộc: chuột / cảm ứng / phím mũi tên mô phỏng ĐÚNG hành động chính; có nhãn "Chế độ không dùng camera"; mục tiêu học tập vẫn đủ 100% khi chơi bằng fallback.
- Không điểm số, không xếp hạng, không timer thi đua. Sai không phạt bằng cách biến mất kiến thức: dừng 2 giây và hiện lời giải đầy đủ bằng tiếng Việt, chỉ rõ chữ số / bước / từ cần sửa.
- Vận động thật: chuyển động là cách chơi chính, không phải trang trí — game không thể hoàn thành bằng cử động ngón tay nhỏ tại chỗ hay nằm yên bấm; mỗi lượt bắt buộc một động tác rộng cả tay và thân, không nhấc ngón ngay trước ngực. Theo 5 bước: Kiểm tra thiết bị → Định vị → Xem cách chuyển động → 2 lượt luyện mẫu → 12 lượt chính, kèm Khởi động 60–90 giây và Hạ nhiệt 45–60 giây; một phiên ≤10 phút để vừa tiết 45 phút.
- Lớp 4 em: một em chơi, ba em chờ có việc thật (đếm nhịp, cổ vũ, theo dõi đáp án), luân phiên theo sĩ số M với thời gian chờ ≤20 giây và nhãn "đến lượt em"; thành tích ghi cho cả đội, không so cá nhân.
- Mọi học sinh dùng được: không chỉ báo hiệu bằng màu (kèm hình hoặc chữ), phụ đề tiếng Việt cho mọi âm thanh, chữ đề ≥28px desktop và ≥20px điện thoại, responsive dọc và ngang, nút Giảm hiệu ứng chuyển động, không nhấp nháy quá 3Hz, vùng chơi an toàn có thảm/cọc tiêu cảnh báo và nút "Chơi chậm lại" không bị trừ tim.
- Tab ẩn hoặc mất tiêu điểm là tự Pause, quay lại đếm 3-2-1. Máy yếu: nhận diện 1 lần mỗi 2–3 khung hình, particle dùng pool, tự giảm chi tiết khi FPS tụt.
- Mỗi lượt chỉ một ý, đề ≤16 từ. Toàn bộ UI, tên nút, hướng dẫn, thông báo lỗi và lời giải bằng TIẾNG VIỆT (học liệu tiếng Anh giữ nguyên tiếng Anh); không để thuật ngữ kỹ thuật (confidence, cooldown, fallback) hiện trước mặt học sinh.
- Chữ ký MiTi: ô bo góc `#FFD84D` chứa chữ M màu `#07111F` + chữ MiTi đậm + dấu ✦ nhỏ, inline SVG/CSS; xuất hiện ở màn Bắt đầu, HUD khi chơi và màn Kết quả; kèm dòng "MiTi • Học bằng chuyển động"; không xóa hay đổi tên ở chế độ không camera.
- Chỉ xuất toàn bộ file HTML hoàn chỉnh: không TODO, không pseudocode, không "...", không phần "bạn tự bổ sung", không giải thích dài.

4. NGÂN HÀNG DỮ LIỆU (QUESTION_DATA)
- Khai báo `const QUESTION_DATA = [...]` ở ĐẦU khối <script>, engine đặt phía sau.
- Mỗi mục theo đúng khuôn: { id, level, prompt, choices, answer, explanation, errorTag, loiViet, dang }.
- Tối thiểu 60 mục, chia 3 mức độ (level 1/2/3), mỗi mục một đáp án đúng duy nhất kiểm chứng được bằng code.
- Mỗi mục có từ hoặc câu tiếng Anh, gợi nghĩa tiếng Việt, phiên âm khi phù hợp, và audio bằng window.speechSynthesis; đáp án là chuỗi cố định.
- Chia mức theo band: level 1 lấy từ và cấu trúc cơ bản nhất của Flyers; level 3 vẫn nằm trong Flyers, tăng độ khó bằng câu dài hơn chứ không bằng từ ngoài band.
- errorTag là mã máy của lỗi, lấy đúng một trong: cum_tu_thieu_danh_tu, luong_tu_tru_danh_tu, mau_dich_gian_hieu. loiViet là cụm tiếng Việt in thường, lấy nguyên văn một mục trong danh sách lỗi ở mục 2, là thứ hiển thị cho học sinh; mỗi câu sai lưu cả hai trường.
- Gợi ý hiển thị khi sai: hiện bản dịch tiếng Việt của cụm sau khi ghép đúng.
- xáo trộn vị trí đáp án bằng thuật toán có seed theo lượt.
- Chấm bằng SO SÁNH GIÁ TRỊ với `answer` (chuẩn hóa khoảng trắng hai đầu), KHÔNG chấm bằng chỉ số vị trí; mỗi câu đúng một lựa chọn trùng `answer`.
- Hai mục mẫu để bám theo khuôn (viết tiếp 58 mục nữa, không được ít hơn):
  id: "q1", level: 1, prompt: "Ghép lượng từ đúng với \"water\".", choices: ["a little","a few","many"], answer: "a little", explanation: "Danh từ không đếm được dùng a little; a few và many đứng trước danh từ đếm được số nhiều.", errorTag: "luong_tu_tru_danh_tu", dang: "nhin", loiViet: "đặt lượng từ sai trước danh từ"
  id: "q2", level: 2, prompt: "Cụm từ nào hoàn chỉnh?", choices: ["a big blue bag","a big blue","big blue"], answer: "a big blue bag", explanation: "Cụm danh từ cần danh từ chính: a big blue bag; hai đáp án còn lại thiếu bag.", errorTag: "cum_tu_thieu_danh_tu", dang: "nhin", loiViet: "cụm từ thiếu danh từ chính"

5. TỰ KIỂM TRA TRƯỚC KHI XUẤT
- Chạy ràng buộc cốt lõi (1 file HTML · camera tắt mặc định · toScreen · fallback chuột · không điểm/xếp hạng/timer · 5 bước · 4 em luân phiên · tiếp cận · tự Pause · chữ ký MiTi). Riêng ngân hàng: đủ 60 mục, mỗi mục có answer + explanation + loiViet, không trùng câu, không ra ngoài Tiếng Anh lớp 5 và band Flyers (so từng từ trong đề và phương án với 1431 từ ở mục 2, từ nào ngoài thì thay bằng từ trong danh sách); câu sai vào hàng đợi luyện lại trong cùng phiên.
```

## Ghi chú cho người tạo prompt (không gửi Gemini)

- Cluster kiến thức: `xay-cum-tu` — đổi cluster nếu đổi dạng bài.
- Band Cambridge: `FY` (A2 Flyers) — đổi band thì phải đổi cả thư mục prompt, `EXAMPLES_YLE` và dải từ trong `tools/data/yle.mjs`.
- Gesture: `SWAT` — mỗi game tối đa 2 mã, mã đầu là mechanic chính; model: HandLandmarker.
- Muốn đổi ý tưởng hoặc mục tiêu: sửa `tools/data/games.mjs` / `tools/data/clusters.mjs` rồi chạy `node tools/build-prompts.mjs`, không sửa tay file này.
- Muốn đổi quy định chung cho mọi game: sửa `tools/lib/core.mjs`.
