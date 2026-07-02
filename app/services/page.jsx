// app/services/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import "@fortawesome/fontawesome-free/css/all.min.css";

// ─── JSON-LD Schema ────────────────────────────────────────────────────────────
const jsonLd = {
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
  },
  "areaServed": [
    "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Noida", "Gurugram", "Faridabad", "India"
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61587616148379",
    "https://www.instagram.com/a.swebmatrix?igsh=cjJ1aW0xZ3J6cHU1",
    "https://www.linkedin.com/company/as-webmatrix/?viewAsMember=true",
    "https://x.com/aswebmatrix"
  ]
};

// ─── All static services (original complete list) ─────────────────────────────
const STATIC_SERVICES = [
  // Development
  {
    id: 1, category: 'development', icon: 'fas fa-laptop-code',
    title: 'Custom Web Development',
    description: 'Tailored, responsive websites built with modern frameworks for optimal performance and user experience.',
    features: ['React/Next.js', 'Node.js/PHP', 'Responsive Design', 'Performance Optimization', 'API Integration'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'WordPress'],
    price: 'Starting at ₹17,999', caseStudy: 'Increased client conversion by 150%', color: '#00c49a'
  },
  {
    id: 3, category: 'development', icon: 'fas fa-database',
    title: 'MERN Stack Development',
    description: 'Full-stack applications using MongoDB, Express.js, React, and Node.js for scalable solutions.',
    features: ['MongoDB', 'Express.js', 'React', 'Node.js', 'RESTful APIs'],
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    price: 'Starting at ₹27,999', caseStudy: 'Handled 1M+ user requests daily', color: '#2b3c56'
  },
  {
    id: 4, category: 'development', icon: 'fab fa-wordpress',
    title: 'WordPress Development',
    description: 'Custom WordPress themes and plugins with WooCommerce integration for e-commerce stores.',
    features: ['Custom Themes', 'Plugin Development', 'WooCommerce', 'Elementor', 'SEO Ready'],
    technologies: ['WordPress', 'PHP', 'MySQL', 'WooCommerce', 'ACF'],
    price: 'Starting at ₹15,000', caseStudy: '50+ successful WordPress projects', color: '#21759b'
  },
  // Marketing
  {
    id: 5, category: 'marketing', icon: 'fas fa-search',
    title: 'SEO Optimization',
    description: 'Data-driven SEO strategies to improve search rankings and drive organic traffic.',
    features: ['Keyword Research', 'Technical SEO', 'Link Building', 'Content Strategy', 'Local SEO'],
    technologies: ['SEMrush', 'Ahrefs', 'Google Analytics', 'Search Console'],
    price: 'Starting at ₹6,999/month', caseStudy: 'Ranked #1 for 50+ keywords', color: '#ff6b00'
  },
  {
    id: 6, category: 'marketing', icon: 'fas fa-hashtag',
    title: 'Social Media Marketing',
    description: 'Strategic social media campaigns to increase brand awareness and customer engagement.',
    features: ['Content Creation', 'Community Management', 'Paid Ads', 'Analytics', 'Influencer Marketing'],
    technologies: ['Meta Ads', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok'],
    price: 'Starting at ₹10,000/month', caseStudy: '500% increase in engagement', color: '#4267B2'
  },
  {
    id: 7, category: 'marketing', icon: 'fas fa-envelope-open-text',
    title: 'Email Marketing',
    description: 'Targeted email campaigns that nurture leads and drive conversions.',
    features: ['Newsletter Design', 'Automation', 'A/B Testing', 'List Segmentation', 'Analytics'],
    technologies: ['Mailchimp', 'SendGrid', 'ConvertKit', 'HubSpot'],
    price: 'Starting at ₹8,000/month', caseStudy: '40% open rate achieved', color: '#00c49a'
  },
  {
    id: 8, category: 'marketing', icon: 'fas fa-chart-pie',
    title: 'PPC Advertising',
    description: 'Pay-per-click campaigns that deliver immediate results and measurable ROI.',
    features: ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'Retargeting', 'Conversion Tracking'],
    technologies: ['Google Ads', 'Meta Business', 'Analytics', 'Tag Manager'],
    price: 'Starting at ₹15,000/month', caseStudy: '300% ROI in 3 months', color: '#007259'
  },
  // Design
  {
    id: 9, category: 'design', icon: 'fas fa-palette',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that enhance usability and drive conversions.',
    features: ['Wireframing', 'Prototyping', 'User Testing', 'Interaction Design', 'Visual Design'],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin'],
    price: 'Starting at ₹15,000', caseStudy: 'Reduced bounce rate by 60%', color: '#2b3c56'
  },
  {
    id: 10, category: 'design', icon: 'fas fa-paint-brush',
    title: 'Canva Design Services',
    description: 'Professional graphic design for all your branding and marketing needs.',
    features: ['Logo Design', 'Social Media Graphics', 'Brand Identity', 'Print Materials', 'Presentations'],
    technologies: ['Canva Pro', 'Photoshop', 'Illustrator', 'InDesign'],
    price: 'Starting at ₹5,000', caseStudy: '500+ designs delivered', color: '#00c49a'
  },
  {
    id: 11, category: 'design', icon: 'fas fa-video',
    title: 'Video Editing',
    description: 'Professional video editing for marketing, tutorials, and social media content.',
    features: ['Promo Videos', 'Tutorials', 'Social Media Clips', 'Motion Graphics', 'Color Grading'],
    technologies: ['Premiere Pro', 'After Effects', 'Final Cut', 'DaVinci'],
    price: 'Starting at ₹8,000', caseStudy: '1M+ video views', color: '#007259'
  },
  // E-Commerce
  {
    id: 12, category: 'ecommerce', icon: 'fas fa-shopping-cart',
    title: 'E-commerce Solutions',
    description: 'Complete online store development with secure payment integration and inventory management.',
    features: ['Shopify/WooCommerce', 'Payment Gateways', 'Product Management', 'Inventory System', 'Order Tracking'],
    technologies: ['Shopify', 'WooCommerce', 'Razorpay', 'PayPal', 'Shiprocket'],
    price: 'Starting at ₹30,000', caseStudy: '200% sales increase', color: '#2b3c56'
  },
  {
    id: 13, category: 'ecommerce', icon: 'fas fa-truck',
    title: 'Inventory Management',
    description: 'Streamline your business with automated inventory and order management systems.',
    features: ['Stock Tracking', 'Order Management', 'Supplier Integration', 'Reporting', 'Barcode System'],
    technologies: ['Custom CRM', 'ERPNext', 'Odoo', 'Zoho'],
    price: 'Starting at ₹25,000', caseStudy: 'Reduced errors by 90%', color: '#00c49a'
  },
];

