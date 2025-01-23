import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import HostPage from "./pages/HostPage";
import MentorPage from "./pages/MentorPage";
import LoginPage from "./components/HomePage/LoginPage";
import SignUpPage from "./components/HomePage/SignUpPage";
import UserProfile from "./pages/UserProfile";
import MentorProfile from "./pages/MentorProfile";
import HostProfile from "./pages/HostProfile";
import PrivateRoute from "./PrivateRoute"; // Handles protected routes
import { AuthProvide } from "./context/AuthProvide"; // Provides authentication context
import Matchmaking from "./pages/Matchmaking"; // Matchmaking component
import Room from "./pages/Room"; // Room component
import VideoCall from "./pages/VideoCall"; // Room component
import LobbyPage from "./pages/LobbyPage";
import HackathonPage from "./pages/HackathonPage";
import JoinHackathonPage from './pages/JoinHackathonPage';
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <AuthProvide>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/host" element={<HostPage />} />
            <Route path="/mentor" element={<PrivateRoute><MentorPage /></PrivateRoute>} />
            <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/mentorprofile" element={<PrivateRoute><MentorProfile /></PrivateRoute>} />
            <Route path="/hostprofile" element={<HostProfile />} />
            <Route path="/matchmaking" element={<PrivateRoute><Matchmaking /></PrivateRoute>} />
            <Route path="/room" element={<Room />} />
            <Route path="/video" element={<VideoCall />} />
            <Route path="/lobby" element={<LobbyPage />} />
            <Route path="/hackdisplay" element={<HackathonPage />} />
            <Route path="/join-hackathon/:hackathonId" element={<JoinHackathonPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvide>
  );
}

export default App;
