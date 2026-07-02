'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaStar, FaStarHalfAlt, FaRegStar, 
  FaGoogle, FaExternalLinkAlt, FaGithub,
  FaCalendarAlt, FaUser,
  FaMapMarkerAlt, FaBriefcase, FaAward,
  FaRocket, FaHeart, FaUsers, FaRupeeSign
} from 'react-icons/fa';
import './portfolio.css';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  // Component mount hone par check karo
  useEffect(() => {
    setMounted(true);
    console.log('Component mounted');
    console.log('PROJECT folder path check:', window.location.origin + '/PROJECT/');
  }, []);

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

  // Filter change handler with debugging
  const handleFilterChange = (filterId) => {
    console.log('Filter clicked:', filterId);
    console.log('Previous filter:', activeFilter);
    setActiveFilter(filterId);
    console.log('New filter set to:', filterId);
  };

  // Filtered projects with debugging
  const getFilteredProjects = () => {
    console.log('Getting filtered projects for:', activeFilter);
    if (activeFilter === 'all') {
      console.log('Returning all projects:', projects.length);
      return projects;
    }
    const filtered = projects.filter(p => {
      console.log(`Checking project ${p.title}: category=${p.category}, filter=${activeFilter}, match=${p.category === activeFilter}`);
      return p.category === activeFilter;
    });
    console.log(`Filtered projects count:`, filtered.length);
    return filtered;
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

  // Project link click handler with debugging
  const handleProjectClick = (e, url, title) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Project link clicked:', title);
    console.log('URL:', url);
    console.log('Full URL:', window.location.origin + url);
    
    try {
      // Check if file exists
      fetch(url, { method: 'HEAD' })
        .then(response => {
          console.log('File check response:', response.status);
          if (response.ok) {
            console.log('File exists, opening...');
            window.open(url, '_blank');
          } else {
            console.log('File not found, status:', response.status);
            alert('Demo website file not found. Please check if the file exists in the PROJECT folder.');
          }
        })
        .catch(error => {
          console.error('Error checking file:', error);
          // Still try to open
          window.open(url, '_blank');
        });
    } catch (error) {
      console.error('Error in handleProjectClick:', error);
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
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
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
            
            {/* Stats */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="stat-card"
                >
                  <stat.icon className="stat-icon" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ========== GOOGLE REVIEWS SECTION ========== */}
      <section className="reviews-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
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
          </motion.div>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="review-card"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section className="projects-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">
              Our <span className="section-title-highlight">Projects</span>
            </h2>
            <p className="section-subtitle">
              Check out some of our recent work - All websites are available in just ₹3000/-
            </p>
          </motion.div>

          {/* Price Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="price-banner"
          >
            <div className="price-banner-content">
              <FaRupeeSign className="price-icon" />
              <h3 className="price-title">Special Offer: All Websites Available for Just ₹3000/-</h3>
              <p className="price-text">Get any demo website fully customized for your business at this amazing price!</p>
              <Link href="/contact" className="price-button">
                Claim This Offer
              </Link>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <div className="filter-container">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  console.log('Filter button clicked:', filter.id);
                  handleFilterChange(filter.id);
                }}
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
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="project-card"
                >
                  <div className="project-image">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="project-img"
                        onError={(e) => {
                          console.log('Image failed to load:', project.image);
                          e.target.onerror = null;
                          e.target.src = "/PROJECT/placeholder.jpg";
                        }}
                        onLoad={() => console.log('Image loaded successfully:', project.image)}
                      />
                    ) : (
                      <div className="project-image-placeholder">
                        <span className="project-category">{project.category}</span>
                      </div>
                    )}
                    <div className="project-price-tag">
                      <FaRupeeSign /> 3000/-
                    </div>
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
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log('Demo link clicked for:', project.title);
                              console.log('URL:', project.liveUrl);
                              console.log('Full URL:', window.location.origin + project.liveUrl);
                              
                              // Try to open directly
                              const fullUrl = window.location.origin + project.liveUrl;
                              window.open(fullUrl, '_blank');
                              
                              // Alternative: try relative path
                              // window.open(project.liveUrl, '_blank');
                            }}
                            className="project-link"
                            title="View Demo"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2 className="cta-title">Ready to Start Your Project?</h2>
            <p className="cta-text">
              Join our happy clients and let's build something amazing together
            </p>
            <p className="cta-price-highlight">
              All websites starting from just <span className="price-highlight">₹3000/-</span>
            </p>
            <Link href="/contact" className="cta-button">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;