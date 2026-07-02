// PrivacyPolicy.jsx
import React from 'react';
import "./PrivacyPolicy.css";

const page = () => {
  return (
    <div className="privacy-wrapper">
      {/* Header Section */}
      <div className="privacy-header">
        <h1>Privacy & Policy</h1>
        
        <div className="header-logo">
          {/* image[[0, 280, 447, 376]] - Representing logo/icon area */}
          <div className="logo-placeholder">
            AS Web Matrix
          </div>
        </div>
        
        <div className="services-strip-modern">
          <span>Website Development</span>
          <span>Business Software</span>
          <span>SEO & Digital Marketing</span>
          <span>E-Commerce Solutions</span>
        </div>
        
        <div className="contact-grid">
          <div className="contact-card">
            <span className="contact-icon-modern">📞</span>
            <span>+91-9718401731</span>
          </div>
          <div className="contact-card">
            <span className="contact-icon-modern">✉️</span>
            <span>aswebmatrix@gmail.com</span>
          </div>
          <div className="contact-card">
            <span className="contact-icon-modern">🌐</span>
            <span>www.aswebmatrix.com</span>
          </div>
          <div className="contact-card">
            <span className="contact-icon-modern">📍</span>
            <span>2578, Sec-23 A, Faridabad, Haryana - 121005</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="privacy-content">
        <div className="company-badge">
          5 A.S WEB MATRIX
        </div>
        
        <h2>Privacy Policy</h2>
        
        <div className="policy-section">
          <h3>Introduction</h3>
          <p>Aswebmatrix is committed to protecting the privacy and confidentiality of client information. This Privacy Policy outlines how we collect, use, and safeguard personal data.</p>
        </div>

        <div className="policy-section">
          <h3>Information We Collect</h3>
          <p>We may collect the following information:</p>
          <ul>
            <li>Full name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Business information</li>
            <li>Project requirements and technical details</li>
          </ul>
        </div>

        <div className="policy-section">
          <h3>Use of Information</h3>
          <p>Collected information is used solely for:</p>
          <ul>
            <li>Project development and service delivery</li>
            <li>Communication and customer support</li>
            <li>Billing and payment processing</li>
            <li>Improving our services</li>
          </ul>
        </div>

        <div className="policy-section">
          <h3>Data Protection and Confidentiality</h3>
          <p>We maintain strict confidentiality of client information. Personal and business data shall not be shared with third parties without consent, except where legally required.</p>
        </div>

        <div className="policy-section">
          <h3>Data Security</h3>
          <p>We implement reasonable technical and administrative measures to protect client data from unauthorized access, misuse, alteration, or disclosure.</p>
        </div>

        <div className="policy-section">
          <h3>Third-Party Services</h3>
          <p>Certain services, including hosting providers and external tools, may be governed by their own privacy policies. The Company is not responsible for third-party privacy practices.</p>
        </div>

        <div className="policy-section">
          <h3>Data Retention</h3>
          <p>Client data shall be retained only for as long as necessary to fulfill contractual and legal obligations.</p>
        </div>

        <div className="policy-section">
          <h3>Policy Updates</h3>
          <p>The Company reserves the right to modify this Privacy Policy at any time. Updated versions shall be published on official platforms.</p>
        </div>
      </div>
    </div>
  );
};

export default page;