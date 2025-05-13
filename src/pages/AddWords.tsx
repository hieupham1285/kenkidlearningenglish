export default function AddWords() {
  return (
    <div style={{ padding: 16, paddingBottom: 70, background: "#e3f2fd", minHeight: "100vh" }}>
      <img src="https://img.freepik.com/free-vector/school-building-concept-illustration_114360-11245.jpg" alt="school" style={{ width: 120, display: "block", margin: "0 auto" }} />
      <h2 style={{ color: "#00838f" }}>Thêm Từ</h2>
      <div style={{ color: "#00838f", marginBottom: 16 }}>Thêm các từ mới vào danh sách học</div>
      <input placeholder="Từ mới" style={{ width: "100%", padding: 8, marginBottom: 8, borderRadius: 4, border: "1px solid #b3e5fc" }} />
      <input placeholder="Nghĩa Tiếng Việt" style={{ width: "100%", padding: 8, marginBottom: 16, borderRadius: 4, border: "1px solid #b3e5fc" }} />
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ flex: 1, background: "#fff", border: "1px solid #00838f", color: "#00838f", borderRadius: 4, padding: 8 }}>Hủy</button>
        <button style={{ flex: 1, background: "#00838f", color: "#fff", border: "none", borderRadius: 4, padding: 8 }}>Lưu</button>
      </div>
    </div>
  );
}
