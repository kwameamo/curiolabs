/**
 * CurioLabs Services Page JavaScript
 * Handles all interactive elements on the services page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  initTabs();
  
  // FAQ accordion functionality
  initFaqAccordion();
  
  // Animation on scroll
  initScrollAnimations();
});

/**
 * Initialize the tabs functionality
 */
function initTabs() {
  const tabItems = document.querySelectorAll('.tab-item');
  
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all tabs
      tabItems.forEach(tab => tab.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all tab contents
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Show corresponding tab content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId + '-content').classList.add('active');
    });
  });
}

/**
 * Initialize the FAQ accordion functionality
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Close other open FAQs (optional - comment out for multiple open FAQs)
      faqItems.forEach(faqItem => {
        if (faqItem !== item && faqItem.classList.contains('active')) {
          faqItem.classList.remove('active');
        }
      });
      
      // Toggle active class on clicked item
      item.classList.toggle('active');
    });
  });
}

/**
 * Initialize animations triggered by scrolling
 */
function initScrollAnimations() {
  // Elements to animate
  const animatedElements = document.querySelectorAll(
    '.service-category-image, .service-category-content, ' + 
    '.plan-card, .faq-item, .tab-content'
  );
  
  // Create the intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,  // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px'  // Trigger slightly before element comes into view
  });
  
  // Observe all animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}
