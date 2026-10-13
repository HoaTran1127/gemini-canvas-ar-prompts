#!/usr/bin/env bash
# Probe đột biến: mỗi lần phá một quy định mới của vòng này, build PHẢI đỏ, rồi restore.
set -u
REPO=$(cd "$(dirname "$0")/.." && pwd)
BK=${TMPDIR:-/tmp}/miti-probe
mkdir -p "$BK"
cd "$REPO" || exit 1
[ -f "$BK/gestures.mjs" ] || { echo "Thiếu backup: chạy 'cp tools/data/{gestures,games,identities}.mjs tools/build-prompts.mjs README.md prompts/README.md docs/README.md docs/TEACHER_MODE.md docs/bai-07*.md $BK/' (doi ten README-root.md, prompts-README.md, docs-*.md) khi build dang xanh." >&2; exit 3; }

restore() {
  cp "$BK/gestures.mjs"      tools/data/gestures.mjs
  cp "$BK/games.mjs"         tools/data/games.mjs
  cp "$BK/identities.mjs"    tools/data/identities.mjs
  cp "$BK/build-prompts.mjs" tools/build-prompts.mjs
  cp "$BK/master.md"         prompts/00-master-canvas-prompt.md
  cp "$BK/README-root.md"    README.md
  cp "$BK/prompts-README.md" prompts/README.md
  cp "$BK/docs-README.md"        docs/README.md
  cp "$BK/docs-TEACHER_MODE.md"  docs/TEACHER_MODE.md
  cp "$BK/docs-bai07.md"        docs/bai-07-huong-dan-tu-tao-mini-game-moi.md
  rm -f prompts/VARIANTS_425.md
  # dọn file prompt do probe de lai (build khong tu xoa file cua game da bi doi/bo id)
  rm -f prompts/01-toan4/L4-99-probe-whack.md prompts/01-toan4/L4-97-ghost.md
  rm -f prompts/01-toan4/L4-98-multiplication-whack.md prompts/01-toan4/L4-77-whack-a-mole.md
}

mutate() { # file from to
  node -e '
    const fs=require("fs");
    const [f,a,b]=process.argv.slice(1);
    const s=fs.readFileSync(f,"utf8");
    if(!s.includes(a)){console.error("MUTATE-FAIL: khong thay chuoi goc trong "+f);process.exit(2);}
    fs.writeFileSync(f,s.split(a).join(b));' "$1" "$2" "$3"
}

run() { # label
  echo "----------------------------------------------"
  echo "PROBE: $1"
  node tools/build.mjs > "$BK/last.log" 2>&1
  local code=$?
  if [ $code -eq 0 ]; then
    echo "  X Build van XANH (exit 0) -> quy dinh khong bi chan"
    return 1
  fi
  echo "  O Build DO (exit $code) — ly do:"
  grep -E '^  • |^Error:|Lỗi|thiếu|sót|Cần đúng' "$BK/last.log" | head -6 | sed 's/^/    /'
  return 0
}

pass=0; fail=0
probe() { # label file from to
  restore
  if ! mutate "$2" "$3" "$4"; then echo "PROBE: $1 -> KHÔNG áp được đột biến"; fail=$((fail+1)); return; fi
  if run "$1"; then pass=$((pass+1)); else fail=$((fail+1)); fi
}

probe "P1 sua '12 lo' + luoi 4x3 trong GESTURES.SWAT.nhieu_dich" tools/data/gestures.mjs "12 lỗ đánh số 1–12, lưới 4 cột × 3 hàng" "10 lỗ đánh số 1–10, lưới 5 cột × 2 hàng"
probe "P2 xoa trang GESTURES.SWAT.nhieu_dich" tools/data/gestures.mjs "nhieu_dich: '12 lỗ đánh số 1–12, lưới" "nhieu_dich: '', _xoa: '12 lỗ đánh số 1–12, lưới"
probe "P3 builder khong in dong 'Luat nhieu dich' vao prompt" tools/build-prompts.mjs '${main.nhieu_dich ? ' '${false ? '
probe "P4 L4-41 bo SWAT lam co che chinh" tools/data/games.mjs "'SWAT', 'cong-tru'" "'POINT', 'cong-tru'"
probe "P5 README goc ghi lech 91 -> 85" README.md "Thư Viện 91 Prompt Game" "Thư Viện 85 Prompt Game"
probe "P6 prompts/README ghi lech 91 -> 85" prompts/README.md "**91 prompt game chuẩn**" "**85 prompt game chuẩn**"

