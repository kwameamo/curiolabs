// Wait for page to load
    window.addEventListener('load', function() {
      // Remove loader
      setTimeout(function() {
        document.querySelector('.loader').classList.add('loaded');
      }, 2000);
      
      // Initialize animations
      initAnimations();
      
      // Initialize custom cursor
      initCustomCursor();
      
      // Initialize scroll events
      initScrollEvents();
      
      // Mobile menu toggle
      document.querySelector('.menu-btn').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
      });
      
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        });
      });
      
      // Page navigation with transitions
      document.querySelectorAll('a:not([href^="#"])').forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          
          // Skip for external links or same page
          if (href.startsWith('http') || href === window.location.href) {
            return;
          }
          
          e.preventDefault();
          
          const transition = document.querySelector('.page-transition');
          transition.classList.add('active');
          
          setTimeout(function() {
            window.location.href = href;
          }, 700);
        });
      });
    });
    
    // Initialize animations based on scroll position
    function initAnimations() {
      const animateElements = document.querySelectorAll('.service-card, .about-image, .about-content, .portfolio-item, .testimonial-card, .contact-info, .contact-form-container');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });
      
      animateElements.forEach(element => {
        observer.observe(element);
      });
    }
    
    // Initialize custom cursor
    function initCustomCursor() {
      const cursor = document.querySelector('.custom-cursor');
      
      document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
      
      document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
          cursor.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
          cursor.classList.remove('active');
        });
      });
    }
    
    // Initialize scroll events
    function initScrollEvents() {
      window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
