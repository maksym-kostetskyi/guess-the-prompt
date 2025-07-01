import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/room" element={<CreateRoomPage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