const SERVICE_CATEGORIES = [
  { id: 'all',         name: 'All Services',     icon: 'fas fa-th-large' },
  { id: 'development', name: 'Development',       icon: 'fas fa-code' },
  { id: 'marketing',   name: 'Digital Marketing', icon: 'fas fa-chart-line' },
  { id: 'design',      name: 'Design & Creative', icon: 'fas fa-paint-brush' },
  { id: 'ecommerce',   name: 'E-Commerce',        icon: 'fas fa-shopping-cart' },
];

const PROCESS_STEPS = [
  { number: '01', icon: 'fas fa-clipboard-list', title: 'Discovery & Strategy', description: 'We analyze your business goals, target audience, and competition to create a strategic roadmap.', color: '#00c49a' },
  { number: '02', icon: 'fas fa-paint-brush',    title: 'Design & Prototyping', description: 'Our designers create wireframes and prototypes for user testing and stakeholder approval.',       color: '#007259' },
  { number: '03', icon: 'fas fa-code',            title: 'Development',          description: 'Agile development process with regular updates and milestone deliveries.',                          color: '#2b3c56' },
  { number: '04', icon: 'fas fa-rocket',          title: 'Launch & Optimize',    description: 'Deployment with ongoing monitoring, optimization, and performance tracking.',                       color: '#ff6b00' },
];

