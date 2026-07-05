'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaStar, FaStarHalfAlt, FaRegStar, 
  FaGoogle, FaExternalLinkAlt, FaGithub,
  FaCalendarAlt, FaUser,
  FaMapMarkerAlt, FaBriefcase, FaAward,
  FaRocket, FaHeart, FaUsers
} from 'react-icons/fa';
import './portfolio.css';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  // Component mount hone par check karo + AOS init
  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }, []);

  // Filter change hone ke baad naye cards ko AOS refresh karo taaki
  // animation dubara trigger ho (AOS sirf mount time ke elements track karta hai)
  useEffect(() => {
    if (mounted) {
      AOS.refreshHard();
    }
  }, [activeFilter, mounted]);

  // ================== MANUAL GOOGLE REVIEWS ==================
  const reviews = [
    {
      id: 1,
      author_name: "PTLR College Faridabad",
      rating: 5,
      text: "We had a great experience working with Aswebmatrix for our website development. Their team is professional, responsive, and delivers high-quality work.",
      relative_time_description: "a day ago",
      profile_photo_url: "",
      source: "Google"
    },
    {
      id: 2,
      author_name: "Ripa Sarkar",
      rating: 5,
      text: "Aswebmatrix offers creative website solutions at reasonable prices.",
      relative_time_description: "a day ago",
      profile_photo_url: "",
      source: "Google"
    },
    {
      id: 3,
      author_name: "Narayan Kumar",
      rating: 5,
      text: "Good team for website development and SEO solutions",
      relative_time_description: "a day ago",
      profile_photo_url: "",
      source: "Google"
    },
    {
      id: 4,
      author_name: "Sachin Healthcare",
      rating: 5,
      text: "Thank you for your kind words!",
      relative_time_description: "2 months ago",
      profile_photo_url: "",
      source: "Google"
    },
  ];

  // ================== PROJECTS DATA ==================
  const projects = [
    {
      id: 1,
      title: "Taarzan Motors - Car Dealership",
      description: "Complete e-commerce solution for car sales",
      client: "Taarzan Motors Delhi",
      category: "Cars",
      techStack: ["Demo Website", "HTML5", "CSS3", "JavaScript"],
      results: "Only for Demo Purpose",
      liveUrl: "/cars/cars.html",
      githubUrl: "#",
      year: "2026",
      rating: 5,
      image: "/PROJECT/T.png"
    },
    {
      id: 2,
      title: "Techno Works - Company Website",
      description: "Complete patient management system",
      client: "City Hospital",
      category: "Company Websites",
      techStack: ["Demo Website", "HTML5", "CSS3", "JavaScript"],
      results: "Patient waiting time 60% reduced",
      liveUrl: "/company/companywebsite.html",
      year: "2023",
      rating: 5,
      image: "/PROJECT/TECHNO WORKS.png"
    },
    {
      id: 3,
      title: "AS Web Store - E-Commerce",
      description: "Property listing platform",
      client: "Dream Homes Properties",
      category: "realestate",
      techStack: ["Demo Website", "HTML5", "CSS3", "JavaScript"],
      results: "3 months mein 500+ leads generated",
      liveUrl: "/ecommerce/ecommerce.html",
      githubUrl: "#",
      year: "2024",
      rating: 4.5,
      image: "/PROJECT/ASWebStore.png"
    },
    {
      id: 4,
      title: "Foodie's Paradise - Restaurant",
      description: "Online learning platform",
      client: "Jain Coaching Center",
      category: "restaurant",
      techStack: ["Demo Website", "HTML5", "CSS3", "JavaScript"],
      results: "3000+ students online enrolled",
      liveUrl: "/resturant/resturant.html",
      year: "2023",
      rating: 5,
      image: "/PROJECT/restaurant.png"
    },
    {
      id: 5,
      title: "AS School - Education",
      description: "Complete restaurant management",
      client: "Foodie's Paradise",
      category: "education",
      techStack: ["Demo Website", "HTML5", "CSS3", "JavaScript"],
      results: "Online orders mein 200% increase",
      liveUrl: "/schools/schools.html",
      githubUrl: "#",
      year: "2024",
      rating: 5,
      image: "/PROJECT/schools.png"
    },
    {
      id: 6,
      title: "Tour & Travels - Tourism",
      description: "Travel booking platform",
      client: "Wanderlust Travels",
      category: "travel",
      techStack: ["Demo Website", "HTML5", "CSS3", "JavaScript"],
      results: "300+ bookings in first month",
      liveUrl: "/travel/travel.html",
      year: "2023",
      rating: 4.5,
      image: "/PROJECT/tour.png"
    }
  ];

  // ================== FILTERS ==================
  const filters = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'Cars', name: 'Cars', count: projects.filter(p => p.category === 'Cars').length },
    { id: 'Company Websites', name: 'Company Websites', count: projects.filter(p => p.category === 'Company Websites').length },
    { id: 'realestate', name: 'E-commerce', count: projects.filter(p => p.category === 'realestate').length },
    { id: 'education', name: 'Education', count: projects.filter(p => p.category === 'education').length },
    { id: 'restaurant', name: 'Restaurant', count: projects.filter(p => p.category === 'restaurant').length },
    { id: 'travel', name: 'Travel', count: projects.filter(p => p.category === 'travel').length }
  ];

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const getFilteredProjects = () => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category === activeFilter);
  };

  const filteredProjects = getFilteredProjects();

  // ================== RENDER STARS ==================
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-empty" />);
      }
    }
    return stars;
  };

  // ================== STATS ==================
  const stats = [
    { icon: FaRocket, value: "50+", label: "Projects Completed" },
    { icon: FaUsers, value: "35+", label: "Happy Clients" },
    { icon: FaAward, value: "4.9", label: "Google Rating" },
    { icon: FaHeart, value: "100%", label: "Satisfaction" }
  ];

  // Project link click handler
  const handleProjectClick = (e, url, title) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      fetch(url, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            window.open(url, '_blank');
          } else {
            alert('Demo website file not found. Please check if the file exists in the PROJECT folder.');
          }
        })
        .catch(() => {
          window.open(url, '_blank');
        });
    } catch (error) {
      alert('Error opening demo website. Please try again.');
    }
  };

  return (
    <div className="portfolio-page">

      {/* Debug Info */}
      {mounted && (
        <div style={{ display: 'none' }}>
          Debug: Active Filter = {activeFilter}
        </div>
      )}

      {/* ========== HERO SECTION ========== */}
      <section className="hero-section">
        <div className="hero-pattern"></div>

        {/* Signature decorative element — faint ascending growth line tucked
            into the bottom-right corner, same placement as the home page's
            hero-graph, sitting behind the stats card. */}
        <div className="hero-graph" aria-hidden="true">
          <svg viewBox="0 0 600 220" preserveAspectRatio="none">
            <path className="hero-graph-fill" d="M0,180 L60,165 L120,170 L180,130 L240,140 L300,95 L360,105 L420,60 L480,70 L540,30 L600,40 L600,220 L0,220 Z" />
            <path className="hero-graph-line" d="M0,180 L60,165 L120,170 L180,130 L240,140 L300,95 L360,105 L420,60 L480,70 L540,30 L600,40" />
          </svg>
        </div>

        <div className="container hero-inner">
          <div className="hero-content" data-aos="fade-right" data-aos-duration="900">
            <span className="hero-badge">
              <FaBriefcase /> AS Web Matrix Portfolio
            </span>
            <h1 className="hero-title">
              We Don't Just Build Websites,<br />
              <span className="hero-title-highlight">We Build Digital Experiences</span>
            </h1>
            <p className="hero-subtitle">
              50+ successful projects, 35+ happy clients, and 4.9 Google Rating. 
              See why businesses trust us for their digital needs.
            </p>
            
          </div>

          {/* Stats — right column, matches the balance of about page's hero visual */}
          <div className="stats-grid" data-aos="fade-left" data-aos-duration="900" data-aos-delay="150">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card"
                data-aos="zoom-in"
                data-aos-delay={200 + index * 100}
              >
                <stat.icon className="stat-icon" />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GOOGLE REVIEWS SECTION ========== */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="google-badge">
              <FaGoogle className="google-icon" />
              <span className="google-title">Google Reviews</span>
            </div>
            <div className="rating-display">
              <div className="stars-container">
                {renderStars(4.9)}
              </div>
              <span className="rating-value">4.9</span>
              <span className="rating-count">({reviews.length} reviews)</span>
            </div>
          </div>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div
                key={review.id || index}
                className="review-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="review-card-inner">
                  <div className="review-header">
                    <div className="reviewer-avatar">
                      {review.author_name?.charAt(0) || 'U'}
                    </div>
                    <div className="reviewer-info">
                      <h3 className="reviewer-name">{review.author_name}</h3>
                      <span className="review-time">{review.relative_time_description}</span>
                    </div>
                  </div>

                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>

                  <p className="review-text">
                    "{review.text}"
                  </p>

                  <div className="review-source">
                    <FaGoogle className="source-icon" />
                    <span className="source-text">Google Review</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">
              Our <span className="section-title-highlight">Projects</span>
            </h2>
            <p className="section-subtitle">
              Check out some of our recent work across industries
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="filter-container" data-aos="fade-up">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              >
                {filter.name} <span className="filter-count">{filter.count}</span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="project-card"
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                >
                  <div className="project-image">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/PROJECT/placeholder.jpg";
                        }}
                      />
                    ) : (
                      <div className="project-image-placeholder">
                        <span className="project-category">{project.category}</span>
                      </div>
                    )}
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>

                    <div className="project-tech">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-meta">
                      <span className="meta-item">
                        <FaUser className="meta-icon" />
                        {project.client}
                      </span>
                      <span className="meta-item">
                        <FaCalendarAlt className="meta-icon" />
                        {project.year}
                      </span>
                    </div>

                    <div className="project-results">
                      <strong>Results:</strong> {project.results}
                    </div>

                    <div className="project-footer">
                      <div className="project-rating">
                        {renderStars(project.rating)}
                      </div>

                      <div className="project-links">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            onClick={(e) => handleProjectClick(e, project.liveUrl, project.title)}
                            className="project-link"
                            title="View Demo"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-projects">
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2 className="cta-title">Ready to Start Your Project?</h2>
            <p className="cta-text">
              Join our happy clients and let's build something amazing together
            </p>
            <Link href="/contact" className="cta-button">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;