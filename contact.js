/**
 * CurioLabs Contact Form
 * Handles form submission and validation for the contact page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize contact form
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const successModal = document.getElementById('successModal');
  const closeModal = document.querySelector('.close-modal');
  const modalBtn = document.querySelector('.modal-btn');
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (validateForm()) {
        // Show loading state
        formStatus.textContent = 'Sending your message...';
        formStatus.className = 'form-status status-loading';
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="button-text">Sending...</span> <span class="button-icon"><i class="fas fa-spinner fa-spin"></i></span>';
        
        // Collect form data
        const formData = new FormData(contactForm);
        
        // Convert formData to a plain object for email service
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        
        // Add recipient email
        formObject.to = 'kwameagain@icloud.com';
        
        // Add timestamp
        formObject.timestamp = new Date().toISOString();
        
        // Send form data using EmailJS or another service
        sendEmail(formObject)
          .then(response => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            formStatus.textContent = 'Your message has been sent successfully!';
            formStatus.className = 'form-status status-success';
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="button-text">Send Message</span> <span class="button-icon"><i class="fas fa-paper-plane"></i></span>';
            
            // Show success modal
            showModal();
            
            // Clear status message after 5 seconds
            setTimeout(() => {
              formStatus.textContent = '';
              formStatus.className = 'form-status';
            }, 5000);
          })
          .catch(error => {
            console.error('Error sending form:', error);
            
            // Show error message
            formStatus.textContent = 'There was an error sending your message. Please try again.';
            formStatus.className = 'form-status status-error';
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="button-text">Send Message</span> <span class="button-icon"><i class="fas fa-paper-plane"></i></span>';
          });
      }
    });
  }
  
  // Modal close button handler
  if (closeModal) {
    closeModal.addEventListener('click', hideModal);
  }
  
  // Modal button handler
  if (modalBtn) {
    modalBtn.addEventListener('click', hideModal);
  }
  
  // Close modal on outside click
  window.addEventListener('click', function(e) {
    if (e.target === successModal) {
      hideModal();
    }
  });
});

/**
 * Form validation
 * @returns {boolean} - Whether the form is valid
 */
function validateForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  // Get form fields
  const name = contactForm.querySelector('#name').value.trim();
  const email = contactForm.querySelector('#email').value.trim();
  const subject = contactForm.querySelector('#subject').value;
  const message = contactForm.querySelector('#message').value.trim();
  
  // Validate name
  if (name === '') {
    showError('Please enter your name');
    return false;
  }
  
  // Validate email
  if (email === '') {
    showError('Please enter your email address');
    return false;
  }
  
  if (!isValidEmail(email)) {
    showError('Please enter a valid email address');
    return false;
  }
  
  // Validate subject
  if (subject === '' || subject === null) {
    showError('Please select a subject');
    return false;
  }
  
  // Validate message
  if (message === '') {
    showError('Please enter your message');
    return false;
  }
  
  // Clear any previous error message
  formStatus.textContent = '';
  formStatus.className = 'form-status';
  
  return true;
}

/**
 * Display error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  const formStatus = document.getElementById('formStatus');
  formStatus.textContent = message;
  formStatus.className = 'form-status status-error';
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * Send email using EmailJS or another service
 * @param {object} formData - Form data to send
 * @returns {Promise} - Promise that resolves when email is sent
 */
function sendEmail(formData) {
  // For demonstration, we'll use a timeout to simulate sending
  // In production, replace this with your actual email service API call
  
  return new Promise((resolve, reject) => {
    // Log form data to console (remove in production)
    console.log('Form data to send:', formData);
    
    // Simulate API call with 2-second delay
    setTimeout(() => {
      // Simulating successful email sending
      // In production, this would be the response from your email service
      const emailServiceResponse = {
        status: 'success',
        message: 'Email sent successfully',
        timestamp: new Date().toISOString()
      };
      
      // For production, use your email service API
      // Example with EmailJS:
      /*
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
      */
      
      // For demo, always resolve the promise
      resolve(emailServiceResponse);
      
      // Uncomment to test error handling:
      // reject(new Error('Simulated error sending email'));
    }, 2000);
  });
}

/**
 * Show success modal
 */
function showModal() {
  const modal = document.getElementById('successModal');
  modal.classList.add('show');
  
  // Prevent scrolling while modal is open
  document.body.style.overflow = 'hidden';
}

/**
 * Hide success modal
 */
function hideModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('show');
  
  // Re-enable scrolling
  document.body.style.overflow = '';
}

/**
 * Initialize animations triggered by scrolling
 */
function initScrollAnimations() {
  // Elements to animate
  const animatedElements = document.querySelectorAll(
    '.contact-info-col, .contact-form-col, .map-container'
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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Additional features to implement in production:
// 1. Google reCAPTCHA integration to prevent spam
// 2. Proper form analytics tracking
// 3. Input field character counters for message field
// 4. Autosave form data in localStorage in case user navigates away
