'use client';

import React, { useState, useEffect } from 'react';

const ConsultationPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    projectType: '',
    budget: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: '',
          projectType: '',
          budget: '',
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(
        err.message || 'Something went wrong. Please try again or call +91-9718401731'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>

          <div className="popup-header">
            <div className="popup-icon">
              <i className="fas fa-chalkboard-user"></i>
            </div>
            <h2>Get a Free Consultation</h2>
            <p>Fill out the form and our expert will contact you within 24 hours</p>
          </div>

          {submitStatus === 'success' ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>Thank You!</h3>
              <p>Your consultation request has been sent successfully. We&apos;ll get back to you soon!</p>
              <button onClick={onClose} className="close-success-btn">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="popup-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="fas fa-user"></i> Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone-alt"></i> Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="service">
                    <i className="fas fa-code"></i> Service Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="web_development">Website Development</option>
                    <option value="mern_stack">MERN Stack Development</option>
                    <option value="wordpress">WordPress Development</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="social_media">Social Media Marketing</option>
                    <option value="email_marketing">Email Marketing</option>
                    <option value="ppc">PPC Advertising</option>
                    <option value="ui_ux">UI/UX Design</option>
                    <option value="canva">Canva Design Services</option>
                    <option value="video_editing">Video Editing</option>
                    <option value="ecommerce">E-commerce Solutions</option>
                    <option value="inventory">Inventory Management</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">
                    <i className="fas fa-project-diagram"></i> Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value="">Select project type</option>
                    <option value="new_website">New Website</option>
                    <option value="redesign">Website Redesign</option>
                    <option value="ecommerce">E-commerce Store</option>
                    <option value="web_app">Web Application</option>
                    <option value="maintenance">Website Maintenance</option>
                    <option value="marketing">Digital Marketing</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">
                    <i className="fas fa-rupee-sign"></i> Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="below_25000">Below ₹25,000</option>
                    <option value="25000_50000">₹25,000 - ₹50,000</option>
                    <option value="50000_100000">₹50,000 - ₹1,00,000</option>
                    <option value="above_100000">Above ₹1,00,000</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">
                  <i className="fas fa-comment"></i> Project Details / Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project, requirements, or any specific questions..."
                ></textarea>
              </div>

              {submitStatus === 'error' && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errorMessage}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Consultation Request
                  </>
                )}
              </button>

              <p className="form-note">
                <i className="fas fa-lock"></i>
                Your information is secure and will not be shared with third parties.
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(5px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .popup-container {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 20px;
          max-width: 750px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
          border: 1px solid rgba(0, 196, 154, 0.2);
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .popup-container::-webkit-scrollbar {
          width: 8px;
        }
        .popup-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .popup-container::-webkit-scrollbar-thumb {
          background: #00c49a;
          border-radius: 10px;
        }

        .popup-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
          color: white;
          font-size: 18px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup-close:hover {
          background: #ff4757;
          transform: rotate(90deg);
        }

        .popup-header {
          text-align: center;
          padding: 30px 30px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .popup-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #00c49a, #00a37a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .popup-icon i {
          font-size: 32px;
          color: white;
        }
        .popup-header h2 {
          color: white;
          font-size: 28px;
          margin-bottom: 10px;
        }
        .popup-header p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        .popup-form {
          padding: 30px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-group.full-width {
          grid-column: span 2;
        }

        .form-group label {
          color: white;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .form-group label i {
          color: #00c49a;
          font-size: 14px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 12px 15px;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #00c49a;
          background: rgba(255, 255, 255, 0.08);
        }
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .form-group select option {
          background: #1a1a2e;
          color: white;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #00c49a, #00a37a);
          border: none;
          padding: 14px;
          border-radius: 10px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 196, 154, 0.3);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-note {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .form-note i {
          color: #00c49a;
        }

        .success-message {
          text-align: center;
          padding: 50px 30px;
        }
        .success-message i {
          font-size: 70px;
          color: #00c49a;
          margin-bottom: 20px;
        }
        .success-message h3 {
          color: white;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .success-message p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 30px;
        }
        .close-success-btn {
          background: linear-gradient(135deg, #00c49a, #00a37a);
          border: none;
          padding: 12px 30px;
          border-radius: 10px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .error-message {
          background: rgba(255, 71, 87, 0.1);
          border: 1px solid #ff4757;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 20px;
          color: #ff4757;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .form-group.full-width {
            grid-column: span 1;
          }
          .popup-container {
            width: 95%;
            margin: 20px;
          }
          .popup-header h2 {
            font-size: 22px;
          }
          .popup-form {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default ConsultationPopup;