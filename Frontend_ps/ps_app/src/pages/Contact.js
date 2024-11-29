
import React from 'react';
import './Contact.css'; // Ensure this file contains necessary styles

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Get in touch with us!</p>

      <form className="contact-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>

      <h2>Contact Information</h2>
      <p>Email: info@reflectai.com</p>
      <p>Phone: +91 9090909090</p>
      <p>Address: Hyderabad, India</p>

    </div>
  );
};

export default Contact;
