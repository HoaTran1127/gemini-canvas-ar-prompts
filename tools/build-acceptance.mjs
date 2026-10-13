// Sinh prompts/CHECKLIST_NGHIEP_THU.md gọn từ CORE_LINES (tools/lib/core.mjs).
// 26 module quy định chung cũ (tools/lib/acceptance.mjs, pe, memory, hype, ...) đã rời luồng sinh prompt;
// bảng kiểm chỉ còn soi đúng những gì ràng buộc cốt lõi yêu cầu — trần ~10 KB, in ra giấy mang vào lớp.
// Mỗi dòng cốt lõi thành một mục kiểm kèm một câu cách thử; thêm vài việc bắt buộc phải thử bằng tay.

import fs from 'fs';
import path from 'path';
import { CORE_LINES, CORE_TITLE } from './lib/core.mjs';
import { GAMES } from './data/games.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'prompts', 'CHECKLIST_NGHIEP_THU.md');
const LIMIT = 10000;

// Cách thử — một câu, đúng thứ tự CORE_LINES.
const CACH_THU = [
  'Tìm `<link`, `<script src`, `fetch(`, `http` trong `src=`: ngoài MediaPipe và font không được có file ảnh nào khác; dùng ảnh Canva thì phải là file thật trong `assets/` và xoá tạm một ảnh game vẫn chơi.',
  'Vào tới màn Bắt đầu phải chưa bị hỏi quyền camera; bấm BẮT ĐẦU mới thấy lời xin quyền, trạng thái bằng tiếng Việt.',
  'Tìm chuỗi `tasks-vision@1.0.1` và `facingMode: "user"` trong nguồn; bật camera lên thì hình phải lộn gương như soi kính.',
  'Cho một em đứng lệch trái khung hình: vật thể AR và bóng chân đi theo, không lệch pha; chữ còn đọc được sau lớp phủ.',
  'Giữ im một tư thế 5 giây: không spam cú chốt, không trừ tim; lướt tay qua đáp án mà chưa giữ cũng không chốt.',
  'Tắt camera giữa phiên rồi chơi trọn bằng chuột: vẫn đủ 12 lượt và mọi mục tiêu học tập, có nhãn "Chế độ không dùng camera".',
  'Trả lời sai: màn dừng 2 giây, hiện lời giải đầy đủ tiếng Việt chỉ rõ chữ số / bước / từ cần sửa; không có đồng hồ đua.',
  'Ngồi im chỉ cử động ngón tay bấm cả phiên: game phải KHÔNG cho qua. Bấm đồng hồ một phiên: đủ khởi động, 2 lượt luyện mẫu, 12 lượt chính, hạ nhiệt.',
  'Bốn em quanh một máy: ba em chờ phải có việc thật, đổi lượt ≤20 giây, có nhãn "đến lượt em".',
  'Che một tay tưởng tượng mất màu: đúng/sai còn phân biệt bằng hình và chữ; điện thoại đặt dọc chữ ≥20px; bấm nút Giảm hiệu ứng.',
  'Switch sang tab khác 10 giây rồi quay lại: game phải tự Pause và đếm 3-2-1 trước khi chơi tiếp.',
  'Đọc to đề câu đầu: nghe một lần là hiểu phải làm gì; không chữ kỹ thuật (confidence, cooldown, fallback) hiện trên màn.',
  'Kiểm logo MiTi ở cả ba màn Bắt đầu / HUD khi chơi / Kết quả, kèm dòng "MiTi • Học bằng chuyển động"; tắt camera vẫn còn nguyên.',
  'Không dòng TODO, không "...", không pseudocode trong file; mở Console trình duyệt: hết một phiên không có lỗi đỏ.',
];

