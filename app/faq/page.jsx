// app/faq/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './faq.css';
import "@fortawesome/fontawesome-free/css/all.min.css";



// JSON-LD Schema for FAQ Page
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is A.S Web Matrix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A.S Web Matrix is a comprehensive digital solutions provider offering web development, digital marketing, SEO optimization, social media marketing, and custom software solutions since 2026."
      }
    },
    {
      "@type": "Question",
      "name": "Where are you located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are headquartered at 2578, Sec-23 A, Faridabad, Haryana - 121005. We serve clients globally through our remote team."
      }
    },
    {
      "@type": "Question",
      "name": "What services do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a comprehensive range of services including: Custom Web Development, WordPress Development, MERN Stack Development, SEO Optimization, Digital Marketing, Social Media Marketing, Canva Design Services, and E-commerce Solutions."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer refunds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer a 10-day money-back guarantee on all our services. If you're not satisfied with our work, we'll refund your payment within 10 days of purchase."
      }
    },
    {
      "@type": "Question",
      "name": "What is your response time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We respond to all queries within 24 hours. Priority support responds within 2 hours, and critical issues are addressed immediately."
      }
    }
  ]
};

// JSON-LD Schema for LocalBusiness
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "A.S Web Matrix",
  "url": "https://www.aswebmatrix.com",
  "telephone": "+91-9718401731",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2578, Sec-23 A",
    "addressLocality": "Faridabad",
    "addressRegion": "Haryana",
    "postalCode": "121005",
    "addressCountry": "IN"
  }
};

