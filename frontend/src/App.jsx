import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import HostPage from "./pages/HostPage";
import MentorPage from "./pages/MentorPage";
import LoginPage from "./components/HomePage/LoginPage";
import SignUpPage from "./components/HomePage/SignUpPage"
import UserProfileDashboard from "./pages/UserProfileDashboard";
import MentorProfileDashboard from "./pages/MentorProfileDashboard"
import PrivateRoute from "./PrivateRoute";
import { AuthProvide } from "./context/AuthProvide";

function App() {

  return (
  <AuthProvide>
    <BrowserRouter>
      <main>
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/user" element={<PrivateRoute><UserPage /></PrivateRoute>} />
            <Route path="/host" element={<PrivateRoute><HostPage /></PrivateRoute>} />
            <Route path="/mentor" element={<PrivateRoute><MentorPage /></PrivateRoute>} />
            <Route path="/userprofile" element={<UserProfileDashboard/>} />
            <Route path="/mentorprofile" element={<MentorProfileDashboard/>} />
          </Routes>
      </main>
    </BrowserRouter>
  </AuthProvide>
  )
}

export default App
