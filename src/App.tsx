import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import CreateOrJoinRoomPage from "./pages/CreateOrJoinRoomPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/room" element={<CreateOrJoinRoomPage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
