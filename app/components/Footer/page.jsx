"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import "./Footer.css";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      setSubscriptionStatus("error");
      return;
    }

    setIsSubscribing(true);

    const templateParams = {
      user_email: email,
    };

    try {
      const result = await emailjs.send(
        "service_d1ieizn",
        "template_o0bymzr",
        templateParams,
        "A42EI1Pe1XowW5D3d"
      );

      setMessage("Subscribed successfully!");
      setSubscriptionStatus("success");
      setEmail("");
    } catch (error) {
      console.log(error);
      setMessage("Subscription failed. Try again.");
      setSubscriptionStatus("error");
    }

    setIsSubscribing(false);
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-company">
            <div className="footer-logo">
              <Link href="/">
                <h2>A.S Web Matrix <span>™</span></h2>
              </Link>
            </div>
            <p className="footer-description">
              We provide complete web solutions including WordPress Development, 
              SEO Optimization, Digital Marketing, Canva Design, and MERN Stack Development. 
              Your trusted partner for digital success.
            </p>
            
            {/* Contact Info */}
            <div className="footer-contact-item">
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+919718401731">+91-9718401731</a>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:aswebmatrix@gmail.com">aswebmatrix@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <a 
                href="https://maps.google.com/?q=2578+Sec-23+A+Faridabad+Haryana+121005" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                2578, Sec-23 A, Faridabad, Haryana - 121005
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link href="/">
                  <i className="fas fa-chevron-right"></i> Home
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <i className="fas fa-chevron-right"></i> About Us
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <i className="fas fa-chevron-right"></i> Services
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <i className="fas fa-chevron-right"></i> FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <i className="fas fa-chevron-right"></i> Contact
                </Link>
              </li>
                            <li>
              <Link href="/blog">
               <i className="fas fa-chevron-right"></i> Blog
              </Link>
            </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li>
                <Link href="/pages/WebDevelopment">
                  <i className="fas fa-chevron-right"></i> Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/wordpress">
                  <i className="fas fa-chevron-right"></i> WordPress
                </Link>
              </li>
              <li>
                <Link href="/services/seo-marketing">
                  <i className="fas fa-chevron-right"></i> SEO & Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/canva-design">
                  <i className="fas fa-chevron-right"></i> Canva Design
                </Link>
              </li>
              <li>
                <Link href="/services/mern-stack">
                  <i className="fas fa-chevron-right"></i> MERN Stack
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing">
                  <i className="fas fa-chevron-right"></i> Digital Marketing
                </Link>
              </li>

            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="footer-section">
            <h3>Stay Updated</h3>
            <div className="footer-newsletter">
              <p>Subscribe to our newsletter for latest updates and offers!</p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                />
                <button 
                  type="submit" 
                  className="newsletter-btn"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {message && (
                <div className={`newsletter-message ${subscriptionStatus}`}>
                  {message}
                </div>
              )}
            </div>

            {/* Social Media Icons */}
            <div className="social-section">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a 
                  href="https://www.instagram.com/a.swebmatrix?igsh=cjJ1aW0xZ3J6cHU1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61587616148379" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a 
                  href="https://x.com/aswebmatrix" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href="https://wa.me/919718401731" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon whatsapp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/company/as-webmatrix/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon linkedin"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
              <span className="payment-icon"><i className="fab fa-cc-visa" title="Visa"></i></span>
              <span className="payment-icon"><i className="fab fa-cc-mastercard" title="Mastercard"></i></span>
              <span className="payment-icon"><i className="fab fa-cc-amex" title="American Express"></i></span>
              <span className="payment-icon"><i className="fab fa-cc-paypal" title="PayPal"></i></span>
              <span className="payment-icon"><i className="fab fa-google-pay" title="Google Pay"></i></span>
              <span className="payment-icon"><i className="fab fa-apple-pay" title="Apple Pay"></i></span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            <i className="far fa-copyright"></i> {new Date().getFullYear()} 
            AS Web Matrix
            Created with ❤️ in India. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;