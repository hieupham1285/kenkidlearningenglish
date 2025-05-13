import WordList from '../components/WordList';

export default function Home() {
  return (
    <div style={{ paddingBottom: 70 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: 16 }}>
        <span style={{ fontSize: 32, marginRight: 8 }}>😊</span>
        <span style={{ color: "#4caf50", fontWeight: 600, fontSize: 20 }}>Luyện Tiếng Anh</span>
      </div>
      
      {/* Word List */}
      <div style={{ padding: 16 }}>
        <h2>Danh sách từ vựng</h2>
        <WordList />
      </div>

      {/* Categories */}
      <div style={{ padding: 16 }}>
        <h2>Categories</h2>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: 12, textAlign: "center", width: 80 }}>
            <div style={{ fontSize: 32 }}>📖</div>
            <div>Vocabulary</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, padding: 12, textAlign: "center", width: 80 }}>
            <div style={{ fontSize: 32 }}>👥</div>
            <div>Grammar</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, padding: 12, textAlign: "center", width: 80 }}>
            <div style={{ fontSize: 32 }}>🎧</div>
            <div>Listening</div>
          </div>
        </div>
      </div>

      {/* My Learning */}
      <div style={{ padding: 16 }}>
        <h2>My Learning</h2>
        <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee", padding: 12 }}>
          <b>Improving English Skills</b>
          <div style={{ fontSize: 14, color: "#888" }}>Student Progress</div>
          <div style={{ background: "#eee", borderRadius: 4, height: 8, margin: "8px 0" }}>
            <div style={{ width: "60%", background: "#4caf50", height: "100%", borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 12 }}>Track Progress</div>
        </div>
        <button style={{ marginTop: 16, width: "100%" }}>View All</button>
      </div>
    </div>
  );
}
