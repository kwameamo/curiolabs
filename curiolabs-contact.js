document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
          submitFormWithAjax();
        }
      });
    }
  });
  
  function validateForm() {
    // Validation code remains the same
    return true; // if valid
  }
  
  function submitFormWithAjax() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = form.querySelector('.form-submit');
    
    // Show loading state
    formStatus.textContent = 'Sending your message...';
    formStatus.className = 'form-status status-loading';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="button-text">Sending...</span> <span class="button-icon"><i class="fas fa-spinner fa-spin"></i></span>';
    
    // Collect form data
    const formData = new FormData(form);
    
    // Send with fetch API
    fetch('contact-handler.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Reset form
      form.reset();
      
      // Show success message
      formStatus.textContent = 'Your message has been sent successfully!';
      formStatus.className = 'form-status status-success';
      
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span class="button-text">Send Message</span> <span class="button-icon"><i class="fas fa-paper-plane"></i></span>';
      
      // Show success modal
      showModal();
    })
    .catch(error => {
      console.error('Error:', error);
      
      // Show error message
      formStatus.textContent = 'There was an error sending your message. Please try again.';
      formStatus.className = 'form-status status-error';
      
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span class="button-text">Send Message</span> <span class="button-icon"><i class="fas fa-paper-plane"></i></span>';
    });
  }