const TECHNOLOGIES = [
  { name: 'React',      icon: 'fab fa-react',      category: 'Frontend'   },
  { name: 'Node.js',    icon: 'fab fa-node',        category: 'Backend'    },
  { name: 'MongoDB',    icon: 'fas fa-database',    category: 'Database'   },
  { name: 'WordPress',  icon: 'fab fa-wordpress',   category: 'CMS'        },
  { name: 'Shopify',    icon: 'fab fa-shopify',     category: 'E-commerce' },
  { name: 'Figma',      icon: 'fab fa-figma',       category: 'Design'     },
  { name: 'Google Ads', icon: 'fab fa-google',      category: 'Marketing'  },
  { name: 'Canva',      icon: 'fas fa-paint-brush', category: 'Design'     },
];

const STATS = [
  { number: '10+',  label: 'Projects Delivered', icon: 'fas fa-rocket'  },
  { number: '98%',  label: 'Client Satisfaction', icon: 'fas fa-smile'  },
  { number: '4',    label: 'Team Experts',        icon: 'fas fa-users'   },
  { number: '24/7', label: 'Client Support',      icon: 'fas fa-headset' },
];

// ─── Helper: convert DB city service → card-compatible shape ─────────────────
function normalizeCityService(svc, index) {
  return {
    id:           `city-${index}`,
    category:     'development',
    icon:         svc.icon?.startsWith('fa') ? svc.icon : `fas ${svc.icon || 'fa-star'}`,
    title:        svc.title,
    description:  svc.shortDesc || svc.longDesc || '',
    features:     svc.benefits?.filter(Boolean) || [],
    technologies: [],
    price:        svc.results ? `🏆 ${svc.results}` : '',
    caseStudy:    svc.results || '',
    color:        '#00c49a',
  };
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  page: {
    fontFamily: "'Inter','Segoe UI',sans-serif",
    background: "#fff",
    color: "#0B1628"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 32px"
  },
  // ── Hero ──
  hero: {
    background: "#0B1628",
    padding: "100px 0 80px",
    position: "relative",
    overflow: "hidden"
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(rgba(0,196,154,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,196,154,0.06) 1px,transparent 1px)",
    backgroundSize: "60px 60px"
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "900px",
    margin: "0 auto",
    textAlign: "center"
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.78rem",
    fontWeight: "700",
    color: "#00C49A",
    background: "rgba(0,196,154,0.1)",
    border: "1px solid rgba(0,196,154,0.3)",
    padding: "6px 16px",
    borderRadius: "100px",
    marginBottom: "24px"
  },
  cityBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.78rem",
    fontWeight: "700",
    color: "#00C49A",
    background: "rgba(0,196,154,0.15)",
    border: "1px solid rgba(0,196,154,0.4)",
    padding: "8px 20px",
    borderRadius: "100px",
    marginBottom: "20px"
  },
  heroTitle: {
    fontSize: "clamp(2.5rem,5vw,3.8rem)",
    fontWeight: "900",
    color: "#fff",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    marginBottom: "20px"
  },
  heroHighlight: {
    color: "#00C49A"
  },
  heroSubtitle: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.75,
    marginBottom: "28px",
    maxWidth: "680px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  nearbyAreas: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "32px"
  },
  nearbyLabel: {
    fontSize: "0.78rem",
    fontWeight: "600",
    color: "rgba(255,255,255,0.5)",
    marginRight: "4px"
  },
  nearbyTag: {
    fontSize: "0.72rem",
    fontWeight: "600",
    color: "#00C49A",
    background: "rgba(0,196,154,0.1)",
    border: "1px solid rgba(0,196,154,0.2)",
    padding: "4px 12px",
    borderRadius: "100px"
  },
  heroButtons: {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "48px"
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 32px",
    background: "#00C49A",
    color: "#fff",
    borderRadius: "100px",
    fontWeight: "700",
    fontSize: "0.9rem",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.04em"
  },
  btnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 32px",
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
    borderRadius: "100px",
    fontWeight: "700",
    fontSize: "0.9rem",
    textDecoration: "none",
    border: "1.5px solid rgba(255,255,255,0.2)"
  },
  heroStats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "1px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "8px",
    maxWidth: "700px",
    margin: "0 auto"
  },
  statItem: {
    padding: "20px 16px",
    textAlign: "center",
    borderRadius: "12px"
  },
  statIcon: {
    fontSize: "1.4rem",
    color: "#00C49A",
    marginBottom: "6px"
  },
  statNumber: {
    display: "block",
    fontSize: "1.8rem",
    fontWeight: "900",
    color: "#00C49A",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    marginBottom: "4px"
  },
  statLabel: {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: "600",
    color: "rgba(255,255,255,0.45)",
    textTransform: "uppercase",
    letterSpacing: "0.08em"
  },
  heroWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  // ── Categories Tabs ──
  categoriesSection: {
    padding: "40px 0 0",
    background: "#fff"
  },
  categoriesTabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center"
  },
  categoryTab: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 24px",
    background: "#F7F8FC",
    border: "1.5px solid #E2E8F0",
    borderRadius: "100px",
    fontWeight: "700",
    fontSize: "0.85rem",
    color: "#4A5568",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  categoryTabActive: {
    background: "#0B1628",
    borderColor: "#0B1628",
    color: "#fff"
  },
  // ── Services Section ──
  servicesSection: {
    padding: "60px 0 80px",
    background: "#fff"
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "48px"
  },
  sectionSubtitle: {
    display: "inline-block",
    fontSize: "0.72rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#00C49A",
    border: "1.5px solid #00C49A",
    padding: "5px 14px",
    borderRadius: "100px",
    marginBottom: "16px"
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem,3.5vw,2.5rem)",
    fontWeight: "800",
    color: "#0B1628",
    letterSpacing: "-0.02em",
    marginBottom: "12px"
  },
  sectionTitleSpan: {
    color: "#00C49A"
  },
  sectionDescription: {
    fontSize: "1rem",
    color: "#4A5568",
    lineHeight: 1.75,
    maxWidth: "640px",
    margin: "0 auto"
  },
  cityBanner: {
    background: "#F0FDF4",
    border: "1.5px solid #86EFAC",
    borderRadius: "14px",
    padding: "16px 24px",
    marginBottom: "32px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    fontSize: "0.92rem",
    color: "#166534"
  },
  cityBannerLink: {
    color: "#00C49A",
    fontWeight: "700",
    textDecoration: "none"
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "24px"
  },
  serviceCard: {
    background: "#fff",
    border: "1.5px solid #E2E8F0",
    borderRadius: "20px",
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    transition: "all 0.3s ease"
  },
  serviceCardHover: {
    borderColor: "#00C49A",
    boxShadow: "0 8px 30px rgba(0,196,154,0.12)",
    transform: "translateY(-4px)"
  },
  serviceIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    color: "#fff"
  },
  serviceTitle: {
    fontSize: "1.1rem",
    fontWeight: "800",
    color: "#0B1628",
    margin: 0
  },
  serviceDesc: {
    fontSize: "0.88rem",
    color: "#6B7A99",
    lineHeight: 1.65,
    margin: 0
  },
  servicePrice: {
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#00C49A",
    background: "#E6F9F4",
    padding: "4px 12px",
    borderRadius: "8px",
    display: "inline-block",
    alignSelf: "flex-start"
  },
  serviceFeatures: {
    listStyle: "none",
    padding: 0,
    margin: "4px 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  serviceFeature: {
    fontSize: "0.82rem",
    color: "#374151",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  serviceFeatureIcon: {
    color: "#00C49A"
  },
  serviceTechTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "4px"
  },
  techTag: {
    fontSize: "0.68rem",
    fontWeight: "600",
    color: "#374151",
    background: "#F3F4F6",
    padding: "3px 10px",
    borderRadius: "100px"
  },
  serviceCaseStudy: {
    fontSize: "0.78rem",
    fontWeight: "700",
    color: "#007259",
    background: "#E6F9F4",
    padding: "6px 12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  serviceLink: {
    display: "block",
    textAlign: "center",
    padding: "10px",
    background: "#0B1628",
    color: "#fff",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "0.82rem",
    textDecoration: "none",
    marginTop: "auto"
  },
  // ── Process Section ──
  processSection: {
    padding: "80px 0",
    background: "#F7F8FC"
  },
  processSteps: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "24px",
    marginTop: "16px"
  },
  processStep: {
    position: "relative",
    textAlign: "center"
  },
  stepNumber: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "1rem",
    color: "#fff",
    margin: "0 auto 16px"
  },
  stepIcon: {
    fontSize: "2rem",
    marginBottom: "12px"
  },
  stepTitle: {
    fontSize: "1rem",
    fontWeight: "800",
    color: "#0B1628",
    marginBottom: "8px"
  },
  stepDescription: {
    fontSize: "0.88rem",
    color: "#6B7A99",
    lineHeight: 1.6
  },
  // ── Tech Section ──
  techSection: {
    padding: "80px 0",
    background: "#fff"
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "24px",
    marginTop: "16px"
  },
  techItem: {
    background: "#F7F8FC",
    border: "1.5px solid #E2E8F0",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center"
  },
  techIcon: {
    fontSize: "2.5rem",
    color: "#00C49A",
    marginBottom: "12px"
  },
  techName: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#0B1628",
    marginBottom: "4px"
  },
  techCategory: {
    fontSize: "0.72rem",
    fontWeight: "600",
    color: "#6B7A99",
    textTransform: "uppercase",
    letterSpacing: "0.06em"
  },
  // ── Why Choose Us ──
  whyChooseSection: {
    padding: "80px 0",
    background: "#F7F8FC"
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "24px",
    marginTop: "16px"
  },
  featureCard: {
    background: "#fff",
    border: "1.5px solid #E2E8F0",
    borderRadius: "16px",
    padding: "28px 24px",
    textAlign: "center"
  },
  featureIcon: {
    fontSize: "2.2rem",
    color: "#00C49A",
    marginBottom: "12px"
  },
  featureTitle: {
    fontSize: "1rem",
    fontWeight: "800",
    color: "#0B1628",
    marginBottom: "8px"
  },
  featureDesc: {
    fontSize: "0.88rem",
    color: "#6B7A99",
    lineHeight: 1.6
  },
  // ── CTA ──
  ctaSection: {
    padding: "100px 0",
    background: "linear-gradient(135deg,#007259,#0B1628 60%)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden"
  },
  ctaContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "680px",
    margin: "0 auto",
    padding: "0 20px"
  },
  ctaTitle: {
    fontSize: "clamp(1.8rem,4vw,3rem)",
    fontWeight: "900",
    color: "#fff",
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    marginBottom: "16px"
  },
  ctaDescription: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.75,
    marginBottom: "36px"
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px"
  },
  btnLarge: {
    padding: "16px 36px",
    fontSize: "1rem"
  },
  ctaGuarantee: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.4)"
  },
  ctaGuaranteeIcon: {
    color: "#00C49A"
  },
  // ── Responsive ──
  '@media (max-width: 992px)': {
    servicesGrid: { gridTemplateColumns: "repeat(2,1fr)" },
    processSteps: { gridTemplateColumns: "repeat(2,1fr)" },
    techGrid: { gridTemplateColumns: "repeat(2,1fr)" },
    featuresGrid: { gridTemplateColumns: "repeat(2,1fr)" },
    heroStats: { gridTemplateColumns: "repeat(2,1fr)" }
  },
  '@media (max-width: 640px)': {
    container: { padding: "0 16px" },
    servicesGrid: { gridTemplateColumns: "1fr" },
    processSteps: { gridTemplateColumns: "1fr" },
    techGrid: { gridTemplateColumns: "1fr" },
    featuresGrid: { gridTemplateColumns: "1fr" },
    heroStats: { gridTemplateColumns: "repeat(2,1fr)" },
    heroTitle: { fontSize: "clamp(2rem,8vw,2.8rem)" },
    heroButtons: { flexDirection: "column", alignItems: "center" },
    categoriesTabs: { gap: "6px" },
    categoryTab: { padding: "8px 16px", fontSize: "0.75rem" }
  }
};

