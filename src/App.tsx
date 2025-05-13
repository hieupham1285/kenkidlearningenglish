import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Practise from "./pages/Practise";
import Correct from "./pages/Correct";
import AddWords from "./pages/AddWords";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practise" element={<Practise />} />
        <Route path="/correct" element={<Correct />} />
        <Route path="/add-words" element={<AddWords />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
