AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-in-out'
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }

    // Page Navigation System
    const pages = {
      home: document.getElementById('home-page'),
      models: document.getElementById('models-page'),
      about: document.getElementById('about-page'),
      services: document.getElementById('services-page'),
      cities: document.getElementById('cities-page'),
      contact: document.getElementById('contact-page')
    };

    const navLinks_ = document.querySelectorAll('.nav-links > li > a:not(.dropdown-content a)');
    
    function showPage(pageId) {
      // Hide all pages
      Object.values(pages).forEach(page => {
        if (page) page.style.display = 'none';
      });
      
      // Show selected page
      if (pages[pageId]) {
        pages[pageId].style.display = 'block';
      }

      // Update active class on nav links
      navLinks_.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `${pageId}.html` || 
            (pageId === 'home' && link.getAttribute('href') === 'index.html')) {
          link.classList.add('active');
        }
      });

      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = menuToggle?.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Refresh AOS animations
      setTimeout(() => {
        AOS.refresh();
      }, 200);
    }

    // Handle main navigation clicks
    navLinks_.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        if (href === 'index.html') showPage('home');
        else if (href === 'models.html') showPage('models');
        else if (href === 'about.html') showPage('about');
        else if (href === 'services.html') showPage('services');
        else if (href === 'cities.html') showPage('cities');
        else if (href === 'contact.html') showPage('contact');
      });
    });

    // Handle model dropdown links
    document.querySelectorAll('.dropdown-content a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('models');
        // Optional: Add model filtering logic here
        const modelType = link.textContent.trim();
        alert(`Showing all ${modelType} models`);
      });
    });

    // Show home page by default
    showPage('home');

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your interest in Taarzan Motors! Our concierge will contact you within 24 hours to schedule your exclusive test drive.');
        contactForm.reset();
      });
    }

    // Close dropdowns on mobile when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.model-dropdown') && window.innerWidth > 968) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(drop => drop.style.display = 'none');
      }
    });