// ════════════════════════════════════════════════════════════════════════════════
const ServicesPage = () => {
  const [activeService,    setActiveService]    = useState(null);
  const [activeTab,        setActiveTab]        = useState('all');
  const [filteredServices, setFilteredServices] = useState(STATIC_SERVICES);

  // ── City detection state ───────────────────────────────────────────────────
  const [cityData,    setCityData]    = useState(null);
  const [cityName,    setCityName]    = useState('');
  const [cityLoading, setCityLoading] = useState(true);

  // ── Derived values ────────────────────────────────────────────────────────
  const heroDesc = cityData?.heroDesc
    || (cityName
      ? `A.S Web Matrix helps businesses in ${cityName} grow with expert SEO, website development, and digital marketing. Trusted by 35+ businesses across India.`
      : 'From web development to digital marketing, we provide comprehensive solutions that drive growth, engagement, and measurable results for your business.');

  const hasCityServices = cityData?.services?.length > 0;

  // ── 1. IP-based detection → fallback to Geolocation ──────────────────────
  useEffect(() => {
    async function detectByIP() {
      try {
        const res  = await fetch('/api/detect-city');
        const data = await res.json();

        if (data.found && data.city) {
          setCityData(data.city);
          setCityName(data.city.name);
          setCityLoading(false);
          return;
        }

        if (data.detectedName) setCityName(data.detectedName);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              try {
                const { latitude, longitude } = pos.coords;
                const geoRes = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                );
                const geo  = await geoRes.json();
                const name = geo.address?.city || geo.address?.town || '';
                if (!name) { setCityLoading(false); return; }

                setCityName(name);
                const slug    = name.toLowerCase().replace(/\s+/g, '-');
                const cityRes = await fetch(`/api/cities/${slug}`);
                if (cityRes.ok) {
                  const cityJson = await cityRes.json();
                  if (cityJson.city) setCityData(cityJson.city);
                }
              } catch { /* silent */ }
              setCityLoading(false);
            },
            () => setCityLoading(false),
            { timeout: 5000 }
          );
        } else {
          setCityLoading(false);
        }
      } catch {
        setCityLoading(false);
      }
    }
    detectByIP();
  }, []);

  // ── Filter services by tab ─────────────────────────────────────────────────
  useEffect(() => {
    if (hasCityServices) {
      setFilteredServices(cityData.services.map(normalizeCityService));
    } else if (activeTab === 'all') {
      setFilteredServices(STATIC_SERVICES);
    } else {
      setFilteredServices(STATIC_SERVICES.filter(s => s.category === activeTab));
    }
  }, [activeTab, cityData]);

  // ── Responsive styles ──────────────────────────────────────────────────────
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const isTablet = typeof window !== 'undefined' && window.innerWidth <= 992;

  const getServicesGridStyle = () => {
    if (isMobile) return { ...styles.servicesGrid, gridTemplateColumns: "1fr" };
    if (isTablet) return { ...styles.servicesGrid, gridTemplateColumns: "repeat(2,1fr)" };
    return styles.servicesGrid;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={styles.page}>

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section style={styles.hero}>
          <div style={styles.heroBg} aria-hidden="true" />
          <div style={styles.container}>
            <div style={styles.heroContent}>

              {cityName && !cityLoading && (
                <div style={styles.cityBadge}>
                  <i className="fas fa-map-marker-alt"></i> Serving {cityName}
                  {cityData?.region ? `, ${cityData.region}` : ''}
                </div>
              )}

              <div style={styles.heroBadge}>
                <i className="fas fa-crown"></i> Industry Leading Solutions
              </div>

              <h1 style={styles.heroTitle}>
                {cityName
                  ? <>Digital Services in <span style={styles.heroHighlight}>{cityName}</span></>
                  : <>Digital Services That <span style={styles.heroHighlight}>Transform</span> Businesses</>
                }
              </h1>

              <p style={styles.heroSubtitle}>{heroDesc}</p>

              {cityData?.nearbyAreas?.length > 0 && (
                <div style={styles.nearbyAreas}>
                  <span style={styles.nearbyLabel}>Also serving:</span>
                  {cityData.nearbyAreas.slice(0, 5).map(area => (
                    <span key={area} style={styles.nearbyTag}>{area}</span>
                  ))}
                </div>
              )}

              <div style={styles.heroButtons}>
                <Link href="#all-services" style={styles.btnPrimary}>
                  Explore Services <i className="fas fa-arrow-right"></i>
                </Link>
                <Link href="/contact" style={styles.btnOutline}>
                  Get Free Consultation <i className="fas fa-headset"></i>
                </Link>
              </div>

              <div style={styles.heroStats}>
                {STATS.map((stat, index) => (
                  <div style={styles.statItem} key={index}>
                    <div style={styles.statIcon}><i className={stat.icon}></i></div>
                    <span style={styles.statNumber}>{stat.number}</span>
                    <span style={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.heroWave}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* ── CATEGORY TABS (only for static services) ────────────────────── */}
        {!hasCityServices && (
          <section style={styles.categoriesSection}>
            <div style={styles.container}>
              <div style={styles.categoriesTabs}>
                {SERVICE_CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    style={{
                      ...styles.categoryTab,
                      ...(activeTab === category.id ? styles.categoryTabActive : {})
                    }}
                    onClick={() => setActiveTab(category.id)}
                  >
                    <i className={category.icon}></i>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
        <section style={styles.servicesSection} id="all-services">
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionSubtitle}>What We Offer</span>
              <h2 style={styles.sectionTitle}>
                {hasCityServices
                  ? <>{cityName} <span style={styles.sectionTitleSpan}>Digital Solutions</span></>
                  : <>Comprehensive <span style={styles.sectionTitleSpan}>Digital Solutions</span></>
                }
              </h2>
              <p style={styles.sectionDescription}>
                {hasCityServices
                  ? `Tailored digital services for businesses in ${cityName}${cityData?.region ? `, ${cityData.region}` : ''} — delivered with expertise and local understanding.`
                  : 'We provide end-to-end digital services tailored to your business needs, delivered with expertise and innovation.'
                }
              </p>
            </div>

            {cityData?.slug && (
              <div style={styles.cityBanner}>
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  See our dedicated page for{' '}
                  <Link href={`/services/${cityData.slug}`} style={styles.cityBannerLink}>
                    {cityData.name} services
                  </Link>
                  {' '}— with full details, FAQs, and local case studies.
                </span>
              </div>
            )}

            <div style={getServicesGridStyle()}>
              {filteredServices.map((service) => {
                const isActive = activeService === service.id;
                return (
                  <div
                    key={service.id}
                    style={{
                      ...styles.serviceCard,
                      ...(isActive ? styles.serviceCardHover : {})
                    }}
                    onMouseEnter={() => setActiveService(service.id)}
                    onMouseLeave={() => setActiveService(null)}
                  >
                    <div style={{ ...styles.serviceIcon, background: service.color }}>
                      <i className={service.icon}></i>
                    </div>
                    <h3 style={styles.serviceTitle}>{service.title}</h3>
                    <p style={styles.serviceDesc}>
                      {service.description.substring(0, 80)}...
                    </p>
                    {service.price && (
                      <span style={styles.servicePrice}>{service.price}</span>
                    )}

                    {isActive && (
                      <>
                        {service.features?.length > 0 && (
                          <ul style={styles.serviceFeatures}>
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} style={styles.serviceFeature}>
                                <i className="fas fa-check-circle" style={styles.serviceFeatureIcon}></i>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        )}

                        {service.technologies?.length > 0 && (
                          <div style={styles.serviceTechTags}>
                            {service.technologies.slice(0, 3).map((tech, idx) => (
                              <span key={idx} style={styles.techTag}>{tech}</span>
                            ))}
                          </div>
                        )}

                        {service.caseStudy && (
                          <div style={styles.serviceCaseStudy}>
                            <i className="fas fa-trophy"></i>
                            <span>{service.caseStudy}</span>
                          </div>
                        )}
                      </>
                    )}

                    <Link href="/contact" style={styles.serviceLink}>
                      Get Started <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROCESS ─────────────────────────────────────────────────────── */}
        <section style={styles.processSection}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionSubtitle}>How We Work</span>
              <h2 style={styles.sectionTitle}>Our <span style={styles.sectionTitleSpan}>Proven Process</span></h2>
              <p style={styles.sectionDescription}>
                A systematic approach that ensures project success and client satisfaction
              </p>
            </div>
            <div style={styles.processSteps}>
              {PROCESS_STEPS.map((step, index) => (
                <div style={styles.processStep} key={index}>
                  <div style={{ ...styles.stepNumber, background: step.color }}>{step.number}</div>
                  <div style={{ ...styles.stepIcon, color: step.color }}>
                    <i className={step.icon}></i>
                  </div>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                  <p style={styles.stepDescription}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGIES ─────────────────────────────────────────────────── */}
        <section style={styles.techSection}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionSubtitle}>Our Expertise</span>
              <h2 style={styles.sectionTitle}>Technologies We <span style={styles.sectionTitleSpan}>Master</span></h2>
            </div>
            <div style={styles.techGrid}>
              {TECHNOLOGIES.map((tech, index) => (
                <div style={styles.techItem} key={index}>
                  <div style={styles.techIcon}><i className={tech.icon}></i></div>
                  <h4 style={styles.techName}>{tech.name}</h4>
                  <span style={styles.techCategory}>{tech.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
        <section style={styles.whyChooseSection}>
          <div style={styles.container}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionSubtitle}>Why Us</span>
              <h2 style={styles.sectionTitle}>What Makes Us <span style={styles.sectionTitleSpan}>Different</span></h2>
            </div>
            <div style={styles.featuresGrid}>
              {[
                { icon: 'fas fa-clock',      title: 'Fast Delivery',   desc: 'We deliver projects on time with agile methodology and efficient workflows.' },
                { icon: 'fas fa-shield-alt', title: 'Quality Assured', desc: 'Rigorous testing and quality checks ensure flawless deliverables.' },
                { icon: 'fas fa-headset',    title: '24/7 Support',    desc: 'Round-the-clock support for all your technical needs.' },
                { icon: 'fas fa-chart-line', title: 'ROI Focused',     desc: 'Every solution is designed to deliver measurable business results.' },
              ].map((f, i) => (
                <div style={styles.featureCard} key={i}>
                  <div style={styles.featureIcon}><i className={f.icon}></i></div>
                  <h3 style={styles.featureTitle}>{f.title}</h3>
                  <p style={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section style={styles.ctaSection}>
          <div style={styles.container}>
            <div style={styles.ctaContent}>
              <h2 style={styles.ctaTitle}>
                {cityName
                  ? `Ready to Grow Your ${cityName} Business?`
                  : 'Ready to Transform Your Digital Presence?'
                }
              </h2>
              <p style={styles.ctaDescription}>
                {cityName
                  ? `Join businesses in ${cityName} that trust A.S Web Matrix for SEO, website development, and digital marketing.`
                  : "Let's discuss how we can help you achieve your business goals with our comprehensive digital services."
                }
              </p>
              <div style={styles.ctaButtons}>
                <Link href="/contact" style={{ ...styles.btnPrimary, ...styles.btnLarge }}>
                  <i className="fas fa-paper-plane"></i> Start a Project
                </Link>
                <Link href="/portfolio" style={{ ...styles.btnOutline, ...styles.btnLarge }}>
                  <i className="fas fa-briefcase"></i> View Portfolio
                </Link>
              </div>
              <div style={styles.ctaGuarantee}>
                <i className="fas fa-check-circle" style={styles.ctaGuaranteeIcon}></i>
                <span>30-day satisfaction guarantee • No hidden fees • Free consultation</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default ServicesPage;