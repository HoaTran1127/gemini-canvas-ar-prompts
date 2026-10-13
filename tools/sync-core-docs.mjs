// Ghé nguyên văn 14 dòng CORE vào master + template — hai file này không do build-prompts.mjs sinh ra
// nên mỗi lần đổi CORE trong lib là chúng lệch một dòng và validate báo đỏ cả lượt.
// Thay cả khối: từ dòng CORE_TITLE đến hết dòng "- " liên tiếp ngay sau nó.
import fs from 'fs';
import path from 'path';
import { CORE, CORE_TITLE } from './lib/core.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const FILES = ['prompts/00-master-canvas-prompt.md', 'prompts/templates/game-prompt-template.md'];

let done = 0;
for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) throw new Error('Thiếu file: ' + rel);
  const lines = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').split('\n');
  const start = lines.findIndex((l) => l.trimEnd() === CORE_TITLE);
  if (start < 0) throw new Error(`${rel}: không tìm thấy dòng tiêu đề "${CORE_TITLE}" — khối CORE đã bị đổi tên hay xoá?`);
  let end = start + 1;
  while (end < lines.length && (lines[end].startsWith('- ') || lines[end].startsWith('  '))) end++;
  const soDongCu = end - (start + 1);
  lines.splice(start + 1, soDongCu, ...CORE.split('\n'));
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  done++;
  console.log(`${rel}: khối CORE ${soDongCu} dòng cũ -> ${CORE.split('\n').length} dòng từ tools/lib/core.mjs.`);
}
if (done !== FILES.length) throw new Error('Chỉ ghé được ' + done + '/' + FILES.length + ' file.');
