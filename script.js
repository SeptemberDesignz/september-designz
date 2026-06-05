const bookingForm = document.getElementById('bookingForm');

function getPriceFromService(serviceText) {
    if (serviceText.includes('Graphic')) return 299;
    if (serviceText.includes('Web')) return 799;
    if (serviceText.includes('UI/UX')) return 499;
    return 0;
}

bookingForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const serviceSelect = document.getElementById('service');
    const service = serviceSelect.value;
    const price = getPriceFromService(service);
    const date = document.getElementById('date').value;
    const details = document.querySelector('textarea').value;
    
    if (name === '' || email === '') {
        showMessage('❌ Please fill in your name and email', 'error');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showMessage('❌ Please enter a valid email address', 'error');
        return;
    }
    
    const submitBtn = document.querySelector('.booking-form button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Sending...';
    submitBtn.disabled = true;
    
    const booking = {
        id: Date.now(),
        name: name,
        email: email,
        service: service,
        price: price,
        date: date,
        details: details,
        timestamp: new Date().toISOString()
    };
    
    let bookings = JSON.parse(localStorage.getItem('september_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('september_bookings', JSON.stringify(bookings));
    
    showMessage(`✅ Thanks ${name}! Your booking request for ${service} ($${price}) has been saved. I'll contact you at ${email} within 24 hours.`, 'success');
    
    bookingForm.reset();
    
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.innerHTML = message;
    messageDiv.style.color = type === 'success' ? '#4ade80' : '#f87171';
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.background = type === 'success' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)';
    messageDiv.style.border = type === 'success' ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(248,113,113,0.3)';
    
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

document.querySelectorAll('.nav-links a, .btn-primary, .btn-secondary').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('Website is ready! 🚀');