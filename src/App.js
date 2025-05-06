import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Feedback from './pages/Feedback';
import OtpVerification from './pages/Otpverification';  // Import the OTP verification page
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Result from './pages/Result';
import Sumresult from './pages/Sumresult';
import Load_sum from './pages/Load_sum';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/result" element={<Result/>} />
        <Route path="/load_sum" element={<Load_sum/>} />
        <Route path="/summarize" element={<Sumresult/>} />
        <Route path="/result" element={<Result/>} />
        <Route path="/verification" element={<OtpVerification />} /> {/* Add OTP verification route */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;