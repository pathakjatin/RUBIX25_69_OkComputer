import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import HostPage from "./pages/HostPage";
import MentorPage from "./pages/MentorPage";
import LoginPage from "./components/HomePage/LoginPage";
import SignUpPage from "./components/HomePage/SignUpPage";
import UserProfile from "./pages/UserProfile";
<<<<<<< Updated upstream
import MentorProfile from "./pages/MentorProfile"
import HostProfile from "./pages/HostProfile"
import PrivateRoute from "./PrivateRoute";
import { AuthProvide } from "./context/AuthProvide";
import Room from './pages/Room';

<Routes>
    <Route path="/room" element={<Room />} />
</Routes>

=======
import MentorProfile from "./pages/MentorProfile";
import HostProfile from "./pages/HostProfile";
import PrivateRoute from "./PrivateRoute"; // Handles protected routes
import { AuthProvide } from "./context/AuthProvide"; // Provides authentication context
import Matchmaking from "./pages/Matchmaking"; // Matchmaking component
import UserDashboard from "./pages/UserDashboard"; // UserDashboard component
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            <Route path="/userprofile" element={<UserProfile/>} />
            <Route path="/mentorprofile" element={<MentorProfile/>} />
            <Route path="/hostprofile" element={<HostProfile/>} />
            <Route path = "/room" element = {<Room/>} />
=======
            <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/mentorprofile" element={<PrivateRoute><MentorProfile /></PrivateRoute>} />
            <Route path="/hostprofile" element={<PrivateRoute><HostProfile /></PrivateRoute>} />
            <Route path="/matchmaking" element={<PrivateRoute><Matchmaking /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
>>>>>>> Stashed changes
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvide>
  );
}

export default App;
