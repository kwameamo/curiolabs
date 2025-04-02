/**
 * CurioLabs Portfolio Page JavaScript
 * Handles portfolio filtering, testimonial slider, stats counter, and portfolio modals
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize portfolio filtering
  initPortfolioFilter();
  
  // Initialize testimonial slider
  initTestimonialSlider();
  
  // Initialize stats counter
  initStatsCounter();
  
  // Initialize portfolio modals
  initPortfolioModals();
  
  // Initialize animations
  initAnimations();
});

/**
 * Initialize portfolio filtering
 */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (!filterButtons.length || !portfolioItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        // Get item category
        const itemCategory = item.getAttribute('data-category');
        
        // Add animation classes for transition
        item.classList.add('animate');
        
        // After a short delay, update visibility
        setTimeout(() => {
          if (filterValue === 'all' || filterValue === itemCategory) {
            item.classList.remove('hidden');
            
            // Add visible class with delay for staggered animation
            setTimeout(() => {
              item.classList.add('visible');
            }, 100 * Array.from(portfolioItems).indexOf(item) % 5);
          } else {
            item.classList.add('hidden');
            item.classList.remove('visible');
          }
        }, 300);
      });
    });
  });
  
  // Initially show all items with staggered animation
  portfolioItems.forEach((item, index) => {
    item.classList.add('animate');
    
    setTimeout(() => {
      item.classList.add('visible');
    }, 100 * index % 5);
  });
}

/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.testimonial-controls .prev-btn');
  const nextBtn = document.querySelector('.testimonial-controls .next-btn');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Set up auto-slide timer
  let slideInterval = setInterval(nextSlide, 7000);
  
  // Function to show specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    if (dots.length > index) {
      dots[index].classList.add('active');
    }
    
    // Reset timer
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 7000);
  }
  
  // Function to show next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }
  
  // Function to show previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
  }
  
  // Add click events to navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
    });
  }
  
  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Pause slider on hover
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 7000);
    });
  }
}

/**
 * Initialize stats counter
 */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  
  if (!stats.length) return;
  
  let hasRun = false;
  
  function runCounter() {
    if (hasRun) return;
    
    stats.forEach(stat => {
      // Get target count
      const targetCount = parseInt(stat.getAttribute('data-count'));
      
      // Determine increment
      const increment = targetCount > 1000 ? 50 : (targetCount > 100 ? 5 : 1);
      
      // Determine animation duration based on number size
      const duration = targetCount > 1000 ? 2000 : (targetCount > 100 ? 1500 : 1000);
      const step = Math.ceil(targetCount / (duration / 30));
      
      // Initialize counter
      let currentCount = 0;
      
      // Set counter interval
      const counter = setInterval(() => {
        currentCount += step;
        
        // Ensure we don't exceed target
        if (currentCount >= targetCount) {
          currentCount = targetCount;
          clearInterval(counter);
        }
        
        // Update display
        stat.textContent = currentCount.toLocaleString();
      }, 30);
    });
    
    hasRun = true;
  }
  
  // Run counter when stats section is visible
  const statsSection = document.querySelector('.stats-section');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter();
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
  }
}

/**
 * Initialize portfolio modals
 */
function initPortfolioModals() {
  // Get all modal triggers
  const modalTriggers = document.querySelectorAll('.portfolio-link');
  // Get all modals
  const modals = document.querySelectorAll('.portfolio-modal');
  // Get all close buttons
  const closeButtons = document.querySelectorAll('.modal-close');
  
  if (!modalTriggers.length || !modals.length) return;
  
  // Add click events to modal triggers
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get target modal ID
      const modalId = this.getAttribute('href');
      const targetModal = document.querySelector(modalId);
      
      if (targetModal) {
        // Show modal
        targetModal.classList.add('show');
        
        // Prevent scrolling while modal is open
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Add click events to close buttons
  closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      // Find the parent modal
      const modal = this.closest('.portfolio-modal');
      
      if (modal) {
        // Hide modal
        modal.classList.remove('show');
        
        // Re-enable scrolling
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close modal when clicking on overlay
  modals.forEach(modal => {
    const overlay = modal.querySelector('.modal-overlay');
    
    if (overlay) {
      overlay.addEventListener('click', function() {
        modal.classList.remove('show');
        
        // Re-enable scrolling
        document.body.style.overflow = '';
      });
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('show')) {
          modal.classList.remove('show');
          
          // Re-enable scrolling
          document.body.style.overflow = '';
        }
      });
    }
  });
}

/**
 * Initialize animations
 */
function initAnimations() {
  // Animate elements when they enter the viewport
  const animatedElements = document.querySelectorAll('.portfolio-item, .stat-item');
  
  if (!animatedElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}
