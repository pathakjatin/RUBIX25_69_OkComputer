import Hero from "../components/HomePage/Hero";
import Header from "../components/HomePage/Header";
import React from 'react';

const Homepage = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">Virtual Hackathon Platform</h1>
          <nav>
            <a href="#" className="text-white px-4">Home</a>
            <a href="#features" className="text-white px-4">Features</a>
            <a href="#about" className="text-white px-4">About</a>
            <a href="#contact" className="text-white px-4">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white text-center py-24">
        <h2 className="text-4xl font-extrabold">Join the Ultimate Hackathon Experience</h2>
        <p className="mt-4 text-xl">Collaborate, Innovate, and Win with Developers Worldwide</p>
        <a href="/login" className="mt-8 inline-block bg-yellow-500 text-blue-800 font-bold py-2 px-6 rounded-lg">Join Now</a>
        
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gray-200">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Team Formation</h4>
              <p>Find the perfect teammates based on your skills and interests.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Collaboration Tools</h4>
              <p>Seamlessly work together with integrated chat and Zoom features.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Live Evaluation</h4>
              <p>Get real-time feedback from judges and mentors during the hackathon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">About Us</h3>
          <p className="text-xl">Our platform makes hackathons more accessible and collaborative for developers everywhere. Whether you're an experienced coder or a beginner, you'll find the perfect environment to learn and grow.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Virtual Hackathon Platform. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