const page = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', icon: 'fas fa-globe' },
    { id: 'general', name: 'General', icon: 'fas fa-info-circle' },
    { id: 'services', name: 'Services', icon: 'fas fa-code' },
    { id: 'billing', name: 'Billing', icon: 'fas fa-credit-card' },
    { id: 'support', name: 'Support', icon: 'fas fa-headset' },
    { id: 'technical', name: 'Technical', icon: 'fas fa-cog' }
  ];

  const faqItems = [
    // General Questions
    {
      id: 1,
      category: 'general',
      question: "What is A.S Web Matrix?",
      answer: "A.S Web Matrix is a comprehensive digital solutions provider offering web development, digital marketing, SEO optimization, social media marketing, and custom software solutions since 2026.",
      icon: 'fas fa-building'
    },
    {
      id: 2,
      category: 'general',
      question: "Where are you located?",
      answer: "We are headquartered at 2578, Sec-23 A, Faridabad, Haryana - 121005. We serve clients globally through our remote team.",
      icon: 'fas fa-map-marker-alt'
    },
    {
      id: 3,
      category: 'general',
      question: "What are your working hours?",
      answer: "Our team works Monday to Friday, 9:00 AM to 6:00 PM IST. However, our support team is available 24/7 for urgent queries.",
      icon: 'fas fa-clock'
    },

    // Services Questions
    {
      id: 4,
      category: 'services',
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of services including: Custom Web Development, WordPress Development, MERN Stack Development, SEO Optimization, Digital Marketing, Social Media Marketing, Canva Design Services, and E-commerce Solutions.",
      icon: 'fas fa-laptop-code'
    },
    {
      id: 5,
      category: 'services',
      question: "Do you offer custom software development?",
      answer: "Yes, we specialize in custom software solutions including CRM systems, inventory management, and business automation tools tailored to your specific needs.",
      icon: 'fas fa-cogs'
    },
    {
      id: 6,
      category: 'services',
      question: "What technologies do you use?",
      answer: "We work with modern technologies including React, Node.js, MongoDB, WordPress, Shopify, and various digital marketing tools to deliver the best results.",
      icon: 'fas fa-code-branch'
    },
    {
      id: 7,
      category: 'services',
      question: "How long does it take to build a website?",
      answer: "Timelines vary based on complexity: Basic websites (5-10 pages) take 2-3 weeks, E-commerce sites take 4-6 weeks, and Custom applications take 2-3 months. We provide detailed timelines during consultation.",
      icon: 'fas fa-hourglass-half'
    },

    // Billing Questions
    {
      id: 8,
      category: 'billing',
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards (Visa, MasterCard, Amex), UPI, Net Banking, PayPal, and bank transfers. All payments are processed securely.",
      icon: 'fas fa-credit-card'
    },
    {
      id: 9,
      category: 'billing',
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 10-day money-back guarantee on all our services. If you're not satisfied with our work, we'll refund your payment within 10 days of purchase.",
      icon: 'fas fa-redo-alt'
    },
    {
      id: 10,
      category: 'billing',
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade your plan at any time. We'll prorate the difference for the remaining period of your current billing cycle.",
      icon: 'fas fa-arrow-up'
    },
    {
      id: 11,
      category: 'billing',
      question: "Are there any hidden fees?",
      answer: "No, we believe in transparent pricing. The price you see is the price you pay. There are no hidden setup fees or surprise charges.",
      icon: 'fas fa-shield-alt'
    },

    // Support Questions
    {
      id: 12,
      category: 'support',
      question: "What kind of support do you offer?",
      answer: "We offer email support, phone support, and priority support for premium plans. Our team is available 24/7 for critical issues.",
      icon: 'fas fa-headset'
    },
    {
      id: 13,
      category: 'support',
      question: "How do I contact support?",
      answer: "You can reach us via email at aswebmatrix@gmail.com, phone at +91-9718401731, or through our contact form. Premium clients get direct access to their account manager.",
      icon: 'fas fa-envelope'
    },
    {
      id: 14,
      category: 'support',
      question: "What is your response time?",
      answer: "We respond to all queries within 24 hours. Priority support responds within 2 hours, and critical issues are addressed immediately.",
      icon: 'fas fa-clock'
    },

    // Technical Questions
    {
      id: 15,
      category: 'technical',
      question: "Do you provide website maintenance?",
      answer: "Yes, we offer comprehensive maintenance packages including regular updates, security patches, backups, and performance optimization.",
      icon: 'fas fa-tools'
    },
    {
      id: 16,
      category: 'technical',
      question: "Is my website secure?",
      answer: "Absolutely! We implement SSL certificates, regular security audits, firewall protection, and follow industry best practices to ensure your website is secure.",
      icon: 'fas fa-lock'
    },
    {
      id: 17,
      category: 'technical',
      question: "Will my website be mobile-friendly?",
      answer: "Yes, all our websites are fully responsive and optimized for all devices including mobile phones, tablets, and desktops.",
      icon: 'fas fa-mobile-alt'
    },
    {
      id: 18,
      category: 'technical',
      question: "Do you offer SEO services?",
      answer: "Yes, we offer comprehensive SEO services including keyword research, on-page optimization, technical SEO, link building, and monthly reporting.",
      icon: 'fas fa-chart-line'
    }
  ];

  const quickAnswers = [
    { icon: 'fas fa-rocket', title: 'Fast Delivery', text: 'Most projects delivered within 2-3 weeks' },
    { icon: 'fas fa-shield-alt', title: '100% Secure', text: 'SSL encryption & data protection' },
    { icon: 'fas fa-headset', title: '24/7 Support', text: 'Round-the-clock assistance' },
    { icon: 'fas fa-sync-alt', title: 'Easy Updates', text: 'Free updates & maintenance' }
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />

      <div className="faq-page">
        {/* Hero Section */}
        <section className="faq-hero">
          <div className="hero-particles"></div>
          <div className="container">
            <div className="hero-content">
              <span className="hero-badge animate-pop-in">
                <i className="fas fa-question-circle"></i> Got Questions? We've Got Answers
              </span>
              <h1 className="hero-title animate-pop-in">
                Frequently Asked <span className="highlight">Questions</span>
              </h1>
              <p className="hero-subtitle animate-pop-in">
                Find answers to common questions about our services, billing, support, and more
              </p>
              
              {/* Search Bar */}
              <div className="search-container animate-pop-in">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search your question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <i className="fas fa-clock"></i>
                <div className="stat-info">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-users"></i>
                <div className="stat-info">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-check-circle"></i>
                <div className="stat-info">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-rocket"></i>
                <div className="stat-info">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* Quick Answers Section */}
        <section className="quick-answers-section">
          <div className="container">
            <div className="quick-answers-grid">
              {quickAnswers.map((item, index) => (
                <div className="quick-answer-card" key={index}>
                  <div className="quick-answer-icon">
                    <i className={item.icon}></i>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="container">
            <div className="categories-tabs">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <i className={category.icon}></i>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-main-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">FAQ</span>
              <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
              <p className="section-description">
                Can't find what you're looking for? <Link href="/contact">Contact our support team</Link>
              </p>
            </div>

            {filteredFAQs.length > 0 ? (
              <div className="faq-container">
                {filteredFAQs.map((item) => (
                  <div 
                    key={item.id} 
                    className={`faq-item ${activeIndex === item.id ? 'active' : ''}`}
                    onClick={() => toggleFAQ(item.id)}
                  >
                    <div className="faq-question">
                      <div className="question-icon">
                        <i className={item.icon}></i>
                      </div>
                      <h3>{item.question}</h3>
                      <i className={`fas ${activeIndex === item.id ? 'fa-minus' : 'fa-plus'}`}></i>
                    </div>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                      <div className="answer-footer">
                        <span className="category-badge">{categories.find(c => c.id === item.category)?.name}</span>
                        <Link href="/contact" className="need-help">Need more help?</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <h3>No questions found</h3>
                <p>Try searching with different keywords or browse all categories</p>
                <button 
                  className="reset-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                >
                  View All Questions
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="still-questions-section">
          <div className="container">
            <div className="questions-content">
              <h2>Still have questions?</h2>
              <p>Can't find the answer you're looking for? Please chat with our friendly team.</p>
              <div className="contact-options">
                <Link href="/contact" className="contact-btn primary">
                  <i className="fas fa-envelope"></i>
                  Contact Us
                </Link>
                <a href="tel:+919718401731" className="contact-btn secondary">
                  <i className="fas fa-phone-alt"></i>
                  +91-9718401731
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="support-section">
          <div className="container">
            <div className="support-grid">
              <div className="support-card">
                <i className="fas fa-comment"></i>
                <h3>Live Chat</h3>
                <p>Chat with our support team</p>
                <button className="support-btn">Start Chat</button>
              </div>
              <div className="support-card">
                <i className="fas fa-envelope"></i>
                <h3>Email Support</h3>
                <p>Get a reply within 24 hours</p>
                <a href="mailto:aswebmatrix@gmail.com" className="support-btn">Send Email</a>
              </div>
              <div className="support-card">
                <i className="fas fa-phone-alt"></i>
                <h3>Phone Support</h3>
                <p>Mon-Fri from 9am to 6pm</p>
                <a href="tel:+919718401731" className="support-btn">Call Now</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;