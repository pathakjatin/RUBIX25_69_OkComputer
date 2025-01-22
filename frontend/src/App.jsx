import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import HomePage from "./pages/HomePage";

import UserPage from "./pages/UserPage";
import HostPage from "./pages/HostPage";
import MentorPage from "./pages/MentorPage";
import LoginPage from "./components/HomePage/LoginPage";
import SignUpPage from "./components/HomePage/SignUpPage"
// import UserProfileDashboard from "./pages/UserProfileDashboard";

function App() {

  return (
  <BrowserRouter>

    <main>
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/host" element={<HostPage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
    </main>
  </BrowserRouter>
  )
}

export default App
