// app/contact/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './contact.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

// JSON-LD Schema (aapka same rahega)
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "A.S Web Matrix",
  "url": "https://www.aswebmatrix.com",
  "telephone": "+91-9718401731",
  "email": "aswebmatrix@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "House No:-2578, Street No:-22, Sanjay Colony, Sector:-23A",
    "addressLocality": "Faridabad",
    "addressRegion": "Haryana",
    "postalCode": "121005",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61587616148379",
    "https://www.instagram.com/a.swebmatrix?igsh=cjJ1aW0xZ3J6cHU1",
    "https://www.linkedin.com/company/as-webmatrix/?viewAsMember=true",
    "https://x.com/aswebmatrix"
  ]
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact A.S Web Matrix",
  "description": "Contact page for A.S Web Matrix - Website Development and SEO Company",
  "url": "https://www.aswebmatrix.com/contact"
};

const Page = () => {
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setFormStatus({
    submitted: false,
    loading: true,
    error: null,
  });

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to send message");
    }

    setFormStatus({
      submitted: true,
      loading: false,
      error: null,
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setFormStatus({
        submitted: false,
        loading: false,
        error: null,
      });
    }, 3000);

  } catch (error) {
    setFormStatus({
      submitted: false,
      loading: false,
      error: error.message || "Something went wrong",
    });
  }
};
  // Business hours data (aapka same rahega)
  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/profile.php?id=61587616148379', label: 'Facebook' },
    { icon: 'fab fa-twitter', url: 'https://x.com/aswebmatrix', label: 'Twitter' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/a.swebmatrix?igsh=cjJ1aW0xZ3J6cHU1', label: 'Instagram' },
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/as-webmatrix/?viewAsMember=true', label: 'LinkedIn' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/919718401731', label: 'WhatsApp' }
  ];

  const googleMapsUrl = "https://www.google.com/maps/place/A.SWebMatrix/@28.3528577,77.2934641,17z/data=!3m1!4b1!4m6!3m5!1s0x390cdb42b1e2f037:0x9afa589111153e94!8m2!3d28.352853!4d77.296039!16s%2Fg%2F11yzpdw4hy?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D";
  
  const embedMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.671899483086!2d77.2934641!3d28.3528577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdb42b1e2f037%3A0x9afa589111153e94!2sA.SWebMatrix!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />

      <div className="contact-page">
        {/* Hero Section - Aapka same rahega */}
        <section className="contact-hero">
          <div className="hero-particles"></div>
          <div className="container">
            <div className="hero-content">
              <span className="hero-badge animate-pop-in">
                <i className="fas fa-headset"></i> Get in Touch
              </span>
              <h1 className="hero-title animate-pop-in">
                Let's <span className="highlight">Connect</span> and Create Something Amazing
              </h1>
              <p className="hero-subtitle animate-pop-in">
                Have a project in mind? We'd love to hear about it. Reach out to us and let's start a conversation.
              </p>
            </div>
          </div>
          <div className="hero-wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-main-section">
          <div className="container">
            <div className="contact-wrapper">
              {/* Contact Info Cards - Aapka same */}
              <div className="contact-info-cards">
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h3>Visit Us</h3>
                  <p>
                    House No:-2578, Street No:-22,<br />
                    Sanjay Colony, Sector:-23A,<br />
                    Faridabad, Haryana - 121005
                  </p>
                  <a 
                    href={googleMapsUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    Get Directions <i className="fas fa-arrow-right"></i>
                  </a>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <h3>Call Us</h3>
                  <p className="phone-number">+91 9718401731</p>
                  <p className="availability">Available 24/7 for emergencies</p>
                  <a href="tel:+919718401731" className="info-link">
                    Call Now <i className="fas fa-phone"></i>
                  </a>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3>Email Us</h3>
                  <p className="email">aswebmatrix@gmail.com</p>
                  <p className="response-time">Response within 24 hours</p>
                  <a href="mailto:aswebmatrix@gmail.com" className="info-link">
                    Send Email <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>

              {/* Form and Additional Info */}
              <div className="contact-grid">
                {/* Contact Form */}
                <div className="contact-form-container">
                  <div className="form-header">
                    <h2>Send us a Message</h2>
                    <p>We'll get back to you within 24 hours</p>
                  </div>

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Full Name *"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <i className="fas fa-user"></i>
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email *"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Your Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        <i className="fas fa-phone"></i>
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject *"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                        <i className="fas fa-tag"></i>
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <textarea
                        name="message"
                        placeholder="Your Message *"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <i className="fas fa-comment"></i>
                    </div>

                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={formStatus.loading}
                    >
                      {formStatus.loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Sending...
                        </>
                      ) : formStatus.submitted ? (
                        <>
                          <i className="fas fa-check-circle"></i>
                          Message Sent!
                        </>
                      ) : (
                        <>
                          Send Message
                          <i className="fas fa-paper-plane"></i>
                        </>
                      )}
                    </button>

                    {formStatus.error && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {formStatus.error}
                      </div>
                    )}
                  </form>
                </div>

                {/* Additional Info - Aapka same */}
                <div className="additional-info">
                  {/* Business Hours */}
                  <div className="info-widget">
                    <h3><i className="fas fa-clock"></i> Business Hours</h3>
                    <div className="hours-list">
                      {businessHours.map((item, index) => (
                        <div className="hours-item" key={index}>
                          <span className="day">{item.day}</span>
                          <span className="hours">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Support */}
                  <div className="info-widget">
                    <h3><i className="fas fa-headset"></i> Quick Support</h3>
                    <div className="support-options">
                      <a href="tel:+919718401731" className="support-option">
                        <i className="fas fa-phone"></i>
                        <div>
                          <strong>Phone Support</strong>
                          <span>+91 9718401731</span>
                        </div>
                      </a>
                      <a href="mailto:aswebmatrix@gmail.com" className="support-option">
                        <i className="fas fa-envelope"></i>
                        <div>
                          <strong>Email Support</strong>
                          <span>aswebmatrix@gmail.com</span>
                        </div>
                      </a>
                      <Link href="/contact" className="support-option">
                        <i className="fas fa-comment"></i>
                        <div>
                          <strong>Live Chat</strong>
                          <span>Available 24/7</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="info-widget">
                    <h3><i className="fas fa-share-alt"></i> Follow Us</h3>
                    <div className="social-links-grid">
                      {socialLinks.map((social, index) => (
                        <a 
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`social-link ${social.label.toLowerCase()}`}
                          aria-label={social.label}
                        >
                          <i className={social.icon}></i>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Map Preview */}
                  <div className="info-widget map-widget">
                    <h3><i className="fas fa-map"></i> Find Us</h3>
                    <div className="map-preview">
                      <iframe 
                        src={embedMapsUrl}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="A.S.WebMatrix Office Location"
                      ></iframe>
                    </div>
                    <a 
                      href={googleMapsUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="map-link"
                    >
                      Open in Google Maps <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Aapka same */}
        <section className="contact-faq-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Quick Answers</span>
              <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            </div>

            <div className="faq-preview">
              <div className="faq-preview-item">
                <i className="fas fa-question-circle"></i>
                <h4>How quickly do you respond?</h4>
                <p>We typically respond within 24 hours on business days.</p>
              </div>
              <div className="faq-preview-item">
                <i className="fas fa-question-circle"></i>
                <h4>Do you offer free consultation?</h4>
                <p>Yes! We offer a free 30-minute consultation for all new clients.</p>
              </div>
              <div className="faq-preview-item">
                <i className="fas fa-question-circle"></i>
                <h4>Can I visit your office?</h4>
                <p>Absolutely! We'd love to meet you at our Faridabad office. Schedule a visit via email or phone.</p>
              </div>
            </div>

            <div className="faq-link">
              <Link href="/faq" className="view-faq-btn">
                View All FAQs <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;