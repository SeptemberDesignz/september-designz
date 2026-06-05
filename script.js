// This code runs when someone submits the booking form

// First, find the form on the page
const bookingForm = document.getElementById('bookingForm');

// Add an "event listener" – it waits for the submit button to be clicked
bookingForm.addEventListener('submit', function(event) {
    // Stop the page from refreshing
    event.preventDefault();
    
    // Get the values the user typed
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    
    // Check if they filled required fields
    if (name === '' || email === '') {
        showMessage('❌ Please fill in your name and email', 'error');
        return;
    }
    
    // Show success message
    showMessage(`✅ Thanks ${name}! I'll contact you within 24 hours about ${service}.`, 'success');
    
    // Clear the form
    bookingForm.reset();
});

// Function to show messages (helper function)
function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.innerHTML = message;
    messageDiv.style.color = type === 'success' ? '#4ade80' : '#f87171';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.background = type === 'success' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)';
    
    // Make message disappear after 5 seconds
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

// Bonus: Smooth scrolling when clicking navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('Website is ready! 🚀');