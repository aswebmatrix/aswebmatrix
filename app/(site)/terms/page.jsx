// app/terms/page.jsx
import React from 'react';
import Link from 'next/link';
import './terms.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata = {
  title: "Terms & Conditions | A.S Web Matrix - Website Development Company",
  description: "Read our terms and conditions for website development, payment terms, refund policy, project timeline, and more. Clear and transparent policies for our clients.",
  keywords: "terms and conditions, website development terms, payment terms, refund policy, project timeline, A.S Web Matrix policies",
  openGraph: {
    title: "Terms & Conditions | A.S Web Matrix",
    description: "Clear and transparent terms for website development services.",
    type: "website",
    url: "https://www.aswebmatrix.com/terms",
  },
};

// JSON-LD Schema for Terms page
const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms and Conditions",
  "description": "Terms and conditions for A.S Web Matrix services",
  "publisher": {
    "@type": "Organization",
    "name": "A.S Web Matrix",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.aswebmatrix.com/logo.png"
    }
  }
};

const page = () => {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />

      <div className="terms-wrapper">
        {/* Header Section */}
        <div className="terms-header">
          <h1>Terms & Conditions</h1>
          
          <div className="header-logo">
            <Link href="/home" className="logo-placeholder">
              AS Web Matrix
            </Link>
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
              <a href="tel:+919718401731">+91-9718401731</a>
            </div>
            <div className="contact-card">
              <span className="contact-icon-modern">✉️</span>
              <a href="mailto:aswebmatrix@gmail.com">aswebmatrix@gmail.com</a>
            </div>
            <div className="contact-card">
              <span className="contact-icon-modern">🌐</span>
              <a href="https://www.aswebmatrix.com" target="_blank" rel="noopener noreferrer">
                www.aswebmatrix.com
              </a>  
            </div>
            <div className="contact-card">
              <span className="contact-icon-modern">📍</span>
              <span>2578, Sec-23 A, Faridabad, Haryana - 121005</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="terms-content">
          <div className="company-badge">
            4 A.S WEB MATRIX
          </div>
          
          <h2>Terms & Conditions</h2>

          {/* Company Information */}
          <div className="terms-section">
            <h3>Company Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Company Name:</span>
                <span className="info-value">Aswebmatrix</span>
              </div>
              <div className="info-item">
                <span className="info-label">Registered Address:</span>
                <span className="info-value">House No. 2578, Street No. 22, Sanjay Colony, Sector 23, Faridabad, Haryana, India</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">
                  <a href="tel:+919718401731">+91 9718401731</a>, <a href="tel:+917982104752">+91 79821 04752</a>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">
                  <a href="mailto:aswebmatrix@gmail.com">aswebmatrix@gmail.com</a>
                </span>
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <div className="terms-section">
            <h3>Services Offered</h3>
            <p>The Company provides the following services:</p>
            <ul className="services-list">
              <li>Website Development</li>
              <li>ERP / Custom Software Development</li>
              <li>Search Engine Optimization (SEO)</li>
              <li>Digital Marketing</li>
              <li>Web Hosting Services</li>
              <li>Website Maintenance</li>
            </ul>
          </div>

          {/* Payment Terms */}
          <div className="terms-section">
            <h3>Payment Terms</h3>
            
            <div className="sub-section">
              <h4>3.1 Website Development Projects</h4>
              <ul className="payment-list">
                <li><span className="highlight">40% advance</span> payment is required for project initiation and design confirmation.</li>
                <li><span className="highlight">40% payment</span> is required upon completion of development and prior to domain and hosting configuration.</li>
                <li>The remaining <span className="highlight">20%</span> must be paid before final deployment and handover.</li>
                <li className="note">If the Client makes 100% payment upfront, the domain and hosting shall be registered in the Client's name immediately.</li>
              </ul>
            </div>

            <div className="sub-section">
              <h4>3.2 Software / ERP Development Projects</h4>
              <p>A minimum of <span className="highlight">40% advance payment</span> is mandatory before commencement. The remaining payment shall be structured based on project scope and number of users. Any applicable monthly charges shall be finalized during development.</p>
            </div>
          </div>

          {/* Maintenance Charges */}
          <div className="terms-section">
            <h3>Maintenance Charges</h3>
            <div className="charges-card">
              <div className="charge-item">
                <span className="charge-type">Small Website (4-5 pages):</span>
                <span className="charge-amount">₹3000 per year</span>
              </div>
              <p className="mt-3">Software maintenance charges shall be determined at the time of project completion based on system requirements and user capacity.</p>
              <p className="note-text">Currently, the Company does not offer fixed monthly subscription plans.</p>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="terms-section">
            <h3>Refund Policy</h3>
            <div className="policy-card">
              <div className="policy-item">
                <span className="policy-icon">❌</span>
                <div className="policy-text">
                  <strong>Client Cancellation:</strong> Advance payments are non-refundable if the Client cancels the project after initiation.
                </div>
              </div>
              <div className="policy-item">
                <span className="policy-icon">✅</span>
                <div className="policy-text">
                  <strong>Company Cancellation:</strong> If the Company cancels the project for any reason, the advance payment shall be refunded in full.
                </div>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="terms-section">
            <h3>Project Timeline</h3>
            
            <div className="timeline-grid">
              <div className="timeline-card">
                <div className="timeline-icon">🌐</div>
                <h4>Small Website</h4>
                <p className="timeline-duration">3-4 working days</p>
                <p className="timeline-note">Subject to timely submission of content and approvals by the Client</p>
              </div>
              
              <div className="timeline-card">
                <div className="timeline-icon">⚙️</div>
                <h4>Large Software/ERP</h4>
                <p className="timeline-duration">1.5 to 2 months</p>
                <p className="timeline-note">Depending on complexity</p>
              </div>
            </div>

            <div className="delay-info">
              <h4>Delay Compensation</h4>
              <p>If delays occur due to the Company, compensation may include:</p>
              <ul className="compensation-list">
                <li>Up to 5% discount on the project fee, OR</li>
                <li>One (1) month of additional free support</li>
              </ul>
              <p className="important-note">
                <strong>Note:</strong> Delays caused by the Client (including delayed content, approvals, or feedback) shall not be the responsibility of the Company.
              </p>
            </div>

            <div className="revision-info">
              <p><span className="highlight">2 free revisions</span> are allowed after final confirmation. Additional revisions beyond this limit shall be chargeable.</p>
            </div>
          </div>

          {/* Hosting and Uptime */}
          <div className="terms-section">
            <h3>Hosting and Uptime</h3>
            <ul className="uptime-list">
              <li>The Company offers a <span className="highlight">99% uptime commitment</span>.</li>
              <li>The Company shall not be held directly responsible for downtime caused by third-party hosting providers.</li>
              <li>Prior notice shall be provided for scheduled maintenance.</li>
            </ul>
          </div>

          {/* Ownership and Intellectual Property */}
          <div className="terms-section">
            <h3>Ownership and Intellectual Property</h3>
            <ul className="ownership-list">
              <li>Upon full payment, complete ownership of the domain, hosting, and developed assets shall be transferred to the Client.</li>
              <li>Until full payment is received, the Company retains management rights over hosting and related services.</li>
            </ul>
          </div>

          {/* Portfolio Rights */}
          <div className="terms-section">
            <h3>Portfolio Rights</h3>
            <p>The Company reserves the right to display completed projects in its portfolio and marketing materials, subject to prior consent from the Client.</p>
          </div>

          {/* Confidentiality */}
          <div className="terms-section">
            <h3>Confidentiality</h3>
            <p>All client information, project data, and business details shall be treated as confidential and shall not be disclosed to third parties without consent, except where required by law.</p>
          </div>

          {/* Dispute Resolution */}
          <div className="terms-section">
            <h3>Dispute Resolution</h3>
            <p>Any disputes arising from services provided shall fall under the exclusive jurisdiction of the courts located in <span className="highlight">Faridabad, Haryana, India</span>.</p>
          </div>

          {/* Last Updated */}
          <div className="terms-footer">
            <p>Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p>For any questions regarding these terms, please <Link href="/contact">contact us</Link>.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;