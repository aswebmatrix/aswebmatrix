// app/about/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import './about.css';

const Page = () => {

  const stats = [
    { number: "10+", label: "Projects Delivered", icon: "fas fa-laptop-code" },
    { number: "3+",  label: "Active Clients",     icon: "fas fa-smile"       },
    { number: "4",   label: "Team Members",        icon: "fas fa-users"       },
    { number: "2026",label: "Year Founded",        icon: "fas fa-calendar-alt"},
  ];

  const skills = ["Next.js","Technical SEO","GEO & AEO","Local SEO","MERN Stack","WordPress","Canva Design","UI/UX Design"];

  const services = [
    { icon: "fas fa-graduation-cap", title: "Education Websites",  desc: "Custom college & institution websites built with MERN Stack and WordPress — like PTLR College.", color: "#00c49a" },
    { icon: "fas fa-heart-pulse",    title: "Healthcare Websites", desc: "Professional, trust-building websites for clinics and healthcare organizations — like SKHealthcare.org.", color: "#f4a261" },
    { icon: "fas fa-building",       title: "Company Websites",    desc: "Corporate digital presence for businesses ready to grow online — like Fusion Advance.", color: "#61dafb" },
    { icon: "fas fa-paint-brush",    title: "Branding & Design",   desc: "End-to-end brand identity: logos, Canva graphics, and visual systems that make you memorable.", color: "#9c27b0" },
    { icon: "fas fa-chart-line",     title: "SEO Optimization",    desc: "Rank higher on Google and drive organic leads with technical and local SEO strategies.", color: "#f4a261" },
    { icon: "fas fa-code",           title: "Custom Development",  desc: "Bespoke web solutions tailored to your exact requirements — fast, secure, and scalable.", color: "#3498db" },
  ];

  const whyUs = [
    { icon: "fas fa-bolt",              title: "1-Week Delivery",    desc: "Most projects shipped within a week. Your deadline is our deadline." },
    { icon: "fas fa-rupee-sign",        title: "Affordable Pricing", desc: "Premium quality at rates that work for education and healthcare budgets." },
    { icon: "fas fa-headset",           title: "Direct Access",      desc: "Work with actual developers — no account managers, no delays." },
    { icon: "fas fa-map-marker-alt",    title: "Local, Meetable",    desc: "Based in Faridabad. We can sit across the table and talk your project through." },
    { icon: "fas fa-check-circle",      title: "100% Satisfaction",  desc: "We don't close a project until you're completely happy with the result." },
  ];

  const milestones = [
    { month: "Jan 2026", title: "Company Founded",       desc: "A.S Web Matrix started its website development journey in Faridabad.", icon: "fas fa-flag"     },
    { month: "Feb 2026", title: "First Client — PTLR",   desc: "Partnered with PTLR College of Technology for their website and digital presence.", icon: "fas fa-trophy"  },
    { month: "Feb 2026", title: "SKHealthcare.org",       desc: "Expanded into the healthcare sector with SKHealthcare.org.", icon: "fas fa-hospital" },
    { month: "Jun 2026", title: "10+ Projects Delivered", desc: "Successfully completed 10+ website projects across education and healthcare.", icon: "fas fa-award"   },
  ];

  const clients = [
    { icon: "fas fa-building-columns", name: "PTLR College",         type: "Education Website",  since: "Feb 2026" },
    { icon: "fas fa-heart-pulse",      name: "SKHealthcare",          type: "Healthcare Website", since: "May 2026" },
    { icon: "fas fa-car",              name: "ZLD Egreen",            type: "Company Website",    since: "Mar 2026" },
    { icon: "fas fa-store",            name: "Fusion Advance",        type: "Company Website",    since: "Apr 2026" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "A.S Web Matrix",
    url: "https://www.aswebmatrix.com",
    telephone: "+91-9718401731",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2578, Sec-23 A",
      addressLocality: "Faridabad",
      addressRegion: "Haryana",
      postalCode: "121005",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="about-page">

        {/* ── STICKY WHATSAPP (matches home page) ── */}
        <a
          href="https://wa.me/919718401731?text=Hi%20AS%20Web%20Matrix%2C%20I%27m%20interested%20in%20your%20services"
          className="sticky-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
          <span>Chat on WhatsApp</span>
        </a>

        {/* ── HERO ── */}
        <section className="about-hero">
          <div className="about-hero-overlay"></div>
          {/* Same ascending graph signature as home page */}
          <div className="about-hero-graph" aria-hidden="true">
            <svg viewBox="0 0 600 220" preserveAspectRatio="none">
              <path className="graph-fill" d="M0,180 L60,165 L120,170 L180,130 L240,140 L300,95 L360,105 L420,60 L480,70 L540,30 L600,40 L600,220 L0,220 Z" />
              <path className="graph-line" d="M0,180 L60,165 L120,170 L180,130 L240,140 L300,95 L360,105 L420,60 L480,70 L540,30 L600,40" />
            </svg>
          </div>

          <div className="about-container">
            <div className="about-hero-content">
              <div className="about-hero-badge animate-fade-in">
                <i className="fas fa-star"></i> Founded January 2026 &nbsp;·&nbsp; 10+ Projects Completed
              </div>
              <h1 className="animate-slide-up">
                We Build Websites That <span className="highlight">Actually Work</span> for You
              </h1>
              <p className="about-hero-desc animate-slide-up-delay">
                A.S Web Matrix is a Faridabad-based digital agency helping educational institutions,
                healthcare organizations, and companies establish a powerful online presence through
                modern web development and strategic SEO.
              </p>
              <div className="about-hero-stats animate-slide-up-delay">
                <span><i className="fas fa-check-circle"></i> 10+ Projects Delivered</span>
                <span><i className="fas fa-star"></i> 4.9 Google Rating</span>
                <span><i className="fas fa-map-marker-alt"></i> Faridabad, Haryana</span>
              </div>
              <div className="about-hero-buttons">
                <Link href="/contact" className="cta-btn primary">Get Your Website</Link>
                <Link href="/portfolio" className="cta-btn whatsapp-style">View Our Work</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS STRIP (same as trust-section on home page) ── */}
        <section className="about-trust-section">
          <div className="about-container">
            <div className="about-trust-grid">
              {stats.map((s) => (
                <div className="about-trust-card" key={s.label}>
                  <div className="about-trust-number">{s.number}</div>
                  <div className="about-trust-label">{s.label}</div>
                  <i className={s.icon}></i>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE ARE (matches about-section on home page) ── */}
        <section className="about-who-section">
          <div className="about-container">
            <div className="about-section-header">
              <span className="about-section-subtitle">Who We Are</span>
              <h2 className="about-section-title">
                A Results-Driven <span>Digital Agency</span>
              </h2>
            </div>

            <div className="about-who-grid">
              <div className="about-who-content">
                <p>
                  A.S Web Matrix is a results-driven digital agency helping businesses grow through
                  innovative technology and strategic digital marketing. Our mission is to empower brands
                  with modern websites, strong search visibility, and AI-ready content strategies.
                </p>
                <p>
                  Our team consists of web developers, SEO specialists, content strategists, UI/UX
                  designers, and digital marketing professionals who work together to create impactful
                  online experiences. We believe every business deserves a strong digital foundation
                  that not only looks professional but also performs effectively.
                </p>
                <p>
                  With expertise in Next.js development, technical SEO, GEO, AEO, local SEO, and
                  performance optimization, we help businesses connect with their audience across
                  traditional search engines and emerging AI-powered search platforms.
                </p>
                <p className="about-who-highlight">
                  We focus on transparency, quality, and long-term partnerships. Every project is built
                  with scalability, performance, and future growth in mind. At A.S Web Matrix, we don't
                  just create websites — we create digital ecosystems that generate leads, improve
                  visibility, and achieve sustainable online success.
                </p>
                <div className="about-skills">
                  {skills.map(t => <span className="about-skill-badge" key={t}>{t}</span>)}
                </div>
              </div>

              {/* Right panel — dark card like home's about-highlights */}
              <div className="about-who-highlights">
                <h3>Why Choose A.S Web Matrix?</h3>
                <ul className="about-highlights-list">
                  {[
                    "Professional & Creative Team",
                    "SEO-Friendly Website Development",
                    "Affordable Pricing for Every Budget",
                    "Fast 1-Week Delivery",
                    "Direct Access to Developers",
                    "Education & Healthcare Specialists",
                    "Faridabad-Based, Meetable Team",
                  ].map((item) => (
                    <li key={item}>
                      <i className="fas fa-check-circle about-list-icon"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="about-highlights-cta">
                  Get Free Consultation <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CLIENTS (same layout as clients-showcase on home page) ── */}
        <section className="about-clients-section">
          <div className="about-container">
            <div className="about-section-header">
              <span className="about-section-subtitle">Clients & Partners</span>
              <h2 className="about-section-title">Trusted by <span>These Organizations</span></h2>
              <p className="about-section-desc">
                Proud to work with educational institutions and healthcare organizations
              </p>
            </div>
            <div className="about-clients-grid">
              {clients.map((c) => (
                <div className="about-client-card" key={c.name}>
                  <div className="about-client-icon"><i className={c.icon}></i></div>
                  <h3>{c.name}</h3>
                  <p>{c.type}</p>
                  <span className="about-client-tag">Since {c.since}</span>
                </div>
              ))}
            </div>
            <div className="about-clients-footer">
              <p className="about-clients-footer-label">Currently working on</p>
              <div className="about-clients-footer-list">
                <span>✓ PTLR College Website</span>
                <span>✓ Fusion Advance Website</span>
                <span>✓ SKHealthcare.org Website</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES (same as services-section on home page) ── */}
        <section className="about-services-section">
          <div className="about-container">
            <div className="about-section-header">
              <span className="about-section-subtitle">What We Offer</span>
              <h2 className="about-section-title">Our <span>Services</span></h2>
              <p className="about-section-desc">Complete digital solutions to help your business grow</p>
            </div>
            <div className="about-services-grid">
              {services.map((s) => (
                <div className="about-service-card" key={s.title}>
                  <div className="about-service-icon" style={{ background: s.color }}>
                    <i className={s.icon}></i>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS STRIP (same as results-section on home page) ── */}
        <section className="about-results-section">
          <div className="about-container">
            <div className="about-section-header">
              <span className="about-section-subtitle">Our Impact</span>
              <h2 className="about-section-title" style={{ color: "#fff" }}>Numbers That <span>Speak</span></h2>
            </div>
            <div className="about-results-grid">
              {[
                { n: "3+",  l: "Education Websites",  i: "fas fa-graduation-cap" },
                { n: "2+",  l: "Healthcare Websites",  i: "fas fa-heart-pulse"    },
                { n: "10+", l: "Canva Designs Made",   i: "fas fa-paint-brush"    },
                { n: "1wk", l: "Avg Delivery Time",    i: "fas fa-bolt"           },
              ].map(r => (
                <div className="about-result-card" key={r.l}>
                  <div className="about-result-number">{r.n}</div>
                  <div className="about-result-label">{r.l}</div>
                  <i className={r.i}></i>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE / PROCESS (same card style as process-section) ── */}
        <section className="about-process-section">
          <div className="about-container">
            <div className="about-section-header">
              <span className="about-section-subtitle">Our Journey</span>
              <h2 className="about-section-title">Milestones That <span>Define Us</span></h2>
            </div>
            <div className="about-process-steps">
              {milestones.map((m, i) => (
                <div className="about-process-step" key={i}>
                  <div className="about-step-number">{`0${i + 1}`}</div>
                  <div className="about-step-icon">
                    <i className={m.icon}></i>
                  </div>
                  <span className="about-step-month">{m.month}</span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US (same as why-choose-us on home page) ── */}
        <section className="about-why-section">
          <div className="about-container">
            <div className="about-section-header">
              <span className="about-section-subtitle">Why Choose Us</span>
              <h2 className="about-section-title">Why <span>A.S Web Matrix?</span></h2>
            </div>
            <div className="about-why-grid">
              {whyUs.map((w) => (
                <div className="about-why-card" key={w.title}>
                  <div className="about-why-icon"><i className={w.icon}></i></div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA (same as final-cta on home page) ── */}
        <section className="about-final-cta">
          <div className="about-container">
            <div className="about-cta-content">
              <h2>Ready to Build Your Website?</h2>
              <p>Join PTLR College, Fusion Advance, and SKHealthcare.org — businesses that trusted us</p>
              <div className="about-cta-buttons">
                <Link href="/contact" className="cta-btn primary large">
                  <i className="fas fa-paper-plane"></i> Get Free Consultation
                </Link>
                <a
                  href="https://wa.me/919718401731?text=Hi%20AS%20Web%20Matrix%2C%20I%27m%20interested%20in%20your%20services"
                  className="cta-btn outline large"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Now
                </a>
              </div>
              <p className="about-cta-footer">
                <i className="fas fa-map-marker-alt"></i> Faridabad, Haryana &nbsp;·&nbsp; 10+ Projects Completed
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTACT INFO (same as home page contact-info-section) ── */}
        <section className="about-contact-section">
          <div className="about-container">
            <div className="about-contact-grid">
              <div className="about-contact-item">
                <i className="fas fa-phone-alt"></i>
                <div className="about-contact-details">
                  <span>Call Us</span>
                  <a href="tel:+919718401731">+91-9718401731</a>
                </div>
              </div>
              <div className="about-contact-item">
                <i className="fas fa-envelope"></i>
                <div className="about-contact-details">
                  <span>Email Us</span>
                  <a href="mailto:aswebmatrix@gmail.com">aswebmatrix@gmail.com</a>
                </div>
              </div>
              <div className="about-contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div className="about-contact-details">
                  <span>Visit Us</span>
                  <span>2578, Sec-23 A, Faridabad, Haryana - 121005</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Page;