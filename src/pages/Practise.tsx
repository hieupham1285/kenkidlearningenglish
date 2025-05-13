import React, { useEffect, useState } from "react";

// Đường dẫn tới file từ vựng tiếng Anh và tiếng Việt trên GitHub Gist
const EN_URL = "https://gist.githubusercontent.com/hieupham1285/cacfd7d27ad6002f9107762d19b2518f/raw/English.txt";
const VI_URL = "https://gist.githubusercontent.com/hieupham1285/06999bfd4889d15be36a3d100631edbe/raw/Vietnam.txt";

// // Đường dẫn tới file từ vựng tiếng Anh và tiếng Việt trong thư mục public
// const EN_URL = "/English.txt";
// const VI_URL = "/Vietnam.txt";

// Định nghĩa kiểu dữ liệu cho một cặp từ
// en: tiếng Anh, vi: tiếng Việt
// Ví dụ: { en: "cotton", vi: "Bông gòn" }
type Pair = { en: string; vi: string };

// Hàm trộn ngẫu nhiên một mảng (Fisher-Yates shuffle)
function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((v) => [Math.random(), v] as [number, T]) // Gán số ngẫu nhiên cho mỗi phần tử
    .sort((a, b) => a[0] - b[0]) // Sắp xếp theo số ngẫu nhiên
    .map(([, v]) => v); // Lấy lại giá trị phần tử
}

export default function Practise() {
  // State lưu toàn bộ cặp từ lấy từ file
  const [pairs, setPairs] = useState<Pair[]>([]);
  // State kiểm soát trạng thái loading khi đang tải dữ liệu
  const [loading, setLoading] = useState(true);
  // State lưu thông báo lỗi nếu có
  const [error, setError] = useState<string | null>(null);

  // State lưu 5 cặp từ được chọn ngẫu nhiên cho 1 lần chơi
  const [leftWords, setLeftWords] = useState<Pair[]>([]); // Cột trái: tiếng Anh
  const [rightWords, setRightWords] = useState<Pair[]>([]); // Cột phải: tiếng Việt (được trộn thứ tự)
  // State lưu chỉ số từ đang được chọn ở mỗi cột
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  // State lưu các chỉ số cặp đã ghép đúng
  const [matched, setMatched] = useState<number[]>([]);

  // useEffect chỉ chạy 1 lần khi component mount để tải dữ liệu từ 2 file
  useEffect(() => {
    Promise.all([
      fetch(EN_URL).then(res => res.text()), // Tải file tiếng Anh
      fetch(VI_URL).then(res => res.text()), // Tải file tiếng Việt
    ]).then(([enText, viText]) => {
      // Tách từng dòng, loại bỏ khoảng trắng thừa và dòng rỗng
      const enArr = enText.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
      const viArr = viText.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
      
      // Kiểm tra nếu không có dữ liệu
      if (enArr.length === 0 || viArr.length === 0) {
        setError("Không tìm thấy dữ liệu từ vựng");
        setLoading(false);
        return;
      }

      // Lấy số lượng cặp nhỏ nhất giữa 2 file để tránh lỗi lệch dòng
      const minLen = Math.min(enArr.length, viArr.length);
      const allPairs: Pair[] = [];
      for (let i = 0; i < minLen; ++i) {
        allPairs.push({ en: enArr[i], vi: viArr[i] }); // Tạo mảng cặp từ
      }
      setPairs(allPairs); // Lưu toàn bộ cặp từ vào state

      // Lấy ngẫu nhiên 5 cặp từ cho 1 lần chơi
      const randomPairs = shuffle(allPairs).slice(0, 5);
      setLeftWords(randomPairs); // Cột trái: tiếng Anh (giữ nguyên thứ tự)
      setRightWords(shuffle(randomPairs)); // Cột phải: tiếng Việt (trộn thứ tự)
      setLoading(false); // Đã tải xong dữ liệu
    }).catch(err => {
      setError("Không thể tải dữ liệu từ vựng");
      setLoading(false);
    });
  }, []);

  // useEffect theo dõi khi người dùng chọn đủ 1 từ ở mỗi cột
  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      // Kiểm tra nếu cặp chọn đúng (so sánh nghĩa tiếng Việt)
      if (
        leftWords[selectedLeft].vi === rightWords[selectedRight].vi
      ) {
        setMatched((prev) => [...prev, selectedLeft]); // Đánh dấu đã ghép đúng
      }
      // Sau 0.5s sẽ reset lựa chọn để người dùng chọn tiếp
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  }, [selectedLeft, selectedRight, leftWords, rightWords]);

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) return <div style={{ padding: 32, textAlign: "center" }}>Đang tải dữ liệu...</div>;

  // Hiển thị lỗi nếu có
  if (error) return <div style={{ padding: 32, textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 16, paddingBottom: 70 }}>
      <h2 style={{ fontWeight: 700, fontSize: 20, textAlign: "center" }}>Ghép cặp từ</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 24 }}>
        {/* Cột trái: tiếng Anh */}
        <div>
          {leftWords.map((pair, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLeft(idx)}
              disabled={matched.includes(idx)}
              style={{
                display: "block",
                width: 140,
                margin: "12px 0",
                padding: "16px 0",
                background: matched.includes(idx)
                  ? "#e0e0e0"
                  : selectedLeft === idx
                  ? "#b3e5fc"
                  : "#fff",
                border: "2px solid #eee",
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 500,
                opacity: matched.includes(idx) ? 0.5 : 1,
                cursor: matched.includes(idx) ? "default" : "pointer",
                transition: "background 0.2s, opacity 0.2s",
              }}
            >
              {pair.en}
            </button>
          ))}
        </div>
        {/* Cột phải: tiếng Việt */}
        <div>
          {rightWords.map((pair, idx) => {
            // Tìm index cặp bên trái đã matched
            const leftIdx = leftWords.findIndex((p) => p.vi === pair.vi);
            const isMatched = matched.includes(leftIdx);
            return (
              <button
                key={idx}
                onClick={() => setSelectedRight(idx)}
                disabled={isMatched}
                style={{
                  display: "block",
                  width: 140,
                  margin: "12px 0",
                  padding: "16px 0",
                  background: isMatched
                    ? "#e0e0e0"
                    : selectedRight === idx
                    ? "#b3e5fc"
                    : "#fff",
                  border: "2px solid #eee",
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 500,
                  opacity: isMatched ? 0.5 : 1,
                  cursor: isMatched ? "default" : "pointer",
                  transition: "background 0.2s, opacity 0.2s",
                }}
              >
                {pair.vi}
              </button>
            );
          })}
        </div>
      </div>
      {/* Hiện thông báo khi ghép đúng hết các cặp */}
      {matched.length === leftWords.length && (
        <div style={{ marginTop: 32, color: "#4caf50", fontWeight: 600, fontSize: 20, textAlign: "center" }}>
          🎉 Hoàn thành!
        </div>
      )}
    </div>
  );
}
