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

function App() {
  return (
    <AuthProvide>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user" element={<PrivateRoute><UserPage /></PrivateRoute>} />
            <Route path="/host" element={<PrivateRoute><HostPage /></PrivateRoute>} />
            <Route path="/mentor" element={<PrivateRoute><MentorPage /></PrivateRoute>} />
            <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/mentorprofile" element={<PrivateRoute><MentorProfile /></PrivateRoute>} />
            <Route path="/hostprofile" element={<PrivateRoute><HostProfile /></PrivateRoute>} />
            <Route path="/matchmaking" element={<PrivateRoute><Matchmaking /></PrivateRoute>} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvide>
  );
}

export default App;
