import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to Our Website</h1>
        <nav className="nav">
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </header>

      <main className="main">
        <section id="about" className="section">
          <h2>About Us</h2>
          <p>We are passionate about delivering great web experiences.</p>
        </section>

        <section id="services" className="section">
          <h2>Our Services</h2>
          <ul>
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>SEO Optimization</li>
          </ul>
        </section>

        <section id="contact" className="section">
          <h2>Contact Us</h2>
          <p>Email: yashpathakcs149@gmail.com</p>
          <p>Phone: +91 9720271675</p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