const HUMAN = [
  'Đưa cho một học sinh lớp 4 chưa từng đọc hướng dẫn chơi thử 60 giây — em có tự hiểu phải làm gì không?',
  'Rút mạng lúc game đang tải model — có thông báo tiếng Việt rồi vào thẳng chế độ không camera, chơi được tiếp không?',
  'Đứng xa camera tới mức chỉ còn thấy hai bàn tay — game có hạ cơ chế xuống mức "chỉ thấy tay" hay đứng màn chờ?',
  'Cố tình sai 4 câu liên tiếp — câu thứ 4 có về mức dễ cùng loại lỗi, hiện lời giải từng bước và không trừ tim lần hai?',
  'Bật sẵn Giảm hiệu ứng chuyển động (prefers-reduced-motion) trong hệ điều hành rồi mở game — hiệu ứng có tắt sẵn mà nội dung học vẫn nguyên?',
  'Mở bằng điện thoại đặt dọc — đề bài còn ≥20px, hai tay còn trong khung hình, bố cục không bị cắt?',
];

const tenKhoi = CORE_TITLE.replace(/^\d+\.\s*/, '').replace(/\(.*\)/, '').trim().toLowerCase();

const rows = CORE_LINES.map((l, i) => `- [ ] ${l.replace(/^- /, '')}\n  - Cách thử: ${CACH_THU[i]}`).join('\n');
const humanRows = HUMAN.map((s, i) => `${i + 1}. ☐ ${s}`).join('\n');

const out = `# ✅ BẢNG KIỂM NGHIỆM THU GAME MiTi

> Do \`tools/build-acceptance.mjs\` sinh ra từ \`CORE_LINES\` trong \`tools/lib/core.mjs\`. Đừng sửa tay file này — đổi ràng buộc cốt lõi trong lib rồi chạy lại script.
> Dùng khi: vừa dán một prompt vào **Gemini (chế độ Canvas)**, nhận về 1 file HTML và cần biết nó đạt chuẩn MiTi chưa trước khi cho học sinh chơi (in ra giấy hoặc mở trên điện thoại).

## A. ${CORE_LINES.length} mục theo ${tenKhoi} — làm theo đúng từng dòng

${rows}

Bản không camera vẫn phải đạt toàn bộ mục A; riêng mục camera kiểm lời hứa "vào thẳng chế độ không camera".

## B. ${HUMAN.length} việc người thử phải làm tay — không tool nào thay được

${humanRows}

---

## C. Khi có dòng chưa đạt

Không tay sửa file HTML. Dán lại nguyên văn dòng ràng buộc tương ứng trong \`tools/lib/core.mjs\` vào cuối prompt (khối "3. RÀNG BUỘC CỐT LÕI"), sinh lại file rồi kiểm lại từ đầu. Hai lần vẫn lỗi → ghi dòng chưa đạt kèm nguyên nhân quan sát được.

## D. Biên bản

| Ô | Điền |
| :-- | :-- |
| Tên game | |
| Mã prompt (ví dụ \`L4-01\` hoặc \`LEG-01\`) | |
| Kiểu điều khiển đã chơi (camera / chuột-cảm ứng) | |
| Máy dùng để thử | |
| Người nghiệm thu · ngày giờ | |
| Số mục A đạt | ____ / ${CORE_LINES.length} |
| Số việc B đạt | ____ / ${HUMAN.length} |
| Kết luận | ☐ Đưa vào tiết học ☐ Sửa prompt rồi kiểm lại |

**Riêng tư:** bảng này chỉ tồn tại trên máy của bạn; game không upload ảnh, video hay kết quả nghiệm thu lên bất kỳ máy chủ nào.

*Miti • Học bằng chuyển động — bản chuẩn: \`prompts/00-master-canvas-prompt.md\` · ${GAMES.length} prompt: \`catalogs/GAME_CATALOG.md\`*
`;

const bytes = Buffer.byteLength(out, 'utf8');
if (bytes > LIMIT) throw new Error(`Bảng kiểm ${bytes} byte vượt trần ${LIMIT}.`);
fs.writeFileSync(OUT, out, 'utf8');
console.log(`Đã sinh prompts/${path.basename(OUT)}: ${CORE_LINES.length} mục ràng buộc cốt lõi + ${HUMAN.length} việc người thử (${bytes} B, trần ${LIMIT} B).`);