probe "P9 docs/TEACHER_MODE.md tui 91 worlds -> 85" docs/TEACHER_MODE.md "91 worlds trong \`tools/data/games.mjs\`" "85 worlds trong \`tools/data/games.mjs\`"
probe "P10 docs/README.md tui Dashboard 91 prompt -> 85" docs/README.md "Dashboard 91 prompt + 12 legacy" "Dashboard 85 prompt + 12 legacy"
probe "P11 bai-07 tui 91 prompt game chuẩn -> 85" docs/bai-07-huong-dan-tu-tao-mini-game-moi.md "**91 prompt game chuẩn**" "**85 prompt game chuẩn**"

probe "P12 master mat '12 lo' o dong tra SWAT" prompts/00-master-canvas-prompt.md "+ đầu ngón giữa (12) · nhiều đích: 12 lỗ, 1 đáp án đúng, đập hụt không trừ tim" "+ đầu ngón giữa (12)"
probe "P13 prompt game bat thanh (id lech games.mjs)" tools/data/games.mjs "'L4-41', 'Đập Chuột Thò Đầu'" "'L4-77', 'Đập Chuột Thò Đầu'"

# P7: them mot game SWAT thu 92 (kèm bản sắc riêng, chỉ dao chot 91 game / 455 block / 6 game SWAT)
restore
node -e '
const fs=require("fs");
const g=fs.readFileSync("tools/data/games.mjs","utf8");
const gg=g.match(/^  \[.L4-42.*\],$/m);
if(!gg){console.error("MUTATE-FAIL: khong tim thay dong L4-42 trong games.mjs");process.exit(2);}
fs.writeFileSync("tools/data/games.mjs", g.replace(gg[0], gg[0]+"\n"+gg[0].replace("L4-42","L4-99").replace("Đập Nhái Bảng Nhân","Probe Đập Chuột").replace("multiplication-whack","probe-whack")));
const i=fs.readFileSync("tools/data/identities.mjs","utf8");
const ii=i.match(/^  \[.L4-42.*\],$/m);
if(!ii){console.error("MUTATE-FAIL: khong tim thay dong L4-42 trong identities.mjs");process.exit(2);}
fs.writeFileSync("tools/data/identities.mjs", i.replace(ii[0], ii[0]+"\n"+ii[0].replace("L4-42","L4-99").replace("Bắp Ếch","Probe Bắp Ếch").replace("#2D6A4F","#2E6B50")));'
if [ $? -eq 0 ]; then run "P7 thêm game SWAT thứ 92 (chốt 91 game / 455 block / 6 game SWAT)" && pass=$((pass+1)) || fail=$((fail+1)); else echo "PROBE: P7 -> KHÔNG áp được đột biến"; fail=$((fail+1)); fi

# P8: de sot file bien the ten cu mang so 425
restore
echo "# ban cu" > prompts/VARIANTS_425.md
if run "P8 con sot prompts/VARIANTS_425.md"; then pass=$((pass+1)); else fail=$((fail+1)); fi

# P14: doi id game -> file prompt cu con sot trong thu muc
restore
node -e '
const fs=require("fs"),f="tools/data/games.mjs",s=fs.readFileSync(f,"utf8");
if(!s.includes("\x27L4-42\x27")){console.error("MUTATE-FAIL");process.exit(2);}
fs.writeFileSync(f,s.split("\x27L4-42\x27").join("\x27L4-98\x27"));'
if [ $? -eq 0 ]; then run "P14 đổi id L4-42 → L4-98, file prompt cũ còn sót" && pass=$((pass+1)) || fail=$((fail+1)); else echo "PROBE: P14 -> KHÔNG áp được đột biến"; fail=$((fail+1)); fi
rm -f prompts/01-toan4/L4-98-multiplication-whack.md

# P15: dua file prompt lang quyen vao thu muc prompt (ngoai pipeline)
restore
cp prompts/01-toan4/L4-41-whack-a-mole.md prompts/01-toan4/L4-97-ghost.md
if run "P15 file prompt lang quyen L4-97-ghost.md"; then pass=$((pass+1)); else fail=$((fail+1)); fi
rm -f prompts/01-toan4/L4-97-ghost.md

restore $pass lan build do nhu mong doi / $fail lan CHUA chan duoc"
echo "-- Build lai sau restore --"
node tools/build.mjs 2>&1 | tail -2
