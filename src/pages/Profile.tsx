export default function Profile() {
  return (
    <div style={{ padding: 16, paddingBottom: 70 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 36 }}>🎓</span>
        <span style={{ color: "#4caf50", fontWeight: 600, fontSize: 20 }}>Luyện Tiếng Anh</span>
      </div>
      <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png" alt="avatar" style={{ width: 100, display: "block", margin: "24px auto" }} />
      <h2 style={{ textAlign: "center" }}>Welcome to Your Learning Journey</h2>
      <div style={{ textAlign: "center", color: "#555", marginBottom: 16 }}>
        Explore new words, practice your skills, and track your progress every day!
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px #eee" }}>
        <b>Today's Vocabulary</b>
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          <li>Enthusiastic - showing intense enjoyment, interest, or approval.</li>
          <li>Perception - the ability to see, hear, or become aware of something through the senses.</li>
          <li>Resilient - able to withstand or recover quickly from difficult conditions.</li>
        </ul>
      </div>
    </div>
  );
}
