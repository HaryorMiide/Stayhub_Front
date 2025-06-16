import React, { useState, useEffect } from "react";
import "../home/Homepage.css"; // Assuming you have a CSS file for styling

const faqsData = [
  {
    question: "What are the cancellation policies?",
    answer:
      "Cancellation is free up to 24 hours before check-in. A fee of one night’s stay applies after that.",
  },
  {
    question: "What amenities are included in the rooms?",
    answer:
      "All rooms include free Wi-Fi, air conditioning, and a mini bar. Suites also offer a jacuzzi.",
  },
  {
    question: "Is breakfast included with the booking?",
    answer: "Yes, a complimentary breakfast buffet is included for all guests.",
  },
  {
    question: "What is the check-in and check-out process?",
    answer:
      "Check-in starts at 2 PM, and check-out is by 12 PM. Please present your ID at the front desk.",
  },
  {
    question: "Are pets allowed at StayHub?",
    answer:
      "Pets are welcome with a small additional fee of $20 per stay, subject to availability.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, debit cards, and cash at the front desk.",
  },
];

const Homepage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Placeholder for AOS (omitted since not provided)
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const checkIn = document.getElementById("check-in").value;
    const checkOut = document.getElementById("check-out").value;
    const roomType = document.getElementById("room-type").value;

    const queryParams = new URLSearchParams({
      checkIn,
      checkOut,
      roomType,
    }).toString();

    window.location.href = `/rooms.html?${queryParams}`;
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`stayhub-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <button className="mode-toggle" onClick={toggleMode}>
        {isDarkMode ? "🌞" : "🌙"}
      </button>

      <header className="hero">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="StayHub"
          className="header-image"
        />
        <div className="overlay"></div>
        <div className="overlay-content">
          <h1>
            Welcome to <span className="phegon-color">StayHub</span>
          </h1>
          <p>Step into a haven of comfort and care</p>
          <a href="/rooms" className="explore-btn">
            Explore Rooms
          </a>
        </div>
      </header>

      <section className="search-section">
        <form onSubmit={handleSearch} className="search-container">
          <div className="search-field">
            <label htmlFor="check-in">Check-in Date</label>
            <input id="check-in" type="date" required />
          </div>
          <div className="search-field">
            <label htmlFor="check-out">Check-out Date</label>
            <input id="check-out" type="date" required />
          </div>
          <div className="search-field">
            <label htmlFor="room-type">Room Type</label>
            <select id="room-type" required>
              <option value="">Select Room Type</option>
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <button type="submit" className="search-btn">
            Search Rooms
          </button>
        </form>
      </section>

      <section className="why-section">
        <h2>
          Why Choose <span className="phegon-color">StayHub</span>
        </h2>
        <div className="why-content">
          <p>
            Experience unparalleled comfort with our spacious, elegantly
            designed rooms featuring plush bedding and modern decor.
          </p>
          <p>
            Indulge in our complimentary gourmet breakfast buffet, offering a
            variety of fresh and healthy options each morning.
          </p>
          <p>
            Relax with our state-of-the-art amenities, including high-speed
            Wi-Fi, a refreshing pool, and a fully equipped fitness center.
          </p>
          <p>
            Enjoy peace of mind with our 24/7 concierge service and secure
            on-site parking, ensuring a hassle-free stay.
          </p>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h4>{faq.question}</h4>
              </div>
              {activeFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* <footer className="footer">
        <p>Stayhub | All Right Reserved © 2025</p>
      </footer> */}
    </div>
  );
};

export default Homepage;
